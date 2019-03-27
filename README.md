IPLD Specifications
===================

IPLD is not a single specification, it is a set of specifications.

```
                                     The IPLD Stack

                                +-----------------------------+
                +-------------+ |                             |
                |             | | End-User Application Stacks |
                | MFS in IPFS | |                             |
                |             | +-----------------------------+
                +-------------+ |                             |
                |             | | Structured Data w/ indexes  |
                |  unixfs v2  | |     VR, Geo, SQL, etc.      |                +----------+
                |             | |                             |                |          |
                +-------------+ +-----------------------------+                |  MFS in  |
                |             | |                             |                |   IPFS   |
                |    HAMT     | |   Sorted Index (sharded)    |                |          |
                |             | |                             |                +----------+
                +-------------+-+-----------------------------+                |          |
                |                                             |                |  unixfs  |
                |          Complex Data Structures            |                |    v1    |
                |                                             |                |          |
+-----------------------------------------------------------------------------------------+
|               |                                             |                |          |
|               |        dag-json         dag-cbor            |    ipld-git    |          |
|               |                                             |                |          |
|    Codecs     +---------------------------------------------+    ipld-btc    |  dag-pb  |
|               |                                             |                |          |
|               |               IPLD Data Model               |   ipld-zcash   |          |
|               |                                             |                |          |
+-------------------------------------------------------------+----------------+----------+
                |                                                                         |
                |                         Block (CID, Raw Data)                           |
                |                                                                         |
                +-------------------------------------------------------------------------+
```

The goal of this stack is to enable decentralized data-structures
which in turn will enable more decentralized applications.

Many of the specifications in this stack are inter-dependent.

```
       IPLD Dependency Graph

+---+                          +----------+
|CID+-----------+-------------->Raw Blocks|
+---+           |              +--+-------+
         +------v-------------+   |
+----+   |Links (Conceptually)|   |
|Path|   +------+-------------+   |             +-----------+
+-+--+          |                 +------------->Replication|
  |    Codecs   |                 |             +-----------+
+-v-------------v-----------------+---+
|                                     |
| +---+    +-----------------------+  | Complex Data-Structures
| |Git|    |     Data Model v1     |  | +--------------v-------+
| +---+    |                       |  | |                      |
|          | +--------+ +--------+ +----> +----+ +-----------+ |
| +------+ | |dag|json< |dag|cbor< |  | | |HAMT| |Sorted Tree| |
| |dag|pb| | +--------+ +--------+ |  | | +--+-+ +----+------+ |
| +------+ |                       |  | |    |        |        |
|          +-----------------------+  | +----------------------+
|                                     |      |        |
+-------------------------------------+      |        |
                                             |        |
                +----------------------+     |        |
                | File System (unixfs) <-----+        |
                +----------------------+              |
                +--------------------+                |
                |                    |                |
Structured Data | VR, Geo, SQL, etc. <----------------+
  w/ indexes    |                    |
                +--------------------+
```

## Specification Repo Layout

* [/IPLD-Data-Model-v1.md](/IPLD-Data-Model-v1.md)
* [/IPLD-Path.md](/IPLD-Path.md)
* [/CID.md](/CID.md)
* [/Codecs](/Codecs)
  * [/Codecs/DAG-JSON.md](/Codecs/DAG-JSON.md)
  * [/Codecs/DAG-CBOR.md](/Codecs/DAG-CBOR.md)
* [/Data-Structures](/Data-Structures)
  * [/Data-Structures/HAMT.md](/Data-Structures/HAMT.md)

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
