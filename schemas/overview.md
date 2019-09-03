IPLD Schemas Overview
=====================


Goals
-----

1. Provide a reasonable, easy to use, general type system for declaring
  useful properties about data.
2. Compose nicely over IPLD Data Model.  Schemas should be usable with any
  data format you can build an IPLD Codec for.
3. Be efficient to verify (e.g. predictable; roughly linear in the size of
  the data and schema; and absolutely not turing complete).
4. Be language-agnostic: many compatible implementations of the schema
  checker tools should exist, as well as bindings for every language.
5. Assist rather than obstruct migration.  (We expect data to exist from
  *before* the current schemas; we need to work well on this case.)
6. Be a home for collaboration and documentation!  Schemas should provide a
  natural place for API documentation, and be a reasonable design literature.

In total: **Make developing decentralized & distributed applications
easier, clearer, and more robust!**


Features
--------

Well-understood basics (sum types, product types, some specific recursive types):

- typed maps (e.g. `{Foo:Bar}`)
- typed lists (e.g. `[Foo]`)
- typedef'd primitives (e.g. `type Foo int`)
- structs (e.g. `struct{ f Foo; b Bar }`)
- discriminated unions (several styles)
- enumerations (e.g. `["Foo" | "Bar" | "Baz"]`)

Bonus features:

- simple syntax for 'maybe' (e.g. `struct{ f nullable Foo }` or `[nullable Foo]`)
- clear syntax for non-required fields (e.g. `struct { f optional Foo }`)

All of this maps over the IPLD Data Model:

- every type has a representation;
- e.g. maps are represented as maps; structs are also represented as maps!
- representations can specify a mapping for serialized field names, which can
  be useful in cases such as requiring serialization compactness but preferring
  verbosity in the schema for descriptive purposes.
- representations are customizable, including mapping a type onto a different
  representation kind entirely!  e.g. a struct can be declared to have a
  list representation (making it shorter to serialize, if less self-describing);
  or, a struct can be represented by simple string patterns (which is
  particularly neat since that string can then be used in map keys!).

Some things can go even further than the basic representations:

- "advanced layouts": types can be declared to act as already-familiar kinds
  of data structures such as maps or lists or byte arrays, while using
  a (fully pluggable) system to transform the content into other forms for
  representation, *including* splitting the data into fully separate chunks
  for storage -- this allows everything from sharding features for large
  dataset support, to transparent wiring of at-rest encryption.

All the same tools that work over the IPLD Data Model also work atop Schemas:

- traversals, pathing, selectors, etc -- all of our familiar generic algorithms
  can work over a schema node in exactly the same way as over nodes in the
  plain Data Model.  This allows neat behaviors like pathing through a struct
  by field names even if the struct representation is a list, for example!
