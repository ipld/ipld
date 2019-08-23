# Specification: HashMap

**Status: Prescriptive - Draft**

* [Introduction](#Introduction)
* [Useful references](#Useful-references)
* [Summary](#Summary)
* [Structure](#Structure)
  * [Parameters](#Parameters)
  * [Node properties](#Node-properties)
  * [Schema](#Schema)
* [Algorithm in detail](#Algorithm-in-detail)
  * [`Get(key)`](#Getkey)
  * [`Set(key, value)`](#Setkey-value)
  * [`Delete(key)`](#Deletekey)
  * [`Keys()`, `Values()` and `Entries()`](#Keys-Values-and-Entries)
  * [Differences to CHAMP](#Differences-to-CHAMP)
  * [Canonical form](#Canonical-form)
* [Use as a "Set"](#Use-as-a-%22Set%22)
* [Implementation defaults](#Implementation-defaults)
  * [`hashAlg`](#hashAlg)
  * [`bitWidth`](#bitWidth)
  * [`bucketSize`](#bucketSize)
  * [Maximum key size](#Maximum-key-size)
  * [Inline values](#Inline-values)
* [Possible future improvements and areas for research](#Possible-future-improvements-and-areas-for-research)
  * [Maximum depth limitations](#Maximum-depth-limitations)
  * [Hash algorithm](#Hash-algorithm)
  * [Buckets](#Buckets)
  * [Security](#Security)

## Introduction

The IPLD HashMap provides multi-block key/value storage and implements the Map [kind](/data-model-layer/data-model.md#kinds) as a [generic](generics.md) ***(TODO: "generic" or "advanced data structure" or "advanced layout"?)*** in the IPLD type system.

The IPLD HashMap is constructed as a [hash array mapped trie (HAMT)](https://en.wikipedia.org/wiki/Hash_array_mapped_trie) with buckets for value storage and [CHAMP](https://michael.steindorfer.name/publications/oopsla15.pdf) mutation semantics. The CHAMP invariant and mutation rules provide us with the ability to maintain canonical forms given any set of keys and their values, regardless of insertion order and intermediate data insertion and deletion. Therefore, for any given set of keys and their values, a consistent IPLD HashMap configuration and block encoding, the root node should always produce the same content identifier (CID).

## Useful references

* [Fast And Space Efficient Trie Searches](https://infoscience.epfl.ch/record/64394/files/triesearches.pdf) by Phil Bagwell, 2000, and [Ideal Hash Trees](http://lampwww.epfl.ch/papers/idealhashtrees.pdf) by Phil Bagwell, 2001, introduce the AMT and HAMT concepts.
* [CHAMP paper](https://michael.steindorfer.name/publications/oopsla15.pdf) presented at Oopsla 2015 by Steinforder & Vinju
* [Java implementation](https://github.com/msteindorfer/oopsla15-artifact/) accompanying the original CHAMP paper (see https://github.com/msteindorfer/oopsla15-artifact/blob/master/pdb.values/src/org/eclipse/imp/pdb/facts/util/TrieMap_5Bits.java and other TrieMap files in the same directory).
* [Optimizing Hash-Array Mapped Tries for Fast and Lean Immutable JVM Collections](https://blog.acolyer.org/2015/11/27/hamt/) a high-level description of HAMT data structures in general and the specifics of CHAMP.
* Peergos [CHAMP](https://github.com/Peergos/Peergos/blob/master/src/peergos/shared/hamt/Champ.java) implementation
* [IAMap](https://github.com/rvagg/iamap) JavaScript implementation
* [go-hamt-ipld](https://github.com/ipfs/go-hamt-ipld) Go implementation

## Summary

The HAMT algorithm is used to build the IPLD HashMap. This algorithm is common across many language standard libraries, particularly on the JVM (Clojure, Scala, Java), to power very efficient in-memory unordered key/value storage data structures. We extend the basic algorithm with buckets for block elasticity and strict mutation rules to ensure canonical form.

The HAMT algorithm hashes incoming keys and uses incrementing subsections of that hash at each level of its tree structure to determine the placement of either the entry or a link to a child node of the tree. A `bitWidth` determines the number of bits of the hash to use for index calculation at each level of the tree such that the root node takes the first `bitWidth` bits of the hash to calculate an index and as we move lower in the tree, we move along the hash by `depth x bitWidth` bits. In this way, a sufficiently randomizing hash function will generate a hash that provides a new index at each level of the data structure. An index comprising `bitWidth` bits will generate index values of  `[ 0, 2`<sup>`bitWidth`</sup>` )`. So a `bitWidth` of `8` will generate indexes of `0` to `255` inclusive.

Each node in the tree can therefore hold up to `2`<sup>`bitWidth`</sup> elements of data, which we store in an array. In the IPLD HashMap we store entries in buckets. A `Set(key, value)` mutation where the index generated at the root node for the hash of `key` denotes an array index that does not yet contain an entry, we create a new bucket and insert the `key` / `value` pair entry. In this way, a single node can theoretically hold up to `2`<sup>`bitWidth`</sup>` x bucketSize` entries, where `bucketSize` is the maximum number of elements a bucket is allowed to contain ("collisions"). In practice, indexes do not distribute with perfect randomness so this maximum is theoretical. Entries stored in the node's buckets are stored in `key`-sorted order.

If a `Set(key, value)` mutation places a new entry in a bucket that already contains `bucketSize` entries, we overflow to a new child node. A new empty node is created and all existing entries in the bucket, in addition to the new `key` / `value` pair entry are inserted into this new node. We increment the `depth` for calculation of the `index` from each `key`'s hash value to calculate the position in the new node's data array. By incrementing `depth` we move along by `bitWidth` bits in each `key`'s hash. With a sufficiently random hash function each `key` that generated the same `index` at a previous level should be distributed roughly evenly in the new node's data array, resulting in a node that contains up to `bucketSize` new buckets.

The process of generating `index` values from `bitWidth` subsections of the hash values provides us with a depth of up to `(digestLength x 8) / bitWidth` levels in our tree data structure where `digestLength` is the number of output bytes generated by the hash function. With each node able to store up to `2`<sup>`bitWidth`</sup> child node references and up to `bucketSize` elements able to be stored in colliding leaf positions we are able to store a very large number of entries. A hash function's randomness will dictate the  even distribution of elements and a hash function's output `digestLength` will dictate the maximum depth of the tree.

A further optimization is applied to reduce the storage requirements of HAMT nodes. The data elements array is only allocated to be long enough to store actual entries: non-empty buckets or links to actual child nodes. An empty or `Null` array index is not used as a signal that a `key` does not exist in that node. Instead, the data elements array is compacted by use of a `map` bitfield where each bit of `map` corresponds to an `index` in the node. When an `index` is generated, the `index` bit of the `map` bitfield is checked. If the bit is not set (`0`), that index does not exist. If the bit is set (`1`), the value exists in the data elements array. To determine the index of the data elements array, we perform a bit-count (`popcount()`) on the `map` bitfield _up to_ the `index` bit to generate a `dataIndex`. In this way, the data elements array's total length is equal to `popcount(map)` (the number of bits set in all of `map`). If `map`'s bits are all set then the data elements array will be `2`<sup>`bitWidth`</sup> in length, i.e. every position will contain either a bucket or a link to a child node.

Insertion of new buckets with `Set(key, value)` involves splicing in a new element to the data array at the `dataIndex` position and setting the `index` bit of the `map` bitmap. Converting a bucket to a child node leaves the `map` bit map alone as the `index` bit still indicates there is an element at that position.

A `Get(key)` operation performs the same hash, `index` and `dataIndex` calculation at the root node, traversing into a bucket to find an entry matching `key` or traversing into child nodes and performing the same `index` and `dataIndex` calculation but at an offset of an additional `bitWidth` bits in the `key`'s hash.

A `Delete(key)` mutation first locates the element in the same way as `Get(key)` and if that entry exists, it is removed from the bucket containing it. If the bucket is empty after deletion of the entry, we remove the bucket element completely from the data element array and unsets the `index` bit of `map`. If the node containing the deleted element has no links to child nodes and contains `bucketSize` elements after the deletion, those elements are compacted into a single bucket and placed in the parent node in place of the link to that node. We perform this check on the parent (and recursively if required), thereby transforming the tree into its most compact form, with only buckets in place of nodes that have up to `bucketSize` entries at all edges. This compaction process combined with the `key` ordering of entries in buckets produces canonical forms of the data structure for any given set of `key` / `value` pairs regardless of their insertion order or whether any intermediate entries have been added and deleted.

By default, each node in an IPLD HashMap is stored in a distinct IPLD block and CIDs are used for child node links. The schema and algorithm presented here also allows for inline child nodes rather than links, with read operations able to traverse multiple nodes within a single block where they are inlined. The production of inlined IPLD HashMaps is left unspecified and users should be aware that inlining breaks canonical form guarantees.

## Structure

### Parameters

Configurable parameters for any given IPLD HashMap:

* `hashAlg`: The hash algorithm applied to keys in order to evenly distribute entries throughout the data structure. The algorithm is chosen based on speed, `digestLength` and randomness properties (but it must be available to the reader, hence the need for shared defaults, see below).
* `bitWidth`: The number of bits to use at each level of the data structure for determining the index of the entry or a link to the next level of the data structure to continue searching. The equation `2`<sup>`bitWidth`</sup> yields the arity of the HashMap nodes, i.e. the number of storage locations for buckets and/or links to child nodes.
* `bucketSize`: The maximum array size of entry storage buckets such that exceeding `bucketSize` causes the creation of a new child node to replace entry storage.

### Node properties

Each node in a HashMap data structure contains:

* `data`: An Array, with a length of one to `2`<sup>`bitWidth`</sup>.
* `map`: A bitfield, stored as Bytes, where the first `2`<sup>`bitWidth`</sup> bits are used to indicate whether a bucket or child node link is present at each possible index of the node.

An important property of a HAMT is that the `data` array only contains active elements. Indexes in a node that do not contain any values (in buckets or links to child nodes) are not stored and the `map` bitfield is used to determine the `data` whether values are present and the array index of present values using a [`popcount()`](https://en.wikipedia.org/wiki/Hamming_weight). This allows us to store a maximally compacted `data` array for each node.

### Schema

The **root block** of an IPLD HashMap contains the same properties as all other blocks, in addition to configuration data that dictates how the algorithm below traverses and mutates the data structure.

See [IPLD Schemas](../../schemas) for a definition of this format.

```ipldsch
# Root node layout
type HashMapRoot struct {
  hashAlg String
  bitWidth Int
  bucketSize Int
  map Bytes
  data [ Element ]
}

# Non-root node layout
type HashMapNode struct {
  map Bytes
  data [ Element ]
}

type Element union {
  | HashMapNode map
  | &HashMapNode link
  | Bucket list
} representation kinded

type Bucket list [ BucketEntry ]

type BucketEntry struct {
  key Bytes
  value Value (implicit "null")
} representation tuple

type Value union {
  | Bool bool
  | String string
  | Bytes bytes
  | Int int
  | Float float
  | Map map
  | List list
  | Link link
} representation kinded
```

Notes:

* `hashAlg` in the root block is a string identifier for a hash algorithm. The identifier should correspond to a [multihash](https://github.com/multiformats/multihash) identifier as found in the [multiformats table](https://github.com/multiformats/multicodec/blob/master/table.csv).
* `bitWidth` in the root block should be at least `3`.
* `bucketSize` in the root block must be at least `1`.
* Keys are stored in `Byte` form.
* The size of `map` is determined by `bitWidth` since it holds one bit per possible data element. It must be `1` or `2`<sup>`bitWidth`</sup>` / 8` bytes long, whichever is largest.

## Algorithm in detail

### `Get(key)`

1. Set a `depth` value to `0`, indicating the root block
2. The `key` is hashed, using `hashAlg`.
3. Take the left-most `bitWidth` bits, offset by `depth x bitWidth`, from the hash to form an `index`. At each level of the data structure, we increment the section of bits we take from the hash so that the `index` comprises a different set of bits as we move down.
4. If the `index` bit in the node's `map` is `0`, we can be certain that the `key` does not exist in this data structure, so return an empty value (as appropriate for the implementation platform).
5. If the `index` bit in the node's `map` is `1`, the value may exist. Perform a `popcount()` on the `map` up to `index` such that we count the number of `1` bits up to the `index` bit-position. This gives us `dataIndex`, an index in the `data` array to look up the value or insert a new bucket.
6. If the `dataIndex` element of `data` contains a link (CID) to a child block or an inline child block, increment `depth` and repeat with the child node identified by the link from step **3**.
7. If the `dataIndex` element of `data` contains a bucket (array), iterate through entries in the bucket:
   1. If an entry has the `key` we are looking for, return the `value`.
   2. If no entries contain the `key` we are looking for, return an empty value (as appropriate for the implementation platform). Note that the bucket will be sorted by `key` so a scan can stop when a scan yields keys greater than `key`.

### `Set(key, value)`

1. Set a `depth` value to `0`, indicating the root block
2. The `key` is hashed, using `hashAlg`.
3. Take the left-most `bitWidth` bits, offset by `depth x bitWidth`, from the hash to form an `index`. At each level of the data structure, we increment the section of bits we take from the hash so that the `index` comprises a different set of bits as we move down.
4. If the `index` bit in the node's `map` is `0`, a new bucket needs to be created at the current node. If the `index` bit in the node's `map` is `1`, a value exists for this `index` in the node's `data` which may be a bucket (which may be full) or may be a link to a child node or an inline child node.
5. Perform a `popcount()` on the `map` up to `index` such that we count the number of `1` bits up to the `index` bit-position. This gives us `dataIndex`, an index in the `data` array to look up the value or insert a new bucket.
6. If the `index` bit in the node's `map` is `0`:
   1. Mutate the current node (create a copy).
   2. Insert a new element in `data` at `dataIndex` containing an new bucket (array) with a single entry for the `key` / `value` pair.
   3. Create a CID for the mutated node.
   4. If `depth` is `0`, the CID represents the new root block of the HashMap.
   5. If `depth` is greater than `0`:
      1. Mutate the node's parent
      2. Record the new CID of the mutated child in the appropriate position of the mutated parent's `data` array. 
      3. Recursively proceed, by recording the new CIDs of each node in a mutated copy of its parent node until `depth` of `0` where we produce the the new root block and its CID.
7. If the `index` bit in the node's `map` is `1`:
   1. If the `dataIndex` element of `data` contains a link (CID) to a child node or an inline child node, increment `depth`:
      1. If `(depth x bitWidth) / 8` is now greater than the `digestLength`, a "max collisions" failure has occurred and an error state should be returned to the user.
      2. If `(depth x bitWidth) / 8` is less than the number of bytes in the hash, repeat with the child node identified in step **3**.
   2. If the `dataIndex` element of `data` contains a bucket (array) and the bucket's size is less than `bucketSize`:
      1. Mutate the current node (create a copy).
      2. Insert the `key` / `value` pair into the new bucket at a position sorted by `key` such that all entries in the bucket are ordered respective to their `key`s. This helps ensure canonical form.
      3. Proceed to create new CIDs for the current block and each parent as per step **6.c**. until we have a new root block and its CID.
   3. If the `dataIndex` element of `data` contains a bucket (array) and the bucket's size is `bucketSize`:
      1. Create a new empty node
      2. For each element of the bucket, perform a `Set(key, value)` on the new empty node with a `depth` set to `depth + 1`, proceeding from step **2**. This should create a new node with `bucketSize` elements distributed approximately evenly through its `data` array. This operation will only result in more than one new node being created if all `key`s being set have the same `bitWidth` bits of their hashes at `bitWidth` position `depth + 1` (and so on). A sufficiently random hash algorithm should prevent this from occuring.
      3.  Create a CID for the new child node.
      4.  Mutate the current node (create a copy)
      5.  Replace `dataIndex` of `data` with a link to the new child node.
      6.  Proceed to create new CIDs for the current block and each parent as per step **6.c**. until we have a new root block and its CID.

### `Delete(key)`

The deletion algorithm below is presented as an iterative operation. It can also be usefully conceived of as a recursive algorithm, which is particularly helpful in the case of node collapsing. See section "4.2 Deletion Algorithm" of the [CHAMP paper](https://michael.steindorfer.name/publications/oopsla15.pdf) for a description of this algorithm. Note that the linked paper does not make use of buckets so note the importance of counting entries in a node and comparing to `bucketSize` in the algorithm below.

1. Set a `depth` value to `0`, indicating the root block
2. The `key` is hashed, using `hashAlg`.
3. Take the left-most `bitWidth` bits, offset by `depth x bitWidth`, from the hash to form an `index`. At each level of the data structure, we increment the section of bits we take from the hash so that the `index` comprises a different set of bits as we move down.
4. If the `index` bit in the node's `map` is `0`, we can be certain that the `key` does not exist in this data structure, so there is no need to proceed.
5. If the `index` bit in the node's `map` is `1`, the value may exist. Perform a `popcount()` on the `map` up to `index` such that we count the number of `1` bits up to the `index` bit-position. This gives us `dataIndex`, an index in the `data` array to look up the value or insert a new bucket.
6. If the `dataIndex` element of `data` contains a link (CID) to a child node or an inline child block, increment `depth` and repeat with the child node identified in step **3**.
7. If the `dataIndex` element of `data` contains a bucket (array), iterate through entries in the bucket:
   1. If no entries contain the `key` we are looking for, there is no need to proceed. Note that the bucket will be sorted by `key` so a scan can stop when a scan yields keys greater than `key`.
   2. If an entry has the `key` we are looking for, we need to remove it and possibly collapse this node and any number of parent nodes depending on the number of entries remaining. This helps ensure canonical form. Note that there are two possible states below, if neither case matches the state of the current node, we have not satisfied the invariant and the tree is not in a canonical state (i.e. something has failed):
      1. If `depth` is `0` (the root node) or there are links in the `data` array for this node (it has child nodes) or the number of entries across all buckets in this node is currently greater than `bucketSize + 1`, we don't need to collapse this node into its parent, but can simply remove the entry from its bucket.
         1. Mutate the current node (create a copy)
            1. If the bucket located at `dataIndex` of the `data` array contains more than one element, remove the entry from the bucket at `dataIndex` of `data` (the remaining elements must remain sorted by `key`).
            2. If the bucket located at `dataIndex` of the `data` array contains only one element:
               1. Remove `dataIndex` of `data` (such that `data` now has one less element)
               2. Set the `index` bit of `map` to `0`
            3. Create a CID for the new node with the entry removed.
            4. Record the new CID of the mutated child in the appropriate position of the mutated parent's `data` array. 
            5. Recursively proceed, by recording the new CIDs of each node in a mutated copy of its parent node until `depth` of `0` where we produce the the new root block and its CID.
      2. If `depth` is not `0` (not the root node) and there are no links in the `data` array for this node (it has no child nodes) and the number of entries across all buckets in this node is currently equal to `bucketSize + 1`, then this node needs to be collapsed into a single bucket, of `bucketSize` once the entry being deleted is removed, and replaced in its parent's `data` array in place of the link to this node.
         1. Create a new bucket and place all entries in the node except for the one being removed into the new bucket. The new bucket now contains all of the entries from the node and will be used to replace the node in the parent.
         2. Mutate the parent node (create a copy).
         3. Replace the link to the node in the parent's `data` array with the newly created bucket. (Note the position in the parent's `data` array will be dependendent on the `key`'s `index` at `depth - 1` and the `dataIndex` calculated from the parent's `map`).
         4. Create a CID for the new parent.
         5. If the parent is at a `depth` of `0`, i.e. the parent node, the CID represents the new root node.
         6. If the parent is not at `depth` of `0`, repeat from step **7.2** with the parent node. This process should repeat up the tree all the way to `depth` of `0`, potentially collapsing more than one node into its parent in the process.

### `Keys()`, `Values()` and `Entries()`

These collection-spanning iteration operations are **optional** for implementations.

The storage order of entries in an IPLD HashMap is entirely dependent on the hash algorithm and `bitWidth`. Therefore IPLD HashMaps are considered to be random for practical purposes (as opposed to ordered-by-construction or ordered-by-comparator, see [IPLD Multi-block Collections / Collection types](https://github.com/ipld/specs/blob/master/schema-layer/data-structures/multiblock-collections.md#collection-types])). It is left to the implementation to decide the tree-traversal order and algorithm used to iterate over entries.

An implementation should only emit any given `key`, `value` or `key` / `value` entry pair once per iteration.

### Differences to CHAMP

This algorithm differs from CHAMP in the following ways:

1. CHAMP separates `map` into `datamap` and `nodemap` for referencing local data elements and local references to child nodes. The `data` array is then split in half such that data elements are stored from the left and the child node links are stored from the right with a reverse index. This allows important speed and cache-locality optimizations for fully in-memory data structures but those optimizations are not present, or make negligible impact in a distributed data structure.
2. CHAMP does not make use, of buckets, nor do common implementations of HAMTs on the JVM (e.g. Clojure, Scala, Java). Storing only entries and links removes the need for an iterative search and compare within buckets and allows direct traversal to the entries required. This is effective for in-memory data structures but is less useful when performing block-by-block traversal with distributed data structures where packing data to reduce traversals may be more important.

### Canonical form

To achieve canonical forms for any given set of `key` / `value` pairs, we note the following properties in the algorithm:

1. We must keep buckets sorted by `key` during both insertion and deletion operations.
2. We must retain an invariant that states that no non-root node may contain, either directly or via links through child nodes, less than `bucketSize + 1` entries. By applying this strictly during the deletion process, we can generalize that no non-root node without links to child nodes may contain less than `bucketSize + 1` entries. Any non-root node in the tree breaking this rule during the deletion process must have its entries collapsed into a single bucket of `bucketSize` length (i.e. without the entry being removed) and inserted into its parent node in place of the link to the impacted node. We continue to apply this rule recursively up the tree, potentially collapsing additional nodes into their parents.

## Use as a "Set"

The IPLD HashMap can be repurposed as a "Set": a data structure that holds only unique `key`s. Every `value` in a `Set(key, value)` mutation is fixed to some trivial value, such as `true` or `1`. `Has(key)` operations are then simply a `Get(key)` operation that asserts that a value was returned.

## Implementation defaults

Implements need to ship with _sensible defaults_ and be able to create HashMaps without users requiring intimate knowledge of the algorithm and the all of the trade-offs (although such knowledge will help in their optimal use).

These defaults are descriptive rather than prescriptive. New implementations may opt for different defaults, while acknowledging that they will produce different graphs (and therefore CIDs) for the same data as with the defaults listed below. Users may also be provided with facilities to override these defaults to suit their use cases where these defaults do not produce optimal outcomes.

### `hashAlg`

* The default supported hash algorithm for writing IPLD HashMaps is the x64 form of the 128-bit [MurmurHash3](https://github.com/aappleby/smhasher) (identified by the multihash name ['murmur3-128'](https://github.com/multiformats/multicodec/blob/master/table.csv)). Note the x86 form will produce different output so should not be confused with the x64 form. Additionally, [some JavaScript implementations](https://cimi.io/murmurhash3js-revisited/) do not correctly decompose UTF-8 strings into their constituent bytes for hashing so will not produce portable results.
* Pluggability of hash algorithms is encouraged to allow users to switch switch if their use-case has a compelling reason. Such pluggability requires the supply of an algorithm that takes Bytes and returns Bytes. Users changing the hash algorithm need to be aware that such pluggability restricts the ability of other implementations to read their data since matching hash algorithms also need to be supplied on the read-side.

### `bitWidth`

* The default `bitWidth` is `8` for writing IPLD HashMaps. This value yields a `data` length of `2`<sup>`8`</sup>`=256`. `8` is also simple in most programming languages to slice off a list of bytes since it's a simple byte-index. However, implementations should be designed to support different `bitWidth`s encountered when reading IPLD HashMaps. The minimum supported `bitWidth` should be `3`. No maximum is specified, however implementers should be aware that interoperability problems may arise with large `bitWidth` values.

### `bucketSize`

* The default `bucketSize` is `3` for writing IPLD HashMaps. Combined with a `bitWidth` of `8` this yields a theoretical maximally full node (with no child nodes) of `256 x 3 = 768` `key` / `value` pairs. The minimum supported `bucketSize` should be `1`. No maximum is specified, however implementers should be aware that interoperability problems may arise with very large `bucketSize` values.

### Maximum key size

Implementations may impose a maximum key size for writing IPLD HashMaps. Reading IPLD HashMaps with keys larger than the maximum they define for reading is not defined in this specification.

### Inline values

Implementations may choose to write all values in separate blocks and store only CIDs in Value locations in an IPLD HashMap. Alternatively, a rough size heuristic may also be applied to make a decision regarding inline versus linked blocks. Or this decision could be left up to the user via some API choice. As storage of arbitrary kinds in Value locations is allowed by this specification, implementations should support this for read operations.

## Possible future improvements and areas for research

### Maximum depth limitations

One aim of IPLD collections is to support arbitrarily large data sets. This specification does not meet this requirement as there is a maximum depth imposed by the number of bits in a hash.

Future iterations of this specification may explore:

 * Default hash algorithm(s) outputting a larger number of bits (e.g. a cryptographic hash function such as SHA2-256).
 * Resetting the `index` calculation to take bits from the start of the hash once maximum-depth is reached, allowing or theoretically infinite depth data structures.
 * Allowing flexibility in `bucketSize` at maximum-depth nodes.

### Hash algorithm

* The use of MurmurHash3 x64 128-bit needs further research and modelling. There may be more appropriate default algorithms for the IPLD HashMap with more optimal characteristics (speed, randomness, suitability for a web environment, etc.).
* There may arise a demonstrated need to encode a nonce or key in the root block to support keyed hash algorithms.

### Buckets

The impact on the data structure layout imposed by the use of buckets in the IPLD HashMap needs to be researched and the costs and benefits properly quantified. It is possible that buckets may be removed from a future version of this specification depending on the results of such research.

### Security

As yet, there is no known hash collision attack vector against IPLD data structures. There may conceivably be use cases where user-input is able to impact `key`s and collisions against a chosen `hashAlg` are practical. In such cases, an IPLD HashMap could be built whereby it reaches its maximum depth of `(digestLength x 8) / bitWidth` quickly and further colliding additions cause errors and possible denial of service. The current use-cases of IPLD do not lend themselves to denial of service attacks of this kind. Further practical application and research may change this understanding and dictate the need for hash algorithms with large byte output and/or cryptographic hash algorithms without known collision flaws.
