# IPLD Roadmap (2023)

**Status:** Draft

This document is a *work in progress* while we:

1. Attempt to gather stakeholder feedback on priorities
2. Plan and understand resourcing to execute on the goals

## Scope

"IPLD" is referred to here in a broad sense as "the data layer of the distributed web" with an IPFS flavour. As such, IPLD tools, libraries and documents will tend to use the CID and the Multiformats suite for expressing and representing linking. IPLD aims to be able to represent a broad range of **content addressed** data, but its anchoring in the IPFS ecosystem presents some limitations in the scope of what is possible to encompass.

The exact boundaries of IPLD are not strictly defined. Historically, data storage and data transfer have represented boundaries for IPLD. These are not strict boundaries but provide guidance on the areas of concern and what the "data layer" means. Most commonly, IPLD relates to tooling for serialising / deserialising binary data, representing that data in a consistent and coherent **linked data model** and providing tools and techniques for addressing, traversing and manipulating that data.

## Focus Areas

### Documentation

1. Improved onboarding documentation and resources.
2. Improved UX for consolidated docs/specs site (ipld.io)

### Distributed Data Structures

Specifications and documentation related to data structures to represent common application data over content addressed data. Including: filesystem data, ordered and unordered maps, sparse and dense arrays, encrypted and/or signed data.

The IPFS ecosystem today leans most heavily on two common data structures: UnixFS for file data, and HAMTs for unordered maps (also used within UnixFS). There exists many bespoke data structures within the ecosystem, but as yet these have not achieved widespread use and remain the domain of specific applications / projects.

A need exists to:

1. Document / describe / specify existing data structures that are in use within the IPFS ecosystem; such that they can be more broadly consumed, reimplemented, improved and contribute to an ecosystem of knowledge regarding IPLD data structure best practices.
2. Develop and implement new data structures to serve critical gaps. Most notably, we need performant and secure ordered maps to serve as a foundation for database-like functionality on top of IPLD.

### Testing & Compliance

Significant work has been invested in testing and compliance of IPLD component implementations over the last 3 years but this work is incomplete.

Next steps include:

1. Expanding codec test fixturing to include *negative* tests which can strictly describe the boundaries of correctness for codec implementations; i.e. data forms at the boundaries which are expected to fail encoding or decoding using specific codecs.
2. Further consolidation of test fixtures into the ipld/ipld repository and consumption of this data as a source of truth. This likely includes investment in [testmark](https://github.com/warpfork/go-testmark) style fixtures.
   1. Schema fixtures: not consistently consumed across JavaScript and Go from ipld/ipld
   2. Codec fixtures: source of truth is ipld/codec-fixtures; current representation as testmark in ipld/ipld is not ideal.
   3. CAR fixtures: live in js-car and go-car, with some overlap.
   4. Data structure fixtures: are currently very minimal and mainly provided as an example and not consumed from ipld/ipld by implementations.
   5. CID & core multiformats fixtures: need collecting and documenting in an appropriate place (ipld/ipld may not be the right location for these)

### CAR Consolidation

There has been an explosion of activity around CAR as a fundamental data format. This activity is not well reflected in core documentation or specifications. Investment is needed to document, consolidate and shepherd CAR-related activity in order to ensure maximum compatibility throughout the ecosystem and provide a pathway to solutions that various parties are seeking through the use of CAR, CAR extensions and CAR-related tooling.

This work may also involve a CARv3, or (more likely) extensions of CARv2 to support user-needs.

### Implementation Specific: Go

Go has the most mature instantiation of a holistic vision of what IPLD can be and many of the components of that vision are being used in production—specifically in Filecoin and Filecoin-adjacent projects.

The roadmap for IPLD work in Go should focus on: Stability, Usability and Performance.

Major areas of work for Go include:

#### Bindnode

Bindnode was productionised during 2022 and deployed in a varied set of projects. Further work is needed in the following areas:

* Expansion of supported IPLD Schema feature set
* Expansion of Go type support (e.g. maps and slices, possibly generics)
* Testing and hardening
* Performance

#### Selectors

Selectors are heavily used but much complained-about. Investment is needed to:

* Improve the selectors API(s) for greater usability, focused on how various use-cases consume selectors
* Clarify the scope of selectors to avoid (reduce?) combinatorial explosion in complexity for users and implementations (which may mean reducing scope from what it is now, or segmenting scope for separate API paths).
* Improve performance, possibly including providing alternative execution modes that sacrifice certain properties (e.g. determinism, feature-set) for performance.

### Implementation Specific: JavaScript

* Possible Node interface(s) to allow better/full support of core functionality available in Go
* Lenses and layering
* APIs to pull them together

### Implementation Specific: Rust

The current Rust tooling is weak and incomplete. Investment is required to complete basic components (e.g. codecs) and explore possibilities for improved interfaces, possibly similar to that which is available in Go today.

### Implementation Specific: WASM

* Develop a WASM-specific roadmap, exploring codecs, ADLs, potential for other runtime stack-component loading




