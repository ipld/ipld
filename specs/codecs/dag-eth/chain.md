# Ethereum Chain Data Structures

This section contains the IPLD schemas for the blockchain data structures of Ethereum.
This includes: headers, uncle sets, transactions, and receipts. The state trie, storage trie,
receipt trie, and transaction trie IPLDs are described in the [state](./state.md) section. It
is important to note that traversal from header to a specific transaction or receipt requires traversal
across their respective tries beginning at the root referenced in the header. Alternatively, uncles are referenced
directly from the header by the hash of the RLP encoded list of uncles.

Recursive length prefix (RLP) encoding is used extensively as the binary encoded format for Ethereum IPLD blocks, more info on RLP encoding
can be found [here](https://eth.wiki/en/fundamentals/rlp).

The list of CID multicodec types, including the multicodec types used for Ethereum objects, can be found [here](https://github.com/multiformats/multicodec/blob/master/table.csv).

The KECCAK_256 multihash is used for all Ethereum CIDs, more info on multihashes can be found [here](https://github.com/multiformats/multihash) and more info
on the KECCAK_256 hash function can be found [here](https://csrc.nist.gov/projects/hash-functions/sha-3-project).
Note that KECCAK_256 used by Ethereum is distinguished from SHA_3 (FIPS 202), KECCAK_256 refers to the original algorithm that won the 2012 [NIST competition](https://www.nist.gov/news-events/news/2012/10/nist-selects-winner-secure-hash-algorithm-sha-3-competition).
Both KECCAK_256 and SHA_3 use the same underlying Keccak hashing algorithm but use different padding, and so their output do not match.

## Header IPLD

This is the IPLD schema for a canonical Ethereum block header.
* The IPLD block is the RLP encoded header
  * Before EIP-1559 activation: `RLP([ParentHash, UnclesHash, Coinbase, StateRoot, TxRoot, RctRoot, Bloom, Difficulty, Number, GasLimit, GasUsed, Time, Extra, MixDigest, Nonce])`.
  * After EIP-1559 activation: `RLP([ParentHash, UnclesHash, Coinbase, StateRoot, TxRoot, RctRoot, Bloom, Difficulty, Number, GasLimit, GasUsed, Time, Extra, MixDigest, Nonce, BaseFee])`.
* CID links to a `Header` use a KECCAK_256 mutlihash of the RLP encoded header and the EthHeader codec (0x90).
* Parent headers are referenced back to by their child header.
* The genesis header is unique in that it does not reference a parent header in `ParentCID`, instead it contains a reference to a `GenesisInfo`.

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
    GasUsed Uint
    Time Time
    Extra Bytes
    MixDigest Hash
    Nonce BlockNonce
    BaseFee nullable BigInt  # BaseFee is null unless the header is post-EIP-1559
}
```

## Uncles IPLD
This is the IPLD schema for a list of uncles ordered in ascending order by their block number.
* The IPLD block is the RLP encoded list of uncles: `RLP([Header, Header, ...])`.
* CID links to a `UncleList` use a KECCAK_256 multihash of the RLP encoded list and the EthHeaderList codec (0x91).
* The `Uncles` is referenced in an Ethereum `Header` by the `UnclesCID`.

```ipldsch
# Uncles contains an ordered list of Ethereum uncles (headers that have no associated body)
# This IPLD object is referenced by a CID composed of the KECCAK_256 multihash of the RLP encoded list and the EthHeaderList codec (0x91)
type Uncles [Header]
```

## Transaction IPLD
This is the IPLD schema for a canonical Ethereum transaction. It contains only the fields required for consensus.
* The IPLD block is the consensus encoding of the transaction:
  * Legacy transaction encoding: `RLP([AccountNonce, GasPrice, GasLimit, Recipient, Amount, Data, V, R, S])`.
    * The V, R, S elements of this transaction either represent a secp256k1 signature over `KECCAK_256(RLP([AccountNonce, GasPrice, GasLimit, Recipient, Amount, Data]))` OR
      over `KECCAK_256(RLP([AccountNonce, GasPrice, GasLimit, Recipient, Amount, Data, ChainID, 0, 0]))` as described by [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md).
  * Access list (EIP-2930) transaction encoding: `0x01 || RLP([ChainID, AccountNonce, GasPrice, GasLimit, Recipient, Amount, Data, AccessList, V, R, S]`.
    * The V, R, S elements of this transaction represent a secp256k1 signature over `KECCAK_256(0x01 || RLP([ChainID, AccountNonce, GasPrice, GasLimit, Recipient, Amount, Data, AccessList])`.
    * `||` is the byte/byte-array concatenation operator.
  * Dynamic fee (EIP-1559) transaction encoding: `0x02 || RLP([ChainID, AccountNonce, GasTipCap, maxFeePerGas, GasFeeCap, Recipient, Amount, Data, AccessList, V, R, S]`
    * The V, R, S elements of this transaction represent a secp256k1 signature over `KECCAK_256(0x02 || RLP([ChainID, AccountNonce, GasTipCap, maxFeePerGas, GasFeeCap, Recipient, Amount, Data, AccessList]`
* CID links to a `Transaction` use a KECCAK_256 multihash of the encoded transaction and the EthTx codec (0x93).
* `Transaction` IPLDs are not referenced directly from an `Ethereum` header but are instead linked to from within the transaction trie whose root is referenced in the `Header` by the `TxRootCID`.
```ipldsch
# Transaction contains the consensus fields of an Ethereum transaction
type Transaction struct {
    Type         TxType
    ChainID      nullable BigInt # null unless the transaction is an EIP-2930 or EIP-1559 transaction
    AccountNonce Uint
    GasPrice     nullable BigInt # null if the transaction is an EIP-1559 transaction
    GasTipCap    nullable BigInt # null unless the transaction is an EIP-1559 transaction
    GasFeeCap    nullable BigInt # null unless the transaction is an EIP-1559 transaction
    GasLimit     Uint
    Recipient    nullable Address # null recipient means the tx is a contract creation tx
    Amount       BigInt
    Data         Bytes
    AccessList   nullable AccessList # null unless the transaction is an EIP-2930 or EIP-1559 transaction
    
    # Signature values
    V            BigInt
    R            BigInt
    S            BigInt
}

// AccessList is an EIP-2930 access list.
type AccessList [AccessElement]

// AccessElement are the element type of an access list.
type AccessElement struct {
    Address     Address
    StorageKeys StorageKeys
}

// StorageKeys are the keys contained in an AccessElement
type StorageKeys [Hash]
```

## Receipt IPLD
This is the IPLD schema for a canonical Ethereum receipt. It contains only the fields required for consensus.
* The IPLD block is the consensus encoding of the receipt:
  * Legacy receipt encoding: `RLP([PostStateOrStatus, CumulativeGasUsed, Bloom, Logs])`.
    * Before EIP-658 (included in the Byzantium hardfork) `PostStateOrStatus` holds the PostState, a 32 byte intermediate state root hash
    * After EIP-658 `PostStateOrStatus` holds the RLP encoded Status uint64 indicating if the tx succeeded or failed (0 - failed, 1 - successful)
  * Access list (EIP-2930) receipt encoding: `0x01 || RLP([PostStateOrStatus, CumulativeGasUsed, Bloom, Logs])`.
    * `||` is the byte/byte-array concatenation operator.
  * Dynamic fee (EIP-1559) receipt encoding: `0x02 || RLP([PostStateOrStatus, CumulativeGasUsed, Bloom, Logs])`
* CID links to a `Receipt` use a KECCAK_256 multihash of the encoded receipt and the EthTxReceipt codec (0x95).
* `Receipt` IPLDs are not referenced directly from an `Ethereum` header but are instead linked to from within the receipt trie whose root is referenced in the `Header` by the `RctRootCID`.
```ipldsch
# Receipt contains the consensus fields of an Ethereum receipt
type Receipt struct {
    Type              TxType
    PostState         nullable Hash
    PostStatus        nullable Status
    CumulativeGasUsed Uint
    Bloom             Bloom
    Logs              [Log]
}

# Status is an enum indicating whether or not the application of a tx was successful
type Status enum {
    | Failed  ("0")
    | Successful   ("1")
} representation int

# Logs is a list of logs
type Logs [Log]

# Log contains the consensus fields of an Etherem receipt log
type Log struct {
    Address Address
    Topics  [Hash]
    Data    Bytes
}

# Topics is a list of log topics
type Topics [Hash]
```
