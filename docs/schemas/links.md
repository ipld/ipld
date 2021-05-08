---
title: "Schemas: Links"
navTitle: "Links"
eleventyNavigation:
  order: 50
---

# Links and IPLD Schemas

IPLD Schemas are designed to describe data bounded by blocks.
Notably, IPLD Schemas are intentionally _not_ agnostic to block boundaries -- this is necessary to contain the complexity of validation:
You ought to be able to apply a schema to a block and have enough information to make fast, complete, validation.

The `link` kind is one of the [type kinds](../schema-kinds/) in schemas.
It maps fairly directly to the [data model link kind](/docs/data-model/kinds/#link-kind)
(in the same way as the `int` typekind is essentially the same as the data model `int` kind).
However, schema links can also add a bit more information -- as we'll see later, in the
[link destination type hinting](#link-destination-type-hinting) section.

Links define effective block boundaries. E.g.:

```ipldsch
type Foo struct {
  baz Int
  boom Link
}
```

Which tells us that there exists a `map` (the default `struct` representation) that contains a `baz` integer property and a `boom` link property. In this way we can state explicitly where to expect links in the same manner as describing the position of every other data model kind.

Links may appear in `struct`s, as elements of `list`s and as values of `map`s. They may also appear in `union`s if they are also assigned to a type:

```ipldsch
type MyKeyedUnion union {
  | Foo "foo"
  | Bar "bar"
} representation keyed

type Foo struct {
  froz Bool
}
type Bar link
```

This works for and for `envelope` `union`s, and also `kinded` `union`s, as `link` is a kind that can be discriminated. `inline` `union`s, however, currently describe complex types (structs) so cannot directly describe `link`s, although the containing `struct`s may contain `link`s.

## Link Destination Type Hinting

In many cases it is helpful to describe what is intended to occur across block boundaries, even though this cannot be verified by schemas in their per-block usage. For the purpose of codegen and as a documentation tool, we can provide "hinting" regarding the shape of the data (in schema terms) on the other side of a link.

We use the **`&`** operator to convert a complex `type` into a link, where, for the purpose of in-block validation we expect the thing it describes to be a `link`, but for the purpose of cross-block traversal we can _suggest_ that what is on the other side of the `link` is of a particular `type`.

In our original `struct` example, we could suggest that the `boom` property of `Foo`, when followed, will yield a `Grop`:

```ipldsch
type Foo struct {
  baz Int
  boom &Grop
}

type Grop struct {
  description String
  x Float
  y Float
  data [ Int ]
}
```

For the purpose of validation this works for `Foo` in precisely the same way as our original example; we still expect `boom` to be a link, and such validation may be successful regardless of what might be found if the link were followed. But we are now providing a "hint" that we expect that when following the link at `boom` we should find an object that can be described by `Grop`.

In the same way, our `keyed` `union` may be made more sophisticated to describe what we expect to be found if we were to follow the link:

```ipldsch
type MyKeyedUnion union {
  | Foo "foo"
  | &Grop "bar"
} representation keyed

type Foo struct {
  froz Bool
}
```

There is no facility in IPLD Schemas for implicitly describing a "may be a link, or may be inline" data structure. However we can do this explicitly with `kinded` `union`s, although without strong guarantees regarding what we might find when we follow a link:

```ipldsch
type HashMapNode struct {
  map Bytes
  data [ Element ]
}

type Element union {
  | HashMapNode map
  | &HashMapNode link
  | Bucket list
} representation kinded

# ... further definitions for `Bucket`
```

In this example, from the [HashMap](https://github.com/ipld/specs/blob/master/data-structures/hashmap.md) specification, we describe a `map`, named `HashMapNode` that contains a `data` property which is a list of `Element`s. These `Element`s may be one of three things: a `map` that contains another `HashMapNode` (an inlined child for a tree data structure), a `link` which is assumed to lead to a `HashMapNode` (a linked child) or a `Bucket` (not described here) which comprises a `list`.

Our validator can scan the `data` list and check that each element is one of: `map`, `link` and `list`. We make no strong assertions that the `link` actually yields a `HashMapNode` but such assertions may be built into code generated from this schema _when_ the link is loaded and validated.
