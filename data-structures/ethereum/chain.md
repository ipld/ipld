# Ethereum Chain Data Structures
This section contains the IPLD schemas for the blockchain data structures of Ethereum.
This includes: headers, uncle sets, transactions, and receipts. The state trie, storage trie,
receipt trie, and transaction trie IPLDs are described in the [state](state.md) section. It
is important to note that traversal from header to a specific transaction or receipt requires traversal
across their respective tries beginning at the root referenced in the header. Alternatively, uncles are referenced
directly from the header by the hash of the RLP encoded list of uncles.

## Header IPLD
The `Header` IPLD represents a canonical Ethereum header.

```ipldsch
# Header contains the consensus fields of an Ethereum block header
type Header struct {
    # CID link to the parent header
    #
    ParentCID &Header
    
    # Hash of the rlp encoded list of uncles
    # From this hash we can derive the CID for the list of the uncles, and in this manner
    # link to all of the uncles contained in this block
    UnclesCID &Uncles
    Coinbase Address
    
    # State root hash, references the root node of the state trie
    # From this hash we can derive the CID for the root of the state trie, and in this manner
    # link down to all of the state and storage nodes that exist at this block
    StateRootCID &StateTrieNode
    
    # Tx root hash, references the root node of the tx trie
    # From this hash we can derive the CID for the root of the tx trie, and in this manner
    # link down to all of the transactions and transaction traces contained in this block
    TxRootCID &TxTrieNode
    
    # Receipt root hash, references the root node of the receipt trie
    # From this hash we can derive the CID for the root of the receipt trie, and in this manner
    # link down to all of the receipts contained in this block
    RctRootCID &RctTrieNode
    
    Bloom Bloom
    Difficulty BigInt
    Number BigInt
    GasLimit Uint
    GasUser Uint
    Time Uint
    Extra Bytes
    MixDigest Hash
    Nonce BlockNonce
}
```

## Uncles IPLD
The `Uncles` IPLD represents the ordered list of uncles for a given block. It is referenced by the KECCAK_256 hash of the
RLP encoded list which is present as the `UnclesHash` in the Ethereum `Header`.
```ipldsch
# Uncles contains a list of Ethereum uncles
# It is referenced by the KECCAK-256 hash of the RLP encoded list of uncles
# The hash of this list is the UncleHash in the header
# NOTE: we need a new multicodec for rlp encoded list of uncles
type Uncles [Header]
```

## Transaction IPLD
The `Transaction` IPLD represents the consensus fields of a canonical Ethereum transaction. This will need to be updated once
EIP-1559 is approved. `Transaction` IPLDs are not referenced directly from an `Ethereum` header but are instead
be linked to from within the transaction trie whose root is referenced in the `Header`.
```ipldsch
# Transaction contains the consensus fields of an Ethereum transaction
type Transaction struct {
    AccountNonce Uint
    Price        BigInt
    GasLimit     Uint
    Recipient    nullable Address
    Amount       BigInt
    Payload      Bytes
    
    # Signature values
    # These are the same Signature values described in crypto_types.md
    # But, confusingly, when packed into the RLP encoded transaction they are ordered [V || R || S] rather than [R || S || V]
    V            BigInt
    R            BigInt
    S            BigInt
}
```

## Receipt IPLD
The `Receipt` IPLD represents the consensus fields of a canonical Ethereum receipt.
`Receipt` IPLDs are not referenced directly from an `Ethereum` header but are instead
be linked to from within the receipt trie whose root is referenced in the `Header`.
```ipldsch
# Receipt contains the consensus fields of an Ethereum receipt
type Receipt struct {
    PostStateOrStatus Bytes
    CumulativeGasUsed Uint
    Bloom             Bloom
    Logs              [Log]
}

# Log contains the consensus fields of an Etherem receipt log
type Log struct {
    Address Address
    Topics  [Hash]
    Data    Bytes
}
```
