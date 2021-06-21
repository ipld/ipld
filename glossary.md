---
title: "Glossary"
eleventyNavigation:
  order: 100
  # todo: I'd like to style this somewhat differently than the other top-levels (because it's not expandable / has no children).  Not sure how best to implement that.
---

Glossary
========

#### ADL

ADL is short for **A**dvanced **D**ata **L**ayout.  See [docs for Advanced Data Layouts](/docs/advanced-data-layouts/).

In brief: ADLs a concept in IPLD which describes when pluggable code is used to create data structures
which act like typical [Data Model](#data-model) [Nodes](#node)
(meaning regular generic code can work over them just like over plain [Nodes](#node)),
while having internal structure which is managed by the plugin code.

ADLs are typically used to do things like create large sharded data structures which can be accessed in the same way as simpler structures,
but the definition is fairly open-ended.

#### Block

The term "block" refers to to a chunk of serialized binary data.

Most users don't work directly with blocks.
Instead, block binary data is encoded and decoded to and from the IPLD [Data Model](#data-model) using a [codec](#codec),
and users work with the data via the [Data Model](#data-model).
It's only if writing a storage system or a data transport system that you will be likely to work directly with blocks.

#### CID

CID stands for **C**ontent **ID**entifier
It's a self-describing data structure identifier.
In other words, it's a hash that says what kind of hash it is and how to decode the binary data identified by the hash.

See the [CID specification](https://github.com/multiformats/cid) for further details.

CIDs are for [Content Addressing](#content-addressing).

#### Codec

The term "codec" refers to a function which decodes serial data into the [Data Model](#data-model),
and encodes [Data Model](#data-model) content into serial data.

Sometimes we refer to the serialized data from one [Data Model](#data-model) tree (i.e., not including crossing any [links](#link))
as forming a block "[block](#block)".

#### Content Addressing

"Content addressability" refers to the ability to refer to content by a trustless identifier.

Rather than referring to content by an imprecise name or a location-oriented concept like URL,
content addressable systems refer to content by a cryptographic hash of the content itself.
This allows complete decentralization of the content,
as the identifier does not specify the retrieval method nor locations,
and does provides a secure way to verify the content (regardless of wherever it may be found from).

[See more about Content-Addressing on ProtoSchool](https://proto.school/content-addressing)!

#### DAG

DAG is short for **D**irected **A**cyclic **G**raph.
It describes some data where more than one path can lead to the same point,
but there are only a finite number of paths, because the data does not include cycles.

We talk about DAGs often in IPLD, because IPLD data is naturally a DAG.
[Links](#link) mean we can connect graphs of data,
but because [links](#link) are [content-addressable](#content-addressing), they can't form cycles.

Read more about [DAGs on Wikipedia](https://en.wikipedia.org/wiki/Directed_acyclic_graph).

#### Data Model

The IPLD Data Model describes common base types that we call **kinds**.
("types" is a term that we prefer to reserve for data structures described by IPLD Schemas.)

These *kinds* allow IPLD to create data structures using simple types
accessible across many programming languages and encoding formats.

Using the Data Model we can implement file systems, databases, and custom
application data structures in a format agnostic way and even link between
these structures and formats using common toolchains.

The Data Model kinds are:

* `boolean`
* `integer`
* `float`
* `map`
* `list`
* `string`
* `null`
* `bytes`
* `link`

(You may notice the Data Model kinds are essentially what you're familiar with from JSON --
we've just added `bytes` for binary, and this `link` kind, which gives IPLD a lot of its magic.)

There is a `link` kind is implemented by [CID](#cid)s.

#### Link

A link is just another name for a [CID](#cid).
When we talk about linking in IPLD, we always mean this -- linking in IPLD is always immutable, and uses hashes,
and therefore when we talk about linking, we always mean [CID](#cid)s.

#### Node

A "node" in IPLD is a point in a graph -- an element of the Data Model in an instantiated data structure.
Every node has a "kind" property, which is one of the [Data Model kinds](#data-model).

If a node is a `map` or `list` _kind_, then it will have children.
The other node _kinds_, like `string`, are just values (they have no children).

A "[block](#block)" will typically contain many nodes.

#### Schemas

IPLD Schemas are a system for describing data with structural types.
That means Schemas can describe data, and the data either matches, or, doesn't -- and if it doesn't, you can just try a different schema.

Schemas are a high-level feature in IPLD.
You can apply them on top of data that's already legible as [Data Model](#data-model) content.
That means IPLD Schemas are agnostic of [codecs](#codec).
It also means they're entirely optional -- you can parse data with or without them --
and you can use Schemas to describe and help process data even if that data _predates the Schema_.

### Selectors

IPLD Selectors are a form of graph query (or, a way to specify a traversal, if you prefer that mental model) over IPLD data.

Selectors are a declarative format for specifying a walk over a [Data Model](#data-model) graph.
Selectors can specify which nodes to walk over (or not), which order to visit in, and it can mark certain positions as "matched" (in addition to just visited).
You can think of Selectors as being roughly like "regexps for graphs".
Libraries may yield iterators over matched nodes, or iterators over all visited nodes, or callback oriented interfaces.

Selectors are natively implemented in most IPLD libraries (for performance reasons),
but the format itself is standardized.
The format is described in IPLD (using [IPLD Schemas](#schemas),
so it's possible to serialize Selectors in any [Codec](#codec) you want,
and it's also possible to inspect (and transform!) Selector documents using standard [Data Model](#data-model) tools.

#### Traversal

Traversal is the act of walking across the [Data Model](#data-model).

It is useful to consider the Data Model as being formed of "scalar" and "recursive"
kinds when considering nodes and possible traversals.

"Scalar" kinds are terminal nodes in the Data Model: null, boolean, integer, float, string, bytes

"Recursive" kinds can contain other kinds within them and therefore allow deeper traversal: map and list.

The link kind is scalar, but is typically treated as a transparent node for the purpose
of traversal such that data spanning many blocks can be addressed as a single graph of nodes
(so, sometimes, contextually, it can be seen as a sort of a "recursive" kind).
