IPLD Specifications
===================

IPLD is not a single specification it is a set of specifications.

The goal of IPLD is to enable decentralized data-structures
which in turn will enable more decentralized applications.

Many of the specifications in IPLD are inter-dependent.

# IPLD Layer Model

This layer model is a simplified heirarchy of IPLD concepts and requirements.

```
┌──────────────────────────────────────────────────┐
│                                                  │ 
│                   Schema Layer                   │
│ (advanced types for multi-block data structures) │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│                 Data Model Layer                 │
│  (basic types for single-block data structures)  │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│                   Block Layer                    │
│               (cid, data, codec)                 │           
│                                                  │
└──────────────────────────────────────────────────┘
```

## Block Layer (Layer 0)

The block layer encompasses all content addressed block formats and specifies how blocks
are addressed,how they self-describe their codec for encoding/decoding, and how blocks link
between each other.

This layer alone is enough to accomplish basic graph replication across a variety of formats (eth, bitcoin, git, 
dag-pb, dag-cbor, etc).

This layer does not define data structures or types, although many codecs may convert these formats into native types,
there are no type requirements or assurances about types at the block layer.

## Data Model Layer (Layer 1)

The Data Model Layer describes a set of base required types to be implemented by a subset of IPLD codecs.

With these basic types authors can create various single-block data structures which can be read with predictable
paths and selectors.

With just the data model layer, several data structures can be authored and put into a single block. These data 
structures can also link to one another, but a *single* collection (Map or List) cannot be spread across many
blocks with only the Data Model.

Since different systems and transports may impose block size limits (often 2mb or more) in order to control memory usage,
larger collections need to be sharded over many blocks at the Schema Layer.

## Schema Layer (Layer 2)

IPLD Schemas define a mapping from the Data Model Layer (Layer 1) to
instantiated data structures comprising complex layouts. The Schema Layer
adds the ability to extend the IPLD Data Model to the wide variety of types
required for typical programatic interaction with a data source without the
need to implement custom translation abstractions.

The Schema Layer will also serve as an enabling layer for complex multi-block
data structures by providing stability and consistency of data model use within
individual blocks and defined interaction points for the logic required for
building and interacting with advanced data layouts, such as multi-block Maps,
Lists and Sets.

# Specification Repo Layout

* [/IPLD-Data-Model-v1.md](/IPLD-Data-Model-v1.md)
* [/IPLD-Path.md](/IPLD-Path.md)
* [/CID.md](/CID.md)
* [/Codecs](/Codecs)
  * [/Codecs/DAG-JSON.md](/Codecs/DAG-JSON.md)
  * [/Codecs/DAG-CBOR.md](/Codecs/DAG-CBOR.md)
* [/data-structures/multiblock-collections.md](/data-structures/multiblock-collections.md)
* [/graphsync/graphsync.md](/graphsync/graphsync.md)
* [/selectors/selectors.md](/selectors/selectors.md)

## Discussion

Discussion of specific specifications happens in [this repository's issues](https://github.com/ipld/specs/issues).

Discussion of IPLD more generally happens in the [IPLD repository](https://github.com/ipld/ipld/issues).

## Contribute

Suggestions, contributions, criticisms are welcome. Though please make sure to familiarize yourself deeply with IPLD and IPFS, the models it adopts, and the principles it follows. [Join in in the issues](https://github.com/ipld/specs/issues).

Please be aware that specs are really hard to design by committee. Treat this space like you would the workshop of an artist. Please suggest improvements, but please don't be disappointed if we say no to something. What we leave out is often more important than what we add in.

Check out our [contributing document](https://github.com/ipld/ipld/blob/master/contributing.md) for more information on how we work, and about contributing in general. Please be aware that all interactions related to IPLD are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

This repository is only for documents. All of these are licensed under the [CC-BY-SA 3.0](https://ipfs.io/ipfs/QmVreNvKsQmQZ83T86cWSjPu2vR3yZHGPm5jnxFuunEB9u) license, © 2016 Protocol Labs Inc.

# Terminology

## Description of IPLD

IPLD is a set of standards and implementations for creating decentralized data-structures that are
universally addressable and linkable. These structures allow us to do for data what URLs and
links did for HTML web pages.

## Generic Terms

### Content Addressability

"Content addressability" refers to the ability to refer to content by a trustless identifier.

Rather than referring to content by a string identifier or URL, content addressable systems refer to content
by a cryptographic hash. This allows complete decentralization of the content as the identifier
does not specify the retrieval method and provides a secure way to verify the content.

## IPLD Terms

### Multihash

Multihash is hash format that is not specific to a single hashing algorithm.

A multihash describes the algorithm used for the hash as well as the hash value.

```
+-----------+----------------------------+
| Hash Type | Hash Value                 |
+-----------+----------------------------+
```

SHA-256 example.

```
+---------+------------------------------------------------------------------+
| SHA-256 | 2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892 |
+---------+------------------------------------------------------------------+
```

Note: these examples are simplifications of the concepts. For a complete description visit the [project and its specs](https://github.com/multiformats/multihash).

### CID (Content Identifier)

Hash based content identifier. Includes the `codec` and `multihash`.

CID's

```
+-------+------------------------------+
| Codec | Multihash                    |
+-------+------------------------------+
```

The long version
```
+------------------------------+
|Codec                         |
+------------------------------+
|Multihash                     |
| +----------+---------------+ |
| |Hash Type | Hash Value    | |
| +----------+---------------+ |
|                              |
+------------------------------+
```

Note: these examples are simplifications of the concepts. For a complete description visit the [spec](./CID.md).

### Block

A CID and the binary data value for that CID.

The short version.
```
+-----+--------------------------------+
| CID | Data                           |
+-----+--------------------------------+
```

The long version.
```
+-----------------------------------+------------------+
| CID                               | Binary Data      |
| +------------------------------+  |                  |
| |Codec                         |  |                  |
| +------------------------------+  |                  |
| |Multihash                     |  |                  |
| | +----------+---------------+ |  |                  |
| | |Hash Type | Hash Value    | |  |                  |
| | +----------+---------------+ |  |                  |
| |                              |  |                  |
| +------------------------------+  |                  |
|                                   |                  |
+-----------------------------------+------------------+
```

### IPLD Path

A string identifier used for deep references into IPLD
graphs. Follows similar escape and segmentation rules as URI Paths.

[Read the full specification for more details.](./IPLD-Path.md)

### IPLD Data Model

The IPLD Data Model describes a set of base types. Codecs that support these base types
can be used by any of the data-structures built on top of the IPLD Data Model.

Codecs that support the IPLD Data Model:

* [DAG-CBOR](/Codecs/DAG-CBOR.md)
* WIP: [DAG-JSON](/Codecs/DAG-JSON.md)

### Codec

A codec exposes serialization and deserialization for IPLD blocks. If it also supports
content addressable links then the codec exposes those links as `CID`'s. A codec
also supports atomic IPLD Path lookups on the block.

#### Serializer, Deserializer and Format

A logical separation exists in any given IPLD codec between the **format** and the **serializer/deserializer**.

```
+--------------------+             +--------------------+
|                    |             |                    |
|     Serializer     |             |    Deserializer    |
|                    |             |                    |
+---------+----------+             +---------+----------+
          |                                   ^
          |         Sent to another peer      |
          v                                   |
+---------+----------+             +----------+---------+
|                    |             |                    |
|       Format       +------------->       Format       |
|                    |             |                    |
+--------------------+             +--------------------+
```

A **format** may represent object types and tree structures any
way it wishes. This includes existing representations (JSON, BSON, CBOR,
Protobuf, msgpack, etc) or even new custom serializations.

Therefor, a **format** is the standardized representation of IPLD Links and Paths. It describes how to translate between structured data and binary.

It is worth noting that **serializers** and **deserializers** differ by programming language while the **format** does not and MUST remain consistent across all codec implementations.

#### Representation

The in-memory representation of a de-serialized IPLD value.
