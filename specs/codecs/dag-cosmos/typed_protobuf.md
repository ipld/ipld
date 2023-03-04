# Rich typing of protobuf objects in IPLD
Any proto message type can be described using a set of
[FileDescriptorProto](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto#L62)
messages which contains all information required to recreate the .proto message definition. In protobuf these are used for
the [gRPC server reflection protocol](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md#grpc-server-reflection-protocol)
as well as for creating [self-describing messages](https://developers.google.com/protocol-buffers/docs/techniques?authuser=2#self-description).

Similarly, we propose to leverage `FileDescriptorProto` message sets in the context of IPLD to provide rich typing for arbitrary
protobuf messages stored in on IPFS or Filecoin. To this end, we can prepend the block binary for a protobuf encoded
object with a content hash reference to a set of `FileDescriptorProto`s that describe how to type that content in any
programming language that has a .proto compiler.

We avoid storing and referencing .proto files directly in order to avoid the additional dimensions of entropy that introduces,
namely the variability in whitespace and ordering between and within message definitions. These differences can cause .proto files
for the same type definitions to produce different, redundant block binaries.

There exists a [FileDescriptorSet](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto#L57),
but this type includes a list of full `FileDescriptorProto`s. In order to minimize duplicity of data in the graph, we introduce
a new IPLD representation of a `FileDescriptorSet` which instead consists of a list of links to individual `FileDescriptorProto`
objects.

In this scheme we reserve three multicodec type byte prefixes:
1. `FileDescriptorProto` protobuf serialization: multi-content type that stipulates that the referenced block binary is a 
protobuf encoded `FileDescriptorProto` message.
2. `FileDescriptorSet` IPLD object: multi-content type that stipulates that the referenced block binary is for an IPLD object
which consists of a list of CIDs that reference `FileDescriptorProto` blocks.
3. `TypedProtobuf` IPLD object: multi-content type that stipulates the referenced binary is for an IPLD object whereby
the first element is a CID for a `FileDescriptorSet` and the second element is the protobuf encoding of a value whose
message type is described by the linked `FileDescriptorSet`.

```ipldsch
# FileDescriptorProto is the protobuf marshalled binary of a FileDescriptorProto message
# FileDescriptorProtoCID is a CID link to a FileDescriptorProto block binary
# This CID is composed of the SHA_256 multihash of the FileDescriptorProto block binary and the FileDescriptorProto codec (tbd)
type FileDescriptorProtoCID &FileDescriptorProto

# FileDescriptorSet is an IPLD object consisting of a list of CIDs that link to FileDescriptorProto message block binaries
type FileDescriptorSet [FileDescriptorProtoCID]

# FileDescriptorSetCID is a CID link to a FileDescriptorSet block binary
# This CID is composed of the SHA_256 multihash of the FileDescriptorSet IPLD block binary and the FileDescriptorSet codec (tbd)
type FileDescriptorSetCID &FileDescriptorSet

# TypedProtobuf is an IPLD object consisting of a CID link to a FileDescriptorSet
# and bytes for a protobuf encoded value whose type is described by the linked FileDescriptorSet
# When calculating the multihash of this object, only the ProtoMessageBytes should be hashed
type TypedProtobuf struct {
    DescriptorSetCID FileDescriptorSetCID
    ProtoMessageBytes Bytes
}

# TypedProtobufCID is a CID link to a TypedProtobuf block binary
# This CID is composed of the SHA2-256-Ignore32BytePrefix multihash of the TypedProtobuf IPLD block binary and the TypedProtobuf codec (tbd)
type TypedProtobufCID &TypedProtobuf
```

In order to support this scheme, we also reserve a new multicodec type byte prefix for a multihash function
that is a simple derivative of the existing `sha2-256` multihash function that ignores the first 32 bytes of the input.
This is necessary in order to preserve the native `hash => content` mapping of these content-type prefixed protobuf objects.

e.g.
```ipldsch
SHA2-256-Ignore32BytePrefix
```

The above scheme provides a mechanism to provide rich type information to arbitrary protobuf objects stored in IPFS/Filecoin
without requiring the reservation and registration of multicodec type byte prefixes for each individual type. This is
necessary to provide generic IPLD integration for the transactions and state in *any* Tendermint/Cosmos chain that abides by the below assumptions:

1. Protobuf encoding is used for the Tendermint transactions.
2. IAVL or SMT are used as the state commitment data structure for the CosmosSDK app.
3. Protobuf encoding is used for values stored in the IAVL or SMT state commitment data structures.


