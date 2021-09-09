The Schema Prelude
==================

The IPLD Schema "prelude" is a series of type declarations that are implicitly present at the top of all schemas.
It introduces all the types that are seen used in nearly every schema,
which makes them available consistently under consistent names, and saves a little redundancy for users.
However, beyond that, there's nothing magical about the Prelude (as you'll see!).

Here is the Prelude, in IPLD Schema DSL form:

```ipldsch
type Bool bool
type Int int
type Float float
type String string
type Bytes bytes
type Any any
type Map {String:Any}
type List [Any]
type Link &Any
type Null unit representation null
```

Note that not all schemas technically need the prelude;
it's perfectly possible to author a schema which has a name for every single one of its types,
and doesn't use any of the names provided by the prelude.
For example, the schema-schema happens to get along fine without ever referring to any of the types named by the prelude.
