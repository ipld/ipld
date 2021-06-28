# Cosmos State Machine Data Structures

The Tendermint blockchain does not impose any constraints on the data structure(s) of the underlying state machine.
It only requires that the data structure is Merkleized into a hash that is returned to be stored in the `AppHash` field of the `Header`.
The Cosmos SDK currently uses an Immutable AVL+ ([IAVL](https://github.com/cosmos/iavl)) tree for state commitment and storage.
In the [near future](https://github.com/cosmos/cosmos-sdk/blob/master/docs/architecture/adr-040-storage-and-smt-state-commitments.md)
this will be transitioned to using a Sparse Merkle Tree ([SMT](https://github.com/lazyledger/smt])) for state commitments.

## App State
```ipldsch
# AppStateTreeCID is a CID link to the state root returned by the state machine after executing and commiting the previous block
# It serves as the basis for validating any Merkle proofs that comes from the ABCI application and represents the state of the actual application rather than the state of the blockchain itself.
# The nature of the hash is determined by the application, Tendermint can not perform validation on it
# For cosmos applications this CID is composed of the SHA_256 multihash of the root node in either an IAVL tree or SMT, using their repspective codecs (tbd)
type AppStateReference &AppState

type AppState union {
  | IAVLNode "iavl"
  | SMTNode "smt"
} representation keyed
```

## IAVL Node
* The hash of an inner node is `SHA_256(height || size || version || left_hash || right_hash)`.
* The hash of a leaf node is `SHA_256(height || size || version || key || value)`
    * The entire protobuf/amino encoded values are stored in the leaf nodes.
    * Keys are the unhashed keys for the protobuf/amino encoded values

```ipldsch
type IAVLNode union {
    | IAVLInnerNode "inner"
    | IAVLLeafNode "leaf"
} representation keyed

# IAVLRootNode is the top-most node in an IAVL; the root node of the tree.
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

# IAVLLeafNode represents a leaf node in an IAVL Tree.
type IAVLLeafNode struct {
    Key       Bytes
    Value     Bytes
    Version   Int
    Size      Int
    Height    Int
}

# IAVLNodeCID is a CID link to an IAVLNode
# This CID is composed of the SHA_256 multihash of the IAVL node and the IAVL codec (tbd)
type IAVLNodeCID &IAVLNode
```


## SMT Node
This SMT follows the Jellyfish Merkle Tree ([JMT](https://diem-developers-components.netlify.app/papers/jellyfish-merkle-tree/2021-01-14.pdf))
specification outlined in the Libra whitepaper.
* The hash of an inner node is `SHA_256(0x01 || left_hash || right_hash)`.
* The hash of a leaf node is `SHA_256(0x00 || path || leaf_value)`.
    * The leaf_value is the `SHA_256(key, value)`.
    * The path is the `SHA_256(key)`.
    * `value` is a protobuf/amino encoded value and `key` is the key for this value in its separate state storage kvstore.
```ipldsch
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

# SMTLeafNode contains two byte arrays which contain path and value
type SMTLeafNode struct {
    Path  Hash # this is hash(key)
    Value Hash # this is the hash(key, value)
}

# SMTNodeCID is a CID link to an SMTNode
# This CID is composed of the SHA_256 multihash of the SMT node and the SMT codec (tbd)
type SMTNodeCID &SMTNode
```
