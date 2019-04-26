# IPLD Multi-block Collections

Organizing IPLD data into usable, efficient, complex collections spanning many blocks aimed for use by end-user applications.

This document will re-use some terms found in the [IPLD data model](/IPLD-Data-Model-v1.md), in particular "Map" and "List". These should not be confused as they are operating at different layers of the IPLD stack. In the context of the data model, these names represent forms that are serialized into blocks along with other primitive data kinds. However, a "Map" or a "List" as a multi-block collection is a structure that is mapped on to many blocks (making use of the primitive kinds in the data model within those blocks in various ways), and exposing interfaces for building and interacting with complex and potentially arbitrarily large data structures. A multi-block collection combines specific data model encoding for individual blocks as well as logic that ties multiple blocks together into a useful data structure.

Contents:

* [Background](#background)
* [Immutability](#immutability)
* [Portability](#portability)
* [Collection types](#collection-types)
  * [Singular collections](#singular-collections)
    * [Unordered](#unordered)
      * [`Set`](#set)
    * [Ordered by construction](#ordered-by-construction)
      * [`List`](#list)
      * [`Queue`](#queue)
      * [`Stack`](#stack)
    * [Ordered by comparator](#ordered-by-comparator)
      * [`SortedSet`](#sortedset)
  * [Associative collections](#associative-collections)
    * [Unordered](#unordered-1)
      * [`Map`](#map)
    * [Ordered by construction](#ordered-by-construction-1)
      * [`ListMap`](#listmap)
    * [Ordered by comparator](#ordered-by-comparator-1)
      * [`SortedMap`](#sortedmap)

## Background

Collections are a fundamental primitive in every programming language. Being able to organize data into collections that allow for convenient and efficient access and modification is a core activity in programming.

IPLD is not a programming language, but it represents enormous potential for sharing data and providing access to diverse and very large data sets. With sufficient data organization primitives, IPLD can replace many functions traditionally provided by a centralized database system. Client applications should be able to access and even manipulate data structures stored across many peers, from trivial lists to massive and complex data sets that are exposed with efficient query and search operations.

At its core, IPLD data is presented as a simple directed acyclic graph (DAG), with objects being able to store both stand-alone data and links to existing objects (it's both "directed" and "acyclic" because new blocks can only append and reference already-created blocks). In addition, because IPLD exposes only a content-addressed storage model, usability of the core IPLD data-access primitives for building rich applications is severely limited. IPLD essentially presents an append-only collection with inflexible indexing. However, as IPLD combines a set of standard data primitives (numbers, strings, bytes, etc.) with expansive linking capabilities, we can build abstractions that present both efficient and useful access to expansive data collections.

* **Efficient** in the sense that linear iteration and searches of naively linked data does not scale and is not practical in large peer-to-peer data sets. Efficiency in an IPLD collection abstraction must be _at least_ better than a linear scan and pushes toward an absolute minimum number of link traversals to access single data elements within very large collections.
* **Useful** in the sense that rich applications are only practical when a basic set of data organization tools are available: maps, sets, arrays. And functionality to interact with that data is straightforward: lookups, searches, queries, mutations.

IPLD, by design, removes the distinction between local and remote data sources (i.e. memory, disk, database/network). Data collection abstractions should remain consistent with this, essentially providing application programmers with simple access to potentially massive distributed data stores. With such interfaces, apparently simple data fetch operations, such as `Map->Get(Key)`, could traverse extremely large and distributed data stores without the aid of an intermediate, such as a DBMS (or perhaps without the _apparent_ aid of an intermediate since the IPFS network and its protocols provides such a service).

## Immutability

As a content-addressed storage system, all collections implemented on top of IPLD are immutable. That is, any particular instance of a collection represents a structure that cannot change as the content, including its links, are fixed by their addresses.

It is likely that all IPLD collections will be represented by a single "root" block that provides a gateway to the entire collection—the beginning of a traversal algorithm specific to that collection (although we should not preclude the possibility of novel collections that aren't represented by a single root block). Any mutation of an IPLD collection necessarily means the alteration of content within the data structure. At a minimum this will require at least the creation of a new root block to contain such changes. For large data sets that span many blocks, mutations are likely to require a cascading replacement of many blocks. This will lead to copy-on-write semantics, where mutations of an existing data structure result in an overlay of only those blocks that must change to reflect those updates. In practical terms, many root blocks representing different data sets may share intermediate blocks if they are derived from similar sources via mutation operations; and as a content-addressed storage system it's entirely possible for collections created completely independently to share components if their content and links resolve to the same addresses.

For the purpose of mutation, IPLD collection interfaces will either have to track replaced root blocks or expose copy-on-write directly by returning new root blocks when users call mutation operations.

For example:

```
A = Collection(OldRoot)
A.Add(Element1)
A.Delete(Element2)
NewRoot = A.Root
```

or

```
NewRoot1 = Collection(OldRoot).Add(Element1)
NewRoot2 = Collection(NewRoot1).Delete(Element2)
```

## Portability

All collection types must be implementable across multiple languages and serialized forms must be consistent. A high-level schema (TODO: link when we have one) and algorithm description should be available to make implementation possible across multiple programming languages. Collections should not be restricted to a single encoding form (e.g. CBOR or JSON) but the schema should make it possible for them to be represented across any that support IPLD schemas.

Portability should mean that collections created in Go should be usable in the browser, for example. Any two communicating applications should be able to share data using IPLD collections regardless of what language, platform or operating system being used.

## Collection types

Collections can be broadly categorized across two dimensions: singular or associative and ordered or unordered:

 * **Singular** collections that contain stand-alone entities. These entities may be complex but do not depend on an association with a "key".
 * **Associative** collections that contain pairs, in the form of a "key" and a "value". Where the "key" is generally a simple type, such as a string, and the "value" can be complex.

_The delineation between singular and associative collections is not strict. An indexed vector or array could be categorized as a key/value store where the keys are the indexes, and a Map whose values are ignored could be used as a Set._

 * **Ordered** collections expose their elements in some form of ordering. Ordering can either be "natural" based on some comparator of their elements or keys, or be dictated by construction, such as a vector whose elements are indexed by the order in which they are added. Iterators on ordered collections become useful for search operations, particularly when subset-selection is possible (i.e. range queries).
 * **Unordered** collections do not expose their elements in any useful order. Unordered collections are generally more efficient in their layout and access for large amounts of data and their algorithms are often simpler than that for ordered collections.

Below is a list of collection types that have been found useful across many programming platforms. This currently represents a _wish-list_ for IPLD and pointers to areas of research. It is anticipated that multiple forms of any one type of IPLD collection may emerge, using different schemas and algorithms and being suited to different types and size of data.

These collections are not necessarily distinct. It is likely that IPLD collection implementations can serve as multiple collection types among this list. For example: a HashMap can also act as a HashSet (in fact it is common for implementations of these to share underlying components), or a Vector could expose operations that allow it to act as a simple Queue or Stack. It is probable that a small number of algorithms will serve as primitives for building many, or all of these data structures. Users should be able to select the interface that meet their programming needs and the implementations that best serve their data type and size needs. Trade-offs will be common and users will need to be presented with sufficient information to make appropriate choices.

Operations exposed by collections may depend on user ergonomics and the practicalities of the underlying algorithms. For example, an ordered collection may expose `Floor()` and `Ceiling()` convenience operations or only expose iterators with floor/ceiling modifiers that can serve the same purpose. The nature of collections algorithms is such that there may be efficiency reasons whereby apparent convenience methods provide significant performance gains over their long-hand versions.

_When listing collection operations below, those indicated with a '`?`' are not strictly necessary for a useful implementation of that collection type but are commonly made available for convenience._

### Singular collections

#### Unordered

##### `Set`

A simple collection of non-duplicate entries stored without useful ordering.

Operations include:

* `Add(element)`
* `Remove(element)`
* `Iterate()`
* `Contains(element)?`
* `Size()?`
* `SubSet()?`

Implementations:

* Java: HashSet
* Scala: HashSet
* Clojure: hash-set
* JavaScript: Set (no duplicates but ordered by insertion)
* C++: unordered_set

#### Ordered by construction

##### `List`

An ordered collection that allows addressing and modification by index. Duplicates are allowed although only single elements may exist at any index. Indexes are not necessarily contiguous.

Operations include:

* `Add(element)`
* `Add(element, index)`
* `Get(index)`
* `Remove(index)`
* `Remove(element)`
* `Iterate()`
* `Contains(element)?`
* `IndexOf(element)?`
* `Replace(index, element)?`

Some implementations implement a fixed size (i.e. Array / Vector) and may include `Resize()?` or `EnsureSize()?` operations exposing implementation details for the sake of performance.

Vector (and Array) variants are generally designed to allow (near) constant-time addressing of individual elements, whereas a standard List type may be most efficient when dealing with one end.

Implementations:

* Java: Vector, ArrayList, LinkedList, CopyOnWriteArrayList, LinkedHashSet
* Scala: List, Vector
* Clojure: list, vector
* JavaScript: Array, TypedArray, Set (no duplicates)
* C++: array (fixed-size), vector, list, forward_list

##### `Queue`

A FIFO list allowing only insertions in one end and retrieval from the other.

Operations include:

* `Add(element)`
* `Remove()`
* `Peek()`

Implementations:

* Java: Queue, Deque (double-ended)
* Scala: Queue
* C++: queue, deque (double-ended)

##### `Stack`

A LIFO list allowing only insertions and retrieval from a single end.

Operations include:

* `Push()`
* `Pop()`
* `Peek()`

Implementations:

* Java: Stack
* Scala: Stack
* C++: stack

#### Ordered by comparator

##### `SortedSet`

A simple collection of non-duplicate entries that is ordered according to some comparison operation. 

Operations include all those for an unordered Set and may extend to include:

* `First()`
* `Last()`
* `Floor()?`
* `Ceiling()?`
* `Iterate()`
* `SubSet()?`

The `Iterate()` and `SubSet()?` operations may include "floor", "ceiling" and direction modifiers for range queries; `Floor()` and `Ceiling()` methods may be unnecessary convenience methods in this case.

Implementations:

* Java: TreeSet, PriorityQueue
* Scala: TreeSet
* Clojure: sorted-set
* C++: set, multiset (can contain duplicate elements)

### Associative collections

#### Unordered

##### `Map`

An unordered collection of key/value entries where, for any key, it contains zero or one value.

Operations include:

* `Set(key, value)`
* `Get(key)`
* `Contains(key)?`
* `EntriesIterator()?`
* `KeysIterator()?`
* `ValuesIterator()?`
* `Size()?`

Implementations:

* Java: HashMap
* Scala: Map, HashMap
* Clojure: hash-map
* C++: unordered_map

#### Ordered by construction

##### `ListMap`

An instance of a Map whose ordering is dictated by the insertion order of elements.

Allows for all operations of a Map but the `*Iterator()` operations yield elements in insertion order.

Implementations:

* Java: LinkedHashMap
* Scala: ListMap
* Clojure: array-map
* JavaScript: Map

#### Ordered by comparator

##### `SortedMap`

A Map whose entries are ordered according to some comparison operation on the key.

Allows for all operations of a Map but the `*Iterator()?` operations yield entries ordered by key (according to some comparison operation). In addition, a SortedMap can support forms of:

* `First()?`
* `Last()?`
* `Floor()?`
* `Ceiling()?`

A `SubMap()?` is possible for generating an instance or view of a subset of the elements. `*Iterator()?` operations and `SubMap()?` may include floor, ceiling and direction modifiers for range queries; `Floor()` and `Ceiling()` methods may be unnecessary convenience methods in this case.

Implementations:

* Java: TreeMap
* Scala: TreeMap
* Clojure: sorted-map, sorted-map-by
* C++: map, multimap (can contain duplicate elements)
