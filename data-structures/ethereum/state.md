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
    * For extension nodes, val is the hash of the child node it references
    * For leaf nodes, val is the rlp encoded value stored at that leaf
    * Partial path is the path remaining between the current path and the full path.
      * If the first nibble in the prefix byte of the key is 0, the node is an extension node with an even length key; The second nibble in the prefix byte is padding (0) and the key fits in the remaining bytes
      * If the first nibble in the prefix byte of the key is 1, the node is an extension node with an odd length key; The second nibble in the prefix byte is actually the first nibble of the key, the rest of the key fits in the remaining bytes
      * If the first nibble in the prefix byte of the key is 2, the node is a leaf node with an even length key; The second nibble in the prefix byte is padding (0) and the key fits in the remaining bytes
      * If the first nibble in the prefix byte of the key is 3, the node is a leaf node with an odd length key; The second nibble in the prefix byte is actually the first nibble of the key, the rest of the key fits in the remaining bytes
        * E.g. for a leaf node at path `ce57` that holds the state account for the address hash `ce573ced93917e658d10e2d9009470dad72b63c898d173721194a12f2ae5e190`,
      the compact encoded partial path will be `23ced93917e658d10e2d9009470dad72b63c898d173721194a12f2ae5e190`
* If branch node: There will be 17 elements; [0] - [15] store the hashes of the child nodes at the next hex character (0-f) step down a path, [16] is val.
    * If there are no further nodes down one of the branch's paths, an empty byte array is stored in the corresponding element.


IMPORTANT NOTE: if the value stored at a leaf node would be smaller than or equal to the length of the hash of that leaf node (<= 32 bytes) then
the value is directly included in the parent branch or extension node rather than the parent node referencing the entire leaf node by hash.
In this case the child is a one element list of bytes where that one element is the RLP encoded value itself. In practice this is only possible for
the storage trie, as RLP encoded transactions, receipts, and state accounts are always greater than 32 bytes in length.

NOTE TO SELF: (remove this later); can a branch node ever contain a value in the 17th position? In practice values are always stored with a key of length 32,
and no node can have a key longer than 32 bytes, so if a node contains a value it *must* be at the bottom of the trie and therefore cannot branch
out to any children nodes.

NOTE TO SELF: (remove this later); can we use ADT to represent different trie types and their contents?
NOTE TO SELF: (remove this later); can we use a union type for the `TrieNode` so that we can more explicity define the different kinds
(leaf, extension, branch) of trie nodes?

```ipldsch
# TrieNode IPLD struct
# Node IPLD values are RLP encoded; node IPLD multihashes are the KECCAK-256 hash of the RLP encoded bytes
type TrieNode struct {
    Elements [Bytes]
} representation tuple
```

## Maybe make TrieNode a union type of 3 different node types

## Transaction Trie IPLD
This is the IPLD schema type for transaction trie nodes.

Leaf node keys are the txid (KECCAK-256 hash of the transaction).

Leaf node values are the RLP encoded transaction.
```ipldsch
# TxTrieNode is an IPLD block for a node in the transaction trie
# The root node of the transaction trie is referenced in the Header by the TxRootHash

type TxTrieNode TrieNode
```

## Receipt Trie IPLD
This is the IPLD schema type for receipt trie nodes.
Leaf node keys are the KECCAK-256 hash of the corresponding transaction's index.
Leaf node values are the RLP encoded receipt.
```ipldsch
# RctTrieNode is an IPLD block for a node in the receipt trie
# The root node of the receipt trie is referenced in the Header by the RctRootHash
type RctTrieNode TrieNode
```

## State Trie IPLD
This is the IPLD schema type for state trie nodes.

Leaf node keys are the KECCAK-256 hash of the account address.

Leaf node values are the RLP encoded state accounts.
```ipldsch
# StateTrieNode is an IPLD block for a node in the state trie
# The root node of the state trie is referenced in the Header by the StateRootHash
type StateTrieNode TrieNode
```

## State Account IPLD
This is the IPLD schema for a state account in the Ethereum state trie.

This is the same RLP encoded object stored as the value in a StateTrieNode leaf.
```ipldsch
# Account is the Ethereum consensus representation of accounts.
# These objects are stored in the state trie leafs.
type StateAccount struct {
    Nonce    Uint
    Balance  BigInt
    # Storage root hash, references the root node of the storage trie
    # From this hash we can derive the CID for the root of the storage trie, and in this manner
    # link down to all of the storage nodes that exist for this account at this block
    StorageRootHash &StorageTrieNode
    CodeHash Bytes
} representation tuple
```

## Storage Trie IPLD
This is the IPLD schema type for storage trie nodes.

Leaf node keys are the KECCAK-256 hash of the storage slot key.
The value of a storage slot key is ultimately dependent on the EVM byte code compiler used.
For solidity, the most widely used compiler, the keys are generated as such:
1) First, slot position is defined as the position a variable is declared. E.g. the first variable declared in a smart contract
   will have a slot position of `0`
2) For primitive data type variables- such as `string`, `int`, `bool`- their storage slot key is the 32-byte left-padded slot position.
   E.g. for an `int` declared as the first variable in a contract its slot key is equal to `0000000000000000000000000000000000000000000000000000000000000000`
   and its leaf node key is KECCAK_256(`0000000000000000000000000000000000000000000000000000000000000000`)
3) For composite data type variables things get more complicated:
    * For mappings, each entry in the mapping is stored at a different storage leaf. The storage slot key for a specific entry in a mapping is
      calculated as the KECCAK_256 hash of the entry's key in the map + the mapping's slot position. E.g. for a mapping `mapping(address => uint)` that is declared
      as the first variable in a contract, the storage slot key for the mapping element with key `0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7` will be equal to
      KECCAK_256(`0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7` + `0000000000000000000000000000000000000000000000000000000000000000`). The leaf node key will then be equal
      to the hash of this storage slot key e.g. KECCAK_256(KECCAK_256(`0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7` + `0000000000000000000000000000000000000000000000000000000000000000`))
  
Leaf node values are the RLP encoded storage values.
```ipldsch
# StorageTrieNode is an IPLD block for a node in the storage trie
# The root node of the storage trie is referenced in an StateAccount by the StorageRootHash
type StorageTrieNode TrieNode
```

