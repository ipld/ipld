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

Any IPLD data can be traversed, because once it's been loaded into the Data Model by a [codec](/glossary/#codec),
the Data Model means we know how to look at the data, see what _[kind](/docs/data-model/kinds/)_ it is, and see how to iterate over it.


Guiding Traversals
------------------

IPLD Selectors can be used to declaratively describe how to traverse over an IPLD [dag](/glossary/#dag),
as well as how to mark and select some of the nodes reached during that traversal.

You can think of Selectors as roughly like regexps for textual data, but made for IPLD graphs.

See more in the [Selector specs](/specs/selectors/).


Traversal in various IPLD implementations
-----------------------------------------

- in Golang:
	- in [go-ipld-prime](https://github.com/ipld/go-ipld-prime):
		- the entire [traversal (godoc)](https://godoc.org/github.com/ipld/go-ipld-prime/traversal) package

:::todo
- Your language here, please!  :D
:::
