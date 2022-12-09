# IPLD Prolly Trees Specification

## Introduction

Many applications have been using IPLD to represent large datasets in use cases such as blockchains or decentralized databases.
One side effect is that querying large amounts of data has become a more common need which often gets solved with centralized database indexes.
IPLD Prolly Trees are an important step in this direction in that they provide an interface similar to a Database's B+ tree.
Some of the immediate benefits of using Prolly Trees over regular B+ Trees is that Prolly Trees are self-balancing and can be determenistically merged with other trees which is important to reduce the amount of restructuring necessary for collaborativ index creation.
In this document we will build off of prior art in [Probabilistic B-Trees](https://github.com/attic-labs/noms/blob/master/doc/intro.md#prolly-trees-probabilistic-b-trees) to define a speficication on how they can be represented in IPLD, how they can be constructed, how they can be queried, and how multiple trees can be merged together.

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

Prolly trees leverage content addresibility to create ordered search indexes similar to the common B+ tree structure used for databases, but with the added ability to determenistically merge trees together.

At the highest level, Prolly Trees act as a key value store whith the ability to iterate over key ranges which are lexicographically sorted. This property of sorted iteration is important for creating database indexes for a variety of use cases like full text search, sorting of large datasets, and arbitrary search queries.

### Search Tree

The basic structure is that of an ordered search tree: The contained keys are organised such that they can be found (inserted, updated, ...) efficiently by value.

*TODO Insert sketch of search tree*

To efficiently find keys, the tree is traversed top-to-bottom and the non-leaf nodes help navigating/comparing the values efficiently. An intermediate node contains several ordered key-address pairs, which link to further nodes (intermediate or leaf) on the next lower level.

Levels go from `0` representing Leaf Nodes, and go up for each level in the tree. The root of the tree will have the highest level in the tree and can give an estimate of it's overall size.

Leaf nodes contain the actual Key-Value pairs for the tree which can be iterated over as part of the overall tree iteration.


### Chunking

Chunking is the strategy of determining chunk boundaries: Given a list of key-value pairs, it 'decides' which are still inside node A and which already go to the next node B on the same level.
It depends on the hash/address/node of the items and a 'chunking factor' for tuning the shape of the tree.
This chunking factor determines the average size of nodes/chunks that a node on a higher level contains.
This average size in turn controls the shape of the tree (broad/narrow).
The shape in turn defines the performance of operations on the tree.

### Note on Multiple and Single Values and Sets

The described tree can represent a data structure with multiple, single or no values per key. However, given that IPLD Maps (which a Prolly Tree loosely maps to) only allow one value for a key, implementations should merge duplicate keys into a single value. This is also important to have consistent ordering of key value pairs.

### Re-Calculate

In order to modify the tree (inserting, updating, or removing one or multiple values) a part of the tree needs to be re-calculated. This section describes an internal procedure that is not exposed to the caller.
The tree is (partially) re-calculated bottom-up.

Starting at the inserted/modified leaf or node referencing a now deleted/removed leaf, successively walk up the tree. If a removed item was the only item in its node: Remove the node from its parent and Check if the hash/address/CID of a new leaf/node splits the parent chunk (split the parent node if yes).
    Then, check if a removed leaf/node was a 'splitting node' and the nodes need to be merged (only the last node in a chunk can be a splitting node). If splitting criterion holds for the last item of the node and there is the current node is succeeded by another node on the same level: merge the currend node with the succeeding node. Continue walking up the path. If at root and it is being split: Create a new root that links to the freshly split nodes. Return the new root CID.

![](https://i.imgur.com/xE0id0V.png)
![](https://i.imgur.com/aYqzXZI.png)
![](https://i.imgur.com/nuvInkH.png)
![](https://i.imgur.com/zACS8gS.png)

Pay attention to the fact that the boundary algorithm is not related to the node CID, i.e the boundary is generated *before* the node CID is generated. Maybe in the future we can combine the boundary algorithm and CID. 

### Put/Remove/Update

First search if the tree already contains the value.
If the key is not contained, create a new leaf for the value, insert the key-value (key-leaf) pair in the correct node and re-calculate the tree.
If the key is already stored in the tree and the value is the same, the tree is left unchanged.
If the key exists and the values differ: Either leave the tree or insert the new value and update the tree.
If removing the key, remove the `key` and the `value` from the list. After making any modifications to the tree, run the algoritm (Re-Calculate)[#Re-Calculate].

## Structure

IPLD Schema(https://github.com/kenlabs/ptree-bs/blob/main/pkg/prolly/tree/schema.ipldsch)

```
type ProllyNode struct {
	config &ChunkConfig
    level Int
	keys [Bytes]
	links nullable [&ProllyNode]
	values nullable [Any]
} representation tuple

type WeibullThresholdConfig struct {
	K Float
	L Float
} representation tuple

type RollingHashConfig struct {
	rollingHashWindow Int
} representation tuple

type PrefixThresholdConfig struct {
  chunkingFactor Int
}

type ChunkStrategy enum {
  | PrefixThreshold
  | WeibullThreshold
  | RollingHash
} representation string

type ChunkConfig struct {
	chunkStrategy ChunkStrategy
	minChunkSize Int
	maxChunkSize Int
	prefix nullable PrefixChunkConfig
	weilbull nullable WeibullThresholdConfig
	rollingHash nullable RollingHashConfig
}
```

### `ProllyNode.keys`

Raw keys(keys/values input from users) for leaf node. Key-value pairs are sorted by byte value with the "larger" keys being at the end. Values are comared at the first byte, and going down to the end. This means that keys that are just a prefix come before keys that are prefix + 1 byte.

### `ProllyNode.values`

raw values for leaf nodes. For branch nodes, it's null. Values can point to arbitrary IPLD nodes and it is up to applications to generate and process them.

### `ProllyNode.links`

null for leaf nodes. For branch nodes, it's the CID of the child node. The index in the array corresponds to the index in the `keys` array for the corresponding key. Keys are used for searching, and links are used for traversing down towards the leaves.

### `ProllyNode.level`

0 for leaf nodes, and add 1 for parent levels (and incrementing as more parents are added)

### `ProllyNode.config`

Link to the info about the chunking strategy for how the prolly tree is built. Trees must always be mutated with the given strategy. Storing the config in prolly nodes means that any parent inside a tree can be passed around as a new root, and it makes it easy to compare if two trees are compatible for being "merged" together or used for comparisons.

### `ChunkStrategy`

The enum for the types of chunking strategies that are part of the spec. This is set to be a string so that the number of strategies can grow over time.

### `ChunkConfig`

Chunk Config for prolly tree, it includes some global setting, the splitter method you choose and specific configs about the splitter

### `ChunkConfig.minChunkSize`

The minimum size a chunk should be before considering the boundry function.

TODO: Should this be in number of keys or bytes of keys+values or block size? Maybe we can get away with number of keys?

### `ChunkConfig.maxChunkSize`

The maximum size a chunk could be before it needs to be split regardless of the chunk boundries

### `ChunkConfig.chunkStrategy`

The string representing the type of strategy to use. Either `RollingHash` or  `KeySplitter`.
	
### `PrefixThresholdConfig`

Config for the `PrefixThreshold` chunking strategy.

This is the original strategy that was described in the Merkle Search Tree paper and has a `chunkingFactor` which represents the number of bits in the key which need to be `0` in order to set another boundry.

Lower values result in wider nodes.

### `WeibullThresholdConfig`

Config for the `WeiBullThreshold` chunking strategy.

Makes chunk boundary decisions on the hash of the key of a []byte pair and tries to create chunks that have an average number of []byte pairs, rather than an average number of Bytes. However, because the target number of []byte pairs is computed directly from the chunk size and count, the practical difference in the distribution of chunk sizes is minimal. It uses a dynamic threshold modeled on a weibull distribution (https://en.wikipedia.org/wiki/Weibull_distribution). As the size of the current trunk increases, it becomes easier to pass the threshold, reducing the likelihood of forming very large or very small chunks.

The `K` value represents the Shape Parameter, and `L` represents `λ` - the scaling factor.

### `RollingHashConfig`

 rollingHashSplitter is a nodeSplitter that makes chunk boundary decisions using a rolling value hasher that processes Item pairs in a byte-wise fashion.

rollingHashSplitter uses a dynamic hash pattern designed to constrain the chunk Size distribution by reducing the likelihood of forming very large or very small chunks. As the Size of the current chunk grows, rollingHashSplitter changes the target pattern to make it easier to match. The result is a chunk Size distribution that is closer to a binomial distribution, rather than geometric.

## Algorithm in detail

Left to the implementation is how to generate and load data from IPLD.
Whenever a Link is resolved to a ProllyNode or ChunkConfig, this is done via the IPLD LinkSystem which it an implementation detail outside of the scope of this document.

When serializing data into a CID+Block, one should use the codec and multihash that's either used by root CID of the tree you are modifying, or specificed explicitly during tree creation. Blocks should also be saved to the IPLD LinkSystem and how this is done is also outside the scope of this document. We will assume that there is a `getNode(cid)` API which loads IPLD Nodes from a CID, and a `saveNode(node) => {cid, bytes}` which will save a node and get back a CID and the byte contents used for generating the CID. Note that `saveNode` should use the same encoding and hash algorithm as the root of the tree.

### IsLeaf(ProllyNode) : Boolean

1. get the `level` of the `ProllyNode`
2. if the `level` is `0` return `true`
3. else return `false`

### CursorIsValid(Cursor) : Boolean

1. get the `length` of `cursor.node.keys`
2. if `length` is `0`, return `false`
3. if `cursor.index` is less than 0, return `false`
4. if `cursor.index` is greater than or equal to `legnth`, return `false`

### KeyIndex(ProllyNode, item) : Integer

Use a [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) or equivalent to find the index in the `keys` array which is "closest" to but not "larger than" the `item`. Return the index.

### CursorAtItem(ProllyNode, item): Cursor

Get the closest cursor to a byte prefix

1. Define a `Cursor` struct with a `index Integer`, `node ProllyNode`, and`parent Cursor`
2. Set `cursor.node` to the `ProllyNode`
3. Set `cursor.index` to `KeyIndex(cursor.node, item)`
6. Start a loop
	1. if `IsLeaf(cursor.node)` is `true`, break the loop
	2. get the `link` from `CursorGetLink(cursor)`
	3. resolve the ProllyNode at the `link` to `newNode`
	4. Set `parent` to `cursor`
	5. set `cursor` to a new Cursor struct
	6. set `cursor.parent` to `parent`
	7. set `cursor.node` to `newNode`
	8. set `cursor.index` to `KeyIndex(cursor.node, item)`
7. return the `cursor`

### AdvanceCursor(Cursor) : Cursor

1. Get the `length` of the `cursor.node.keys`
2. if `cursor.index` is less than `length - 1`, increment `cursor.index` and return the `cursor`
3. If `cursor.parent` is `null`
	1. set `cursor.index` to `length`
	2. return the `cursor`
3. Invoke `AdvanceCursor(cursor.parent)`
4. If `CursorIsValid(cursor.parent)` is `false`
	5. set `cursor.index` to `length`
	6. return the `cursor`
6. Get the `link` from `CursorGetLink(cursor.parent)`
7. Checgreater or k that `link` is not `null`, throw an error if it is
8. Get the `node` ProllyNode from `link`
9. Set `cursor.node` to `node`
10. Set `cursor.index` to `0`

### CursorGetKey(Cursor) : key?

1. If `CursorIsValid(Cursor)` is `false`, return `null` (or throw an error)
2. Get the `key` from `cursor.node.keys` at `cursor.index`
3. return the `key`

### CursorGetValue(Cursor) : value?

1. If `IsLeaf(cursor.node)` is `false`, return `null` (or throw an error)
1. If `CursorIsValid(Cursor)` is `false`, return `null` (or throw an error)
2. Get the `value` from `cursor.node.values` at `cursor.index`
3. return the `value`

### CursorGetLink(Cursor) : &ProllyNode

1. If `IsLeaf(cursor.node)` is `true`, return `null` (or throw an error)
1. If `CursorIsValid(Cursor)` is `false`, return `null` (or throw an error)
2. Get the `link` from `cursor.node.links` at `cursor.index`
3. return the `link`

### Get(ProllyNode, key): value

1. Get a `cursor` from `CursorAtItem(ProllyNode, key)`
2. If `CursorIsValid(cursor)` is `false`, return an error (key not found)
3. Get `currentKey` from `CursorGetKey(Cursor)`
4. If `currentKey` is not bytewise equal to `key`, return an error (key not found)
5. Get `value` from `CursorGetValue(Cursor)`
6. Return `value`

### weibullCDF(x, K Int, L Int) : int

Note: CDF (Cumulative Distribution Function) of the ][Weibull probability distribution](https://en.wikipedia.org/wiki/Weibull_distribution)
 - return `-exp(-pow(x/L),K)`

### WeibullThreshold(ProllyNode, key, value) : Boolean

TODO: cleanup

WeibullThreshold returns true if we should split at |hash| for a given record inserted into a chunk of Size |Size|, where the record's Size is |thisSize|. |Size| is the Size of the chunk after the record is inserted, so includes |thisSize| in it.

WeibullThreshold attempts to form chunks whose sizes match the weibull distribution.

The logic is as follows: given that we haven't split on any of the records up to |Size - thisSize|,  the probability that we should split on this record is (CDF(end) - CDF(start)) / (1 - CDF(start)), or, the precentage of the remaining portion of the CDF that this record actually covers. We split is |hash|, treated as a uniform random number between [0,1), is less than this percentage.

0. Get the `{bytes, cid}` from `saveNode(value)`
1. `hash = hash(key + saveNode(value).cid)` *TODO: hash needs to be well-defined*
2. `itemSize = len(key) + len(value)`
3. Set `prevItemsSize` to the sum of the length of all the node's previous items (excluding the current one)
4. `start = weibullCDF(prevItemsSize, K, L)`
5. `end = weibullCDF(prevItemsSize + itemSize, K, L)`
6. `p = float(hash)/maxUInt32`
7. `d = 1 - start`
8. If `d <= 0`: return `true` (this should realistically never occour?)
9. `target = (end - start)/d`
10. return `p < target`

### HashByteArray([]byte, offset) : Boolean

*TODO: Description*
*TODO: current implementation applies the min/maxChunkSize to offset. Do we want this?*
- For each `byte`:
    1. Increment `offset` by 1
    2. Feed `byte` to rolling hash *TODO Details for hashing, salting*
    3. Set `hash` to hashSum of rolling hash
    4. `pattern = (1<<(15 - (offset >> 10))) - 1`
    5. If `hash&pattern == pattern` return `true`
- Return `false`

### RollingHash(ProllyNode, index) : Boolean

*TODO: Rolling hash window*
1. Set `offset` to the number of bytes of the elements of previous keys and values
2. If `HashByteArray(key) == true`: return `true`
3. Add number of bytes of key to `offset`
4. If `HashByteArray() == true`: return `true`
5. return `false`

### ShouldCreateBoundry(ProllyNode, key) : Boolean

If `true`, a new ProllyNode should be created for all subsequent keys.

1. Get the `ChunkConfig` by resolving the link in `node.ChunkConfig`
1. Get the `ChunkStrategy` from the `ChunkConfig`
2. Get the `length` from the `node.keys`
3. If `length` is less than `ChunkConfig.MinChunkSize` return `true`
3. If `length` is equal to `ChunkConfig.MaxChunkSize` return `true`
4. If the `ChunkStrategy` is `KeySplitter`
	- return WeibullThreshold(key)
5. If the `ChunkStrategy` is `RollingHash`
	- return RollingHash(ProllyNode, index)
6. Return an error (unsupported chunk strategy)

### RebalanceTree(Cursor) : ProllyNode

The `cursor` should be pointing to the node in a tree that rebalancing should start at. The root of the `cursor` will be upated to match the changes.

The returned `ProllyNode` is for the new root of the tree.

TODO: Account for `cursor.parent` being null
TODO: Advance a cursor instead of iterating through `cursor.node.keys`
TODO: Account for `cursor.node.keys` being empty (remove from parent)

- Loop
  - If `ShouldCreateBoundry(cursor.node.chunkconfig, cursor.node, CursorGetKey(cursor))` is `false`
	- Call `AdvanceCursor(cursor)`
	- continue to next loop cycle
  - Create a new `ProllyNode` `node` by cloning the current `cursor.node`
  - Remove all keys, values, links from `cursor.node` after `cursor.index`
  - Remove all keys, values, links from `node` before and including `cursor.index`
  - Generate a new `CID` for `cursor.node`
  - Set the `cursor.parent.links` at `cursor.parent.index` to the new `CID`
  - Generate a new `CID` for the new `node`
  - Shift all items in `cursor.parent.keys` up by `1`
  - Shift all items in `cursor.parent.links` up by `1`
  - Increment `cursor.parent.index` by `1`
  - Set the `cursor.parent.links` at `cursor.parent.index` to the new `CID`
  - Set the `cursor.parent.keys` at `cursor.parent.index` to node.keys[0]
  - Set cursor.node to `node`
  - Set cursor.index to `0`
- Return `RebalanceTree(cursor.parent)`

### Put(ProllyNode, key, value) : ProllyNode

- Get `cursor` from `CursorAtItem(ProllyNode, key)`
- If `CursorIsValid(cursor)` is `true`
	- check if the key is at `CursorGetKey`
	- If it is
		- Set the value in the `cursor.node.values` at `cursor.index` to `value`
	- If it isn't
		- add the `key` to `cursor.node.keys` after the `cursor.index`, shifting subsequent items down
		- add the `values` to `cursor.node.values` after the `cursor.index`, shifting subsequent items down
- TODO: If false, how is this reached? It means that there were no keys even "close" to `key`?
- return `RebalanceTree(cursor)`

### Delete(ProllyNode, key, value) : ProllyNode

- Get `cursor` from `CursorAtItem(ProllyNode, key)`
- If `CursorIsValid(cursor)` is `false`
	- Return the `ProllyNode`
- check if the key is at `CursorGetKey(cursor)`
- If it is
	- Remove the key in `cursor.node.keys` at `cursor.index`
	- Remove the value in `cursor.node.values` at `cursor.index`
- return `RebalanceTree(cursor)`

### Search(ProllyNode, prefix) : Iterator<key, value>

- Get `cursor` from `CursorAtItem(ProllyNode, key)`
- Create an Iterator (language dependent)
- On each pull from the iterator
	- If `CursorIsValid(cursor)` is `false`
		- Close the iterator and return
	- Get the `key` from `CursorGetKey(cursor)`
	- If `key` does not start with `prefix`
		- Close the iterator and return
	- Get the `value` from `CursorGetValue(cursor)`
	- Yield the `key` and `value` from the iterator
	- AdvanceCursor(ProllyNode)

### Diff(ProllyNode base, ProllyNode new) : Iterator< Diff >

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

### Merge(ProllyNode, ProllyNode) : ProllyNode

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
 - Ignore both
 - Assume the `right` tree contains the newer values and simply use the key-value pair of the right tree.

## Configuration (and Defaults)

TODO: *Discussion of suitable values and implication for configuration could go here, this is something we are actively running experiments for*

