# InterPlanetary Linked Data


## Getting Started

### Tutorial

We highly recommend you read the following tutorial
before trying to use IPLD. This tutorial is language
agnostic and includes examples in JavaScript, Go and Rust.

* [Thinking in Data Structures](./tutorial.md)
  * [Addressing](./tutorial.md#addressing)
  * [Linking](./tutorial.md#linking)

### Programming language guides

When you have understood the basics of IPLD, you will need to familiarize
yourself with the available IPLD libraries available for your programming
language. Each language is different in the way they present and interact with
IPLD data.

* [Getting started in JavaScript](./getting-started/js)
  * [Persisting IPLD data in `js-ipfs` and `js-ipfs-lite`](./getting-started/js#storing-ipld-data-in-ipfs)
* [Getting started in Go](./getting-started/go)
  * [Persisting IPLD data in `go-ipfs`](./getting-started/go#IPFS)

## Media

[Talks, blog posts, and other media about IPLD.](./docs/media)

## Further Reading

* **[Getting Things Done with IPLD](./docs/gtd)**: How you approach IPLD depends
  on the problem you are trying to solve. Read our guide to understand how IPLD
  can be best used to solve your data problems.
* **[IPLD in the InterPlanetary Ecosystem](./docs/ecosystem.md)**: The array
  of new technologies that IPLD relates to can be confusing at first. Read our
  guide to understand how IPLD relates to **IPFS**, **libp2p**, **CIDs**,
  **multiformats** and more.
* **[Objectives and Scope of IPLD](./docs/objectives)**: Why are we pursuing
  this project and where do we hope it to go? Read our guide to understand what
  guides our development efforts.
* **[IPLD Schemas](https://specs.ipld.io/schemas/)**: Describing the shape and
  layout of data structures is important for documentation, communication,
  validation and much more. Read about our the Schema language designed around
  the IPLD Data Model.
* **[Advanced Data Layouts](./docs/advanced-layouts)**: A large amount of the
  power afforded by IPLD is in creating complex and potentially very large data
  structures. Advanced Data Layouts (ADLs) are how we formally define them and
  the logic used to create and traverse linked data and create abstractions that
  are familiar to any programmer (e.g. a "map" that holds millions of records on
  the persistent web).

### FAQ

[Frequently Asked Questions](./FAQ)

## Glossary

### Block

The term "block" is used to refer to the pairing of a raw binary and a CID.

Most users don't work directly with raw blocks. Instead, block binary data is
encoded and decoded to and from the IPLD [Data Model](#data-model). It's only if
writing a storage system such as a database, a filesystem or a replicator that
you will work directly with blocks.

The term "block" is sometimes loosely used to refer to the Data Model
instantiation of decoded raw block data. While this is often useful when
conceptualizing data and the way links are composed and traversed, the strict
definition of "block" is intended to refer to the `Binary:CID` pairing.

See the [Block specification](https://specs.ipld.io/block-layer/block.html) for
further details.

### CID

CID is a **Content IDentifier**. It's a self-describing data structure identifier. In other
words, it's a hash that says what kind of hash it is and how to decode the binary
data identified by the hash.

See the [CID specification](https://specs.ipld.io/block-layer/CID.html) further
details. In addition, the [full format specification](https://github.com/multiformats/cid)
is part of the multiformats project and should be referred to when creating a
CID implementation for a new language.

### Codec

The term "codec" refers to a [mutlicodec]() which defines a specific binary data
encoder and/or decoder (usually both).

A codec is responsible for encoding [Data Model](#data-model) instantiations into
binary and decoding binary into the [Data Model](#data-model).

Examples:

* [DAG-CBOR](#dag-cbor)
* [DAG-JSON](#dag-json)
* bitcoin-block, bitcoin-tx
* Git
* CBOR
* JSON

#### DAG-CBOR

DAG-CBOR is a codec that implements the IPLD Data Model as a subset of CBOR, with additional constraints
for hash consistent representations. DAG-CBOR adds a "link" type using a CBOR
tag.

See the full [DAG-CBOR specification](https://specs.ipld.io/block-layer/codecs/dag-cbor.html)
for further information, including details about features and types of CBOR
encoding that are excluded from DAG-CBOR in order to make it a suitable format
for content addressed data.

#### DAG-JSON

**Not recommended for production use**

DAG-JSON is a codec that implements the IPLD Data Model using JSON serialization.
DAG-JSON adds "link" and "binary" types as well as additional constraints for
hash consistent representations.

See the full [DAG-JSON specification](https://specs.ipld.io/block-layer/codecs/dag-json.html)
for further information.

### Data Model

The IPLD Data Model describes common base types that we call **kinds** ("types"
is a term that we prefer to reserve for data structures described by IPLD Schemas).

These *kinds* allow IPLD to create data structures using simple types
accessible across many programming languages and encoding formats.

Using the Data Model we can implement file systems, databases, and custom
application data structures in a format agnostic way and even link between
these structures and formats using common toolchains.

All JSON types are Data Model kinds:

* `boolean` (true, false)
* `null`
* `string` (utf8)
* numbers:
  - `integer`
  - `float`
* `map`
* `list`

In addition, there is a `bytes` kind for raw binary data.

Finally, there is a `link` kind represented by a [CID](#CID).

Read the full [IPLD Data Model specification](https://specs.ipld.io/data-model-layer/data-model.html)
for further details.

### Nodes

A "node" in IPLD is a point in a graph&mdash;an element of the Data Model in an
instantiated data structure. A "block" will typically contain many nodes. Graph
traversal involves navigating nodes across block boundaries and identifying specific
elements within a Data Model representation.

It is useful to consider the Data Model as being formed of "scalar" and "recursive"
kinds when considering nodes and possible traversal. "Scalar" kinds are terminal
nodes in the Data Model: null, boolean, integer, float, string, bytes. "Recursive" kinds
can contain other kinds within them and therefore allow deeper traversal: map and list.
The link kind is scalar, but is typically treated as a transparent node for the purpose
of traversal such that data spanning many blocks can be addressed as a single graph of
nodes.

### HAMT

HAMT stands for ["Hash Array Mapped Trie"](https://en.wikipedia.org/wiki/Hash_array_mapped_trie).

HAMT's in IPLD differ from typical in-memory implementation as we require the use of "buckets"
to manage performance and use links to connect blocks to form potentially very large collections of data.

Read our [IPLD Hashmap (HAMT) specification](https://specs.ipld.io/data-structures/hashmap.html)
for furthe details.

### Graphsync

Graphsync is a replication protocol for IPLD. It's used heavily by [Filecoin](https://filecoin.io) and experimentally by
IPFS.

Graphsync uses [IPLD Selectors](#selectors) to replicate sections of a larger IPLD graph.

Read the full [Graphsync specification](https://specs.ipld.io/block-layer/graphsync/graphsync.html)
for further details.

### Selectors

Selectors define selection criteria for IPLD graph queries.

IPLD Selectors are a declarative format for specifying a walk over a [Data Model](#data-model)
graph&mdash;what nodes to walk over (or not), recursively; and, some positions to "visit" (with a callback, typically, though library implementation details may vary).
You can think of Selectors as being roughly like "regexps for graphs".

Selectors are natively implemented in most IPLD libraries (for performance reasons),
but the format itself is standardized.
The format is described in IPLD (using [IPLD Schemas](https://specs.ipld.io/schemas/),
so it's possible to serialize Selectors in any [Codec](#codecs) you want,
and it's also possible to inspect (and transform!) Selector documents using standard [Data Model](#data-model) tools.

Read the full [IPLD Selectors specification](https://specs.ipld.io/selectors/selectors.html)
for further details.

## Specifications

You can refer to the [specifications website](https://ipld.github.io/specs/) for a full list of content.

There are numerous links to specifications throughout this documentation site.

The following curated list of specification pages may be of interest to those
seeking additional forms of documentation:

* **[IPLD Exploratory Specifications](https://specs.ipld.io/design/)**:
  Various documents about the design, and history of design thought, in and around IPLD.
* **[IPLD Foundational Principles](https://specs.ipld.io/FOUNDATIONS.html)**:
  The foundation principals of globally content addressed data structures.
* **[Core IPLD team members](https://specs.ipld.io/#ipld-team)**.
