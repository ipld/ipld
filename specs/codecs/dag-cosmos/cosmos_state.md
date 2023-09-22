# Cosmos State Machine Data Structures
CosmosSDK is an SDK for building state machines that conform to the ABCI/ABCI++ and use Tendermint as their consensus layer.
For more information of CosmosSDK, see the documentation [here](https://github.com/cosmos/cosmos-sdk/tree/main/docs).

The Tendermint blockchain does not impose any constraints on the data structure(s) of the underlying state machine.
It only requires that the data structure is Merkleized into a hash that is returned to be stored in the `AppHash` field of the Tendermint `Header`.
The Cosmos SDK currently uses an Immutable AVL+ ([IAVL](https://github.com/cosmos/iavl)) tree for state commitment and storage.
In the [near future](https://github.com/cosmos/cosmos-sdk/blob/master/docs/architecture/adr-040-storage-and-smt-state-commitments.md)
this will be transitioned to using a Sparse Merkle Tree ([SMT](https://github.com/lazyledger/smt])) for state commitments.

For both SMT and IAVL the values stored in or referenced from these data structures are either amino (legacy support only) or protobuf encoded.
This also is not strictly enforced but is heavily prescribed by the SDK. In the below schemas we support rich typing for only protobuf encoded
objects using the scheme described in [typed_protobuf.md](../typed_protobuf).

## App State
```ipldsch
# AppStateTreeCID is a CID link to the state root returned by the state machine after executing and committing the previous block
# It serves as the basis for validating any Merkle proofs that comes from the ABCI application and represents the state of the actual application rather than the state of the blockchain itself.
# The nature of the hash is determined by the application, Tendermint can not perform validation on it
# For cosmos applications this CID is composed of the SHA_256 multihash of the root node in either an IAVL tree or SMT, using their repspective codecs (tbd)
type AppStateTreeCID &AppStateRootNode

# AppStateNodeCID is a CID link to any IAVL or SMT node in the Tendermint/Cosmos AppState
type AppStateNodeCID &AppStateNode

# AppStateNode represents a tree node in the Tendermint/Cosmos AppState
type AppStateNode union {
  | IAVLNode "iavl"
  | SMTNode "smt"
} representation keyed

# AppStateRootNode represents the root node in Tendermint/Cosmos AppState
# This is simply an alias for AppStateNode that explicitly types the node as the root of the tree
type AppStateRootNode union {
 | IAVLRootNode "iavl"
 | SMTRootNode "smt"
}
```

## FileDescriptorProto enriched SMT and IAVL IPLDs
Below we propose an approach and outline the IPLD schemas for enriching SMT and IAVL leaf node IPLDs with type information for the
encoded protobuf values stored in (IAVL) or referenced from (SMT) nodes. This approach is dependent on the protobuf typing scheme
described in [typed_protobuf.md](../typed_protobuf).

### Typed Protobuf IAVL Node
* The hash of an inner node is `SHA_256(height || size || version || left_hash || right_hash)`.
* The hash of a leaf node is `SHA_256(height || size || version || key || value)`
    * The entire protobuf encoded values are stored in the leaf nodes.
    * Keys are the unhashed keys for the protobuf encoded values

```ipldsch
# IAVLNode is the union type for representing any node in an IAVL
type IAVLNode union {
    | IAVLInnerNode "inner"
    | IAVLLeafNode "leaf"
} representation keyed

# IAVLRootNode is an alias for the top-most node in an IAVL; the root node of the tree.
# It can be a leaf node if there is only one value in the tree
type IAVLRootNode IAVLNode

# IAVLInnerNode represents an inner node in an IAVL Tree.
type IAVLInnerNode struct {
    Left      nullable IAVLNodeCID
    Right     nullable IAVLNodeCID
    Version   Int
    Size      Int
    Height    Int
}

# IAVLValue is a union type for representing either an amino or protobuf encoded value in an IAVL leaf node
type IAVLValue union {
    | Bytes "amino" # Binary for an amino encoded value stored in an IAVL leaf node
    | TypedProtobuf "proto" # TypedProtobuf IPLD representation of a protobuf encoded value stored in an IAVL leaf node
} representation keyed

# IAVLLeafNode represents a leaf node in an IAVL Tree.
# When calculating the multihash of this object, if the Value is of type TypedProtobuf then only the ProtoMessageBytes should be hashed
type IAVLLeafNode struct {
    Key       Bytes
    Value     IAVLValue
    Version   Int
    Size      Int
    Height    Int
}

# IAVLNodeCID is a CID link to an IAVLNode
# This CID is composed of the SHA_256 multihash of the IAVL node and the IAVL codec (tbd)
type IAVLNodeCID &IAVLNode
```


### Typed Protobuf SMT Node
This SMT follows the Jellyfish Merkle Tree ([JMT](https://diem-developers-components.netlify.app/papers/jellyfish-merkle-tree/2021-01-14.pdf))
specification outlined in the Libra whitepaper.
* The hash of an inner node is `SHA_256(0x01 || left_hash || right_hash)`.
* The hash of a leaf node is `SHA_256(0x00 || path || leaf_value)`.
    * The leaf_value is the `SHA_256(key, value)`.
    * The path is the `SHA_256(key)`.
    * `value` is a protobuf encoded value and `key` is the key for this value in its separate state storage kvstore.
```ipldsch
# SMTNode is the union type for representing any node in an SMT
type SMTNode union {
    | SMTInnerNode "inner"
    | SMTLeafNode "leaf"
} representation keyed

# SMTRootNode is the top-most node in an SMT; the root node of the tree.
# It can be a leaf node if there is only one value in the tree
type SMTRootNode SMTNode

# SMTInnerNode contains two byte arrays which contain the hashes which link its two child nodes.
type SMTInnerNode struct {
    Left nullable SMTNodeCID
    Right nullable SMTNodeCID
}

# SMTValue is a union type for representing either an amino or protobuf encoded value in an SMT leaf node
type SMTValue union {
    | Hash "amino" # Hash for an amino encoded value referenced from an SMT leaf node, we don't attempt to content type Amino values
    | TypedProtobufCID "proto" # Link to the TypedProtobuf IPLD representation of a protobuf encoded value referenced from an SMT leaf node
} representation keyed

# SMTLeafNode contains two byte arrays which contain path and value
type SMTLeafNode struct {
    Path  Hash # This is hash(key)
    Value SMTValue
}

# SMTNodeCID is a CID link to an SMTNode
# This CID is composed of the SHA_256 multihash of the SMT node and the SMT codec (tbd)
type SMTNodeCID &SMTNode
```
