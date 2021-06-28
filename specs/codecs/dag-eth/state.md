# Ethereum State Data Structures

Ethereum state is stored in four different modified merkle patricia tries (MMPTs): the transaction, receipt, state, and storage tries.
At each block there is one transaction, receipt, and state trie which are referenced by their root hashes in the block `Header`. For every contract
deployed on Ethereum there is a storage trie used to hold that contract's persistent variables, each storage trie is referenced by their root hash
in the state account object stored in the state trie leaf node corresponding to that contract's address.

## Trie Node IPLD
This is the general MMPT node IPLD schema used by all the below MMPTs (everything below
except the AccountSnapshot). The different tries are broken up and explicitly typed below in order to demonstrate the
different purposes and contents of these trie structures.

* If leaf or extension node: There will be two elements; [0] is the compact encoded partial path, [1] is val.
    * For extension nodes, val is the hash of the RLP encoding of the child node it references.
    * For leaf nodes, val is the RLP encoded value stored at that leaf.
      * For the tx trie this value is a transaction.
      * For the receipt trie this value is a receipt.
      * For the state trie this value is a state account.
      * For the storage trie this value is the value of a contract variable.
    * Partial path is the path remaining between the current path and the full path.
      * If the first nibble in the prefix byte of the key is 0, the node is an extension node with an even length key; The second nibble in the prefix byte is padding (0) and the key fits in the remaining bytes.
      * If the first nibble in the prefix byte of the key is 1, the node is an extension node with an odd length key; The second nibble in the prefix byte is actually the first nibble of the key, the rest of the key fits in the remaining bytes.
      * If the first nibble in the prefix byte of the key is 2, the node is a leaf node with an even length key; The second nibble in the prefix byte is padding (0) and the key fits in the remaining bytes.
      * If the first nibble in the prefix byte of the key is 3, the node is a leaf node with an odd length key; The second nibble in the prefix byte is actually the first nibble of the key, the rest of the key fits in the remaining bytes.
        * E.g. for a leaf node at path `ce57` that holds the state account for the address hash `ce573ced93917e658d10e2d9009470dad72b63c898d173721194a12f2ae5e190`,
      the compact encoded partial path will be `23ced93917e658d10e2d9009470dad72b63c898d173721194a12f2ae5e190`.
* If branch node: There will be 17 elements; [0] - [15] store the hashes of the RLP encodings of the child nodes at the corresponding hex character (0-f) step down a path, [16] is val.
    * If there are no further nodes down one of the branch's paths, an empty byte array is stored in the corresponding element (this is represented as a null link in the IPLD schema).
* If the RLP encoding of a node would be smaller than or equal to the hash of the RLP encoding of that leaf node (32 bytes) then
  the RLP encoding is directly included in the parent node. In practice this is only possible for storage trie leaf nodes. Branch nodes,
  extension nodes, transactions, receipts, and state accounts are always greater than 32 bytes in length.

```ipldsch
# TrieNode IPLD
# Node IPLD values are RLP encoded; node IPLD multihashes are always the KECCAK_256 hash of the RLP encoded node bytes and the codec is dependent on the type of the trie
type TrieNode union {
    | TrieBranchNode "branch"
    | TrieExtensionNode "extension"
    | TrieLeafNode "leaf"
} representation keyed


# The below are the expanded representations for the different types of TrieNodes: branch, extension, and leaf
type TrieBranchNode struct {
    Child0 nullable Child
    Child1 nullable Child
    Child2 nullable Child
    Child3 nullable Child
    Child4 nullable Child
    Child5 nullable Child
    Child6 nullable Child
    Child7 nullable Child
    Child8 nullable Child
    Child9 nullable Child
    ChildA nullable Child
    ChildB nullable Child
    ChildC nullable Child
    ChildD nullable Child
    ChildE nullable Child
    ChildF nullable Child
    Value  nullable Value
}

# Value union type used to more explicitly type the different values stored in leaf nodes in the different tries
type Value union {
    | Transaction "tx"
    | Receipt "rct"
    | Account "state"
    | Bytes "storage"
} representation keyed

// Child union type
// The type of value is a (CID) link to a TrieNode excepnt in the case where the RLP-encoding
// of the TrieNode is smaller than the hash the link is derived from (32 bytes)
// In practice this is only possible for a storage trie, where a leaf node (partial path + value) can
type Child union {
    | Link &TrieNode
    | TrieNode TrieNode
} representation kinded

type TrieExtensionNode struct {
    PartialPath Bytes
    Child Child
}

type TrieLeafNode struct {
    PartialPath Bytes
    Value       Value
}
```

## Transaction Trie IPLD
This is the IPLD schema type for transaction trie nodes.
* The IPLD block is the RLP encoded trie node: `RLP([Bytes, Bytes, ...])`.
* Leaf node keys are the RLP encoding of the transaction's index.
* Leaf node values are the RLP encoded transaction.
* CID links to a `TxTrieNode` use a KECCAK_256 multihash of the RLP encoded node and the EthTxTrie codec (0x92).
* The root node of the transaction trie is referenced in an Ethereum `Header` by the `TxRootCID`.
```ipldsch
# TxTrieNode is an IPLD block for a node in the transaction trie
type TxTrieNode TrieNode
```

## Receipt Trie IPLD
This is the IPLD schema type for receipt trie nodes.
* The IPLD block is the RLP encoded trie node: `RLP([Bytes, Bytes, ...])`.
* Leaf node keys are the RLP encoding of the receipt's index.
* Leaf node values are the RLP encoded receipt.
* CID links to a `RctTrieNode` use a KECCAK_256 multihash of the RLP encoded node and the EthTxReceiptTrie codec (0x94).
* The root node of the receipt trie is referenced in an Ethereum `Header` by the `RctRootCID`.
```ipldsch
# RctTrieNode is an IPLD block for a node in the receipt trie
type RctTrieNode TrieNode
```

## State Trie IPLD
This is the IPLD schema type for state trie nodes.
* The IPLD block is the RLP encoded trie node: `RLP([Bytes, Bytes, ...])`.
* Leaf node keys are the KECCAK_256 hash of the account address.
* Leaf node values are the RLP encoded state accounts.
* CID links to a `StateTrieNode` use a KECCAK_256 multihash of the RLP encoded node and the EthStateTrie codec (0x96).
* The root node of the state trie is referenced in an Ethereum `Header` by the `StateRootCID`.
```ipldsch
# StateTrieNode is an IPLD block for a node in the state trie
type StateTrieNode TrieNode
```

## State Account IPLD
This is the IPLD schema for a state account in the Ethereum state trie.
* The IPLD block is the RLP encoded state account: `RLP([Nonce, Balance, StorageRoot, CodeHash])`.
  * This is the object stored as the value in a leaf StateTrieNode.
* CID links to an `Account` use a KECCAK_256 multihash of the RLP encoded state account and the EthAccountSnapshot codec (0x97).
```ipldsch
# Account is the Ethereum consensus representation of accounts.
# These objects are stored in the state trie leafs.
type Account struct {
    Nonce    Uint
    Balance  Balance
    
    # CID link to the storage trie root node
    # This CID links down to all of the storage nodes that exist for this account at this block
    # This CID uses the EthStorageTrie codec (0x98)
    # If this is a contract account the multihash is a KECCAK_256 hash of the RLP encoded root storage node
    # If this is an externally controlled account, the multihash is a KECCAK_256 hash of an RLP encoded empty byte array
    StorageRootCID &StorageTrieNode
    
    # CID link to the bytecode for this account
    # This CID uses the Raw codec (0x55)
    # If this is a contract account the multihash is a KECCAK_256 hash of the contract byte code for this contract
    # If this is an externally controlled account the multihash is the KECCAK_256 hash of an empty byte array
    CodeCID &ByteCode
}

type ByteCode bytes
```

## Storage Trie IPLD
This is the IPLD schema type for storage trie nodes.

* The IPLD block is the RLP encoded trie node: `RLP([Bytes, Bytes, ...])`.
* Leaf node keys are the KECCAK_256 hash of the storage slot key.
* The value of a storage slot key is ultimately dependent on the EVM byte code compiler used.
For solidity, the most widely used compiler, the keys are generated as such:
    1) First, slot position is defined as the position a variable is declared. E.g. the first variable declared in a smart contract
   will have a slot position of `0`.
    2) For primitive data type variables- such as `string`, `int`, `bool`- their storage slot key is the 32-byte left-padded slot position.
   E.g. for an `int` declared as the first variable in a contract its slot key is equal to `0000000000000000000000000000000000000000000000000000000000000000`
   and its leaf node key is KECCAK_256(`0000000000000000000000000000000000000000000000000000000000000000`).
    3) For composite data type variables things get more complicated, e.g. for mappings each entry in the mapping is stored at a different storage leaf. The storage slot key for a specific entry in a mapping is
      calculated as the KECCAK_256 hash of the entry's key in the map + the mapping's slot position. E.g. for a mapping `mapping(address => uint)` that is declared
      as the first variable in a contract, the storage slot key for the mapping element with key `0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7` will be equal to
      KECCAK_256(`0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7` + `0000000000000000000000000000000000000000000000000000000000000000`). The leaf node key will then be equal
      to the hash of this storage slot key e.g. KECCAK_256(KECCAK_256(`0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7` + `0000000000000000000000000000000000000000000000000000000000000000`)).
    4) More information about the layout of variables in storage can be found [here](https://docs.soliditylang.org/en/v0.6.8/internals/layout_in_storage.html).
  
* Leaf node values are the RLP encoded storage values.
* CID links to a `StorageTrieNode` use a KECCAK_256 multihash of the RLP encoded node and the EthStorageTrie codec (0x98).

```ipldsch
# StorageTrieNode is an IPLD block for a node in the storage trie
# The root node of the storage trie is referenced in a Account by the StorageRootCID
type StorageTrieNode TrieNode
```

