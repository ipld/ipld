Data Model: Order of Maps
=========================

Maps in IPLD are typically _order-preserving_: if you put data into them in some order,
you can expect that the iterators will return that information in the same order;
and transformation functions will generally operate on data without reordering it.

However, there are also several exceptions to this rule,
so it's important to be aware of what to expect in the different scenarios.


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

[ADLs](/advanced-layouts/) sometimes have stable but unusual orders that are based on details of their internal structures and algorithms.

For one example, HAMTs do not preserve order, but do have a stable and deterministic order... and yet it is also not a sorted order:
rather, it is based on the hashes of the keys of the map.


### Codecs may impose sorted orders

Some [Codecs](/codecs/) have strict map entry ordering rules.

For example, [DAG-CBOR](/codecs/impl/dag-cbor.md) has a canonical sorted order which is based on the CBOR RFC's recommended sorting.



Reasons
-------

Why do we say that order-preserving is the default?

1. Ordering is more fundamental than not.
	- Serial data has an order!  Bytes cannot be rearranged without consequence!
	- Hashes change when the ordering of data changes, because hashes are based on serial data.  This affects everything in a system like IPLD.
2. Streaming operations are only possible when preserving order.
	- Tools that only work on sorted data can only start outputting results after completely loading all input.
	  This is necessarily true, because otherwise, it's possible that the first-when-sorted data comes at the end of a stream of input;
	  in that worse-case scenario, an algorithm either must have buffered entirely up until that point, or if it has been streaming, must halt unexpectedly.
3. Unavoidably, some ADLs have opinionated data ordering (and it's not necessarily sorted).
	- e.g. HAMTs/CHAMPs have a natural ordering which is determined by their internal hashing scheme -- it's both an ordering, and it's not even a sorted one.
	  We cannot change this because it's in the nature of their algorithms; so, it's best if our interfaces and standards understand and describe this.
4. Even codecs have specified various orderings.
	- e.g. the ordering used in DAG-CBOR (which was specified by an RFC that well predates IPLD) is not what most people consider an obvious or reasonable sorting.  No other codec uses it.
	  Yet, simultaneously, it's considered a standardized ordering.
	  Therefore, by example, it is not particularly feasible for us to declare One True Sorted Ordering; there's too much disagreement in the field before we even begin.
5. People sometimes like their data to stay in the order they put it.
	- Consider the case for building "`jq`-like" data processing tools: IPLD libraries are should be generally suited for building such tools;
	  and in examining this user story, we can observe that people seem to _like_ tools which can operate streamingly and do not reorder their data without cause.
6. Order-preservation implementations result in the most reusable code and lowest total implementation effort.
	- It's much easier to implement order-preservation, and then add a sorting feature... than it is to implement strict sorting (or randomly-ordered intermediate storage) and add order-preservation later.
7. Lack of control over ordering can lead to performance issues when composed with other layers of the system.  For example, in IPLD Schemas, some union types can have drastically different parse costs based on the order of map entries in the serialized form of the data.
	- It would be an extremely nasty cross-cutting concern if some schemas were efficiently serializable in some codecs, but had huge performance penalties in others because a forced sorting of map entries happened to put the union discriminant hint values in an order that's expensive to parse.  Changing codec shouldn't cause surprises like this.  Order preservation semantics quietly avoid this issue.

In summary: there are a preponderance of reasons that it's preferable to consider order-preservation the default in IPLD systems.

It's interesting to note there are some counter-arguments which would dis-recommend order-preservation:
namely, preserving order of map entries does not assist with _uncoordinated convergence_; sorting (once you agree on a sort!) _does_.
Accordingly, we _do_ recommend that application and protocol authors consider sorting their data whenever applicable.
However, when it comes to the specification of the range of supported behaviors,
since it is possible to do such sorting by choice within a library and ecosystem that is order-preserving,
we overall follow the reasoning which favors order-preservation as the central design.


Where does this Matter?
-----------------------

In general, we care about order-preservation of data because we care about not changing data.
Changing the order of data results in different data -- and, in IPLD, that also results in a different hash.
Therefore we care about ordering pretty much ubiquitously.

There's a couple of specific places where it's especially noticable in implementations:

- Iterators 

- Selectors
	- This is especially important to note because if combining Selects and ADLs with opinionated orders, and then using them in a system that require deterministic ordering of the things yielded by selection (or, some cases, the blocks loaded during the visit)... then that deterministic ordering is not going to be a simple sort even if a codec required it, nor will it be an order-preservation of entered data: it will be a mixture, as the order specified is different in different parts of the graph.
		- This is a description of Graphsync!


Recommendations for Library Authors
-----------------------------------

- An IPLD library typically has a ["Node" interface](https://github.com/ipld/specs/blob/master/design/libraries/nodes-and-kinds.md#node).
  This interface typically has some way to get an iterator for map contents.
  This iterator should be order-preserving in most node implementations.

- An IPLD library's "Node" interface and implementations may wish to include some feature which let a node say what, if any, sorted order it contains.
  This can allow other features based on sorting to work quickly and efficiently (they can just check if the data *is* sorted, rather than needing to verify it).
  Simply remembering whether data is already sorted can be a significant saving (for example, consider the impact when an application uses the same sorted codec for saving and loading data).

- When implementing a codec that specifies an opinionated sorted order,
  the implementation should error when given data in a different order by default;
  sorting automatically should be a configurable option, but not be the default.
	- Sorting can imply a performance penalty, so it's best to make the user aware of this.
	- Sorting data, if this isn't expected, can *change* it, which may lead to significant systemic bugs in a content-addressing-based system.
