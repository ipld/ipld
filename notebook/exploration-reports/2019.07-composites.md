# Specification: IPLD Composites

**Status: Prescriptive - Exploratory**

Organizing IPLD data into usable, efficient, complex data structures spanning many blocks aimed for use by end-user applications.

This document will re-use some terms found in the [IPLD data model](data-model-layer/data-model.md). 

IPLD Composites offer codec agnostic programming interfaces for all common operations users can currently accomplish on Data-Model [“Kinds”](data-model-layer/data-model.md#kinds).

Contents:

  * [Motivation](#motivation)
  * [Requirements](#requirements)
  * [Composite Definition](#composite-definition)
  * [Operations](#operations)

## Motivation

Even before the IPLD Data-Model was formally specified, developers were creating multi-block data-structures with similar semantics to single-block primitives. The most illustrative example of this is the `dag-pb` HAMT implementation used by IPFS for large directories.

These early implementations of multi-block data structures exposed several problems.

  * They are lacking self-description. A consumer of a graph containing these structures needs to have logic on top of IPLD and vary the way it performs operations on these data structures.
  * Implementations of these data structures cannot perform operations on each other. In other words, multi-block data structures have a hard time building on top of each other.

Since there wasn’t a standardized way to describe these data structures we couldn’t build libraries for paths and selectors that seamlessly supported them.

As we started designing this system several other requirements surfaced.

* Transparent encryption envelopes on the read **and** write.
* Advanced `Link` types that can support some form of mutability and link to paths within other data structures.
* Flexible multi-block binary types.

## Requirements

IPLD Composites cannot be implemented without:

  * The IPLD Data-Model. While composites are codec agnostic they do require the full data model be implemented by the codec.

## Composite Definition

Composite definitions describe how to find an implementation of the data structure. When encoded into the data these also serve as a the self-description mechanism.

A Composite Definition may be applied in a number of ways, either "out-of-band" by applications or "in-band" using something like the the "Fat Pointers" discussed briefly below.

***Open Issue: Fat Pointers***

Early experiments simply reserved the `_type` property for composites to describe themselves. Reserving this property by default across any data in any block is highly problematic and makes it impossible to express certain data in IPLD.

What we need in order to move forward to enable some version of "fat pointer" is still under discussion. Some 
extension/modification to `CID` in order to signal that “the data being linked to is a composite definition” at 
which point we can safely ad semantics to `_type` or other properties without reserving any property universally 
would work but there may be other options we have yet to explore.

### Version 1

The `_type` property is a string identifier. This identifier is used to lookup the implementation and if it cannot be found by the host environment any operation is expected to throw an exception. When a Composite Definition is applied, implementations MUST NOT fallback to *Layer 1* operations on the contents of the node if they do not have an implementation.

Example:

```json
{ "_type": "IPLD/Experimental/HAMT/0" }
```

### Version 2

The `_type` property is a `Map`.

The map must contain the following properties.

  * `name` must be a string identifier.
  * `engine` must be one of the following:
	  * `”IPLD/Engine/WASM/0”`

Each additional property describes the implementation of every operation.

*TODO: define structure of pointers to WASM functions*
