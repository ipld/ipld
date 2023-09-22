Data Model: Ordering
====================

This document is part of a series on [tricky choices](..) in IPLD design.

---

Maps in IPLD are typically _order-preserving_: if you put data into them in some order,
you can expect that the iterators will return that information in the same order;
and transformation functions will generally operate on data without reordering it.

(Lists are of course also order-preserving.
However, that's generally considered a bit less worthy of remark.
We'll spent most of this document focusing on the situation for maps.)

This is sometimes a subject of contention, so in this document,
we'll go over _why_ it's useful (if not outright necessary) to define maps this way in IPLD.

We'll also go over what you might do as a library author and a user
to interact with this most productively.

- [Behaviors](#behaviors)
- [Reasons](#reasons)
- [Impacts](#impacts)
- [Recommendations for Library Authors](#recommendations-for-library-authors)


Behaviors
---------

### Order-Preserving is the Default

Order-preserving is the default behavior,
and what you should expect unless otherwise specified.


### Libraries May Vary

Library implementations may make their own choices.
We would likely say that a library that doesn't support order preservation is not a fully spec-compliant IPLD library,
but that doesn't mean it's not possible for such a library to exist.

(Such a library may even still be fully spec-compliant in _some_ limited subset of cases,
such as when only using codecs that also have strict sorted orders, for example.)


### ADLs may have discretionary ordering

[ADLs](/docs/advanced-data-layouts/) sometimes have stable but unusual orders that are based on details of their internal structures and algorithms.

For one example, HAMTs do not preserve order, but do have a stable and deterministic order... and yet it is also not a sorted order:
rather, it is based on the hashes of the keys of the map.


### Codecs may impose sorted orders

Some [Codecs](/docs/codecs/) have strict map entry ordering rules.

For example, [DAG-CBOR](/docs/codecs/known/dag-cbor/) has a canonical sorted order which is based on the CBOR RFC's recommended sorting.


Reasons
-------

Why do we say that order-preserving is the default?
Why do we also say that discretionary rules may override this in certain contexts?

1. Ordering is more fundamental than not.
	- Serial data has an order!  Bytes cannot be rearranged without consequence!
	- Hashes change when the ordering of data changes, because hashes are based on serial data.  This affects everything in a system like IPLD.
	- This argues that order-preservation should be the default, and preferred whenever possible.
2. Streaming operations are only possible when preserving order.
	- Tools that only work on sorted data can only start outputting results after completely loading all input.
	  This is necessarily true, because otherwise, it's possible that the first-when-sorted data comes at the end of a stream of input;
	  in that worse-case scenario, an algorithm either must have buffered entirely up until that point, or if it has been streaming, must halt unexpectedly.
	- This argues that order-preservation should be the default, and preferred whenever possible.
3. Unavoidably, some ADLs have opinionated data ordering (and it's not necessarily sorted).
	- e.g. HAMTs/CHAMPs have a natural ordering which is determined by their internal hashing scheme -- it's both an ordering, and it's not even a sorted one.
	  We cannot change this because it's in the nature of their algorithms; so, it's best if our interfaces and standards understand and describe this.
	- This means that we cannot mandate order-preservation in all cases, nor can we mandate a single sorted order.
4. Even codecs have specified various orderings.
	- e.g. the ordering used in DAG-CBOR (which was specified by an RFC that well predates IPLD) is not what most people consider an obvious or reasonable sorting.  No other codec uses it.
	  Yet, simultaneously, it's considered a standardized ordering.
	  Therefore, by example, it is not particularly feasible for us to declare One True Sorted Ordering; there's too much disagreement in the field before we even begin.
	- This means that we cannot mandate order-preservation in all cases, nor can we mandate a single sorted order.
5. People sometimes like their data to stay in the order they put it.
	- Consider the case for building "`jq`-like" data processing tools: IPLD libraries are should be generally suited for building such tools;
	  and in examining this user story, we can observe that people seem to _like_ tools which can operate streamingly and do not reorder their data without cause.
	- This argues that order-preservation should be the default, and preferred whenever possible.
6. Order-preservation implementations result in the most reusable code and lowest total implementation effort.
	- It's much easier to implement order-preservation, and then add a sorting feature... than it is to implement strict sorting (or randomly-ordered intermediate storage) and add order-preservation later.
	- This argues that order-preservation should be the default, and preferred whenever possible.
7. Lack of control over ordering can lead to performance issues when composed with other layers of the system.  For example, in IPLD Schemas, some union types can have drastically different parse costs based on the order of map entries in the serialized form of the data.
	- It would be an extremely nasty cross-cutting concern if some schemas were efficiently serializable in some codecs, but had huge performance penalties in others because a forced sorting of map entries happened to put the union discriminant hint values in an order that's expensive to parse.  Changing codec shouldn't cause surprises like this.  Order preservation semantics quietly avoid this issue.
	- This argues that order-preservation should be the default, and preferred whenever possible.  (It also very specifically argues that codecs should refrain from having order restrictions.)


In summary: there are a preponderance of reasons that it's preferable to consider order-preservation the default in IPLD systems.
There's also a couple hard roadblocks which means we can't always mandate either order-preservation,
nor is it viable to mandate a sorted order.
That leaves us with very carefully stated rules you've seen above:
the system should prefer order-preservation, except when it can't.

### counter-arguments

It's interesting to note there are some counter-arguments which would dis-recommend order-preservation:
namely, preserving order of map entries does not assist with _uncoordinated convergence_; sorting (once you agree on a sort!) _does_.

Accordingly, we _do_ recommend that application and protocol authors consider sorting their data whenever applicable.
If there's a map in a protocol that contains user-defined keys: it's recommended that it be sorted.

However, when it comes to how we specify the range of behaviors that IPLD must describe and support,
these arguments about encouraging convergence are not deciding factor, for several reasons:
- the hard limits described in the previous section are still in force (and wishing those away doesn't work);
- parts of a protocol where uncoordinated convergence in the data is relevant are often a protocol-specific detail;
- since it is still possible to do such sorting by choice within a library and ecosystem that is order-preserving (but the reverse is not true!),
  we overall favor order-preservation as the central design (and encourage sorting be applied in parts of protocols where uncoordinated convergence is relevant).


Impacts
-------

### hash effects

In general, we care about order-preservation of data because we care about not changing data.
Changing the order of data results in different data -- and, in IPLD, that also results in a different hash.
Therefore we care about ordering pretty much ubiquitously.

### libraries

There's a couple of specific places where map ordering is going to be directly noticeable in implementations:

- iterators
- traversals (which are usually built on the iterators)
- selectors (which are usually built on the traversal system)
- ... and so on, in anything higher level that builds on those primitives.

### high level features

More generally, ordering is going to be noticeable in anything _downstream_ of those core behaviors.
Any higher-level features which build on those core behaviors, and expect any amount of determinism,
have to be specified with an understanding of how IPLD ordering works.  For example:

- CAR file generation
- block visit order in Graphsync
- ...etc...!

### synthesis

These situations where ordering is noticeable can synthesize in interesting ways.

For example, it's interesting to note that if combining Selectors with ADLs that with opinionated orders,
and then using them in a system that require deterministic ordering of the things yielded by selection
(or even, say, just a deterministic ordering on the the blocks loaded during the visit)...
then that deterministic ordering is not going to be a simple sort, even if there was a consistent codec used on every block in the data and it always required a sort;
_nor_ will it be exactly an order-preservation of entered data:
it will be a mixture, as the order specified is different in different parts of the graph
(sometimes the codec order will dominate; sometimes the ADL internal order will dominate).

(This particularly fun scenario is a real one, too -- things like this *are* seen
in practical systems like Graphsync and CAR file generation, when operating on
very common and popular structures of data like unixfsv1!)

### codec strictness

Some codecs do specify their own ordering opinions.

How exactly this works out in practice tends to require reading the implementation library's documentation carefully.
Even for codecs that specify a map ordering,
it's common to see implementations in the wild which don't actually enforce it --
either because it's a performance cost,
or because it required more implementation work,
or because the author prioritized ability to read technically-malformed documents over strictness,
etc.
Implementations may also have different levels of strictness on the encode direction of data flow
than on the decode direction.

There's no magic wand to simplify this further, unfortunately.


Recommendations for Library Authors
-----------------------------------

- An IPLD library typically has a ["Node" interface](../../libraries/nodes-and-kinds#node).
  This interface typically has some way to get an iterator for map contents.
  This iterator should be order-preserving in most node implementations.
	- We recommend this because you'll get the best compositional bang-for-buck if you take this approach when writing your library.
	  (If you use maps that don't maintain order, and try to rely on, say, [DAG-CBOR](/docs/codecs/known/dag-cbor/)'s sorting: you'll get some things to work, but later have problems correctly handling Selectors on non-canonical data in that codec; or handling the round-tripping or application of Selectors on other non-sorted codecs (like JSON!) correctly at all.  Don't put yourself in that situation.)

- An IPLD library's "Node" interface and implementations may wish to include some feature which let a node say what, if any, sorted order it contains.
  This can allow other features based on sorting to work quickly and efficiently (they can just check if the data *is* sorted, rather than needing to verify it).
  Simply remembering whether data is already sorted can be a significant saving (for example, consider the impact when an application uses the same sorted codec for saving and loading data).

- When implementing a codec that specifies an opinionated sorted order,
  the implementation should error when given data in a different order by default;
  sorting automatically should be a configurable option, but not be the default.
	- Sorting can imply a performance penalty, so it's best to make the user aware of this.
	- Sorting data, if this isn't expected, can *change* it, which may lead to significant systemic bugs in a content-addressing-based system.
	- NOTE: This is a recommendation.  That doesn't mean it's widely followed.  You will certainly find libraries in the wild with codec implementations which will sort automatically and silently.  Beware.
