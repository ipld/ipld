# DagPB Spec

**Status: Descriptive - Draft**

DagPB does not support the full ["IPLD Data Model."](../../data-model-layer/data-model.md)

## Format

The DagPB IPLD format is a format implemented with a single protobuf.

```protobuf
// An IPFS MerkleDAG Link
message PBLink {

  // binary CID (with no multibase prefix) of the target object
  optional bytes Hash = 1;

  // UTF-8 string name.
  optional string Name = 2;

  // cumulative size of target object
  optional uint64 Tsize = 3;
}

// An IPFS MerkleDAG Node
message PBNode {

  // refs to other objects
  repeated PBLink Links = 2;

  // opaque user data
  optional bytes Data = 1;
}
```

The objects link names are specified in the 'Name' field of the PBLink object.
All link names in an object must either be omitted or unique within the object.

## Pathing

The pathing is currently different between implementations. Please see [issue #55] for more information about the harmonization effort. This section describes the current implementations as of September 2019.

The Go and JavaScript implementation both support pathing with link names: `/<name1>/<name2>/…`.

In Go, this is the only way, which implies that is is impossible to path through nodes that don't name their links. Also neither the Data section nor the Links section/metadata are accessible through paths.

In the JavaScript implementation, there is an additional way to path through the data. It's based purely on the structure of object, i.e. `/Links/<index>/Hash/…`. This way you have direct access to the `Data`, `Links`, and `size` fields, e.g. `/Links/<index>/Hash/Data`.

These two ways of pathing can be combined, so you can access e.g. the `Data` field of a named link via `/<name/Data`. You can also use both approaches within a single path, e.g. `/<name1>/Links/0/Hash/Data` or `/Links/<index>/Hash/<name>/Data`. When using the DAG API in js-ipfs, then the pathing over the structure has precedence, so you won't be able to use named pathing on a named link called `Links`, you would need to use the index of the link instead.


## Canonical DagPB

Canonical DagPB must:

1. Contain only the specified protobuf fields.
2. Use standard protobuf encoding, with the following field orders:
  - PBNode: Links, Data
  - PBLink: Hash, Name, Tsize

Historical Note: The ordering (Links then Data) of the PBNode message is due to
a bug in the initial protobuf encoder that was used in the first implementation
of ipfs. Take care to maintain this ordering for full compatibility.

[issue #55]: https://github.com/ipld/specs/issues/55
