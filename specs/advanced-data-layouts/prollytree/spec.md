# IPLD Prolly Trees Specification

## Introduction

Many applications have been using IPLD to represent large datasets in use cases such as blockchains or decentralized databases.
One side effect is that querying large amounts of data has become a more common need which often gets solved with centralized database indexes.
IPLD Prolly Trees are an important step in this direction in that they provide an interface similar to a Database's B+ tree.
Some of the immediate benefits of using Prolly Trees over regular B+ Trees is that Prolly Trees are self-balancing and can be deterministically merged with other trees which is important to reduce the amount of restructuring necessary for collaborativ index creation.
In this document we will build off of prior art in [Probabilistic B-Trees](https://github.com/attic-labs/noms/blob/master/doc/intro.md#prolly-trees-probabilistic-b-trees) to define a specification on how they can be represented in IPLD, how they can be constructed, how they can be queried, and how multiple trees can be merged together.

## References

[DoltDB Architecture](https://github.com/dolthub/docs/tree/gitbook-publish/content/architecture)
The best deep dive into how the Dolt storage engine works is a series of blog posts by Aaron Son.
[How Dolt Stores Table Data](https://www.dolthub.com/blog/2020-04-01-how-dolt-stores-table-data/)

[The Dolt Commit Graph and Structural Sharing]()
https://www.dolthub.com/blog/2020-05-13-dolt-commit-graph-and-structural-sharing/)

[Efficient Diff on Prolly Trees](https://www.dolthub.com/blog/2020-06-16-efficient-diff-on-prolly-trees/)

[Cell-level Three-way Merge in Dolt](https://www.dolthub.com/blog/2020-07-15-three-way-merge/)

[Dolt Implementation Notes — Push And Pull On a Merkle DAG](https://www.dolthub.com/blog/2020-09-09-push-pull-on-a-merkle-dag/)

[mikeal/IPSQL: InterPlanetary SQL](https://github.com/mikeal/IPSQL)
[mikeal/prolly-trees: Hash consistent search trees.](https://github.com/mikeal/prolly-trees)
[mikeal/matrika: Next Generation Decentralized Database](https://github.com/mikeal/matrika)
[mikeal/ipfs-sqlite: SQL on IPFS](https://github.com/mikeal/ipfs-sqlite)

[Merkle Search Trees: Efficient State-Based CRDTs in Open Networks (Scientific Artilcle)](https://hal.inria.fr/hal-02303490)
  - [simulation](https://gitlab.inria.fr/aauvolat/mst_exp/)

## Summary/Overview

Prolly trees leverage content addressability to create ordered search indexes similar to the common B+ tree structure used for databases, but with the added ability to determenistically merge trees together.

At the highest level, Prolly Trees act as a key value store with the ability to iterate over key ranges which are lexicographically sorted. This property of sorted iteration is important for creating database indexes for a variety of use cases like full text search, sorting of large datasets, and arbitrary search queries.

### Search Tree

The basic structure is that of an ordered search tree: The contained keys are organised such that they can be found (inserted, updated, ...) efficiently by value.
To efficiently find keys, the tree is traversed top-to-bottom and the non-leaf nodes help navigating/comparing the values efficiently. An intermediate node contains several ordered key-address pairs, which link to further nodes (intermediate or leaf) on the next lower level.
Levels go from `0` representing Leaf Nodes, and go up for each level in the tree. The root of the tree will have the highest level in the tree and can give an estimate of it's overall size.
Leaf nodes contain the actual Key-Value pairs for the tree which can be iterated over as part of the overall tree iteration.

### Chunking

Chunking is the strategy of determining chunk boundaries: Given a list of key-value pairs, it 'decides' which are still inside node A and which already go to the next node B on the same level.
It depends on the hash/address/node of the items and a 'chunking factor' for tuning the shape of the tree.
This chunking factor determines the average size of nodes/chunks that a node on a higher level contains.
This average size in turn controls the shape of the tree (broad/narrow).
The shape in turn defines the performance of operations on the tree with the following tradeoffs:
  - larger blocks with more cache invalidations
  - or smaller blocks with less cache invalidations and more lookups

### Note on Multiple and Single Values and Sets

The described tree can represent a data structure with multiple, single or no values per key. However, given that IPLD Maps (which a Prolly Tree loosely maps to) only allow one value for a key, implementations should merge duplicate keys into a single value. This is also important to have consistent ordering of key value pairs.

### Rebalance

In order to modify the tree (inserting, updating, or removing one or multiple values) a part of the tree needs to be rebalanced. This section describes an internal procedure that is not exposed to the caller.
The tree is (partially) rebalance bottom-up.

Starting at the inserted/modified leaf or node referencing a now deleted/removed leaf, successively walk up the tree. If a removed item was the only item in its node: Remove the node from its parent and Check if the hash/address/CID of a new leaf/node splits the parent chunk (split the parent node if yes).
Then, check if a removed leaf/node was a 'splitting node' and the nodes need to be merged (only the last node in a chunk can be a splitting node). If splitting criterion holds for the last item of the node and there is the current node is succeeded by another node on the same level: merge the current node with the succeeding node. Continue walking up the path. If at root and it is being split: Create a new root that links to the freshly split nodes. Return the new root CID.

Pay attention to the fact that the boundary algorithm is not related to the node CID, i.e the boundary is generated *before* the node CID is generated.

### Put/Remove/Update

First search if the tree already contains the value.
If the key is not contained, create a new leaf for the value, insert the key-value (key-leaf) pair in the correct node and rebalance the tree.
If the key is already stored in the tree and the value is the same, the tree is left unchanged.
If the key exists and the values differ: Either leave the tree or insert the new value and update the tree.
If removing the key, remove the `key` and the `value` from the list. After making any modifications to the tree, run the (Rebalance)[#Rebalance] algorithm.

## Structure

```
type ProllyTree struct {
  config &ProllyTreeConfig
  root &TreeNode
} representation tuple

type TreeNode struct {
  # Is leaf when level is 0
  level Int
  keys [Bytes]
  # If a leaf, contains entry valies
  # If an intermediate node, contains Links to further TreeNodes
  values [Any]
} representation tuple

type HashThresholdConfig struct {
  chunkingFactor Int
  hashFunction Int
} representation tuple

type ChunkingStrategy union {
  | HashThresholdConfig "hashThreshold"
} representation keyed

type ProllyTreeConfig struct {
  minChunkSize Int
  maxChunkSize Int
  codec Int
  hashFunction Int
  strategy ChunkingStrategy
} representation tuple
```

### `ProllyTree`

A prolly tree is identified by a node which links to the `root` `TreeNode` for the actual key-value pairs,
and a `config` link to the ProllyTreeConfig which has infomration about the chunking and encoding information in order to quickly compare if two trees are using the same configuration and may be merged together as well as making it easier to write.

### `TreeNode`

This is the "Tree" part of Prolly Trees and is made to be general purpose.
We can potentially expect to use the TreeNode structure in subsequent specs with different types of trees.

### `TreeNode.keys`

Raw keys(keys/values input from users) for leaf node. Key-value pairs are sorted by byte value with the "larger" keys being at the end. Values are compared at the first byte, and going down to the end. This means that keys that are just a prefix come before keys that are prefix + 1 byte.

### `TreeNode.values`

Values corresponding to keys.
For leaf nodes these will be Links pointing to additional
Values can point to arbitrary IPLD nodes and it is up to applications to generate and process them.

### `TreeNode.level`

0 for leaf nodes, and add 1 for parent levels (and incrementing as more parents are added)

### `ProllyTreeConfig`

The configuration for how the prolly tree should be assembled with encodings and chunking strategies.

### `ProllyTreeConfig.minChunkSize`

The minimum size a chunk should be before considering the boundry function.
The size is calculated from the size of the `bytes` when encoding a prolly tree node.

### `ProllyTreeConfig.maxChunkSize`

The maximum size a chunk could be before it needs to be split regardless of the chunk boundries.
If a node reaches this size (or larger) after an insertion, it will trigger a chunking boundry regardless of the chunking strategy used.
This is in order to avoid attacks that make chunks larger than necessary.
The size is calculated from the size of the `bytes` when encoding a prolly tree node.

### `ProllyTreeConfig.codec`

This is the multicodec code for the codec to use when encoding the tree.
Generally it is reccommended to use DAG-CBOR unless you really know what you're doing.

### `ProllyTreeConfig.hashFunction`

This is the multicodec code for the hash function to use for generating CIDs.
It is reccommended to use SHA2-256 for your hash function unless you know what you're doing.

### `ProllyTreeConfig.strategy`

The `ChunkingStrategy` to use for forming the prolly tree.

### `ChunkingStrategy`

The strategy to use for chunking the leaves of the tree (and intermediate nodes).

This is a Map with different keys representing different strategies.

This spec currently supports the `byteThreshold` strategy, however we are intentionally leaving room for further chunking strategies which use more advanced algorithms such as the Weibull Distribution strategy used in Dolt.

### `HashThresholdConfig`

This is the strategy that was described in the [Peer to Peer Ordered Search Indexes](https://0fps.net/2020/12/19/peer-to-peer-ordered-search-indexes/) paper.

It works by hashing a key+value pair, reading the last 4 bytes as a 32 bit unsigned integer, and checking how many bits are 0's relative to the chunking factor.

The `chunkingFactor` must be less than the maximum value of a 32 bit unsigned integer.
It is used to calculate a "chunking threshold" using the formula `Math.floor(4294967295 / chunkingFactor)`.
It is reccommended to use powers of two to make it easier to relate to how many bits should be `0` in the chunking threshold.

The larger the chunking factor, the less likely it is that a given keypair will result in a chunking boundry, and thus will lead to TreeNodes with more entries within them.

It also contains a `hashFunction` field which points at a hash function in the [multicodec table](https://github.com/multiformats/multicodec/blob/master/table.csv) to use for hashing.
You should ensure that you are using a cryptographic hash function in order to make it more difficult to create collisions and to ensure you have an even distribution of values.

## Algorithm in detail

Left to the implementation is how to generate and load data from IPLD.
Whenever a Link is resolved to a TreeNode or ProllyTreeConfig, this is done via the IPLD LinkSystem which it an implementation detail outside of the scope of this document.

When serializing data into a CID+Block, one should use the codec and multihash that's either used by root CID of the tree you are modifying, or specificed explicitly during tree creation. Blocks should also be saved to the IPLD LinkSystem and how this is done is also outside the scope of this document.
We will assume that there is a `getNode(cid)` API which loads IPLD Nodes from a CID, and a `saveNode(node) => {cid, bytes}` which will save a node and get back a CID and the byte contents used for generating the CID. Note that `saveNode` should use the same encoding and hash algorithm as the root of the tree based on the root `ProllyTreeConfig.codec` and `ProllyTreeConfig.hashFunction`.

This section also relies on the existance of a `Cursor` structure to keep track of state when iterating through a prolly tree.
This structure should keep track of a `TreeNode` that it is currently focused on, an `index` for the entry in the node which is being focused on, and optionally a `parent` Cursor for the parent `TreeNode` being focused on.
Note that this is not mandatory for implementations and is more of a guide to help structure how the tree can be traversed.
Implementations may want to use other approaches to recursive traversal and updating.

Not mentioned here is a method for performing batch operations such as sequential writes.

### CursorAtItem(TreeNode, prefix): Cursor

Get a cursor pointing to the closest item in the tree to a given prefix.
This is useful for performing searches for keys.

1. Define a `Cursor` struct with a `index Integer`, `node TreeNode`, and`parent Cursor`
2. Set `cursor.node` to the `TreeNode`
3. Set `cursor.index` to `KeyIndex(cursor.node, prefix)`
4. Start a loop
  1. if `IsLeaf(cursor.node)` is `true`, break the loop
  2. get the `link` from `CursorGetValue(cursor)`
  3. resolve the TreeNode at the `link` to `newNode`
  4. Set `parent` to `cursor`
  5. set `cursor` to a new `Cursor` struct
  6. set `cursor.parent` to `parent`
  7. set `cursor.node` to `newNode`
  8. set `cursor.index` to `KeyIndex(cursor.node, item)`
5. return the `cursor`

### IsLeaf(TreeNode) : Boolean

Check to see if a given TreeNode is for a leaf, or if it is an intermediate node in the tree.

1. get the `level` of the `TreeNode`
2. if the `level` is `0` return `true`
3. else return `false`

### CursorIsValid(Cursor) : Boolean

Check if a given cursor is set to a valid position.
It can sometimes be set to an invalid position if a search failed or if there are no more items to iterator over in a cursor.

1. get the `length` of `cursor.node.keys`
2. if `length` is `0`, return `false`
3. if `cursor.index` is less than 0, return `false`
4. if `cursor.index` is greater than or equal to `length`, return `false`

### CursorIsAtEnd(Cursor) : Boolean

Check if the given cursor is at the end of its TreeNode.
This is used to check if there are more items that can be traversed over.

1. Get the `length` of `cursor.node.keys`
2. return `cursor.index === (length - 1)`

### KeyIndex(TreeNode, item) : Integer

Use a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) or equivalent to find the index in the `keys` array which is "closest" to but not "larger than" the `item`. Return the index.

### AdvanceCursor(Cursor) : Cursor

Advances a cursor to the next key.
This function assumes the cursor is currently pointing at a leaf node.
When reaching the end of the current TreeNode, the parent cursor will be incremented to go to the next branch.

1. Get the `length` of the `cursor.node.keys`
2. if `cursor.index` is less than `length - 1`, increment `cursor.index` and return the `cursor`
3. If `cursor.parent` is `null`
  1. set `cursor.index` to `length`
  2. return the `cursor`
3. Invoke `AdvanceCursor(cursor.parent)`
4. If `CursorIsValid(cursor.parent)` is `false`
  1. set `cursor.index` to `length`
  2. return the `cursor`
6. Get the `link` from `CursorGetValue(cursor.parent)`
7. Check that `link` is not `null`, throw an error if it is
8. Get the `node` TreeNode from using `load(link)`
9. Set `cursor.node` to `node`
10. Set `cursor.index` to `0`
11. return the `cursor`.

### CursorGetKey(Cursor) : key?

Get the current key pointed to by a cursor.

1. If `CursorIsValid(Cursor)` is `false`, return `null` (or throw an error)
2. Get the `key` from `cursor.node.keys` at `cursor.index`
3. return the `key`

### CursorGetValue(Cursor) : value?

Get the current value pointed to by the cursor.

1. If `IsLeaf(cursor.node)` is `false`, return `null` (or throw an error)
1. If `CursorIsValid(Cursor)` is `false`, return `null` (or throw an error)
2. Get the `value` from `cursor.node.values` at `cursor.index`
3. return the `value`

### Get(TreeNode, key): value

Get the value associated with a key from the tree.
This is a public method meant for consumers of ProllyTrees.
If the TreeNode isn't a leaf, the function will traverse into it to find the leaf which contains the key.

1. Get a `cursor` from `CursorAtItem(TreeNode, key)`
2. If `CursorIsValid(cursor)` is `false`, return an error (key not found)
3. Get `currentKey` from `CursorGetKey(Cursor)`
4. If `currentKey` is not bytewise equal to `key`, return an error (key not found)
5. Get `value` from `CursorGetValue(Cursor)`
6. Return `value`

### CursorAtChunkingBoundary(ProllyTreeConfig config, Cursor) : Boolean

Checks if the cursor is currently pointing to a chunking boundry.
If `true`, a new TreeNode should be created for all subsequent keys.
This should be called after adding a key-value pair to a leaf TreeNode to determine if more items should be added.

1. Get the `ChunkingStrategy` from the `config`
2. Get the `length` of the `cursor.node` from `save(cursor.node).bytes.length`
3. If `length` is less than `config.minChunkSize` return `false`
5. If the `ChunkingStrategy` is not a `HashThresholdConfig`, return an error (unsupported chunking strategy)
6. Set `threshold` to `Math.floor(MAX_UNIT32 / config.chunkingFactor)`
7. Get the `hash` function associated with the multicodec in `config.hashFunction`
8. Calculate the `entryHash` from the `hash(CursorGetKey(cursor) + save(CursorGetValue(cursor)).bytes)`
9. Read the last 4 bytes of the `entryHash` as a UInt32 `identity`
10. Return `identity <= threshold`

### SplitNode(TreeNode, index) : left, right

Split a TreeNode at a given boundry.
All of the entries after `index` will be in a new `right` node.
All of the entries at and before `index` will be in a new  `left` node.

### SplitCursor(Cursor) : Cursor

Split the current node on a cursor into two nodes at the given index.
This will add a new child to the parent node, and create a parent node+cursor if one doesn't exist.

- Get `left` and `right` from `SplitNode(cursor.node, cursor.index)`
- If `cursor.parent` is null
  - Create a new `TreeNode` `parentNode`
  - Set `parentNode.level` to `cursor.node.level + 1`
  - Set `parentNode.keys[0]` to `left.keys[0]`
  - Create a new Cursor `parentCursor`
  - Set `parentCursor.index` to `0`
  - Set `parentCursor.node` to `parentNode`
  - Set `cursor.parent` to `parentCursor`
- Set the entry at `cursor.parent.node` at `cursor.parent.index` to `left.keys[0]`,`save(left).cid`
- Insert a new entry into `cursor.parent.node` at `cursor.parent.index+1` to `right.keys[0]`,`save(right).cid`
- Increment `cursor.parent.index` by `1`
- Set `cursor.node` to `right`
- Set `cursor.index` to `0`

### MergeNodes(TreeNode left, TreeNode right) : TreeNode

Merge two tree nodes together.

- If `left.level` != `right.level`
  - Return an error (incompatible tree node levels)
- Create a new `TreeNode` `node`
- Set `node.keys` to `left.keys`, and concat it with `right.keys`
- Set `node.values` to `left.values`, and concat it with `right.values`
- Return `node`

### RebalanceTree(Cursor, ProllyTreeConfig) : TreeNode

The `cursor` should be pointing to the node in a tree that rebalancing should start at. The root of the `cursor` will be upated to match the changes.
This will attempt to merge sequential TreeNodes that don't end on a boundry, and split TreeNodes with boundries within them.

The returned `TreeNode` is for the new root of the tree.

- If `cursor.node.keys` is empty
  - if `cursor.parent` is null
    - return `cursor.node`
  - Remove the entry at `cursor.parent.index` in `cursor.parent.node`
  - Return `RebalanceTree(cursor.parent, ProllyTreeConfig)`
- Loop
  - If `CursorIsAtEnd(cursor)`
    - If `cursor.parent` is `null` or `CursorAtChunkingBoundry(ProllyTreeConfig, cursor)` is `true`
      - break the loop
    - if `CursorIsAtEnd(cursor.parent)` is `true`
      - break the loop
    - Set `right` to `load(cursor.parent.values[cursor.parent.index + 1])`
    - Create a new `merged` `TreeNode` from `MergeNodes(cursor.node, right)`
    - Get the `length` from `save(merged).bytes`, as well as the `cid`
    - If `length` is less than or equal to `config.maxChunkSize`
      - set `cursor.parent.node.values[cursor.parent.index]` to `cid`
      - remove the entry in `cursor.parent.node` at `cursor.parent.index + 1`
    - break the loop
  - If `CursorAtChunkingBoundry(ProllyTreeConfig, cursor)` is `false`
    - Call `AdvanceCursor(cursor)`
    - continue to next loop cycle
  - Call `SplitCursor(cursor)`
- Return `RebalanceTree(cursor.parent, ProllyTreeConfig)`

### Put(ProllyTree tree, key, value) : ProllyTree

This is a public facing API for setting keys in the prolly tree.

- Get the `config` from the `tree` using `load(tree.config)`
- Get root `node` using `load(tree.root)`
- Get `cursor` from `CursorAtItem(node, key)`
- If `CursorIsValid(cursor)` is `true`
  - check if the key is at `CursorGetKey`
  - If it is
    - Set the value in the `cursor.node.values` at `cursor.index` to `value`
  - If it isn't
    - add the `key` to `cursor.node.keys` after the `cursor.index`, shifting subsequent items down
    - add the `values` to `cursor.node.values` after the `cursor.index`, shifting subsequent items down
    - increment `cursor.index` by `1`
  - Get the `length` from `save(cursor.node).bytes`
    - If `length` > `config.maxChunkSize`
    - call `SplitCursor(cursor)`
- TODO: If false, how is this reached? It means that there were no keys even "close" to `key`?
- get a new `root` from  `RebalanceTree(cursor, config)`
- Create a new `updatedTree` by duplicating `tree`
- Set `updatedTree.root` to `root`
- Return `updatedTree`

### Delete(ProllyTree tree, key) : ProllyTree

Removes a key from a ProllyTree if it exists

- Get the `config` from the `tree` using `load(tree.config)`
- Get root `node` using `load(tree.root)`
- Get `cursor` from `CursorAtItem(TreeNode, key)`
- If `CursorIsValid(cursor)` is `false`
  - Return the `TreeNode`
- check if the key is at `CursorGetKey(cursor)`
- If it is
  - Remove the key in `cursor.node.keys` at `cursor.index`
  - Remove the value in `cursor.node.values` at `cursor.index`
- get a new `root` from  `RebalanceTree(cursor, config)`
- Create a new `updatedTree` by duplicating `tree`
- Set `updatedTree.root` to `save(root).cid`
- Return `updatedTree`

### Search(TreeNode, start) : Iterator<key, value>

This is the basis for how one can search through a tree.
This may be exposed as a public method by implementors, though they may want to add additional features like an "end" instead of a prefix.
Applications should otherwise manually detect when to stop iterating based on the last item's key that was yielded.

- Get `cursor` from `CursorAtItem(TreeNode, key)`
- Create an Iterator (language dependent)
- On each pull from the iterator
  - If `CursorIsValid(cursor)` is `false`
    - Close the iterator and return
  - Get the `key` from `CursorGetKey(cursor)`
  - Get the `value` from `CursorGetValue(cursor)`
  - Yield the `key` and `value` from the iterator
  - `AdvanceCursor(TreeNode)`

### Diff(TreeNode base, TreeNode new) : Iterator< Diff >

This function provides a means to retrieve all items in a tree `new` that are missing from another tree `base` and returns them as a list of key-value pairs.

(Basically follows: [Efficient Diff on Prolly-Trees - Dolt](https://www.dolthub.com/blog/2020-06-16-efficient-diff-on-prolly-trees/))

0. If the CID at `base.config` isnt' the same as `new.config`: Raise Error/Abort (Invalid config)
0. (Check hashes/addresses/CIDs of both trees - done if identical)
1. Point cursers `cursor_new`and `cursor_base` to leftmost items of the respective trees `new` and `base`.
2. Loop:
    1. If `cursor_base.node.key` is smaller than `cursor_new.node.key`:
        - Advance the base cursor. (We ignore keys in the base which are missing from the new tree.): `AdvanceCursor(cursor_base)`
    2. If `cursor_new.node.key` is smaller than `cursor_base.node.key`:
        - Record the key as missing from the base tree. (Add key and value to the list that is to be returned.)
        - Advance new cursor: `AdvanceCursor(cursor_new)`
    4. If the keys (`cursor_new.node.key`, `cursor_base.node.key`) are equal:
        1. If the values in the trees differ for the same key:
            - Record as different. (Add key and differing values to the list that is to be returned and mark as differing.)
            - Advance both cursors: `AdvanceCursor(cursor_new)`, `AdvanceCursor(cursor_base)`
        2. Skip common elements (and potential parents) as far as possible. (See below.)
3. If `cursor_base` reaches the end in its node and `cursor_new` is not a the end:
    - Record all remaining items as missing. (Add all remaining key-value pairs to the list that is to be returned.)

Skipping common elements:
1. Until both cursors point to different values repeat:
    1. Advance parents:
        1. If the parents are equal, set the cursers to the first element of these parents.
    2. Advance both cursors: `AdvanceCursor(cursor_new)`, `AdvanceCursor(cursor_base)`

### Merge(TreeNode, TreeNode) : TreeNode

This procedure takes two trees and returns a tree that contains all elements from both.
It builds on Diff and (bulk) insert.
It uses the output of the diff and adds the key-value pairs, which are contained within the right tree but not in the left tree, to the left tree.

(Note: As a heuristic the higher tree can chosen as the left tree. The expected number of added elements should be smaller that way.)

1. Initialize the tree to be returned with the left tree: `merged = left`
1. Invoke the diff on the trees: `Diff(left, right)`
2. Iterate over the resulting key-value pairs and insert them to the left tree: `merged = Put(merged, key, value)`
   1. If merge conflicts occur (if `Diff()` returns differing key-value pairs): See below
3. Return `merged`.

#### Note on Merge Conflicts

When merging trees it is possible that the trees have different values for the same key. In this case, as the algorithm is ignorant of keys and values, it can not be known how to solve the conflict.
The following approaches are possible for the implementation:
 - Ask the caller for a handler function that resolves the conflict
 - Throw an error, indicating the conflicting keys and values

## Configuration (and Defaults)

TODO: *Discussion of suitable values and implication for configuration could go here, this is something we are actively running experiments for*
