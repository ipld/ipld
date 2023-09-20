---
title: "Traversal"
eleventyNavigation:
  order: 30
---

Traversal in IPLD
=================

"Traversal" refers to the act of walking over IPLD data.

Traversing a [map](/docs/data-model/kinds/#map-kind) means iterating over its keys and values... and possibly, traversing over those values, recursively.

Traversing a [list](/docs/data-model/kinds/#list-kind) means iterating over its values... and possibly, traversing over those values, recursively.

Traversing other kinds of nodes that aren't recursive just means looking at that node.

Traversing a [link](/docs/data-model/kinds/#link-kind) can mean either examining that link, or, *loading* it, resulting in a whole new bunch of nodes which can be traversed.


Traversal is Universal
----------------------

Any IPLD data can be traversed.
Once data has been loaded into the [Data Model](..) by a [codec](/glossary/#codec),
the Data Model means we know how to look at the data.
Since being in the Data Model means we know what _[kind](/docs/data-model/kinds/)_ of data it is,
it means we know how to iterate over it... and that means we know how to traverse it, as well as all of its neighboring data.


Traversal Order
---------------

Traversal order generally has a stable definition.

However, exactly what that order is may vary based on what kind of traversal you're doing --
if you're using anything to direct the traversal, or if you're just walking the whole data graph plainly.

See also the extended doc on ordering in IPLD in general: [Tricky Design Choices: Ordering](/design/tricky-choices/ordering/)


Kinds of Traversal
------------------

### Total Traversal

"Total traversal" means walking a graph of data in its natural order.
Iterating over a map, in the order its iterator yields entries;
iterating over lists, in the order their iterator yields entries;
etc.

A total traversal is differentiated from a [Directed Traversal](#directed-traversal).

### Directed Traversal

"Directed traversal" means walking a graph of data while holding some specific directions about how to do it.
A directed traversal might visit only some of a graph,
or might visit data in a specific order,
based on its specific directions.

A directed traversal is differentiated from a [Total Traversal](#total-traversal).

Directed traversal is a general term and can refer to any kind of traversal one does with custom code;
there are also some standardized features that many IPLD libraries will provide which perform directed traversals,
such as [Selectors](#traversal-by-selector)

### Traversal by Selector

IPLD Selectors are a specific mechanism for declaratively describing how to traverse over an IPLD [dag](/glossary/#dag),
as well as how to mark and select some of the nodes reached during that traversal.

You can think of Selectors as roughly like regexps for textual data, but made for IPLD graphs.

Selectors are a form of [directed traversal](#directed-traversal).
Accordingly, some selectors can cause the traversal to proceed in a different order than a plain total traversal on the same data would have
(as well as, of course, traversing much _less_ data than a plain total traversal would have -- that's the point of them, after all).

For an example of how the directed traversal order in selectors may differ from the norm,
consider the "fields" selector: in this selector clause,
the selector itself has an (ordered!) map of the fields the selector wants to focus on,
and it's that ordering which will drive the selection over the map that the clause is applied on,
rather than the ordering of the data in the map it's applied on.
(This is important because it remains true even for arbitrarily sized maps --
remember, considering [ADLs](/docs/advanced-data-layouts/), the selector could be being applied on a huge map, with internal sharding...
something potentially far too large to want to iterate on, if we have instructions that let us avoid it!)

See more about Selectors in the [Selector specs](/specs/selectors/).


Traversal in various IPLD implementations
-----------------------------------------

- in Golang:
	- in [go-ipld-prime](https://github.com/ipld/go-ipld-prime):
		- the entire [traversal (godoc)](https://godoc.org/github.com/ipld/go-ipld-prime/traversal) package

:::todo
- Your language here, please!  :D
:::
