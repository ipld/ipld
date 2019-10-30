# IPLD Schema DSL

* [Basics](#basics)
  * [Records: `type` and `advanced`](#records-type-and-advanced)
  * [Newlines and Whitespace](#newlines-and-whitespace)
  * [Comments](#comments)
* [Schema Kinds](#schema-kinds)
* [Naming Types](#naming-types)
* [Named Scalar Types (typedefs)](#named-scalar-types-typedefs)
* [Links](#links)
* [Inline Recursive Types](#inline-recursive-types)
* [Representations](#representations)
  * [Parens after field descriptions](#parens-after-field-descriptions)
* [Structs](#structs)
* [Enums](#enums)
* [Unions](#unions)
* [Advanced Data Layouts](#advanced-data-layouts)
* [Schemas in Markdown](#schemas-in-markdown)

IPLD Schemas can be represented in a compact, human-friendly [DSL](https://en.wikipedia.org/wiki/Domain_specific_language). IPLD Schemas can also be naturally represented as an IPLD node graph, typically presented in JSON form. The human-friendly DSL compiles into this IPLD-native format.

## Basics

### Records: `type` and `advanced`

IPLD Schemas typically comprise a collection of optionally interdependent types. Each type definition starts with a `type` prefix at the beginning of a line, followed by the type's name and then its definition. One other style of record optionally exists within an IPLD Schema, Advanced Data Layouts. These replace the `type` keyword with `advanced` and have specific rules about their contents. More on this below.

### Newlines and Whitespace

The DSL treats newlines as significant, they are used to break up records (`type` and `advanced`) and descriptors within records. Newlines are used in a similar way to programming languages that substitute C-style `;` breaks with significant newlines.

Multiple newline characters are folded in to one during parsing, so newlines may be used for formatting and documentation purposes where appropriate. It is also not necessary to separate records by a specific number of newlines, although a single blank line is typical.

Whitespace characters (tab and space) and also folded in to a single space during parsing, so may be used for formatting and documentation purposes where appropriate. Most tokens that don't need to be proceeded by a newline should be separated by at least one newline character. There are other tokens that don't strictly require a newline (e.g. `{String:Int}` for Map definitions where 5 tokens may be conjoined, but also may be separated, `{ String : Int }`). Indenting is not strictly required for record component descriptors but are typical as they can be used to express intent.

```ipldsch
type Foo struct {
  a   Int
  b   Int
  msg Message
}

type Message string
```

In this example:

 * The whitespace between non-punctuation tokens is required (`typeMessagestring` would be nonsense!)
 * At least one newline between each component of the `Foo` record are required such that `a`, `b`, and `msg` are all on separate lines.
 * The indenting for `a`, `b`, and `msg` is optional but helps express the ownership of these items to the parent record.
 * The additional spaces between `a`, `b` and their `Int` type descriptors is optional and used as a formatting nicety to line up the types in a Struct.
 * The blank line between the close of `Foo` and `Message` is optional but is intended to help with readability.
 * Newline and space rules for `{` and `}` are lax but convention is to use the locations and spacing in this example.

### Comments

All characters on a line following a `#` character are ignored during parsing. This allows for full-line comments and comments trailing Schema DSL tokens:

```ipldsch
#
# This is a (pseudo)block comment
#

type Foo struct {
  a Int # An inline comment
  b Int
  msg Message
}

# Another full-line comment
type Message string
```

## Schema Kinds

See [IPLD Schema Kinds](./schema-kinds.md) for more information on this topic.

The schema kinds have matching tokens that appear throughout IPLD Schemas. Depending on context, the tokens are either lower-case (e.g. `int`) or title-case (e.g. `Int`), or may omitted entirely because they can be reliably inferred. This will become clear as we proceed.

* Null: may appear as a typedef'd `null` but there is discussion regarding the possibility of changing the semantics of how Null is used in Schemas. It is not commonly useful outside of the `nullable` signifier for Struct fields.
* Boolean: may appear as `Bool` for a component specifier or `bool` as a typedef.
* Integer: May appear as `Int` for a component specifier or `int` as a typedef. There are no additional specifiers for integer size or signedness (although this may appear as adjuncts for codegen in the future).
* Float: May appear as `Float` for a component specifier or `float` as a typedef. There are no additional specifiers for size or byte representation (although this may appear as adjuncts for codegen in the future).
* String: May appear as `String` for a component specifier or `string` as a typedef. The Data Model assumes unicode. Specific string encodings also appear as representation forms, see below.
* Bytes: May appear as `Bytes` for a component specifier or `bytes` as a typedef. There are no additional specifiers for byte array length and there is no way to specify a single byte. The `byteprefix` Union representation type is a special case indicating a single byte dictates the type of the proceeding bytes, see below.
* List: Is inferred by the `[Type]` shorthand for both typedefs and inline component specification. The token "List" is not used in the Schema DSL and all Lists must have value type specified (although Unions allow for significant flexibility here).
* Map: Is inferred by the `{KeyType:ValueType}` shorthand for both typedefs and inline component specification. The token "Map" is not used in the Schema DSL and all Maps must have key and value type specified (although Unions allow for significant flexibility here).
* Link: The `&` token prefixing a type is used as a shorthand for links. A generic link to an untyped resource uses the special `&Any`, while a link where there is an expected type to be found uses that type name as a hinting mechanism, `&Foo`. See below and [Links and IPLD Schemas](./links.md) for more information.
* Union: Appears as `union` following `type` and the Union's type name.
* Struct: Appears as `struct` following `type` and the Struct's type name.
* Enum: Appears as `enum` following `type` and the Enum's type name.
* Copy: Uses the shorthand `=` to indicate a copy type, as in `type Foo = Bar`. The token "Copy" does not directly appear in the Schema DSL.


## Naming Types

By convention, type names should begin with a capital letter although this requirement is not strict. Type names must only contain contain printable ASCII characters excluding space and punctuation other than underscores and the first character should be a letter. A strict regular expression for type names would be: `[a-zA-Z][a-zA-Z0-9_]*`. A regular expression following convention would be: `[A-Z][a-zA-Z0-9_]*`.

Camel case with an upper case first character is recommended. Underscore `_` should be used sparingly. `ThisIsRecommend`, `This_Not_So_Much`, `Thisisnotrecommended`, `neitherIsThis`.

Type names are unique within a Schema and are ideally unique within related Schema documents; overlapping names are generally not ideal for documentation purposes. Certain forms of Schema kind identifiers are forbidden and those forms that are not forbidden should be avoided to save confusion for documentation purposes. i.e. `Null`, `Boolean`, `Int`, `Float`, `String`, `Bytes` are strictly not allowed as type names (they are already implicit type names), and their lower-case counterparts and the additional schema kinds should be avoided.

**Type names should be used as a documentation tool**. They don't need to be short if long names are more helpfully descriptive.

## Named Scalar Types (typedefs)

The non-recursive (scalar) Schema kinds may all appear as typedef'd types. That is, a unique name may be assigned to a kind and that name may be used in place of the kind later in the schema. Multiple unique type names may share the same kind.

```ipldsch
type Foo string
type Bar int
type Boom {Foo:Bar}
```

In terms of data layout, this is equivalent to:

```ipldsch
type Boom {String:Int}
```

(Note that even though the Data Model only allows for string keys of maps, the indirection through type `Foo` is allowed since it has a string representation.)

There are a number of reasons to typedef a scalar Schema kind:

* Documentation: A stand-alone type can be more easily documented in the Schema DSL. This may be helpful where there are additional rules that surround a type that are not expressible in the DSL but readers of the Schema may need to be aware of. You will find a lot of such typedefs in the [schema-schema](./schema-schema.ipldsch).
* Highlighting re-use: Where the re-use of a particular Schema kind is noteworthy, naming it may help in expressing intent.
* Codegen: the use of named types will have implications for codegen tools. It may be desirable for code generated from a Schema to have recognizable type names in certain positions.

## Links

## Inline Recursive Types

## Representations

### Parens after field descriptions

## Structs

## Enums

## Unions

## Advanced Data Layouts

## Schemas in Markdown

<!--
Notes
-----

These errata document some of the finer details of the schema DSL
which you don't need to read to get started, but may help clarify the
internal logic of why some parts of the syntax look the way they do.

### Parens after field descriptions

For the most part,
text in the "type" block describes properties of the type -- meaning: things
which affect the cardinality and essence of how we treat the thing --
and text in the "representation" block describes everything else -- meaning
things which change how we map things into the Data Model, but conserve
cardinality.

Sometimes a line which describes a field in a struct has some additional
text at the end of the line which is surrounded by parenthesis.
These parenthesis denote that the contained text is actually "representation"
description.  If we kept to the rule above, in order to specify information
relating to a specific field down in the representation block, we'd end up
repeating the field name.  The parenthesis are our solution to avoiding this
textual redundancy, while also continuing to mark the difference between type
and representational information.

If you look at the IPLD-native format rather than the DSL, you'll see that
the representation and type information remains in clearly separate trees,
and does indeed repeat field names; this concession of the parenthesis is
for the DSL's convenience only.
-->