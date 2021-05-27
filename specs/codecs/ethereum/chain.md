# Ethereum Chain Data Structures

This section contains the IPLD schemas for the blockchain data structures of Ethereum.
This includes: headers, uncle sets, transactions, and receipts. The state trie, storage trie,
receipt trie, and transaction trie IPLDs are described in the [state](../state/) section. It
is important to note that traversal from header to a specific transaction or receipt requires traversal
across their respective tries beginning at the root referenced in the header. Alternatively, uncles are referenced
directly from the header by the hash of the RLP encoded list of uncles.

## Header IPLD

This is the IPLD schema for a canonical Ethereum block header.
* The IPLD block is the RLP encoded header
* Links to headers use a KECCAK_256 mutlihash of the RLP encoded header and the EthHeader codec (0x90).
* Parent headers are referenced back to by their child header.
* The genesis header is unique in that it does not reference a parent header in `ParentCID`, instead it contains a reference to a `GenesisInfo` ADL.

```ipldsch
# Header contains the consensus fields of an Ethereum block header
type Header struct {
    # CID link to the parent header
    # This CID is composed of the KECCAK_256 multihash of the linked RLP encoded header and the EthHeader codec (0x90)
    ParentCID &Header
    
    # CID link to the list of uncles at this block
    # This CID is composed of the KECCAK_256 multihash of the RLP encoded list of Uncles and the EthHeaderList codec (0x91)
    # Note that an uncle is simply a header that does not have an associated body
    UnclesCID &Uncles
    Coinbase Address
    
    # CID link to the root node of the state trie
    # This CID is composed of the KECCAK_256 multhash of the RLP encoded state trie root node and the EthStateTrie codec (0x96)
    # This steps us down into the state trie, from which we can link to the rest of the state trie nodes and all the linked storage tries
    StateRootCID &StateTrieNode
    
    # CID link to the root node of the transaction trie
    # This CID is composed of the KECCAK_256 multihash of the RLP encoded tx trie root node and the EthTxReceiptTrie codec (0x92)
    # This steps us down into the transaction trie, from which we can link to the rest of the tx trie nodes and all of the linked transactions
    TxRootCID &TxTrieNode
    
    # CID link to the root of the receipt trie
    # This CID is composed of the KECCAK_256 multihash of the RLP encoded rct trie root node and the EthTxReceiptTrie codec (0x94)
    # This steps us down into the receipt trie, from which we can link to the rest of the rct trie nodes and all of the linked receipts
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
This is the IPLD schema for a list of uncles ordered in ascending order by their block number.
* The IPLD block is the RLP encoded list of uncles
* CID links to `UncleList` use a KECCAK_256 multihash of the RLP encoded list and the EthHeaderList codec (0x92).
* The `Uncles` is referenced in an Ethereum `Header` by the `UnclesCID`.

```ipldsch
# Uncles contains an ordered list of Ethereum uncles (headers that have no associated body)
# This IPLD object is referenced by a CID composed of the KECCAK_256 multihash of the RLP encoded list and the EthHeaderList codec (0x91)
type Uncles [Header]
```

## Transaction IPLD
This is the IPLD schema for a canonical Ethereum transaction. It contains only the fields required for consensus.
Note that this will need to be updated once EIP-1559 and EIP-2718 are approved.
* The IPLD block is the RLP encoded transaction
* CID links to `Transaction` use a KECCAK_256 multihash of the RLP encoded transaction and the EthTx codec (0x93).
* `Transaction` IPLDs are not referenced directly from an `Ethereum` header but are instead linked to from within the transaction trie whose root is referenced in the `Header` by the `TxRootCID`.
```ipldsch
# Transaction contains the consensus fields of an Ethereum transaction
type Transaction struct {
    AccountNonce Uint
    Price        BigInt
    GasLimit     Uint
    Recipient    nullable Address # null recipient means the tx is a contract creation
    Amount       BigInt
    Payload      Bytes
    
    # Signature values
    V            BigInt
    R            BigInt
    S            BigInt
}
```

## Receipt IPLD
This is the IPLD schema for a canonical Ethereum receipt. It contains only the fields required for consensus.
* The IPLD block is the RLP encoded receipt
* CID links to `Receipt` use a KECCAK_256 multihash of the RLP encoded receipt and the EthTxReceipt codec (0x95).
* `Receipt` IPLDs are not referenced directly from an `Ethereum` header but are instead linked to from within the receipt trie whose root is referenced in the `Header` by the `RctRootCID`.
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
