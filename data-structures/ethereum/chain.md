# Ethereum Chain Data Structures
This section contains the IPLD schemas for the blockchain data structures of Ethereum.
This includes: headers, uncle sets, transactions, and receipts. The state trie, storage trie,
receipt trie, and transaction trie IPLDs are described in the [state](state.md) section. It
is important to note that traversal from header to a specific transaction or receipt requires traversal
across their respective tries beginning at the root referenced in the header. Alternatively, uncles are referenced
directly from the header by the hash of the RLP encoded list of uncles.

## Genesis IPLD
There is a single block at the base of the entire chain with this layout. It is
the only structure that uses an actual Map at the representation level (other
structs use the `tuple` representation which encodes them as Lists). It is
encoded with DAG-CBOR with a KECCAK-256 which gives the CID:
`to-be-added`.

This block is not referenced as height `0` as this is reserved for the first
`Header` block which carries the initial state (see below).
```ipldsch
# Genesis specifies the header fields, state of a genesis block. It also defines hard
# fork switch-over blocks through the chain configuration.
# NOTE: we need a new multicodec type for the Genesis object
type Genesis struct {
    Config     ChainConfig
    Nonce      Uint
    Timestamp  Uint
    ExtraData  Bytes
    GasLimit   Unit
    Difficulty BigInt
    Mixhash    Hash
    Coinbase   Address
    Alloc      GenesisAlloc
    
    # These fields are used for consensus tests. Please don't use them
    # in actual genesis blocks.
    Number     Uint
    GasUsed    Uint
    ParentHash Hash
}

# GenesisAlloc is a map that specifies the initial state that is part of the genesis block.
type GenesisAlloc {Address:GenesisAccount}

# GenesisAccount is an account in the state of the genesis block.
type GenesisAccount struct {
    Code       Bytes
    Storage    {Hash:Hash}
    Balance    BigInt
    Nonce      Uint
    PrivateKey Bytes
}

# ChainConfig is the core config which determines the blockchain settings.
# ChainConfig is stored in the database on a per block basis. This means
# that any network, identified by its genesis block, can have its own
# set of configuration options.
type ChainConfig struct {
    ChainID BigInt
    HomesteadBlock BigInt
    DAOForkBlock   BigInt
    DAOForkSupport Bool
    EIP150Block BigInt
    EIP150Hash  Hash
    EIP155Block BigInt
    EIP158Block BigInt
    ByzantiumBlock      BigInt
    ConstantinopleBlock BigInt
    PetersburgBlock     BigInt
    IstanbulBlock       BigInt
    MuirGlacierBlock    BigInt
    YoloV2Block BigInt
    EWASMBlock  BigInt
	
    # Various consensus engines
    Ethash EthashConfig
    Clique CliqueConfig
} representation tuple

# EthashConfig is the consensus engine config for proof-of-work based sealing.
type EthashConfig struct {} representation tuple

# CliqueConfig is the consensus engine config for proof-of-authority based sealing.
type CliqueConfig struct {
    Period Uint
    Epoch Uint
} representation tuple
```

## Header IPLD
`ParentReference` is the type for linking to the parent `Header`. It is
important to note that its type hint, of referring to a parent `Header` block,
does not hold true at chain height **`0`**. At this height the header's `ParentReference`
contains a CID referring to the `Genesis` used to generate that first (genesis) block.
```ipldsch
# Header contains the consensus fields of an Ethereum block header
type Header struct {
    # Hash of the parent header
    # From this hash we can derive the CID for the parent header, and in this manner
    # link backwards to all of the previous blocks
    ParentHash ParentReference
    
    # Hash of the rlp encoded list of uncles
    # From this hash we can derive the CID for the list of the uncles, and in this manner
    # link to all of the uncles contained in this block
    UnclesHash &Uncles
    Coinbase Address
    
    # State root hash, references the root node of the state trie
    # From this hash we can derive the CID for the root of the state trie, and in this manner
    # link down to all of the state and storage nodes that exist at this block
    StateRootHash &StateTrieNode
    
    # Tx root hash, references the root node of the tx trie
    # From this hash we can derive the CID for the root of the tx trie, and in this manner
    # link down to all of the transactions and transaction traces contained in this block
    TxRootHash &TxTrieNode
    
    # Receipt root hash, references the root node of the receipt trie
    # From this hash we can derive the CID for the root of the receipt trie, and in this manner
    # link down to all of the receipts contained in this block
    RctRootHash &ReceiptTrieNode
    
    Bloom Bloom
    Difficulty BigInt
    Number BigInt
    GasLimit Uint
    GasUser Uint
    Time Uint
    Extra Bytes
    MixDigest Hash
    Nonce BlockNonce
} representation tuple

# ParentReference links to the parent header
# See note above about the single case where this type hint does not hold true.
type ParentReference &Header
```

## Uncles IPLD
```ipldsch
# Uncles contains a list of Ethereum uncles
# It is referenced by the KECCAK-256 hash of the RLP encoded list of uncles
# The hash of this list is the UncleHash in the header
# NOTE: we need a new multicodec for rlp encoded list of uncles
type Uncles [Header]
```

## Transaction IPLD
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
    V            BigInt
    R            BigInt
    S            BigInt
} representation tuple
```

## Receipt IPLD
```ipldsch
# Receipt contains the consensus fields of an Ethereum receipt
type Receipt struct {
    PostStateOrStatus Bytes
    CumulativeGasUsed Uint
    Bloom             Bloom
    Logs              [Log]
} representation tuple

# Log contains the consensus fields of an Etherem receipt log
type Log struct {
    Address Address
    Topics  [Hash]
    Data    Bytes
} representation tuple
```

# Experimental/Proposed IPLDs
There are experimental and proposed Ethereum IPLD data structures, they necessarily break from either the canonicity of Ethereum and/or IPLD.

## Transaction Trace IPLD
```ipldsch
# TxTrace contains the EVM context, input, and output for each OPCODE in a transaction
# NOTE: we need a new multicodec for tx frame
# The problem is, we want to be able to reference to this from the corresponding transaction's multihash by simply
# appending it with a different multicodec, but that would mean the multihash is not the hash of the TxTrace content but
# rather of the corresponding transaction- which breaks IPLD convention.
type TxTrace struct {
    Result Bytes
    Frames [Frame]
    Gas Uint
    Failed Bool
} representation tuple

# Frame represents the EVM context, input, and output for a specific OPCODE during a transaction trace
type Frame struct {
    Op     OpCode
    From   Address
    To     Address
    Input  Bytes
    Output Bytes
    Gas    Uint
    Cost   Uint
    Value  BigInt
} representation tuple
```

## Block IPLD
```ipldsch
# Block represents an entire block in the Ethereum blockchain.
# NOTE: only proposed; we may want a new multicodec for the full block object (so that we don't have to traverse the
# receipt and transaction tries to collect all of the associated receipts and transactions)
# The problem is, we want to be able to reference to this from the corresponding header's multihash by simply
# appending it with a different multicodec, but that would mean the multihash is not the hash of the Block content but
# rather of the corresponding header- which breaks IPLD convention.
type Block struct {
    Header       &Header
    Uncles       &Uncles
    Transactions &Transactions
    Receipts     &Receipts
} representation tuple
```

## Transactions IPLD
```ipldsch
# Transactions contains a list of references to Ethereum transactions
# It is referenced by the KECCAK-256 hash of the RLP encoded list of transactions
# This would be analogous to how uncles are linked from the header
type Transactions [&Transaction]
```

## Receipts IPLD
```ipldsch
# Receipts contains a list of references to Ethereum receipts
# It is referenced by the KECCAK-256 hash of the RLP encoded list of receipts
# This would be analogous to how uncles are linked fromm the header
type Receipts [&Receipt]
```
