---
title: "Using ADLs in Schemas"
eleventyNavigation:
  order: 130
---

Using ADLs in Schemas
---------------------

::: todo
- This documentation needs review from a core contributor.  The language used is out of date and likely to be confusing.
:::

An ["Advanced Data Layout" (ADL)](/docs/advanced-data-layouts/) is a special type in an IPLD Schema that denotes an abstract node
that may _act_ as one of the standard IPLD [Data Model kinds](/docs/data-model/kinds/) when interacted with above the schema layer,
but be represented in entirely different data forms at the data model layer.
Advanced layouts allow us to use transformational logic to present consistent interfaces to significantly more complex data than the data model otherwise allows or significantly larger data than reasonable block sizes allow.

Data structures such as maps, lists or byte arrays may be implemented in novel forms with the data model and may even transparently cross block boundaries to present data that is potentially both larger and more complex than a standard data model kind while affording the standard data model API interaction modes of their respective kinds.

Example uses of advanced layouts include:

* Very large byte arrays that may cross many block boundaries but still present a standard `bytes` kind interface.
* Maps that can be sharded across many blocks allowing efficient access via standard `map` kind interfaces while allowing extremely large storage.
* Encrypted block mechanisms that are able to encode and decode data at the data model layer (perhaps in `byte` or `string` form) while presenting as unencrypted kinds when accessed through the schema layer.
* Novel kind representation formats, such as high-precision or large numbers or alternative string encoding formats. Although size constraints at the language layer for number kinds may represent challenges for large or high-precision number formats.

Advanced layouts necessarily involve a form of logic to perform their data transformations. Many use-cases even necessitate interaction with block loading and storing mechanisms, such as traversal of a large `bytes` array stored across a chain of blocks. There is currently no formal requirement for where this logic resides, how it is loaded, or how it is associated with an IPLD Schema definition. This topic will continue to evolve. There is potential in the future for such logic to be embedded _in_ IPLD blocks themselves via WebAssembly, such that an advanced layout is represented both by the data and the logic required to read it. See [#130](https://github.com/ipld/specs/issues/130) for an early exploration of some of these themes.

## Basic Schema Definition and Use

At its most basic, no properties are mandated for advanced layout. One may be defined simply with the keyword `advanced` in a similar manner to `type`:

```ipldsch
advanced ROT13
```

It may then be used as an `advanced` `representation` for a `type`, from which we can infer the `kind` that we expect.

```ipldsch
type MyString string representation advanced ROT13
```

Similarly, an advanced layout implementing a sharded `map` may be defined and used as:

```ipldsch
advanced ShardedMap

type MyMap map { String : &Any } representation advanced ShardedMap
```

From this usage, we may infer that `ShardedMap` can (1) present a familiar `map` kind interface and (2) store `link`s as values (with no specific "expectedType"), referenced by standard data model `string`s. Other operating modes for `ShardedMap` may also be possible (it may be able to store other value kinds, or it may even be able to act as a `bytes` kind in spite of its name!).
