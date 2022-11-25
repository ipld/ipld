---
title: "convenience_types"
weight: 24
description: "Convenience IPLD types"
---

The types described below are not referenced directly from within the canonical Ethereum merkle tree.
Instead, these types can be constructed and verified from underlying canonical Ethereum IPLD structures using the algorithms described here.
These types are introduced to improve the convenience and performance of accessing and working with the Ethereum objects for certain purposes.

## Transaction Trace IPLD

Transaction traces contain the EVM context, input, and output for each individual OPCODE operation performed during the application of a transaction on a certain state.
These objects can be generated or verified by applying the referenced transactions on top of the referenced state.
-The IPLD block is the RLP encoded object.
-CID links to `TxTrace` use a KECCAK_256 multihash of the RLP encoded object and the EthTxTrace codec (tbd).

```ipldsch
# TxTrace contains the EVM context, input, and output for each OPCODE in a transaction that was applied to a specific state
type TxTrace struct {
   # List of CIDs linking to the transactions that were used to generate this trace by applying them onto the state referenced below
   # If this trace was produced by the first transaction in a block then this list will contain only that one transaction
   # and this trace was produced by applying it directly to the referenced state
   # Otherwise, the trace is the output of the last transaction in the list applied to the state produced by
   # sequentially applying the proceeding txs to the referenced state
   TxCIDs [&Transaction]
   # CID link to the root node of the state trie that the above transaction set was applied on top of to produce this trace
   StateRootCID &StateTrieNode
   Result Bytes
   Frames [Frame]
   Gas Uint
   Failed Bool
}

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
}
```

Provided a `Header` multihash/CID and a transaction index, we can generate a `TxTrace` by

1. Fetching and decoding the `Header` IPLD.
2. Stepping down into the transaction trie referenced in the header.
   1. Collecting the transaction at the provided index and all transactions with indexes lower than the provided index.
   2. KECCAK_256 hashing each transaction.
   3. Convert hashes to CIDs using the KECCAK_256 multihash and EthTx codec.
   4. Order these CIDs in a list by transaction index.
3. Collect the `StateRootCID` from within this `Header`.
4. Use [ipfs-ethdb](https://github.com/vulcanize/ipfs-ethdb) with state root linked in the `Header` to instantiate an EVM on top
o. the ipld state of this block.
5. Apply each of the transactions on top of this state using the ipfs-ethdb based EVM.
6. For the final transaction applied, collect the trace output from the EVM.
7. Assemble the trace output, the `Transaction` CIDs, and the root `StateTrieNode` CID into the `TxTrace` object.

## Block IPLD

`Block` IPLD represents an entire block (header + body) in the Ethereum blockchain, it contains direct content hash references to
the sets of transactions and receipts for that block in order to avoid the need to traverse the transaction
and receipt tries to collect these sets (as is required when starting from a canonical `Header` block).
These objects can be generated or verified by following the links within the contained `Header` to collect the `Transactions` and `Receipts`
from the referenced transaction and receipt tries.
-The IPLD block is a DAG-CBOR serialization of the `Block` object.
-CID links to `Block` use a KECCAK_256 multihash of the DAG-CBOR serialized object and the DagCbor codec (0x71).

```ipldsch
# Block represents an entire block in the Ethereum blockchain.
type Block struct {
   # CID link to the header at this block
   # This CID is composed of the KECCAK_256 multihash of the RLP encoded header and the EthHeader codec (0x90)
   # Note that the header contains references to the uncles and tx, receipt, and state tries at this height
   Header       &Header
   # CID link to the list of transactions at this block
   # This CID is composed of the KECCAK_256 multihash of the RLP encoded list of transactions and the EthTxList codec (tbd)
   Transactions &Transactions
   # CID link to the list of receipts at this block
   # This CID is composed of the KECCAK_256 multihash of the RLP encoded list of receipts and the EthTxReceiptList codec (tbd)
   Receipts     &Receipts
}
```

Provided a `Header` multihash/CID, we can generate a `Block` IPLD by

1. Fetching and decoding the `Header` IPLD.
2. Stepping down into the transaction trie referenced in the header.
   1) Collecting each transaction stored at the leaf nodes in the trie.
   2) KECCAK_256 hashing each transaction.
   3) Order these hashes in a list by transaction index.
   4) KECCAK_256 hash the RLP encoded list.
   5) Convert to CID using the KECCAK_256 multihash and EthTxHashList codec.
3. Stepping down into the receipt trie referenced in the header.
   1) Collecting each receipt stored at the leaf nodes in the trie.
   2) KECCAK_256 hashing each receipt.
   3) Order these hashes in a list by receipt index.
   4) KECCAK_256 hash the RLP encoded list.
   5) Convert to CID using the KECCAK_256 multihash and EthTxReceiptHashList codec.
4. Assemble the `Header` CID, `Transactions` CID, and `Receipts` CID into the `Block` object.

## Transactions IPLD

This is the IPLD schema for the ordered list of all transactions for a given block.
-The IPLD block is the RLP encoded list of transactions.
-CID links to `Transactions` use a KECCAK_256 multihash of the RLP encoded list of transactions and the EthTxList codec (tbd).
-`Transactions` IPLDs are not referenced from any canonical Ethereum object, but are instead linked to from the above `Block` and `TxTrace` objects.

```ipldsch
# Transactions contains a list of all of the Ethereum transactions at this block
type Transactions [&Transaction]
```

## Receipts IPLD

This is the IPLD schema for the ordered list of all receipts for a given block.
-The IPLD block is the RLP encoded list of receipts.
-CID links to `Receipts` use a KECCAK_256 multihash of the RLP encoded list of receipts and the EthTxReceiptList codec (tbd).
-`Receipts` IPLDs are not referenced directly from any canonical Ethereum object, but are instead linked to from the above `Block` ADL object.

```ipldsch
# Receipts contains a list of all of the receipts at this block
type Receipts [Receipt]
```

## Genesis IPLD

This is the IPLD schema for the configuration settings and genesis allocations to produce a specific genesis block and begin an Ethereum
blockchain. It also includes a reference to the genesis block `Header` it produces. This is a single IPLD block at the base of an entire Ethereum chain.
-The IPLD block is a DAG-CBOR serialization of the `GenesisInfo` object.
-CID links to `GenesisInfo` use a KECCAK_256 multihash of the DAG-CBOR serialized object and the DagCbor codec (0x71).

```ipldsch
# GenesisInfo specifies the header fields, state of a genesis block, and hard fork switch-over blocks through the chain configuration.
# NOTE: we need a new multicodec type for the Genesis object
type GenesisInfo struct {
   # CID link to the genesis header this genesis info produces
   # This CID is composed of the KECCAK_256 multihash of the linked RLP encoded header and the EthHeader codec (0x90)
   GensisHeader &Header

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
# ChainConfig is stored in the database on a per block basis.
# This means that any network, identified by its genesis block, can have its own set of configuration options.
# The ChainConfig referenced in GenesisInfo is used to produce the genesis block but is not necessarily used for later blocks down the chain.
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
}

# EthashConfig is the consensus engine config for proof-of-work based sealing.
# At this time there are no configuration options for the Ethash engine.
type EthashConfig struct {} representation tuple

# CliqueConfig is the consensus engine config for proof-of-authority based sealing.
type CliqueConfig struct {
    Period Uint
    Epoch Uint
}
```
