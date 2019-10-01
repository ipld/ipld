# [WIP] DagPB Spec

DagPB does not support the full ["IPLD Data Model v1."](../IPLD-Data-Model-v1.md)

## Format

The DagPB IPLD format is a legacy format implemented with a single protobuf.

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
All link names in an object must either be blank or unique within the object.

## Pathing

TODO: See https://github.com/ipld/specs/issues/55
TODO: Also see https://github.com/ipfs/unixfs-v2/issues/24 (specifically: the "Revise History" option).

Neither go-ipfs nor js-ipfs agree so we have some room here because we're going to break something.

### Alternative: go-ipfs

In go-ipfs, we resolve use link names directly in paths: `/$name1/$name2/...`.
Neither the Data section nor the Links section/metadata are accessible through
paths.

It's also impossible to path through nodes that don't name their links.

### Alternative: js-ipfs

As far as I can tell, js-ipfs supports pathing both by name and by index with
paths like: `/Links/$name/Hash/...` or `/Links/$idx/Hash`.

### Alternative: Correct IPLD

Based purely on the _structure_, we should only support pathing by index. That
is, `/Links/$idx/Hash`.

### Alternative: Transform

We could implicitly transform the protobuf to some new structure in the IPLD data model.

1. If the object has no links, the "links" section is "null".
2. If the object has links with names, all links must have unique names so we can treat links as a map:

```
{
  "Data": ...,
  "Links": {
    "$name": {"target": Qm..., "size": ...}
  }
}
```

3. If the object has links without names, we can pack them into an array:

```
{
  "Data": ...,
  "Links": [
    {"target": Qm..., "size": ...}
  ]
}
```

## Canonical DagPB

Canonical DagPB must:

1. Contain only the specified protobuf fields.
2. Use standard protobuf encoding, with the following field orders:
  - PBNode: Links, Data
  - PBLink: Hash, Name, Tsize

Historical Note: The ordering (Links then Data) of the PBNode message is due to
a bug in the initial protobuf encoder that was used in the first implementation
of ipfs. Take care to maintain this ordering for full compatibility.
