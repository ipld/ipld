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


## Glossary



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
