---
title: "Schemas: Feature Summary"
navTitle: "Feature Summary"
eleventyNavigation:
  order: 30
---

# IPLD Schemas Feature Summary

## Constructs for Describing Common Data Forms

IPLD Schemas present basics that are well-understood in many programming ecosystems (sum types, product types, some specific recursive types):

**Typed maps**

```ipldsch
{Foo:Bar}
```

**Typed lists**

```ipldsch
[Foo]
```

**Typedef'd primitives**

```ipldsch
type Foo int
```

**Structs**

```ipldsch
type FooBar struct {
  f Foo
  b Bar
}
```

**Discriminated unions (several styles matching those commonly found in the wild)**

```ipldsch
type union FooOrBar {
  Foo "f"
  Bar "b"
} representation keyed
```

**Enumerations**

```ipldsch
type FBB enum {
  | "Foo"
  | "Bar"
  | "Baz"
}
```

**A simple syntax for 'maybe' data elements**

```ipldsch
type Foo struct {
  f nullable Bar
}

type Bar [nullable Foo]
```

**A clear syntax for non-required fields**

```ipldsch
type Foo struct {
  f optional Bar
}
```

**Hooks for transparently transforming data with programmatic logic**

```ipldsch
advanced ROT13
type EncryptedString string representation advanced ROT13
```

## Mapped to the Data Model

All of this maps over the IPLD Data Model:

* Every type has a representation. e.g. Maps are represented as Maps, Structs are also represented as Maps.
* Representations can specify a mapping for serialized field names, which can be useful in cases such as requiring serialization compactness but preferring verbosity in the schema for descriptive purposes.
* Representations are customizable, including mapping a type onto a different representation kind entirely. e.g. a Struct can be declared to have a List representation (making it shorter to serialize, if less self-describing); or a Struct can be represented by simple string patterns.

There are some other IPLD features you may want to know about which can go even further than Schemas:
"[Advanced Data Layouts (ADLs)](/docs/advanced-data-layouts/)" define that can act as already-familiar data kinds such as Maps or Lists or Bytes (byte arrays),
while using a fully pluggable system to transform the content into other forms for representation.
A common use of such a feature is splitting data into fully separate chunks for storage, allowing:

* Very large byte arrays stored across many distinct blocks, presenting as a single iterable Bytes kind.
* Sharding abstractions for large data sets presented as Map or List kinds.
* Transparent wiring of at-rest encryption presenting as the unencrypted form of encrypted data.

...however, see [docs chapter for ADLs](/docs/advanced-data-layouts/) for more details about these.
ADLs work well together with Schemas, but are considered a different portion of the IPLD stack.

All the same tools that work over the IPLD Data Model also work atop Schemas:

* Traversals
* Pathing
* Selectors
* etc.

All of the generic IPLD algorithms can work over a Schema node in exactly the same way as over nodes in the plain Data Model.
This allows novel behaviors such as pathing through a Struct by field names even if the Struct representation is a list.
