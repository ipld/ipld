# Specification: Content Addressable aRchives (CAR / .car)

**Status: Draft**

* [Summary](#summary)
* [Format Description](#format-description)
  * [Header](#header)
    * [Constraints](#constraints)
  * [Data](#data)
    * [Length](#length)
    * [CID](#cid)
    * [Data](#data-1)
* [Additional Considerations](#additional-considerations)
  * [Determinism](#determinism)
  * [Performance](#performance)
  * [Security and Verifiability](#security-and-verifiability)
  * [Indexing and Seeking Reads](#indexing-and-seeking-reads)
  * [Padding](#padding)
* [Implementations](#implementations)
  * [Go](#go)
  * [JavaScript](#javascript)
* [Unresolved Items](#unresolved-items)
  * [Number of roots](#number-of-roots)
  * [Zero blocks](#zero-blocks)
  * [Root CID block existence](#root-cid-block-existence)
  * [CID version](#cid-version)
  * [Duplicate Blocks](#duplicate-blocks)

## Summary

The CAR format (Content Addressable aRchives) can be used to store content addressable objects in the form of IPLD block data as a sequence of bytes; typically in a file with a `.car` filename extension.

The CAR format is intended as a serialized representation of any IPLD DAG (graph) as the concatenation of its blocks, plus a header that describes the graphs in the file (via root CIDs). The requirement for the blocks in a CAR to form coherent DAGs is not strict, so the CAR format may also be used to store arbitrary IPLD blocks.

In addition to the binary block data, storage overhead for the CAR format consists of:

 * A header block encoded as [DAG-CBOR](codecs/dag-cbor.md) containing the format version and an array of root CIDs
 * A CID for each block preceding its binary data
 * A compressed integer prefixing each block (including the header block) indicating the total length of that block, including the length of the encoded CID

This diagram shows how IPLD blocks, their root CID, and a header combine to form a CAR.

![Content Addressable aRchive Diagram](content-addressable-archives.png)

The name _Certified ARchive_ has also [previously been used](https://github.com/ipfs/archive-format) to refer to the CAR format.

## Format Description

The CAR format comprises a sequence of length-prefixed IPLD block data, where the first block in the CAR is the Header encoded as CBOR, and the remaining blocks form the Data component of the CAR and are each additionally prefixed with their CIDs. The length prefix of each block in a CAR is encoded as a "varint"&mdash;an unsigned [LEB128](https://en.wikipedia.org/wiki/LEB128) integer. This integer specifies the number of remaining bytes for that block entry&mdash;excluding the bytes used to encode the integer, but including the CID for non-header blocks.

```
|--------- Header --------| |---------------------------------- Data -----------------------------------|

[ varint | DAG-CBOR block ] [ varint | CID | block ] [ varint | CID | block ] [ varint | CID | block ] …
```

### Header

The first bytes of the CAR format hold a varint, this unsigned integer specifies the number of bytes beyond the varint itself that contain the _Header_ block. This Header block is a byte array DAG-CBOR (CBOR with tag 42 for CIDs) encoded object holding the version number and array of roots. As an [IPLD Schema](../schemas/):

```ipldsch
type CarHeader struct {
  version Int
  roots [&Any]
}
```

#### Constraints

* The `version` is always a value of `1`. Future iterations of this specification may make use of `version` to introduce variations of the format.
* The `roots` array must contain **one or more** CIDs, each of which should be present somewhere in the remainder of the CAR.

_(Caveats: see [Number of roots](#number-of-roots) and [Root CID block existence](#root-cid-block-existence) under Unresolved Issues.)_

### Data

Immediately following the Header block, **one or more** IPLD blocks are concatenated to form the _Data_ section of the CAR format. _(Caveat: see [Zero blocks](#zero-blocks) under Unresolved Issues.)_ Each block is encoded into a _Section_ by the concatenation of the following values:

1. Length in bytes of the combined CID and data in this Section, encoded as a varint
2. CID of the block in this Section, encoded in the raw byte form of the CID
3. Binary data of the block

#### Length

Each Section begins with a varint representation of an unsigned integer indicating the number of bytes containing the remainder of the section.

#### CID

Following the Length, the CID of the block is included in raw byte form. A decoder reading a Section must decode the CID according to CID byte encoding rules, which don't provide a stable length. See https://github.com/multiformats/cid for details on the encoding of a CID. CIDv0 and CIDv1 are currently supported. _(Caveat: see [CID version](#cid-version) under Unresolved Issues.)_

**CID byte decoding summary**

_See the [CID specification](https://github.com/multiformats/cid) for full details._

A CIDv0 is indicated by a first byte of `0x12` followed by `0x20` which specifies a 32-byte (`0x20`) length SHA2-256 ([`0x12`](https://github.com/multiformats/multicodec/blob/master/table.csv)) digest.

Failure to find `0x12, 0x20` indicates a CIDv1 which is decoded by reading:

1. Version as an unsigned varint (should be `1`)
2. Codec as an unsigned varint (valid according to the [multicodec table](https://github.com/multiformats/multicodec/blob/master/table.csv))
3. The raw bytes of a [multihash](https://github.com/multiformats/multihash)

Reading the multihash requires a partial decode in order to determine the length:

```
| hash function code (varint) | digest size (varint) | digest |
```

The first two bytes of a multihash are varints, where the second varint is an unsigned integer indicating the length of the remaining portion of the multihash. Therefore, a manual decode requires two varint reads and then copying the bytes of those varints in addition to the number of bytes indicated by the second varint into a byte array.

#### Data

The remainder of a Section, after length-prefix and CID, comprises the raw byte data of the IPLD block. The encoded block may be any IPLD block format as specified by the codec in the CID. Typical codecs will be [DAG-PB](codecs/dag-pb.md), [DAG-CBOR](codecs/dag-cbor.md) or [RAW](https://github.com/ipld/specs/issues/223).

## Additional Considerations

### Determinism

Deterministic CAR creation is not covered by this specification. However, deterministic generation of a CAR from a given graph is possible and is relied upon by certain uses of the format, most notably, [Filecoin](https://filecoin-project.github.io/specs). Specifically a *filecoin-deterministic car-file* is currently implementation-defined as containing all DAG-forming blocks in first-seen order, as a result of a depth-first DAG traversal starting from a single root. 

Additional rules for the generation of the CAR format may be applied in order to ensure that the same CAR is always generated from the same data. The burden of this determinism is primarily placed on [selectors](../selectors/selectors.md) whereby a given selector applied to a given graph will always yield blocks in the same order regardless of implementation.

Care regarding the ordering of the `roots` array in the Header, as well as consideration for CID version _(see [below](#cid-version))_ and avoidance of duplicate blocks _(see [below](#duplicate-blocks))_ may also be required for strict determinism.

All such considerations are deferred to the user of the CAR format and should be documented there as this specification does not inherently support determinism.

### Performance

Some considerations regarding performance:

* **Streaming**: the CAR format is ideal for dumping blocks via streaming reads as the Header can be loaded first and minimal state is required for ongoing parsing.
* **Individual block reads**: as the CAR format contains no index information, reads require either a partial scan to discover the location of a required block or an external index must be maintained and referenced for a seek and partial read of that data. See below regarding indexing.
* **DAG traversal**: without an external index, traversal of a DAG specified by a "root" CID is not possible without dumping all blocks into a more convenient data store or by partial scans to find each block as required, which will likely be too inefficient to be practical.
* **Modification**: CARs may be appended after initial write as there is no constraint in the Header regarding total length. Care must be taken in appending if a CAR is intended to contain coherent DAG data.

### Security and Verifiability

The roots specified by the Header of a CAR must appear somewhere in its Data section, however there is no requirement that the roots define entire DAGs, nor that all blocks in a CAR must be part of DAGs described by the root CIDs in the Header. Therefore, the roots must not be used alone to determine or differentiate the contents of a CAR.

The CAR format contains no internal means, beyond the IPLD block formats and their CIDs, to verify or differentiate contents. Where such a requirement exists, this must be performed externally, such as creating a digest of the entire CAR.

### Indexing and Seeking Reads

The CAR format contains no internal indexing, any indexing must be stored externally to a CAR. However, such indexing is possible and makes seeking reads practical. An index storing byte offset (of Section start or block data start) and length (of Section or block data), keyed by CID, will enable a single block read by seeking to the offset and reading the block data. The format of any such index is not specified here and is left up to CAR format parsing implementations.

### Padding

The CAR format contains no specified means of padding to achieve specific total archive sizes or internal byte offset alignment of block data. Because it is not a requirement that each block be part of a coherent DAG under one of the roots of the CAR, dummy block entries may be used to achieve padding. Such padding should also account for the size of the length-prefix varint and the CID for a section. All sections must be valid and dummy entries should still decode to valid IPLD blocks.

## Implementations

### Go

https://github.com/ipld/go-car

As used in Filecoin for genesis block sharing. Supports creation via a DAG walk from a datastore:

```go
WriteCar(ctx context.Context, ds format.DAGService, roots []cid.Cid, w io.Writer) (error)
```

And writing to a data store via `Put(block)` operations:

```go
LoadCar(s Store, r io.Reader) (*CarHeader, error)
```

### JavaScript

https://github.com/rvagg/js-datastore-car

Wraps in [Datastore](https://github.com/ipfs/interface-datastore) interface with various modes for reading and writing to support different use-cases&mdash;including streaming reading and writing:

```js
async CarDatastore.readBuffer(buffer)
async CarDatastore.readFileComplete(file)
async CarDatastore.readStreamComplete(stream)
async CarDatastore.readStreaming(stream)
async CarDatastore.writeStream(stream)
```

Also supports an `indexer()` that parses a file or stream and yields block index data including CID, offset and length, in addition to a `readRaw()` to read individual blocks according to their index data.

## Unresolved Items

### Number of roots

Regarding the `roots` property of the Header block:

* The current Go implementation assumes at least one CID when creating a CAR
* The current Go implementation requires at least one CID when reading a CAR
* The current JavaScript implementation allows for zero or more roots
* Current usage of the CAR format in Filecoin requires exactly one CID

It is unresolved how the `roots` array should be constrained. **It is recommended that only a single root CID be used in this version of the CAR format.**

A work-around for use-cases where the inclusion of a root CID is difficult but needing to be safely within the "at least one" recommendation is to use an empty CID: `\x01\x55\x00\x00` (zero-length "identity" multihash with "raw" codec). Since current implemetations for this version of the CAR specification don't check for the existence of root CIDs _(see [Root CID block existence](#root-cid-block-existence))_, this will be safe as far as CAR implementations are concerned. However, there is no guarantee that applications that use CAR files will correctly consume (ignore) this empty root CID.

### Zero blocks

It is unresolved whether a valid CAR must contain _at least one_ block or whether the empty CAR is a valid format and should be accepted by encoders and decoders.

### Root CID block existence

It is unresolved whether an implementation must verify that a CID present in the roots array of the Header also appears as a block in the archive. While it is expected that this would be the case, it is unresolved whether encoders and decoders must validate the existence of root blocks in the archive.

Current implementations of this version of the CAR specification _do not_ check for root block existence in the CAR body.

### CID version

It is unresolved whether both CID versions 0 and 1 format are valid in the roots array and at the start of each block Section. Current implementations do not check CID version in the roots array, and both CID versions are also acceptable in each block Section. Discussions on this specification have suggested limiting CIDs used throughout the format (not within blocks) to CIDv1&mdash;requiring conversion if an encoder is provided with a CIDv0 and requiring readers of a CAR to ensure CIDv1 is the only available block key.

### Duplicate Blocks

The possibility of duplicate blocks in a single CAR (such as for padding) is currently not specified.
