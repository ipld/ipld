# [WIP] DagPB Spec

DAG-PB does not support the full ["IPLD Data Model v1."](../IPLD-Data-Model-v1.md)

## Format

The DAG-PB IPLD format is a legacy format implemented with a single protobuf.

```protobuf
// An IPFS MerkleDAG Link
message PBLink {

  // multihash of the target object
  optional bytes Hash = 1;

  // utf string name. should be unique per object
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
This is non-standard and means that the 'Tsize' attribute of a link, and
neither the 'Data' field nor the 'Links' field of the PBNode are available
through the ipld query language. 

## Link Format

In DagCBOR, links are encoded using the raw-binary (identity, NUL) multibase in a
field with a byte-string type (major type 2), with the tag 42. They are then
put in the 'Hash' field of a PBLink. All links from a DAG-PB object are
specified in the 'Links' array.

## Canonical DAG-PB

Canonical DAG-PB must:

1. Contain only the specified protobuf fields.
2. Use standard protobuf encoding, except that the 'Links' field must be before
   the 'Data' field in the encoding. This is due to a bug in the initial
   protobuf encoder that was used in the first implementation of ipfs.
3. Only use string map keys. Some implementations may not be able to
   handle non-string keys.
