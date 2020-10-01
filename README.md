# InterPlanetary Linked Data

Welcome to the internet of data structures!

## What is IPLD?

IPLD isn't a project or a library, it's an ecosystem. An
ecosystem of formats and data structures for building
applications that can be fully decentralized.

This ecosystem is held together by a few concepts and
standards that ensure compatibility between formats
and programming languages.

You'll find numerous libraries for working with IPLD.
You may even create a few of your own. That library is
part of the IPLD ecosystem and you're now a part of its
community. You don't need to be a committer in a repository
in the IPLD GitHub org to be a part of this community,
you're already almost there just by reading this far.

## From Data to Data Structures

Hashes are wonderful.

If you hash something you can give that hash to anyone else
in the world, anywhere in the galaxy (IP stands for InterPlanetary),
they can tell if they have that data and when they send
it to you, you're able to verify it was the right data even
without trusting that person.

If you think of hashes like URLs, you can pass them around and
ask people for them without fixing the place where that data exists
into the link the way you do with a URL. This is really powerful,
but by itself it's a bit limited.

For one thing, there are lots of hash algorithms, and they keep
getting better. A hash doesn't say *what* sort of hash it is. We
solved that with something called [`multihash`](https://github.com/multiformats/multihash)
which is just a hash that says "I'm a hash of this particular
algorithm."

So now, with multihash, a single identifier can get us any set
of binary data (what we all a "Block") from anywhere in the world.

That's *data*, we've got that covered, but now we need to go from
*data* to **data structures**.

This means that we have to think about different formats (JSON, CBOR,
Bitcoin, Ethereum, etc) and we also need to think about different
programming languages (JavaScript, Go, Rust, etc) because these
languages have different basic types that are used to represent data
structures in-memory.

That's IPLD.

IPLD is how we go from *data* to **data structures**.

**We do this with a new link type and a data model.**

### Links

For links we use a [CID](https://specs.ipld.io/block-layer/CID.html). A CID is an extension of `multihash`,
in fact a `multihash` is part of a `CID`. We simply add a *codec* to a `multihash`
that tells us what format the data is in (JSON, CBOR,
Bitcoin, Ethereum, etc). This way, we can actually link between
data in different formats and any link to data anyone ever gives
us can be decoded so that it can become more than just a series
of bytes.

CID is a [standard](https://github.com/multiformats/cid) that anyone can implement, even people that
have no other interest in IPLD beyond the need for hash links to
different data types can use it.

### The Data Model

The IPLD Data Model is a bit more conceptual and can be applied
to formats that have never considered IPLD.

Consider that every programming language has a library for JSON encoding and decoding. These
languages all adapt the JSON data model (types) into the
best fit for that language. A "number" in JSON has many potential mappings in
different languages, a JSON library has to decide how it is most appropriately represented.
Our data model is very similar to the JSON data model, but we add a few more types.

First, we add a **link** type using CID as our link format. We also
add a **binary** type, which are missing from JSON. We support nothing
beyond these and the other types that JSON has already defined quite well.

We then apply this data model to more than just our own formats. We
have specifications and libraries for interpreting many formats into
this data model. For instance, Bitcoin blocks know nothing about IPLD
since they were designed long before IPLD existed. We have a decoder
for Bitcoin that presents the data found in a Bitcoin block as the IPLD
Data Model.

This provides a consistent interpretation of all formats across all programming
languages in IPLD terms. For instance, Bitcoin data includes hashes to identify
blocks and transactions to form a heavily interlinked blockchain. Bitcoin doesn't
use CID's internally, but when you use an IPLD codec to read Bitcoin data, the
hashes will be normalized to CIDs so we maintain a consistent "link" type that
includes the content address (hash), the hash algorithm (double-SHA2-256) and the
IPLD codec (e.g. `bitcoin-block` or `bitcoin-tx`).

This lets you build data structures that freely link between formats
that can be traversed though a normalized data model. Effectively,
you can write format agnostic tools for reading, distributing, and
persisting all content addressed data. Your custom IPLD data structure, encoded
in your chosen IPLD codec, can link to anyone else's IPLD data, arbitrary
Bitcoin blocks, Git commits and a universe of content addressed data.

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

* [DAG-CBOR](#DAG-CBOR)
* [DAG-JSON](#DAG-JSON)
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
