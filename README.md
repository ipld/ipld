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
community. You don't need to be a committer in repository
in the IPLD GitHub org to be a part of this community,
you're already almost there just by reading this far.

## From Data to Data Structures

Hashes are wonderful.

If you hash something you can give that hash to anyone else
in the world, anywhere in the galaxy (IP stands for Interplanetary),
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

We do this with a new link type and a data model.

For links we use a [CID](https://specs.ipld.io/block-layer/CID.html). A CID is an extension of `multihash`,
in fact a `multihash` is part of a `CID`. All we extend it with
is a *codec* that tells us what format the data is in (JSON, CBOR,
Bitcoin, Ethereum, etc). This way, we can actually link between
data in different formats and any link to data anyone ever gives
us can be decoded so that it can become more than just a series
of bytes.

CID is a [standard]() that anyone can implement, even people that
have no other interest in IPLD beyond the need for hash links to
different data types can use it.

The IPLD Data Model is a bit more conceptual, as it is applied
to formats that had never considered IPLD.

Every language has a library for JSON encoding and decoding. These
languages all adapt the JSON data model (types) into whatever the
best fit for their language is. Our data model is very similar,
but we add a few more types.

First, we add a link type using CID as our link format. We also
add binary values, which are missing from JSON. We support nothing
beyond that other than the types JSON has already defined quite well.

We then apply this data model to more than just our own formats. We
have specifications and libraries for interpreting many formats into
this data model. For instance, Bitcoin blocks know nothing about IPLD
since they were designed long before IPLD existed. We have a decoder
for Bitcoin that presents the data found in a Bitcoin block as IPLD
Data Model.

This provides a consistent interpretation of all formats across all programming
languages in IPLD terms. For instance, the links in Bitcoin blocks are
only to other Bitcoin blocks and do not use CID's internally, but when
you use an IPLD codec to read them the links will all be normalized
to CID's that link to Bitcoin blocks.

This lets you build data structures that freely link between formats
that can be traversed though a normalized data model. Effectively,
you can write format agnostic tools for reading, distributing, and
persisting all content addressed data.

## Tutorial

We highly recommend you read the following tutorial
before trying to use IPLD. This tutorial is language
agnostic and includes examples in JavaScript, Go and Rust.

* [Thinking in Data Structures](./tutorial.md)
  * [Addressing](./tutorial.md#addressing)
  * [Linking](./tutorial.md#linking)

## Getting Started

Using IPLD can vary from language to language.

* [Getting started in JavaScript](./getting-started/js)
  * [Persisting IPLD data in `js-ipfs` and `js-ipfs-lite`](./getting-started/js#storing-ipld-data-in-ipfs)
* [Getting started in Go](./getting-started/go)
  * [Persisting IPLD data in `go-ipfs`](./getting-started/go#IPFS)
* [Getting started in Rust](./getting-started/rust)
  * [Persisting IPLD data in `rust-ipfs`](./getting-started/rust#IPFS)

## Media

[Talks, blog posts, and other media about IPLD.](./docs/media')


## Documentation
### Getting things done in IPLD

[Great guide](./docs/gtd) for how to approach IPLD depending on the problem
you're trying to solve.

### IPLD in the Interplanetary Ecosystem

Details of how [IPLD fits into the ecosystem of IPFS](./ecosystem) and other decentralized
technologies.

### IPLD Objectives and Scope

[IPLD's unique worldview](./docs/objectives) and the boundaries of what IPLD is intended to solve.

### IPLD Schemas

IPLD has a [powerful schema language](https://specs.ipld.io/schemas/) that is extensively
documented.

### Advanced Data Layouts

Guide to [data structures that move beyond our simple data model]('./docs/advanced-layouts)
representations.

### [FAQ](./FAQ)

## Glossary

### Blocks

The term "block" is used to refer to the pairing of a raw binary and a CID. In other words, it's
data that has not been decoded yet, or data that has just recently been encoded.

Most users don't work directly with blocks. Instead, block data is encoded/decoded into [Data Model](#data-model). It's only if your'e writing a database, or a filesystem, or a replicator that you will work directly
with blocks.

[Full Block specification.](https://specs.ipld.io/block-layer/block.html)

### CID

CID is a Content IDentifier. It's self-describing data structure identifier. In other
words, it's a hash that says what kind of hash it is and how to decode it.

[IPLD CID Specification.](https://specs.ipld.io/block-layer/CID.html) The [full format specification](https://github.com/multiformats/cid) is part of multi-formats.

### Codecs

The term "codec" refers to a [mutlicodec]() specific encoder/decoder.

A codec is responsible for encoding [Data Model](#data-model) to Binary and for
decoding Binary to [Data Model](#data-model).

Examples:

* [dag-cbor](#DAG-CBOR)
* [dag-json](#DAG-JSON)
* bitcoin
* cbor
* json

#### DAG-CBOR

IPLD Data Model implemented as a subset of CBOR with additional constraints
for hash consistent representations.

[Full DAG-CBOR specification.](https://specs.ipld.io/block-layer/codecs/dag-cbor.html)

#### DAG-JSON

**Not Recommended.**

IPLD Data Model implemented serialized to JSON.

[Full DAG-JSON specification.](https://specs.ipld.io/block-layer/codecs/dag-json.html)

### Data Model

The Data Model describes common base types called *kinds*.

These *kinds* allow IPLD to create data structures using simple types
accessible across many programming languages and encoding formats.

Using the Data Model we can implement file systems, databases, and custom
application data structures in a format agnostic way and even link between
these structures and formats using commong toolchains.

All JSON types are Data Model kinds:

* `map`
* `list`
* `boolean` (true, false)
* `null`
* `string` (utf8)
* `numbers`
  * `int`
  * `float`

There is a `bytes` kind for raw binary data.

Finally, there is a `link` kind represented by a [CID](#CID). You'll find
CID type implementations for every programming language which are leveraged
by all IPLD codecs in that language.

[Full IPLD Data Model specification.](https://specs.ipld.io/data-model-layer/data-model.html)

### HAMT

HAMT stands for ["Hash Array Mapped Trie"](https://en.wikipedia.org/wiki/Hash_array_mapped_trie).

HAMT's in IPLD differ from typical in-memory implementation as we require the use of "buckets"
to manage performance.

[Full IPLD HAMT specification.](https://specs.ipld.io/data-structures/hashmap.html)

### Graphsync

Graphsync is a replication protocol for IPLD. It's used heavily by Filecoin and experimentally by
IPFS.

Graphsync uses [IPLD Selectors](#selectors) to replicate sections of a larger IPLD graph.

[Full Graphsync specification.](https://specs.ipld.io/block-layer/graphsync/graphsync.html)

### Selectors

Selectors define a selection criteria for IPLD graph queries.

IPLD Selectors are a declarative format for specifying a walk over a [Data Model](#data-model) graph --
what nodes to walk over (or not), recursively; and, some positions to "visit" (with a callback, typically, though library implementation details may vary).
You can think of Selectors as being roughly like "regexps for graphs".

Selectors are natively implemented in most IPLD libraries (for performance reasons),
but the format itself is standardized.
The format is described in IPLD (using [IPLD Schemas](https://specs.ipld.io/schemas/),
so it's possible to serialize Selectors in any [Codec](#codecs) you want,
and it's also possible to inspect (and transform!) Selector documents using standard [Data Model](#data-model) tools.

[Full IPLD Selectors specification.](https://specs.ipld.io/selectors/selectors.html)


## Specifications

You can refer to the [specifications website]() for a full list of content.

There are numerous links to specifications throughout this documentation site.

The following curated list of specification pages may be of interest to those
seeking additional forms of documentation.

### Theory of Change

### Design Documents

[Various documents about the design, and history of design thought, in and around
IPLD.](https://specs.ipld.io/design/)

### Foundational Principals

[The foundation principals of globally content addressed data structures.](https://specs.ipld.io/foundations.html)

### IPLD Team

[List of IPLD team members.](https://specs.ipld.io/#ipld-team)

