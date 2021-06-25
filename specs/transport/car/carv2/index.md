---
title: "CARv2 Specification"
eleventyNavigation:
  synopsys: "Specification for the CARv2 format"
---

# Specification: Content Addressable aRchives (CAR / .car) v2

**Status: Draft**

- [Specification: Content Addressable aRchives (CAR / .car) v2](#specification-content-addressable-archives-car--car-v2)
  - [Summary](#summary)
  - [Format Description](#format-description)
    - [Pragma](#pragma)
    - [Header](#header)
    - [Characteristics](#characteristics)
    - [CARv1 data payload](#carv1-data-payload)
    - [Index payload](#index-payload)
    - [Index format](#index-format)
      - [Format `0x300000`: IndexSorted](#format-0x300000-indexsorted)
  - [Implementations](#implementations)
  - [Test Fixtures](#test-fixtures)

## Summary

CARv2 is a minimal upgrade to the [CARv1](../carv1/index.md) format with the primary aim of adding an optional index within the format for fast random-access to blocks.

CARv2 makes use of CARv1 by wrapping a properly formed CARv1 with a prefix containing a pragma and header, and a suffix containing the optional index data. Once the offset and length of the CARv1 bytes are determined using CARv2 parsing rules. Though not necessarily ideal, an existing CARv1 decoder could be used to read the roots and `CID:Bytes` pairs. Likewise, a CARv1 encoder could be be used to encode this data for wrapping by a CARv2 encoder as the payload is the same format.

## Format Description

CARv2 consists of:

1. An 11-byte pragma that identify the data as a CARv2 format.
2. A header describing some capabilities of the CARv2 as well as the locations of the data payload and index payload within the CARv2.
3. A standard CARv1 data payload, including standard CARv1 header and roots and sequence of `CID:Bytes` pairs.
4. An optional index payload, which may be one of a number of supported index formats, allowing for fast lookups of blocks within the data payload.

The CARv2 format can be illustrated as follows:

```
| 11-byte fixed pragma | 40-byte header | optional padding | CARv1 data payload | optional padding | optional index payload
```

### Pragma

The CARv2 version pragma (or ["magic bytes"](https://en.wikipedia.org/wiki/List_of_file_signatures)) was chosen for compatibility with existing CARv1 parsers. CARv1 leads with a [DAG-CBOR](../../../codecs/dag-cbor/index.md) block, prefixed with a varint where the block contains the version and roots array:

```ipldsch
type CarV1Header struct {
  version Int # 1
  roots [&Any]
}
```

To introduce a new version that existing parsers can safely reject as an *"unsupported version"* we must copy the minimal form of this header with a new version.

Therefore, the CARv2 header is a fixed sequence of 11 bytes: **`0x0aa16776657273696f6e02`**.

These bytes decode as follows: A leading `0x0a` which translates as a `uint(10)` (or `varint(10)`) indicating the length of the DAG-CBOR header block to follow. The remaining 10 bytes are a standard CBOR encoding of a map containing a `"version"` field with a value `2`. i.e.


```ipldsch
type CarV2Header struct {
  version Int # 2
}
```

The 10 bytes are parsed in CBOR as follows:

```
a1                                                # map(1)
  67                                              #   string(7)
    76657273696f6e                                #     "version"
  02                                              #   uint(2)
```

Existing CARv1 parsers should safely read this pragma and reject the byte stream as an unsupported version of the CAR format.

This 11 byte string remains fixed and may be matched using a simple byte comparison and does not require a varint or CBOR decode since it does not vary for the CARv2 format.

### Header

Following the 11 byte pragma, the CARv2 is a fixed-length sequence of 40 bytes, broken into the following sections:

1. **Characteristics**: A 128-bit (16-byte) bitfield used to describe certain features of the enclosed data.
2. **Data offset**: A 64-bit (8-byte) unsigned little-endian integer indicating the byte-offset from the beginning of the CARv2 to the first byte of the CARv1 data payload.
3. **Data size**: A 64-bit (8-byte) unsigned little-endian integer indicating the byte-length of the CARv1 data payload.
4. **Index offset**: A 64-bit (8-byte) unsigned little-endian integer indicating the byte-offset from the beginning of the CARv2 to the first byte of the index payload. This value may be `0` to indicate the absence of index data.

### Characteristics

The characteristics bitfield contained within the CARv2 header may be used to indicate certain features of the specific CARv2. All bits in the bitfield will be unset (`0`) by default and only set (`1`) where they are being used to signal a characteristic other than the default.

**TODO:** spit-balling here, these feel like feature-bloat so we should probably only add features as we use them but should be clear to leave enough space to encode additional things we care about without causing conflicts - i.e. it shouldn't be possible to flip bits to say that it's _both_ depth-first and breadth-first. Hence the suggestion to use easy integers where there's >2 options.

1. **Bits 0 to 7**: read as an unsigned little-endian 8-bit integer describing the ordering of the blocks in the CARv1 payload:
   * `0` indicates _no particular order_, no assumptions should be made regarding determinism of payload layout.
   * `1` indicates a _depth-first_ ordering of blocks in the DAG(s) referenced by the "roots" array. (**TODO:** "depth-first" isn't enough to be clear about what this means for a DAG walk - e.g. do we yield the current block before going to the next, or wait till we reach the depth before yielding blocks?)
   * `2` indicates a _breadth-first_ ordering of blocks in the DAG(s) referenced by the "roots" array. (**TODO:** ditto ^ what does this specifically mean in DAG terms)
   * `3` indicates that the ordering is dictated by an [IPLD Selector](../specs/selectors/index.md) which itself is serialized into the CARv1 payload and referenced in the last element in the "roots" array. i.e. deserializing the block referenced by the last element of the roots array in the CARv1 header should yield a data model form of the IPLD selector that was used to select and order the blocks in the CARv1 payload.
   * `4` has the same meaning as `3` except that the IPLD selector is encoded as a DAG-CBOR IPLD block immediately following the Header and is prefixed with a varint indicating the length of the bytes to decode.
2. **Bit 8** indicating whether the blocks have been properly deduplicated (`1`) and that a reader should not expect any repeated CIDs, or that the blocks _may_ contain duplicates (`0`) (perhaps as a trade-off for speed or memory consumption during generation).

Future amendments of this specification may introduce additional characteristics, including:

* **TODO:** what else are we potentially filling 128-bits up with?

### CARv1 data payload

The CARv1 data payload starts at the "Data offset" indicated by the CARv2 header. It is important that a decoder adhere to this offset rather than assuming the data payload begins immediately after the header in order to make allowance for additional data following the header as indicated by the characteristics field in future amendments to this specification.

The CARv1 data payload ends after the number of bytes indicated by the "Data size" field in the header. This is important as the CARv1 parser has no means to determine extent other than encountering the end of a byte stream. Therefore, a CARv2 decoder may defer to a CARv1 decoder to load the `CID:Bytes` sequence payload and "roots" array, but must be able to deliver it a byte stream that strictly begins at "Data offset" and ends after "Data size" bytes from that offset.


The data payload is a complete, self-contained CARv1. As such, it must include a valid CARv1 header, including a roots array and a `version` field with a value strictly of `1`, followed by a series of data blocks. As such, conversion from a CARv2 to CARv1 simply requires extraction of the data payload without further modification.

Refer to the [CARv1 Specification](../carv1/index.md) for details on the CARv1 format.

### Index payload

The CARv2 index payload follows the CARv1 data payload, but may be offset by padding or additional data as dictated by the characteristics field. If an index is present, the index payload begins at "Index offset", which _must_ be after the end of the CARv2 data payload, and continues until the end of the CARv2 byte stream (its length is not encoded in the header).

An "Index offset" value of `0` in the CARv2 header indicates that there is no index in this CARv2 and no attempt should be made to read it.

### Index format

The CARv2 index is a flexible format itself, allowing for different index layouts depending on suitability for a particular application or set of data - generation speed, usage performance, size, etc. Supported index formats will be detailed in this specification, below.

Index data, once read from a CARv2, provides a mapping of hash digest bytes to block location in byte offset from the beginning of the CARv1 data payload (_not_ the begining of the CARv2). The index only uses the hash digest—it does not use the full bytes of a CID, nor does it use any of the multihash prefix bytes.

The first byte(s) of a CARv2 index contain an unsigned [LEB128](https://en.wikipedia.org/wiki/LEB128) integer ("varint") that indicates the index format type. The remaining bytes follow the encoding rules of that index format type.

As the index only contains the hash digest bytes, other details contained within the block's CID and the length of the block's bytes must be derived by inspecting the initial bytes of the block entry within the data payload.

Indexes should not include identity hash CIDs. It is assumed that any use of a CARv2 as a blockstore will return identity CID data immediately by extracting it from the CID, therefore there should be no need to provide indexing for such entries.

#### Format `0x300000`: IndexSorted

**TODO:** I'm assuming this is supposed to be a multicodec and that `0x300000` is using the reserved range - so we should register this in the table.

An index format type of `0x300000` indicates the "IndexSorted" format.

IndexSorted sorts hash digests by two dimensions: first into buckets of _digest length_, smallest to largest, and then within those buckets ordered by a simple byte-wise sorting. In this way, locating a hash digest within the CAR requires first finding the bucket matching the length of the requested hash digest, then searching the ordered list of digests within that bucket to find the matching entry.

* IndexSorted may contain one or more length-grouped buckets of digests.
* Buckets are ordered by digest length and concatenated together to form the index.
* Each bucket is prefixed with:
  * a "width" encoded as a 32-bit **signed** little-endian integer indicating the common byte length of the combination of hash digests and their offsets in this bucket; followed by
  * a "count" encoded as a 64-bit **signed** little-endian integer which determines the total number of hash digests (and their offsets) bucket.

A common case of a single bucket of 32-byte hash digests is expected due to the commonality of this digest length for CIDs.

Individual index entries are the concatenation of the hash digest an an additional 64-bit **unsigned** little-endian integer indicating the offset of the block from the begining of the CARv1 data payload. Offsets locate the first byte of the varint that prefix the `CID:Bytes` pair within the CARv1 payload. See the [data section in the CARv1 Specification](../carv1/index.md#data) for details on block encoding.

For example, a bucket containing 32-byte hash digests will have a "width" of `40` as each entry in the bucket is a concatenation of the 32-byte digest and an 8-byte offset value. Hash digest length within a bucket is derived by subtracting `8` from the "width" of the bucket.

Each bucket, therefore, takes the following form:

```
| width (int32) | count (int64) | digest1 | digest1 offset (uint64) | digest2 | digest2 offset (uint64) ...
```

## Implementations

As of writing there are two work-in-progress implementations:

* https://github.com/ipld/go-car/tree/wip/v2/v2 - a `wip/v2` branch of go-car
* https://github.com/ipld/js-car/pull/30 - a read-only implementation for js-car

## Test Fixtures

To assist implementations in confirming compliance to this specification, the following test fixtures are available:

* [carv2-basic](../fixture/carv2-basic/) - Basic CAR with linked raw and DAG-PB blocks
