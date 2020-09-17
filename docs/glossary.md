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

[Full IPLD Selectors specification.](https://specs.ipld.io/selectors/selectors.html)
