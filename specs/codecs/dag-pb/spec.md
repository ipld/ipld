---
title: "DAG-PB Specification"
navTitle: "Spec"
---

# DAG-PB Spec

**Status: Descriptive - Final**

DAG-PB is an IPLD codec that uses [Protocol Buffers](https://developers.google.com/protocol-buffers/) to describe a binary format that can encode a byte array and an associated list of links. It is the primary means of encoding structured file data for [IPFS](https://ipfs.io/), serving as the encoded data carrier for [UnixFS](https://docs.ipfs.io/concepts/file-systems/#unix-file-system-unixfs).

DAG-PB does not support the full [IPLD Data Model](/docs/data-model/).

* [Implementations](#implementations)
* [Serial Format](#serial-format)
  * [Protobuf Strictness](#protobuf-strictness)
* [Logical Format](#logical-format)
  * [Constraints](#constraints)
* [Alternative (Legacy) Pathing](#alternative-legacy-pathing)
* [Zero-length blocks](#zero-length-blocks)
* [Link sorting](#link-sorting)
  * [Link sorting in go-merkledag](#link-sorting-in-go-merkledag)

## Implementations

* JavaScript
  - [@ipld/dag-pb](https://github.com/ipld/js-dag-pb) - compatible with [multiformats](https://github.com/multiformats/js-multiformats)
  - [ipld-dag-pb](https://github.com/ipld/js-ipld-dag-pb) - legacy implementation
* Go
  - [go-codec-dagpb](https://github.com/ipld/go-codec-dagpb) - for use with [go-ipld-prime](https://github.com/ipld/go-ipld-prime)
  - [go-merkledag/pb](https://github.com/ipfs/go-merkledag/tree/master/pb) - legacy implementation
  - [go-ipld-prime-proto](https://github.com/ipld/go-ipld-prime-proto) - read-only interface for go-merkledag/pb through [go-ipld-prime](https://github.com/ipld/go-ipld-prime)

## Serial Format

The DAG-PB IPLD serial format is described with a single protobuf:

```protobuf
message PBLink {
  // binary CID (with no multibase prefix) of the target object
  optional bytes Hash = 1;

  // UTF-8 string name
  optional string Name = 2;

  // cumulative size of target object
  optional uint64 Tsize = 3;
}

message PBNode {
  // refs to other objects
  repeated PBLink Links = 2;

  // opaque user data
  optional bytes Data = 1;
}
```

### Protobuf Strictness

DAG-PB aims to have a **canonical form** for any given set of data. Therefore, in addition to the standard Protobuf parsing rules, DAG-PB decoders should enforce additional constraints to ensure canonical forms (where possible):

1. Fields in the `PBLink` message must appear in the order as defined by the Protobuf schema above, following the field numbers. Blocks with out-of-order `PBLink` fields should be rejected.  (Note that it is common for Protobuf decoders to accept out-of-order field entries, which means the DAG-PB spec is somewhat stricter than may be seen as typical for other Protobuf-based formats.)
2. Fields in the `PBNode` message must be encoded in the order as defined by the Protobuf schema above. Note that this order does not follow the field numbers. The decoder should accept either order, as IPFS data exists in both forms.
3. Duplicate entries in the binary form are invalid; blocks with duplicate field values should be rejected. (Note that it is common for Protobuf decoders to accept repeated field values in the binary data, and interpret them as _updates_ to fields that have already been set; DAG-PB is stricter than this.)
4. Fields and wire types other than those that appear in the Protobuf schema above are invalid and blocks containing these should be rejected. (Note that it is common for Protobuf decoders to skip data in each message type that does not match the fields in the schema.)

## Logical Format

When we handle DAG-PB content at the Data Model level, we treat these objects as maps.

This layout can be expressed with [IPLD Schemas](/docs/schemas/) as:

```ipldsch
type PBNode struct {
  Links [PBLink]
  Data optional Bytes
}

type PBLink struct {
  Hash Link
  Name optional String
  Tsize optional Int
}
```

### Constraints

* The first node in a block of DAG-PB data will match the `PBNode` type.
* `Data` may be omitted or a byte array with a length of zero or more.
* `Links`:
  * must be present, even if empty; the binary form makes no distinction between an empty array and an omitted value, in the Data Model we always instantiate an array.
  * when encoding, elements must be sorted in ascending order by their `Name` values, which are compared by bytes rather than as strings *(also see [notes below regarding sorted links](#link-sorting))*.
	* `Name`s must be unique or be omitted.
* `Hash`:
  * even though `Hash` is `optional` in the Protobuf encoding, it should not be treated as optional when creating new blocks or decoding existing ones, an omitted `Hash` should be interpreted as a bad block
  * the bytes in the encoding format is interpreted as the bytes of a CID, if the bytes cannot be converted to a CID then it should be treated as a bad block.
  * the data is encoded in the binary form as a byte array, it is therefore possible for a decoder to read a correct binary form but fail to convert a `Hash` to a CID and therefore treat it as a bad block.
* When creating data, you can create maps using the standard Data Model concepts, and as long as they have exactly these fields. If additional fields are present, the DAG-PB codec will error, because there is no way to encode them.

Both the most recent [JavaScript](https://github.com/ipld/js-dag-pb) and [Go](https://github.com/ipld/go-codec-dagpb) implementations strictly expose this logical format via the Data Model and do not support alternative means of resolving paths via named links as the legacy implementations do (see below).

## Alternative (Legacy) Pathing

While the [logical format](#logical-format) implicitly describes a set of mechanisms for pathing over and through DAG-PB data in strict Data Model form, legacy implementations afford a means of resolving paths by privileging the `Name` in links.

This alternative pathing is covered here as part of this descriptive spec, but was developed independently of the Data Model and is thus not well standardized.
The alternative pathing mechanisms differ between implementations and has been removed from the newer implementations entirely.

The legacy [Go](https://github.com/ipfs/go-merkledag/tree/master/pb) and [JavaScript](https://github.com/ipld/js-ipld-dag-pb) implementations both support pathing with link names: `/<name1>/<name2>/…`.

In the legacy Go implementation, this is the only way, which implies that is is impossible to path through nodes that don't name their links. Also neither the Data section nor the Links section/metadata are accessible through paths.

In the legacy JavaScript implementation, there is an additional way to path through the data. It's based purely on the structure of object, i.e. `/Links/<index>/Hash/…`. This way you have direct access to the `Data`, `Links`, and `size` fields, e.g. `/Links/<index>/Hash/Data`.

These two ways of pathing can be combined, so you can access e.g. the `Data` field of a named link via `/<name/Data`. You can also use both approaches within a single path, e.g. `/<name1>/Links/0/Hash/Data` or `/Links/<index>/Hash/<name>/Data`. When using the DAG API in js-ipfs, then the pathing over the structure has precedence, so you won't be able to use named pathing on a named link called `Links`, you would need to use the index of the link instead.

Both the most recent [JavaScript](https://github.com/ipld/js-dag-pb) and [Go](https://github.com/ipld/go-codec-dagpb) implementations do not expose novel pathing mechanisms but adhere strictly to the IPLD Data Model as described in the above [Logical Format](#logical-format) schema.

## Zero-length blocks

The zero-length DAG-PB block is valid and will be decoded as having null `Data` and an empty `Links` array.

With a SHA2-256 multihash, the CID of this block is:

* CIDv1: `bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku`
* CIDv0: `QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n`

## Link sorting

The `Links` list in a DAG-PB encoded form must be sorted in ascending order by their `Name` values, which are compared by bytes rather than as strings *(also see [notes below regarding sorted links](#link-sorting))*. Missing or empty `Name` values are treated as empty-strings. Sorting should be stable, leaving duplicate `Name`s (or multiple missing or empty `Name` values) in their original order.

Sorting should not be applied on decode of a DAG-PB block. The order of links found within a DAG-PB block is the order in which they appear in their binary form, so traversal over those links follows that order.

Any difference in decoded form links order can impact traversals where a stable order is required.

### Link sorting in go-merkledag

Versions of the legacy [go-merkledag](https://github.com/ipfs/go-merkledag) interface to DAG-PB blocks prior to [v0.4.0](https://github.com/ipfs/go-merkledag/releases/tag/v0.4.0) applied sorting on decoded blocks when read through the [`DecodeProtobuf()`](https://pkg.go.dev/github.com/ipfs/go-merkledag#DecodeProtobuf) and [`DecodeProtobufBlock()`](https://pkg.go.dev/github.com/ipfs/go-merkledag#DecodeProtobufBlock) APIs.

Versions of go-merkledag from v0.4.0 to v0.7.0 will sort Links of deserialized blocks with unsorted Links when certain operations are performed (such as `Size()`, `RawData()` and some others).

go-merkledag v0.7.0 and later keeps unsorted the Links of deserialized blocks with unsorted Links until the node is mutated in some way, at which point the Links are automatically sorted.

See [this pull request](https://github.com/ipfs/go-merkledag/pull/87) for further details.
