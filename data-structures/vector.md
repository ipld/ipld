# Specification: Vector

**Status: Prescriptive - Draft**

* [Introduction](#Introduction)
* [Useful references](#Useful-references)
* [Summary](#Summary)
  * [Example](#Example)
  * [Algorithmic properties](#Algorithmic-properties)
* [Structure](#Structure)
  * [Parameters](#Parameters)
  * [Node properties](#Node-properties)
  * [Schema](#Schema)
* [Algorithm in detail](#Algorithm-in-detail)
  * [`Get(index)`](#Getindex)
  * [`PushTail(value)`](#PushTailvalue)
  * [`Size()`](#Size)
  * [`CreateFrom(array, width)`](#CreateFromarray-width)
  * [`Set(index, value)`](#Setindex-value)
  * [`PopTail()`](#PopTail)
  * [Full copy mutations: `Delete(index)`, `PushHead(value)`, `PopHead()`, `Slice(start, end)`](#Full-copy-mutations-Deleteindex-PushHeadvalue-PopHead-Slicestart-end)
* [Implementation defaults](#Implementation-defaults)
* [Performance profile](#Performance-profile)
* [Possible future improvements and areas for research](#Possible-future-improvements-and-areas-for-research)
  * [Compression for sparse arrays](#Compression-for-sparse-arrays)
  * [Flexible head for efficient operations a the head and for sub-trees](#Flexible-head-for-efficient-operations-a-the-head-and-for-sub-trees)

## Introduction

The IPLD Vector distributes ordered-by-construction values across a tree structure with a pre-definable branching factor (`width`) that is consistent across all nodes in the tree. The tree defines node "height" rather than "depth", with the values stored in leaf nodes with a `height` of `0`. All these leaf nodes are organized into a collection of `height` `1` nodes which contain links to the leaf nodes rather than values. We continue to increment `height` until we have a single node as the root of the tree.

An IPLD Vector containing fewer values than the `width` of the Vector can be represented by a single root node, with a `height` of `0` and a `data` array containing only the values. Once an IPLD Vector expands beyond `width`, we add additional sibling `height` `0` nodes and reference them in a parent `height` `1` node. Once the `height` `1` node expands beyond `width` child nodes, we perform the same operation by adding a new `height` `2` node to organize `height` `1` nodes.

## Useful references

* [Understanding Clojure's Persistent Vectors, pt. 1](https://hypirion.com/musings/understanding-persistent-vector-pt-1) and [pt. 2](https://hypirion.com/musings/understanding-persistent-vector-pt-2) are excellent introductions to some of the concepts covered here, including graphics that help describe the tree structures.
* [Fast And Space Efficient Trie Searches](https://infoscience.epfl.ch/record/64394/files/triesearches.pdf) by Phil Bagwell, 2000, and [Ideal Hash Trees](http://lampwww.epfl.ch/papers/idealhashtrees.pdf) by Phil Bagwell, 2001, introduce the AMT and HAMT concepts, which has some similarity to the data structure described here.
* Daniel Spiewak's Strange Loop '01 presentation titled [Extreme Cleverness: Functional Data Structures in Scala](https://www.infoq.com/presentations/Functional-Data-Structures-in-Scala/) covers the concept of Bitmapped Vector Tries, roughly equivalent to Clojure's Persistent Vector which is roughly the same as the data structure outlined here.
* [sharray](https://github.com/whyrusleeping/sharray) a Go implementation of this data structure directly implemented against CBOR with Create and Iteration functionality.
* [iavector](https://github.com/rvagg/iavector) the JavaScript reference implementation of this data structure.

## Summary

IPLD Vector's algorithm is roughly based on the data structure used by [PersistentVector in Clojure](https://github.com/clojure/clojure/blob/master/src/jvm/clojure/lang/PersistentVector.java) and referred to as a Bitmapped Vector Trie in [Scala's Vector](https://github.com/scala/scala/blob/v2.13.0/src/library/scala/collection/immutable/Vector.scala). It has roots in the concept of Array Mapped Tries (AMT), as outlined in Phil Bagwell's [papers](https://infoscience.epfl.ch/record/64394/files/triesearches.pdf) on the [subject](http://lampwww.epfl.ch/papers/idealhashtrees.pdf). In these data structures, the indexing at each level of the trie comprises portions of the requested index. By taking advantage of efficient bitwise operations, we can slice an index into segments which point us through each level as we descend to the final value. The concept is roughly similar to slicing a hash as outlined in the [IPLD HashMap](hashmap.md) specification, except that we are slicing an index.

One major difference with these data structures come from IPLD's minimal capacity to make use of the efficiencies afforded by bitwise operations. Without requiring bitwise operations, we don't have a strong need to align to byte or word boundaries and can use non-bitwise operations to perform our indexing function. Hence, the `width` of the IPLD Vector is variable (not a power of `2` as for the width of nodes in the [HashMap](hashmap.md)), from a lower bound of `2`, for very tall trees that yield very small blocks, up to very large values that yield shallow trees but very large blocks. We leave the option of storing leaf values as CIDs or inline data up to the user, thereby affording the possibility of tuning `width` to the desired block size with a traversal cost trade-off.

IPLD Vectors don't implement a `map` as in [HashMap](hashmap.md) or as may be used in an AMT to support compression for sparse arrays. It is assumed that most IPLD Vector usage will not be for sparse data and if sparse storage is needed that nodes containing empty `data` array slots are acceptable. Note, however, that `Size` does not account for empty elements in this data structure.

A fully inlined option for this data structure is not presented here as this can be achieved by copying the data from an IPLD Vector into a new Vector whose `width` is at least the `Size` of the original and ensuring that values are inlined when stored. Therefore it is assumed that any nodes with `height` greater than `0` will have `data` arrays containing only `CID`s which are links to child nodes.

### Example

For a `width` of `3`, we can construct an tree to contain a series of values. In this case our values start with `1` and increment for ease of example. Nodes will be indicated by lists of up to 3 items captured within `[` and `]`.

```
Height
↓
0:    [1 2 3]

      Size: 3
```

In this case, we have a single node containing the 3 values. `height` for the node is `0`.

Appending two more values results in the following form:

```
Height
↓
1:            [a b]
         ┌─────┘ │
0:    [1 2 3] [4 5]

      Size: 5
      Max size before root overflow: 9
      Head chain: a → 1
      Tail chain: b → 5
```

We now have two leaf nodes with `height` `0` containing our 5 values. Because they need to be stored in two nodes we add a `height` `1` node as our new root to contain links to them in appropriate order. We can also introduce the concept of a "head chain" and a "tail chain" as these become helpful in some operations on the data structure. The head chain points to the "head" node, or left-most if we conceive of our data nodes laid out from left to right in order. To navigate to the head we follow the head chain from the node containing `a` to the node containing `1`. The tail chain leads from the same root node down to the node containing `5`.

We can fill up our `height` `1` node by adding 4 more values:

```
1:            [a b c]
         ┌─────┘ │ └─────┐
0:    [1 2 3] [4 5 6] [7 8 9]

      Size: 9
      Max size before root overflow: 9
      Head chain: a → 1
      Tail chain: c(full) → 9(full)
```

Our tree is maximally full with a root node at `height` `1`, any additional inserts will result in an overflow to `height` `2` to contain the data:

```
2:                                       [A  B]
                 ┌────────────────────────┘  │
1:            [a b c]                    [d  e]
         ┌─────┘ │ └─────┐        ┌───────┘  │
0:    [1 2 3] [4 5 6] [7 8 9] [10 11 12] [13 14 15]

      Size: 15
      Max size before root overflow: 27
      Head chain: A → a → 1
      Tail chain: B → e → 15(full)
```

We now have 3 different heights, accessing any value requires traversal of two additional nodes beyond the root. We can see that this can be generalised such that the `height` of the root node tells us the number of additional nodes required for a full traversal to any index.

Note that our "overflow" semantics don't just operate at the highest level of the tree, they also occur at intermediate levels. These overflows may or may not result in cascading overflows up the chain, most often they won't as the higher levels will have capacity to absorb new entries.

```
2:                                       [A  B]
                 ┌────────────────────────┘  │
1:            [a b c]                    [d  e  f]
         ┌─────┘ │ └─────┐        ┌───────┘  │  └────────┐
0:    [1 2 3] [4 5 6] [7 8 9] [10 11 12] [13 14 15] [16 17 18]

      Size: 18
      Max size before root overflow: 27
      Head chain: A → a → 1
      Tail chain: B → f(full) → 18(full)
```

At 27 items, we have a full `height` `2`, `width` `3` tree:

```
2:                                       [A  B  C]
                ┌─────────────────────────┘  │  └─────────────────────────────┐
1:            [a b c]                    [d  e  f]                        [g  h  i]
         ┌─────┘ │ └─────┐        ┌───────┘  │  └────────┐         ┌───────┘  │  └────────┐
0:    [1 2 3] [4 5 6] [7 8 9] [10 11 12] [13 14 15] [16 17 18] [19 20 21] [22 23 24] [25 26 27]

      Size: 27
      Max size before root overflow: 27
      Head chain: A → a → 1
      Tail chain: C(full) → i(full) → 27(full)
```

An overflow adds an additional level and space for `width`<sup>`height+1`</sup>, or `3`<sup>`4`</sup>`= 81` items.

```
3:                                                                                              [i  ii]
                                             ┌───────────────────────────────────────────────────┘  │
2:                                       [A  B  C]                                                 [D]
                ┌─────────────────────────┘  │  └─────────────────────────────┐                     │
1:            [a b c]                    [d  e  f]                        [g  h  i]                [j]
         ┌─────┘ │ └─────┐        ┌───────┘  │  └────────┐         ┌───────┘  │  └────────┐         │
0:    [1 2 3] [4 5 6] [7 8 9] [10 11 12] [13 14 15] [16 17 18] [19 20 21] [22 23 24] [25 26 27] [28 29 30]

      Size: 30
      Max size before root overflow: 81
      Head chain: i → A → a → 1
      Tail chain: ii → D → j → 30(full)
```

### Algorithmic properties

We can derive the **maximum number of elements containable under a node and its children** with a `height` of `X` with `width`<sup>`X + 1`</sup>. At a `height` of `0`, we can only fit `width` elements into a single node. Add a `height` `1` parent and we can fit in `width`<sup>`2`</sup> elements across all child `height` `0` nodes underneath it. This calculation is useful for at least `Size` and append (which we will call `PushTail`) operations.

**Overflows** during `PushTail` operations do not always cascade to upper levels of the tree. Cascades only occur where an upper level is maximally full. So a cascade causing the addition of a new root level at `height + 1` only happens when all levels are full.

**All nodes are valid IPLD Vectors**, and as such may be extracted to represent slices of the overall parent data structure. This becomes less useful as we increase `width`, as the start index of a slice must align with a node boundary such that the new head node is a copy of an existing node. Otherwise all elements need to be shuffled toward the head, therefore mutating the entire data structure. Lack of alignment a the tail of a slice only requires mutations on the tail chain.

**Copy-on-write semantics** extend beyond slicing, as with other IPLD data structures, so that mutations require a minimal set of changes cascading up from the changed leaf (`height` `0`) node, up to the root node. Any single-value mutation, either `PushTail` or `Replace`, require a replacement of a single node at each level of the tree.

```
1:            [a b c]  (old root node)
         ┌─────┘ │ └─────┐
0:    [1 2 3] [4 5 6] [7 8 9]


Replace(5, X) → replace position 5 (value '6'), with a new value, 'X'

1.1:                            [a Y c]  (new root node)
         ┌───────────────────────┘ │ │
1:       │    [a b c]    ┌─────────┼─┘
         ├─────┘ │ └─────┤         │
0:    [1 2 3] [4 5 6] [7 8 9]   [4 5 X]
```

### Canonical form

Given any fixed set of ordered data and any particular `width`, an IPLD Vector will maintain a canonical form regardless of the construction method or any changes that take place to arrive at the final fixed set of ordered data. e.g. using a `CreateFrom` on an array and using that same array to iteratively `PushTail` the items into a Vector, both vectors will have the same properties and the root nodes will yield the same hash. This is also true if `Set` operations are performed on the data as long as he final set of data is the same.

Varying `width` always yields different root hashes regardless of data.

## Structure

### Parameters

The only configurable parameter of an IPLD Vector is the `width`. This parameter must be consistent across all nodes in a Vector. Mutations cannot involve changes in `width` or joining multiple parts of a Vector with differing `width` values.

`width` must be an integer, of at least `2`.

### Node properties

Each node in an IPLD vector stores the `width`, the `height` of the node, starting from `0` where values are stored, and a `data` array to contain values (for `height` `0`), or child node CIDs (for `height`s above `1`).

### Schema

```ipldsch
type Vector struct {
  width Int
  height Int
  data [ Value ]
}

type Value union {
  | Link link
  | Bool bool
  | String string
  | Bytes bytes
  | Int int
  | Float float
  | Map map
  | List list
} representation kinded
```

**Constraints:**

* Non-leaf (`height` greater than `0`) nodes only contain `Link`s to other `Vector` nodes in their `data` array.
* `width` must be consistent across all nodes in a Vector.
* `height` must be at least `0`.
* `data` can contain between `1` and `width` elements. For the special case of the empty Vector, a single root node may have `0` elements in `data`.

## Algorithm in detail

### `Get(index)`

`index` is a zero-based in all cases.

`Get` can either be implemented as a recursive or iterative process.

1. If `index` is less than zero, return undefined or an OOB indication.
2. Calculate the maximum possible index for a tree with this `height` using `width`<sup>`height + 1`</sup>. If the index is greater than this maximum, returned undefined or an OOB indication.
3. Calculate the local `dataIndex`, the index of this node's `data` array, using `floor(index / width`<sup>`height`</sup>`)`.
4. If `dataIndex` is greater than or equal to the length of this node's `data` array, return undefined or an OOB indication.
5. If `height` is `0`, return the element at the `dataIndex` position of this node's `data` array.
6. If `height` is greater than `0`, retrieve the CID of the next node from the `dataIndex` position of this node's `data` array.
7. Recurse or iterate from Step 1 with the next node with `index` set to `index % width`<sup>`height`</sup> to identify its place in the sub-tree.

### `PushTail(value)`

`PushTail` appends `value` to the tail of the data structure. This increases the Vector's `Size` by `1` and may cause zero or more overflows throughout the tree but will result in a single mutation at each `height` of the Vector, including the root and possibly the creation of a new root node at `height + 1` if an overflow cascades to the root.

This algorithm can be implemented as a recursive or iterative process. A recursive process will need to propagate additional state when mutating back up the tree from the mutated root.

In this algorithm, we keep a `mutated` state variable to indicate whether there was a mutation while modifying the tail chain. In the case of a mutation we only need to _replace_ links to a child node so there are no overflows from this point upward. In addition, we reuse `value` such that the first time it is used should be `height` `0` where it's the originally supplied `value`, but from that point back up the chain it becomes a link to a child node.

1. Collect the "tail chain" of nodes:
   1. Append the root to the tail chain.
   2. If the current node's `height` is `0`.
      1. The tail chain is complete, continue to step 2.
   3. If the current node's `height` is greater than `0`.
      1. Locate the next tail node identified by the CID at the last position of the current node's `data` array. Add it to the tail chain.
      2. Repeat from step 1.ii with the next tail node.
2. Store a `mutated` state variable, set initially to `false`.
3. If the tail chain contains at least one entry.
   1. Pop the tail node of the tail chain as the "current node"
      1. If the `mutated` state variable is `true` we only need to replace the link to a child node.
         1. Create a copy of the current node, replacing the last element of the `data` array of the copy with `value`. This is guaranteed to be at `height` of at least `1` since `mutated` begins as `false`, so we are only replacing links to mutated nodes.
         2. Repeat from step 3 with `value` set to the CID of the mutated node.
      2. If the length of the `data` array at the current node is less than `width`, no overflow is necessary.
         1. Create a copy of the current node, appending `value` to the end of the `data` array of the copy.
         2. Set `mutated` to `true`
         3. Repeat from step 3 with `value` set to the CID of the mutated node.
      3. If the length of the `data` array at the current node is `width`, an overflow is necessary.
         1. Create a new node with the same `height` as the current node and a `data` array that only contains the single `value`.
         2. Set the `mutated` state variable to `false`.
         3. Repeat from step 3 with `value` set to the CID of the new node.
4. If the tail chain is empty (this does not occur on the first pass as the root is always in the tail chain).
   1. If `mutated` is still `false`, we have had cascading overflows up to the root so we need to add a new level to the Vector.
      1. Create a new node with the original root node's `height + 1`, add two values to its `data` array: the CID of the original root node and `value` which will be the CID of a new, overflowed child node.
      2. Return the CID of the new node, which becomes the new root node.
   2. If `mutated` is `true`
      1. Return `value`, which should be the CID of the last mutated node, which becomes the new root node.

### `Size()`

The `Size` algorithm uses a subtractive process, first calculating the maximum potential size and then iterating through the tail chain to subtract known empty portions given varying `data` array sizes at each `height`. If `data` arrays are maximally full at each `height` then the original maximum potential size calculation is used as the correct value.

1. Set `size` to be the maximum potential size of the data structure with `width`<sup>`height + 1`</sup>.
2. Calculate the number of empty potential value slots at this height with `width`<sup>`height`</sup>` x (width - dataLength)`</sup>, where `dataLength` is the number of elements in the current node's `data` array and `height` is the current node's `height`. Subtract this value from `size` and set the result as the new `size`.
3. If the current node's `height` is `0`.
   1. Return `size` as the correct size.
4. If the current node's `height` is greater than `0`.
   1. Locate the next tail node identified by the CID at the last position of the current node's `data` array.
   2. Repeat from step 2 with the next tail node as the "current node".

### `CreateFrom(array, width)`

1. Set `height` to `0`, indicating that each node created at this `height` will have leaf values in it rather than links to child nodes.
2. Calculate `nodeCount` for this `height` with `ceiling(arrayLength / width)`, where `arrayLength` is the number of elements in `array`.
3. Create a temporary `nextArray` array which starts empty but will fill up to `nodeCount`.
4. Iterate with an incrementing integer `i` from `0` up to, but not including `nodeCount`.
   1. Take a slice of `array` beginning at element `i x width` and ending at the element before `(i + 1) x width` or `arrayLength`, whichever is least.
   2. Create a new node, with `height` and a `data` array containing the array slice.
   3. Append the CID for the new node to `nextArray`.
5. If `nodeCount` is `1`, return the element in `newArray` as this is the CID of the root node for the new Vector.
6. If `nodeCount` is greater than `1`.
   1. Set `array` to be `newArray` such that the next set of values for nodes will be links to the newly created nodes.
   2. Set `height` to `height + 1`.
   3. Repeat from from step 2.

### `Set(index, value)`

_TODO_

_A combination of `Get` for indexing, and `PushTail` for mutation but with `mutate` always `true` so there are no overflows._

### `PopTail()`

_TODO_

### Full copy mutations: `Delete(index)`, `PushHead(value)`, `PopHead()`, `Slice(start, end)`

_TODO_

_These will mostly involve a filtered copy with something resembling `CreateFrom`. `Slice` may have caveats where the indexes are multiples of `width` so may not require a full copy._

### `Values()`

Collection-spanning iteration operations are **optional** for implementations, although they are encouraged as they are generally programmatically useful for ordered collections.

The storage order of entries in an IPLD Vector is the same as index order. Therefore, a `Values` operation should traverse the tree from head to tail (left to right if conceptually laid out horizontally). Values should be emitted from head to tail of `data` arrays in `height` of `0` nodes _only_. All other nodes with a `height` greater than `0` are intermediate and do not contain values so should be used for traversal only.

## Implementation defaults

The only parameter that can be tuned for an IPLD Vector is the `width`. The default `width` is `256`.

The intention is that IPLD data structure implementations ship with _sensible defaults_. The aim is to create Vectors without users requiring intimate knowledge of the algorithm and the all of the trade-offs (although such knowledge will help in their optimal use). The default of `256` is descriptive rather than prescriptive. New implementations may opt for a different default for `width`, while acknowledging that they will produce different graphs (and therefore CIDs) for the same data. Users may also be provided with facilities to override these defaults to suit their use cases where these defaults do not produce optimal outcomes.

The primary trade-off for `width` is node, and therefore block, size. In a maximally full node using CIDs, the block size is roughly at least `256 x size(CID)`. Users storing smaller values inline inside an IPLD Vector may opt for a large `width` to avoid small nodes.

## Performance profile

* Efficient in look-up operations: `Get` and `Size`, each requiring only a straight traversal to a `height` of `0` node.
* Mutations at the tail or that change values in-place are efficient even as the data structure size increases: `Create`, `Replace`, `PushTail` and `PopTail`. These only require mutations or the creation of nodes along the tail chain and the possible creation of a new `height + 1` root node for full overflows.
* Operations which mutate the size of the data structure _not_ at the tail are very inefficient: `PushHead`, `PopHead` and any non-tail `Delete`, generally requiring copying the entire data structure.
* `Slice` / sub-tree operations are only efficient if they deal precisely with `width` boundaries as they may not even require the creation of new nodes, simply referencing internal nodes. With large `width`s, however, we reduce the possibility of efficient slicing and must resort to copying the entire data structure.
* Index-ordered `Iterator`s are efficient as it is a standard balanced tree traversal, left to right.

## Possible future improvements and areas for research

### Compression for sparse arrays

A compressed form of this data structure could implement a `map` similar to the HAMT algorithm in [HashMap](hashmap.md) for a more classic AMT structure. This would allow variable depth node creation for sparse arrays, compressing in both depth and height. Such an implementation would store a `map` bitmap in each node with bits set and unset to indicate whether an index is present and a `popcount()` operation performed to find the index within the `data` array. Where an array is very sparse, entire sections of the tree may be avoided. Algorithmic complexity is a trade-off for this implementation.

### Flexible head for efficient operations a the head and for sub-trees

By treating the head of the data structure in the same way as the tail, we could allow efficient `PushHead` and `PopHead` operations and efficient sub-tree or `Slice` operations. Instead of assuming that the head chain is fixed and that the head of each `data` array in the head chain, we allow the head chain to grow in reverse in almost the opposite way that the tail chain grows for `PushTail` operations. `PushHead` operations would overflow to the head of the data structure.

`Slice` operations taking an arbitrary subset of the tree's values would only need to mutate nodes in the head chain and tail chain, leaving internal nodes intact.

Two primary trade-offs are an increase in algorithmic complexity and some loss of efficiency as the head chain needs to be traversed to understand both the `Size` and the zero-reference point for `Get` indexing. The efficiency losses could be offset by storing additional metadata in each node regarding its own head chain or its head chain size (the total number of values stored below it on nodes unaligned to `width`). By pre-loading this information we could assume both the head-leaning size for `Size` operations and the head offset for `Get` indexing.

An additional trade-off is the loss of canonical forms once any operations are performed on the head of the data structure as two trees can contain the same set of data yet yield different hashes as they are spread across differently shaped trees.
