Glossary
========

## Blocks

The term "block" is used to refer to the pairing of a raw binary and a CID. In other words, it's
data that has not been decoded yet, or data that has just recently been encoded.

Most users don't work directly with blocks. Instead, block data is encoded/decoded into [Data Model](#data-model). It's only if your'e writing a database, or a filesystem, or a replicator that you will work directly
with blocks.

[Full Block specification.](https://specs.ipld.io/block-layer/block.html)

## CID

CID is a Content IDentifier. It's self-describing data structure identifier. In other
words, it's a hash that says what kind of hash it is and how to decode it.

[IPLD CID Specification.](https://specs.ipld.io/block-layer/CID.html) The [full format specification](https://github.com/multiformats/cid) is part of multi-formats.

## Codecs

The term "codec" refers to a [mutlicodec]() specific encoder/decoder.

A codec is responsible for encoding [Data Model](#data-model) to Binary and for
decoding Binary to [Data Model](#data-model).

Examples:

* [dag-cbor](#DAG-CBOR)
* [dag-json](#DAG-JSON)
* bitcoin
* cbor
* json

### DAG-CBOR

IPLD Data Model implemented as a subset of CBOR with additional constraints
for hash consistent representations.

[Full DAG-CBOR specification.](https://specs.ipld.io/block-layer/codecs/dag-cbor.html)

### DAG-JSON

**Not Recommended.**

IPLD Data Model implemented serialized to JSON.

[Full DAG-JSON specification.](https://specs.ipld.io/block-layer/codecs/dag-json.html)

## Data Model

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

## HAMT

HAMT stands for ["Hash Array Mapped Trie"](https://en.wikipedia.org/wiki/Hash_array_mapped_trie).

HAMT's in IPLD differ from typical in-memory implementation as we require the use of "buckets"
to manage performance.

[Full IPLD HAMT specification.](https://specs.ipld.io/data-structures/hashmap.html)

## Graphsync

Graphsync is a replication protocol for IPLD. It's used heavily by Filecoin and experimentally by
IPFS.

Graphsync uses [IPLD Selectors](#selectors) to replicate sections of a larger IPLD graph.

[Full Graphsync specification.](https://specs.ipld.io/block-layer/graphsync/graphsync.html)

## Selectors

Selectors define a selection criteria for IPLD graph queries.

IPLD Selectors are a declarative format for specifying a walk over a [Data Model](#data-model) graph --
what nodes to walk over (or not), recursively; and, some positions to "visit" (with a callback, typically, though library implementation details may vary).
You can think of Selectors as being roughly like "regexps for graphs".

Selectors are natively implemented in most IPLD libraries (for performance reasons),
but the format itself is standardized.
The format is described in IPLD (using [IPLD Schemas](/schemas/)),
so it's possible to serialize Selectors in any [Codec](#codecs) you want,
and it's also possible to inspect (and transform!) Selector documents using standard [Data Model](#data-model) tools.

[Full IPLD Selectors specification.](https://specs.ipld.io/selectors/selectors.html)
