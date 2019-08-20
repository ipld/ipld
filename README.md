IPLD Specifications
===================

The goal of IPLD is to enable decentralized data-structures that are universally addressable and linkable which in turn will enable more decentralized applications.
These data-structures allow us to do for data what URLs and links did for HTML web pages.
Read more about the principles that are guiding the ongoing development of IPLD in **[IPLD Foundational Principles](FOUNDATIONS.md)**.

IPLD is not a single specification it is a set of specifications.
Many of the specifications in IPLD are inter-dependent.

## IPLD Layer Model

This layer model is a simplified hierarchy of IPLD concepts and requirements.

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

### Block Layer (Layer 0)

The block layer encompasses all content addressed block formats and specifies how blocks are addressed, how they self-describe their codec for encoding/decoding, and how blocks link between each other.

This layer alone is enough to accomplish basic graph replication across a variety of formats (eth, bitcoin, git, dag-pb, dag-cbor, etc).

This layer does not define data structures or types, although many codecs may convert these formats into native types, there are no type requirements or assurances about types at the block layer.

**Documents:**

|     |      |
|-----|------|
| [Concept: Block](block-layer/block.md) | [block-layer/block.md](block-layer/block.md) |
| [Concept: Content Addressability](concepts/content-addressability.md) | [concepts/content-addressability.md](concepts/content-addressability.md) |
| [Concept: Multihash](block-layer/multihash.md) | [block-layer/multihash.md](block-layer/multihash.md) |
| [Concept: Serialization and Formats](block-layer/serialization-and-formats.md) | [block-layer/serialization-and-formats.md](block-layer/serialization-and-formats.md) |
| [Specification: CIDs](block-layer/CID.md) | [block-layer/CID.md](block-layer/CID.md) |
| [Specification: DagCBOR](block-layer/codecs/dag-cbor.md) | [block-layer/codecs/dag-cbor.md](block-layer/codecs/dag-cbor.md) |
| [Specification: DAG-JSON](block-layer/codecs/DAG-JSON.md) | [block-layer/codecs/DAG-JSON.md](block-layer/codecs/DAG-JSON.md) |
| [Specification: IPLD Selectors](selectors/selectors.md) | [selectors/selectors.md](selectors/selectors.md) |
| [Specification: Graphsync](block-layer/graphsync/graphsync.md) | [block-layer/graphsync/graphsync.md](block-layer/graphsync/graphsync.md) |

### Data Model Layer (Layer 1)

The Data Model Layer describes a set of base required types to be implemented by a subset of IPLD codecs.

With these basic types authors can create various single-block data structures which can be read with predictable paths and selectors.

With just the data model layer, several data structures can be authored and put into a single block.
These data  structures can also link to one another, but a *single* collection (Map or List) cannot be spread across many blocks with only the Data Model.

Since different systems and transports may impose block size limits (often 2mb or more) in order to control memory usage, larger collections need to be sharded over many blocks at the Schema Layer.

**Documents:**

|     |      |
|-----|------|
| [Specification: IPLD Data Model](data-model-layer/data-model.md) | [data-model-layer/data-model.md](data-model-layer/data-model.md) |
| [Specification: IPLD Paths](data-model-layer/paths.md) | [data-model-layer/paths.md](data-model-layer/paths.md)

### Schema Layer (Layer 2)

IPLD Schemas define a mapping from the Data Model Layer (Layer 1) to instantiated data structures comprising complex layouts.
The Schema Layer adds the ability to extend the IPLD Data Model to the wide variety of types required for typical programatic interaction with a data source without the need to implement custom translation abstractions.

The Schema Layer will also serve as an enabling layer for complex multi-block data structures by providing stability and consistency of data model use within individual blocks and defined interaction points for the logic required for building and interacting with advanced data layouts, such as multi-block Maps, Lists and Sets.

**Documents:**

|     |      |
|-----|------|
| [Concept: IPLD Multi-block Collections](schema-layer/data-structures/multiblock-collections.md) | [schema-layer/data-structures/multiblock-collections.md](schema-layer/data-structures/multiblock-collections.md) |
| [Specification: IPLD Schemas](schemas/README.md) | [schemas/README.md](schemas/README.md) |
| [Specification: HashMap](schema-layer/data-structures/hashmap.md) | [schema-layer/data-structures/hashmap.md](schema-layer/data-structures/hashmap.md) |

## Specification document status

Specification documents in this repository fit into one of two categories and have one of three possible statuses:

- Prescriptive
  - Exploratory
  - Draft
  - Final
- Descriptive
  - Draft
  - Final

**Prescriptive** specifications are intended to describe future  implementations or, in some cases, changes to existing implementations.

**Descriptive** specifications describe existing behavior.
In many cases these specifications are not intended to drive new implementations and are only written to understand existing behaviors.

Documents labelled "Specification" in this repository will also be labelled with a descriptor that indicates the category and status.
e.g. _"Status: Prescriptive - Draft"_ or _"Status: Descriptive - Final"_.

## Contributing & Discussion

Suggestions, contributions, criticisms are welcome.

Discussion of specifications happens in [this repository's issues](https://github.com/ipld/specs/issues) or via pull request. Discussion of IPLD more generally happens in the [IPLD repository](https://github.com/ipld/ipld/issues).

Check out our [contributing document](https://github.com/ipld/ipld/blob/master/contributing.md) for more information on how we work, and about contributing in general.
Please be aware that all interactions related to IPLD are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

## Governance

All changes to documents must take place via pull request.

Pull requests are governed by different rules depending on the document type and status of that document:

Specifications:

 * Exploratory Stage
   * Authors can merge changes into exploratory specifications at their own discretion
   * Exploratory specifications live in the `design` directory until they reach the draft stage. Specs
     names should include an alternative friendly naming convention (`-A`, `-B`, etc) while in this stage.
 * Draft Stage
   * Authors must attempt to reach a consensus between all active participants before a merge
   * If no objections are raised in a 48 hours period changes can be merged
   * If objections cannot be resolved the change can be voted on by the IPLD Team
 * Final Stage
   * Improvements that have a consensus can be merged
   * Changes to behavior should not be merged unless absolutely necessary and  agreed upon by a vote of the IPLD Team

Concepts and other documents (including README.md):

 * Authors must attempt to reach a consensus between all active participants before a merge
 * If no objections are raised in a 48 hours period changes can be merged
 * If objections cannot be resolved the change can be voted on by the IPLD Team

## IPLD Team

The IPLD Team consists of currently active IPLD developers.

* @mikeal
* @vmx
* @warpfork
* @rvagg

## License

This repository is only for documents.
All of these are licensed under the [CC-BY-SA 3.0](https://ipfs.io/ipfs/QmVreNvKsQmQZ83T86cWSjPu2vR3yZHGPm5jnxFuunEB9u) license, © 2016 Protocol Labs Inc.
