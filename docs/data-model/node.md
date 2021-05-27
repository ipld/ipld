---
title: "Data Model Nodes"
navTitle: "Nodes"
eleventyNavigation:
  order: 5
---

Nodes
=====

"Nodes" are a very central concept in IPLD,
which refers to points in a graph of data.

This is a pretty abstract statement, so let's just explain this quickly with an example:

### Example

This is easiest to understand by example:
if I had some simple JSON data like this:

```json
{"a": ["b", "c"]}
```

There are 5 nodes there:
- the map
- the key (the string `"a"`)
- the list
- the first list value (the string `"b"`)
- the second list value (the string `"c"`)


Relationships
-------------

Wondering how to frame "Nodes" vs other concepts in IPLD?

Here are some quick pair-offs (including with a few concepts that are introduced in future chapters):

#### Nodes vs Kinds

Every node has a "[kind](../kinds/)" property.

#### Nodes vs Blocks

A "[block](/glossary/#block)" of serial data can equate to one or many nodes.

A codec is needed to process the raw binary block into a tree of nodes.

#### Nodes vs ADLs

[ADLs](/docs/advanced-data-layouts/) are a power feature of IPLD that _implements_ the Node interface,
while making it possible to support some more complex and powerful features under the hood of that abstraction.
(For example, ADLs are often used to support things like "large sharded maps", etc -- but see the ADL docs for more on this.)

ADLs also usually have more Nodes inside them.
These are typically referred to as their "substrate" nodes.

#### Nodes vs Schemas

[IPLD Schemas](/docs/schemas/) are a power feature of IPLD that _implements_ the Node interface,
while adding some features for data validation and some kinds of data transformations.

For example, "structs" in schemas are treated like a Data Model node with a "map" kind.
In general, any data treated with IPLD Schemas can still be treated like Data Model nodes,
so any code that works generically over the Data Model still also works with Schemas, too.



Nodes in Code
-------------

For general information on how the concept of Nodes in code,
especially if you want to write a new IPLD library,
check out the documentation from the design chapters: [Library Design: Nodes and Kinds](/design/libraries/nodes-and-kinds/).

Here are pointers to key parts of how Codecs are seen implemented in some of the IPLD libraries:

- in Golang:
	- see the [ipld.Node interface (godoc)](https://pkg.go.dev/github.com/ipld/go-ipld-prime#Node)
