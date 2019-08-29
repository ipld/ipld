Advanced Layouts for IPLD Schemas
---------------------------------

An "advanced layout" is a special type in an IPLD Schema that denotes an abstract node that may _act_ as one of the standard IPLD [schema kinds](./schema-kinds.md) when interacted with above the schema layer, but be represented in entirely different data forms at the data model layer. Advanced layouts allow us to use transformational logic to present consistent interfaces to significantly more complex data than the data model otherwise allows or significantly larger data than reasonable block sizes allow.

Data structures such as maps, lists or byte arrays may be implemented in novel forms with the data model and may even transparently cross block boundaries to present data that is potentially both larger and more complex than a standard data model kind while affording the standard data model API interaction modes of their respective kinds.

Example uses of advanced layouts include:

* Very large byte arrays that may cross many block boundaries but still present a standard `bytes` kind interface.
* Maps that can be sharded across many blocks allowing efficient access via standard `map` kind interfaces while allowing extremely large storage.
* Encrypted block mechanisms that are able to encode and decode data at the data model layer (perhaps in `byte` or `string` form) while presenting as unencrypted kinds when accessed through the schema layer.
* Novel kind representation formats, such as high-precision or large numbers or alternative string encoding formats. Although size constraints at the language layer for number kinds may represent challenges for large or high-precision number formats.

Advanced layouts necessarily involve a form of logic to perform their data transformations. Many use-cases even necessitate interaction with block loading and storing mechanisms, such as traversal of a large `bytes` array stored across a chain of blocks. There is currently no formal requirement for where this logic resides, how it is loaded, or how it is associated with an IPLD Schema definition. This topic will continue to evolve. There is potential in the future for such logic to be embedded _in_ IPLD blocks themselves via WebAssembly, such that an advanced layout is represented both by the data and the logic required to read it. See [#130](https://github.com/ipld/specs/issues/130) for an early exploration of some of these themes.

## Basic schema definition and use

At its most basic, no properties are mandated for advanced layout. One may be defined simply with the keyword `advanced` in a similar manner to `type`:

```ipldsch
advanced ROT13
```

It may then be used as a `representation` for a `type`, from which we can infer the `kind` that we expect.

```ipldsch
type MyString string representation ROT13
```

Similarly, an advanced layout implementing a sharded `map` may be defined and used as:

```ipldsch
advanced ShardedMap

type MyMap { String : Link } representation ShardedMap
```

From this usage, we may infer that `ShardedMap` can (1) present a familiar `map` kind interface and (2) store `link`s as values, referenced by standard data model `string`s. Other operating modes for `ShardedMap` may also be possible (it may be able to store other value kinds, or it may even be able to act as a `bytes` kind in spite of its name!).

## Root node type definitions

Advanced layouts are designed to abstract data that exists at the data model layer. As such, they may also dictate what they expect from the data that exists at the node their _root_ resides at.

In the case of our `ROT13` `string` representation, we are likely to want to store this on the block as a `string` (i.e. this is a crude encryption mechanism, transforming `string` to `string`—realistic encryption mechanisms are likely to involve `bytes` and perhaps complex data structures to store encryption metadata).

```ipldsch
advanced ROT13 {
  root String
}

type MyString string representation ROT13

type Name struct {
  firstname MyString
  surname MyString
}
```

A validator using our schema is now able to assert that it should find a `map` (default `struct` representation) with two fields, `firstname` and `surname`, and, thanks to the `root` definition of `ROT13`, it may also assert that these two fields are of kind `string`.

We may also introduce complex types as the root definition. For example, a `byte` representation that is a chain of blocks, each containing a section of `bytes` and a link to the next block:

```ipldsch
advanced ChainedBytes {
  root Chunk
}

type Chunk struct {
  contents Bytes
  next nullable Link
}
```

Or, as in the IPLD [HashMap](../schema-layer/data-structures/hashmap.md) spec:

```ipldsch
advanced HashMap {
  root HashMapRoot
}

# Root node layout
type HashMapRoot struct {
  hashAlg String
  bucketSize Int
  map Bytes
  data [ Element ]
}

# ... `Element` (and further) definition omitted
```

And we could use this to define a map of `string`s to `link`s:

```ipldsch
type MyMap { String : Link } representation HashMap
```

We could even combine usage of our `ROT13` and `HashMap` definitions in novel ways:

```ipldsch
type BigConfidentialCatalog [ Secretz ]

type Secretz struct {
  title MyString
  data MyMap
}

type MyMap { String : Name } representation HashMap
```

If we were to take an IPLD node, and assert that it is of type `BigConfidentialCatalog`, we should expect that:

1. The node is a `list` kind
2. Each element of the `list` contains a `map`, which is described by `Secretz`
3. Each map contains the two properties defined by `Secretz`: `title` and `data`
4. The `title` property of the `map` is of `string` kind, thanks to the `MyString` definition, but it must be transformed through the `ROT13` layout to make sense of it.
5. The `data` property of the `map` is of `map` kind, which itself should conform to the `HashMapRoot` type specification, but must be interacted through with the logic associated with `HashMap` in order to make sense of it (which may also involve loading further blocks to traverse the sharded data).

If `ROT13` and `HashMap` were to omit their `root` descriptor, we could only make assertions 1 and 2 above.
