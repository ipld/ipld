---
title: "Schemas: Authoring Guide"
navTitle: "Authoring Guide"
eleventyNavigation:
  order: 80
---

# Authoring IPLD Schemas

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
  * [Representation Parameters](#representation-parameters)
    * [General Representation Parameters](#general-representation-parameters)
    * [Field-specific Representation Parameters](#field-specific-representation-parameters)
* [Structs](#structs)
* [Enums](#enums)
* [Unions](#unions)
  * [Introduction to Unions: Kinded Unions](#introduction-to-unions-kinded-unions)
  * [Limitations of Union Discrimination](#limitations-of-union-discrimination)
  * [Alternative Discrimination Strategies](#alternative-discrimination-strategies)
    * [Keyed](#keyed)
    * [Envelope](#envelope)
    * [Inline](#inline)
  * [Stringprefix Unions for Strings](#stringprefix-unions-for-strings)
  * [Bytesprefix Unions for Bytes](#bytesprefix-unions-for-bytes)
* [Copy](#copy)
* [Advanced Data Layouts](#advanced-data-layouts)
* [Schemas in Markdown](#schemas-in-markdown)

IPLD Schemas can be represented in a compact, human-friendly [DSL](https://en.wikipedia.org/wiki/Domain_specific_language). IPLD Schemas can also be naturally represented as an IPLD node graph, typically presented in JSON form. The human-friendly DSL compiles into this IPLD-native format.

## Basics

### Records: `type` and `advanced`

IPLD Schemas typically comprise a collection of optionally interdependent types. Each type definition starts with a `type` prefix at the beginning of a line, followed by the type's name and then its definition. One other style of record optionally exists within an IPLD Schema, Advanced Data Layouts. These replace the `type` keyword with `advanced` and have specific rules about their contents. More on this below.

### Newlines and Whitespace

The DSL treats newlines as significant, they are used to break up records (`type` and `advanced`) and descriptors within records. Newlines are used in a similar way to programming languages that substitute C-style `;` breaks with significant newlines.

Multiple newline characters are folded in to one during parsing, so newlines may be used for formatting and documentation purposes where appropriate. It is also not necessary to separate records by a specific number of newlines, although a single blank line is typical.

Whitespace characters (tab and space) are also folded in to a single space during parsing, so may be used for formatting and documentation purposes where appropriate. Most tokens that don't need to be proceeded by a newline should be separated by at least one newline character. There are other tokens that don't strictly require a newline (e.g. `{String:Int}` for Map definitions where 5 tokens may be conjoined, but also may be separated, `{ String : Int }`). Indenting is not strictly required for record component descriptors but are typical as they can be used to express intent.

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

See [IPLD Schema Typekinds](/docs/schemas/features/typekinds/) for more information on this topic.

The schema kinds have matching tokens that appear throughout IPLD Schemas. Depending on context, the tokens are either lower-case (e.g. `int`) or title-case (e.g. `Int`), or may omitted entirely because they can be reliably inferred. This will become clear as we proceed.

* Null: may appear as a typedef'd `null` but there is discussion regarding the possibility of changing the semantics of how Null is used in Schemas. It is not commonly useful outside of the `nullable` signifier for Struct fields.
* Boolean: may appear as `Bool` for a component specifier or `bool` as a typedef.
* Integer: May appear as `Int` for a component specifier or `int` as a typedef. There are no additional specifiers for integer size or signedness (although this may appear as adjuncts for codegen in the future).
* Float: May appear as `Float` for a component specifier or `float` as a typedef. There are no additional specifiers for size or byte representation (although this may appear as adjuncts for codegen in the future).
* String: May appear as `String` for a component specifier or `string` as a typedef. The Data Model assumes unicode. Specific string encodings also appear as representation forms, see below. The `stringprefix` Union representation strategy is a special case indicating a prefix string dictating the type of the proceeding characters, see below.
* Bytes: May appear as `Bytes` for a component specifier or `bytes` as a typedef. There are no additional specifiers for byte array length and there is no way to specify a single byte. The `bytesprefix` Union representation type is a special case indicating prefix string of one or more bytes dictates the type of the proceeding bytes, see below.
* List: Is inferred by the `[Type]` shorthand for both typedefs and inline component specification. The token "List" is not used in the Schema DSL and all Lists must have value type specified (although Unions allow for significant flexibility here).
* Map: Is inferred by the `{KeyType:ValueType}` shorthand for both typedefs and inline component specification. The token "Map" is not used in the Schema DSL and all Maps must have key and value type specified (although Unions allow for significant flexibility here).
* Link: The `&` token prefixing a type is used as a shorthand for links. A generic link to an untyped resource uses the special `&Any`, while a link where there is an expected type to be found uses that type name as a hinting mechanism, `&Foo`. See below and [Links in IPLD Schemas](/docs/schemas/features/links/) for more information.
* Union: Appears as `union` following `type` and the Union's type name.
* Struct: Appears as `struct` following `type` and the Struct's type name.
* Enum: Appears as `enum` following `type` and the Enum's type name.
* Copy: Uses the shorthand `=` to indicate a copy type, as in `type Foo = Bar`. The token "Copy" does not directly appear in the Schema DSL.


## Naming Types

Type names _must_ only contain alphanumeric ASCII characters and underscores. The first character _must_ be a capital letter. Multiple connected underscores _should_ be avoided (they should be reserved for codegen purposes). A strict regular expression for type names would be: `[a-zA-Z][a-zA-Z0-9_]*`. A regular expression following convention would be: `[A-Z][a-zA-Z0-9_]*` (disregarding the multiple-underscore rule for simplicity).

Camel case with an upper case first character is recommended. Underscore `_` should be used sparingly. `ThisIsRecommend`, `This_Not_So_Much`, `Thisisnotrecommended`, `neitherIsThis`.

Type names are unique within a Schema and are ideally unique within related Schema documents; overlapping names are generally not ideal for documentation purposes. Certain forms of Schema kind identifiers are forbidden and those forms that are not forbidden should be avoided to save confusion for documentation purposes. i.e. `Null`, `Boolean`, `Int`, `Float`, `String`, `Bytes` are strictly not allowed as type names (they are already implicit type names), and their lower-case counterparts and the additional schema kinds should be avoided.

**Type names should be used as a documentation tool**. They don't need to be short if long names are more helpfully descriptive.

## Named Scalar Types (typedefs)

The non-recursive (scalar) Schema kinds (Boolean, Integer, Float, String, Bytes, Link) may all appear as typedef'd types. That is, a unique name may be assigned to a kind and that name may be used in place of the kind later in the schema. Multiple unique type names may share the same kind.

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

* Documentation: A stand-alone type can be more easily documented in the Schema DSL. This may be helpful where there are additional rules that surround a type that are not expressible in the DSL but readers of the Schema may need to be aware of. You will find a lot of such typedefs in the [schema-schema](/specs/schemas/schema-schema.ipldsch).
* Highlighting re-use: Where the re-use of a particular Schema kind is noteworthy, naming it may help in expressing intent.
* Codegen: the use of named types will have implications for codegen tools. It may be desirable for code generated from a Schema to have recognizable type names in certain positions.

## Links

Links in IPLD Schemas are a special-case. The Data Model kind "Link" is expressed by a token prefixed with the `&` character. The remainder of the token should be `Any` or the name of a type.

Links can be typedef'd, `type Foo &Bar` or can appear inline: `type Baz {String:&Bang}`.

Further, the type name is not a strict assertion that can be directly tested against underlying data, it is simply a hint regarding what should be found when following the link identified by the [CID](https://github.com/ipld/specs/blob/master/block-layer/CID.md) at the position indicated by the Schema link. Strict assertions of this expected type may be applied at layers above the Schema validation layer when the link is resolved and the node decoded.

For more information about Links in Schemas, see [Links in IPLD Schemas](/docs/schemas/features/links/).

## Inline Recursive Types

The scalar types (Boolean, Integer, Float, String, Bytes, Link) may appear inline or be typedef'd. In addition, both Map and Link types may appear both inline and as their own type. The additional Schema kinds (Struct, Enum, Union, Copy) do not have an inline variant.

```ipldsch
type IntList [Int]

type MapOfIntLists {String:IntList}

type Foo struct {
  id Int
  data MapOfIntLists
}
```

is equivalent to:

```ipldsch
type Foo struct {
  id Int
  data {String:[Int]}
}
```

As with typedef'd scalar kinds, this has implications for codegen and other API interactions with Schema types. Rather than having a explicit names, `MapOfIntLists` and `IntList`, auto-generated names may be applied to `Foo->data` and the type of the List nodes found within that Map. (e.g. perhaps `Foo__dataType`, `Foo__data__valueType`).

The inline facility is provided for convenience but explicitness is always recommended above expedience, including this case, in order to improve the documentation role of Schemas. By naming Map and List elements the author can express intent to the user and provide clarity through Schema-consuming tools.

## Representations

The concept of "representations" is a key component of IPLD Schemas and should be understood in order to create and read effective IPLD Schemas.

In the Data Model there are only 9 kinds (Null, Boolean, Integer, Float, String, Bytes, List, Map & Link). The Schema layer adds 4 more (Union, Struct, Enum & Copy). These aren't present at the Data Model and are opaque to serialization formats. Instead, they must be "represented" as a base Data Model kind. Each data type at the Schema layer, therefore, has a "representation kind". Scalar kinds are represented as the same kind at the Data Model layer (except in the case of Advanced Data Layouts, see below).

A Struct is represented as a Map by default when serialized and deserialized. The Struct adds the ability to apply additional constraints about the keys, the types found when consuming the value nodes of the Map, whether certain keys must be present and what to do when they aren't present. Enums also have a default representation; when one is not specified, they are assumed to be represented as Strings when serialized or deserialized, but with constraints about valid strings for the node(s) where the Enum appears.

A Copy type is a special case, it copies all properties of the copied type other than its name, including the representation.

Unions don't have a default representation as they express a concept that is commonly represented in a number of ways, so a representation must be supplied when defining a Union type.

Some Schema kinds have alternative representation "strategies" that dictate how a type is to be represented in serialized form. Most of these strategies change the representation kind of the type but some retain the same kind and simply alter how the type is encoded within that kind. The `stringjoin` and `stringpairs` representation strategies that can be used for Struct types both change the representation kind for a Struct from the default Map to a String. The method for encoding to a single String is different for both. A `stringjoin` strategy appends the fields in order separated by a delimiter  (e.g. `"v1,v2"`) while a `stringpairs` strategy include the field names, requiring a field delimited as well as an entry delimited (e.g. `"f1=v1,f2=v2"`). Similarly, the `listpairs` and `tuple` Struct representations both use a List representation kind but use different strategies to encode within a List.

To specify a type's representation, the keyword `representation` is supplied after the main type definition and is followed by a representation strategy name valid for that type.

For example, consider this Struct:

```ipldsch
type Foo struct {
  fieldOne nullable String
  fieldTwo Bool
}
```

We could decode the following JSON (using the DAG-JSON codec) into a `Foo` type:

```json
{
  "fieldOne": "This is field one of Foo",
  "fieldTwo": false
}
```

A Struct can also have the default representation expressed explicitly:

```ipldsch
type Foo struct {
  fieldOne nullable String
  fieldTwo Bool
} representation map
```

These two descriptors of `Foo` are identical when parsed as the `representation map` is implicit for Structs when a representation is not supplied.

The Struct can also be represented as a List when we supply the `tuple` representation strategy:

```ipldsch
type Foo struct {
  fieldOne nullable String
  fieldTwo Bool
} representation tuple
```

When encountering a Map at the Data Layer where this variant of `Foo` is expected, an error or failed-validation would occur. Instead, the data for this Struct is a simple List of two elements, the first one a String and the second a Bool. In JSON this may look like:

```json
[ "This is field one of Foo", false ]
```

A full list of the available representation strategies and their kinds that can be supplied for various Schema kinds can be found in [Representations Strategies](/docs/schemas/features/representation-strategies/).

### Representation Parameters

Some representation strategies have additional parameters that can be supplied and some have required parameters that are required in order to properly shape the type representation. There are two methods that representation parameters are supplied: within the `representation` block for general parameters and inline adjacent to type fields in parens where representation parameters are specific to fields.

#### General Representation Parameters

Our `Foo` struct with a `tuple` representation may be serialized in an alternate field order by supplying the general `fieldOrder` parameter:

```ipldsch
type Foo struct {
  fieldOne nullable String
  fieldTwo Bool
} representation tuple {
  fieldOrder ["fieldTwo", "fieldOne"]
}
```

Serialization of such a type in JSON may appear as:

```json
[ false, "This is field one of Foo" ]
```

The `stringjoin` representation for Structs has a required parameter, `join`. There is no default for this parameter, so a Schema specifying a `stringjoin` Struct without it is invalid:

```ipldsch
type Foo struct {
  fieldOne nullable String
  fieldTwo Bool
} representation stringjoin {
  join ":"
}
```

This representation for `Foo` would serialize into a single String node:

```json
"This is field one of Foo:false"
```

This representation for Structs has limitations as there is no escaping mechanism for the join character, so it should be used with caution. Similar restrictions apply to the `stringpairs` Map representation. See [Representations Strategies](/docs/schemas/features/representation-strategies/) for more details on such restrictions.

#### Field-specific Representation Parameters

The content in the main `type` declaration block (between opening `{` and closing `}`) is intended to represent the type as a user-facing concept,
including the [cardinality](/docs/schemas/features/typekinds/#understanding-cardinality) of the fields.
However, content in parens (`(`, `)`) presented next to individual fields is an exception to this rule.
This content is field-specific representation parameters.
That is, the parameters presented inside these parens would ordinarily belong below in the `representation` block because it regards the interaction with the serialized form.
It is present next to the fields to primarily avoid the duplication of re-declaring the fields in the `representation` block.

Two common field-specific representation parameters for Structs are `implicit` and `rename`:

```ipldsch
type Foo struct {
  fieldOne nullable String (rename "one")
  fieldTwo Bool (rename "two" implicit "false")
}
```

A cleaner declaration that separates type declaration from serialized form representation details might present this as:

```
# This is not valid IPLD Schema but is presented to illustrate the additional verbosity being avoided

type Foo struct {
  fieldOne nullable String
  fieldTwo Bool
} representation map {
  fields {
    fieldOne rename "one"
    fieldTwo rename "two" implicit "false"
  }
}
```

In our example we can see that `nullable` is a distinct parameter for the field compared to `rename` and `implicit`. This is because `nullable` impacts the shape of the user-facing API for `Foo`, whereas `rename` and `implicit` only impact the serialization (representation) of `Foo` so are effectively hidden to the user.

See [Value Type Modifiers](/docs/schemas/features/typekinds/#value-type-modifiers) for a discussion on such matters as well as the impacts on value cardinality.

A `rename` parameter specifies that at serialization and deserialization, a field has an alternate name than that present in the Schema. An `implicit` specifies that, when not present in the serialized form, the field should have a certain value.

Recall our original serialized form for `Foo`:

```json
{
  "fieldOne": "This is field one of Foo",
  "fieldTwo": false
}
```

With the `rename` and `implicit` parameters above, this same data would be serialized as:

```json
{
  "one": "This is field one of Foo"
}
```

See [Fields with Implicit Values](/docs/schemas/features/typekinds/#fields-with-implicit-values) for more information on `implicit`.
In the same document you will also find a discussion regarding combining `nullable`, `optional` and `implicit` and the limitations thereof.

Whenever a value appears in a representation parameter, it must be quoted, regardless of type. In our example above, `implicit "false"` quoted a Bool parameter. This will be interpreted appropriately depending on context, in this case it is clear that the type of the quoted value should be a Bool.

Another example of field parameters is the `int` representation for Enums, where the field parameter is mandatory:

```ipldsch
type Status enum {
  | Nope  ("0")
  | Yep   ("1")
  | Maybe ("100")
} representation int
```

In this case we are mapping Int values at in the serialized form to the three Enum values. Note also that the values are again quoted, but will be interpreted appropriately as integers because the context makes that clear.

## Structs

The basic DSL form of a Struct has the following structure:

```
type TypeName struct {
  field1Name Field1Type
  field2Name Field2Type
  ... etc.
}
```

Where `TypeName` is a unique name for the type and follows the naming rules above. Field names follow the same rules as for type naming except that a lower-case first character is allowed and is encouraged as the conventional form. All fields have a type and the type should be one of the existing implicit Schema types (`Int`, `String` etc.) or be present as a named type elsewhere within the document. Field types can be recursive in that they can refer to the parent type, indicating a nested data structure (obviously such a nested data structure must have nullable or optional elements that prevent it from being necessarily infinitely recursive).

Structs must always have a body, enclosed by `{`, `}`. Fields must new-line delimited and should be indented for clarity.

The `representation` strategy for Structs is `map` by default, so may be omitted.
More details can be found in the feature detail pages about [Representations Strategies](/docs/schemas/features/representation-strategies/).

Field representation parameters are presented in parens when present and representations requiring additional general parameters is presented in a separate `representation` block enclosed by `{`, `}`. For example, a Struct with both field representation parameters and general representation parameters:

```ipldsch
type Foo struct {
  fieldOne nullable String (rename "one")
  fieldTwo Bool (rename "two" implicit "false")
} representation stringpairs {
  innerDelim "="
  entryDelim ","
}
```

Leading to a serialized form such as:

```json
"one=This is field one of Foo,two=true"
```

More details regarding `stringpairs` can be found below,
and in the feature detail pages about [Representations Strategies](/docs/schemas/features/representation-strategies/).

Valid representation strategies for Structs are:

* `map`
* `tuple`
* `stringpairs`
* `stringjoin`
* `listpairs`

More details about these representation strategies, including the data model kinds the map to, and their various parameters,
scan be found in the feature detail pages about [Representations Strategies](/docs/schemas/features/representation-strategies/).

## Enums

Enums are used to indicate a distinct, fixed list of values. Enums in IPLD Schemas have a String representation kind, using the value token as the serialized value by default.

```ipldsch
type Status enum {
  | Nope
  | Yep
  | Maybe
}

type Response struct {
  timestamp Int
  status Status
}
```

In this example, where `Status` is used, as the `status` field in the `Response` Struct, we expect to find a String in the serialized form that is one of `"Nope"`, `"Yep"` or `"Maybe"`. This string value is not presented via an API interacting via this Schema, rather, the special tokens `Nope`, `Yep` and `Maybe` may be used instead. Codegen would present these values as distinct types that can be passed to a struct / class implementing `Response` when interacting with the `status` field.

The serialized strings may be different from values:

```ipldsch
type Status enum {
  | Nope ("Nay")
  | Yep  ("Yay")
  | Maybe
}
```

Creating a differential between the Strings at the Data Model layer and the tokens that an API may use at the Schema layer.

An alternate representation strategy for Enums may be specified: `int`. With an `int` representation strategy, the values are serialized and deserialized as Data Model Ints but the Enum value tokens are presented at the Schema Layer:

```ipldsch
type Status enum {
  | Nope  ("0")
  | Yep   ("1")
  | Maybe ("100")
} representation int
```

Note again that the Int values are quoted in the field representation parens, they will be interpreted and validated as integers when parsing as the context of an `int` representation strategy makes this clear.

More details can be found in the feature detail pages about [Representations Strategies](/docs/schemas/features/representation-strategies/).

## Unions

### Introduction to Unions: Kinded Unions

IPLD Schema Unions describe various means for nodes that may be one of a number of kinds or forms. Consider a node that contains the following data, perhaps as part of a signalling protocol:

```json
{
  "msg": "Something bad happened",
  "payload": "ERROR"
}
```

And an alternative form that is also acceptable but signals a different state and meaning:

```json
{
  "msg": "All good",
  "payload": {
    "percent": 0.6,
    "last": "61626378797a"
  }
}
```

In this example, we have a Map that can be represented as a Struct since it has only two fields, but the `payload` field doesn't have a stable kind so we can't use any of the existing Schema types to represent the field type. Instead, we can introduce a Union and can take different forms depending on the different acceptable forms.

IPLD Schemas are intended to be efficient, so the ability to discriminate on Union types is limited to what we can find _at the current node_. That is, we can't inspect whether a node has a child that takes a particular form and use that as a discriminator (such as inspecting the keys or values of a Map). A Schema must be able to fail validation at a node being inspected where the data does not match the expected form.

In our example, the discriminator for type found at `payload` is the _kind_ of node present. It is either a String kind of a Map kind. We can make an immediate determination of type based on this piece of information.

Our Schema for this data could be written as:

```ipldsch
type Message struct {
  msg String
  payload Payload
}

type Payload union {
  | Error string
  | Progress map
} representation kinded

type Error string

type Progress struct {
  percent Float
  last String
}
```

Our `Payload` Union can be read as "one of `Error` or `Progress`" and could have additional elements if there are different forms that a `"payload"` could take. All Unions require a representation strategy to be stated, there is no default strategy. In this case we are specifying the `kinded` strategy, so we are opting to discriminate the type by inspecting the kind present at the data model layer. If we find a String at the data model layer then we can safely assume it is an `Error`. If we find a Map then we assume it's a `Progress` type but we have to proceed to validate it against `Progress` and check whether the Map has the required two elements, but at this point the validation job of `Payload` is done, it only needs to check for the presence of String or Map.

### Limitations of Union Discrimination

Authoring Unions in IPLD Schemas help expose some of the limitations of quickly validating data that is allowed to vary. If we extend our example and introduce another acceptable form of `"payload"` we can see how this ability to quickly discriminate breaks down and introduces the need to do child-contents checking to discriminate:

```json
{
  "msg": "Ping",
  "payload": {
    "ts": 1572935564043,
    "nonce": "424f524b"
  }
}
```

We've introduced a new message type but lost the ability to discriminate based in kind as our new type is also a Map. A Schema that accommodates for this additional payload type is possible but forces the burden of discrimination and onto the consumer of the data as well as some additional validation burden:

```ipldsch
type Message struct {
  msg String
  payload Payload
}

type Payload union {
  | Error string
  | ProgressOrPing map
} representation kinded

type Error string

type ProgressOrPing struct {
  percent optional Float
  last optional String
  ts optional Int
  nonce optional String
}
```

Now the user of such a Schema must do their own field inspection to determine whether a `ProgressOrPing` is a progress message or a ping. Additionally, the burden of ensuring that both `percent` and `last` are present _or_ `ts` and `nonce` are present is left to the user, the Schema layer can't help here. The trade-off present in this scenario regards validation of a node by inspection of its child nodes. This type of data is common in the real world but IPLD Schemas encourage better data shape design to allow for fast validation through clear discrimination where such variance exists.

### Alternative Discrimination Strategies

If we are designing the data layout for our example protocol (rather than consuming something we have no control over the design of), we could choose a alternate strategy that would allow more efficient discrimination. Unions allow for five different representation strategies that allow for different kinds of discrimination.

#### Keyed

By making our `"payload"` object contain a specific key that discriminates the type of the payload, we could use a `keyed` Union:

```json
{
  "msg": "Something bad happened",
  "payload": {
    "error": "ERROR"
  }
}
```

```json
{
  "msg": "All good",
  "payload": {
    "progress": {
      "percent": 0.6,
      "last": "61626378797a"
    }
  }
}
```

```json
{
  "msg": "Ping",
  "payload": {
    "ping": {
      "ts": 1572935564043,
      "nonce": "424f524b"
    }
  }
}
```

We can now easily handle this data with the following Schema:

```ipldsch
type Message struct {
  msg String
  payload Payload
}

type Payload union {
  | Error "error"
  | Progress "progress"
  | Ping "ping"
} representation keyed

type Error string

type Progress struct {
  percent Float
  last String
}

type Ping struct {
  ts Int
  nonce String
}
```

Our `Payload` union now has the `keyed` representation strategy.
This strategy means the `Payload` will have a Map representation kind, and that map will be required to have exactly one of the various keys that are used to discriminate the type present.
Syntactically in the Schema DSL, `Payload` now lists quotes string keys next to the types, rather than the kinds of the previous `kinded` Union -- these are the discriminate values that will be seen in the map.

Validation of such data can now check for the presence of each of these keys, _exactly one_ of them exists, and then hand off validation to the expected type at the node found in the valued of that key.
If an `"error"` key is found, it will proceed to validate `Error` which assumes that the node is a String.
If a `"progress"` key is found, it will proceed to validate that it finds a Map at the value node and that it matches the `Progress` type, etc.

#### Envelope

A strategy similar to `keyed`, but more explicit and allowing for the retention of the `"payload"` node is the `envelope` representation strategy. With this strategy we expect that the type will be present as the value of a fixed key of a Map (`"payload"`), but we can discriminate the type of data to be found by inspecting the value of another key in the Map:

```json
{
  "msg": "Something bad happened",
  "envelope": {
    "tag": "error",
    "payload": "ERROR"
  }
}
```

```json
{
  "msg": "All good",
  "envelope": {
    "tag": "progress",
    "payload": {
      "percent": 0.6,
      "last": "61626378797a"
    }
  }
}
```

```json
{
  "msg": "Ping",
  "envelope": {
    "tag": "ping",
    "payload": {
      "ts": 1572935564043,
      "nonce": "424f524b"
    }
  }
}
```

This strategy results in the payload data being in a predictable position in the document,
as well as the discriminator value being in a predictable position in the document,
but the structure in the payload part of the document varies.

Our Schema can now take the following form:

```ipldsch
type Message struct {
  msg String
  envelope Payload
}

type Payload union {
  | Error "error"
  | Progress "progress"
  | Ping "ping"
} representation envelope {
  discriminantKey "tag"
  contentKey "payload"
}

type Error string

type Progress struct {
  percent Float
  last String
}

type Ping struct {
  ts Int
  nonce String
}
```

This `envelope` representation strategy requires the parameters `discriminantKey` and `contentKey`.
The `discriminantKey` tells the Schema the key of the discriminator value, while the discriminator values are listed next to the types of the Union (in this case, the same values as we used in the `keyed` Union example, above).

#### Inline

An `inline` representation strategy _pulls up_ nested structures into the current node rather than navigating down to a child nodes to interpret the constituent type as per the previous Union representation strategies. Discrimination between types use a `discriminantKey`, also in the current node. This necessarily means that the current node must be a map representation kind and constituent types of a Union must also have map representation kinds.

Our example must be extended so that the `Error` type can be extracted from a map representation:

```json
{
  "msg": "Something bad happened",
  "union": {
    "tag": "error",
    "message": "ERROR"
  }
}
```

```json
{
  "msg": "All good",
  "union": {
    "tag": "progress",
    "percent": 0.6,
    "last": "61626378797a"
  }
}
```

```json
{
  "msg": "Ping",
  "union": {
    "tag": "ping",
    "ts": 1572935564043,
    "nonce": "424f524b"
  }
}
```

For types in the union which are a struct with only one field (like the first example data above), this looks very similar to envelope unions... except notice that there's no `contentKey` in our union's representation definition -- so the string of the other map key in that example comes from the struct's field name!
The behavior of `inline` union becomes clearer as the contained types get more fields: the tag field is always just *next to* the other map keys.

```ipldsch
type Message struct {
  msg String
  union Payload
}

type Payload union {
  | Error "error"
  | Progress "progress"
  | Ping "ping"
} representation inline {
  discriminantKey "tag"
}

type Error struct {
  message String
}

type Progress struct {
  percent Float
  last String
}

type Ping struct {
  ts Int
  nonce String
}
```

The interface presented by this Schema is adjusted in comparison to the previous Unions as `Error` is now a Struct with a `message` field.

### Stringprefix Unions for Strings

A special case union exists for handling String kinds. Where a node contains a string, we may want to different between two different uses of that string at the application layer. Such prefix discriminators are common in configuration option schemes, for example. Stringprefix unions reinterpret a string, stripping out the matched prefix and present the application layer with only the type, and remainder string type, that was matched. Advanced usage may also involve higher-level types that use a string representation strategy being layered on top of a matching type (e.g. a `stringjoin` map).

```ipldsch
type Username string

type Credentials struct {
  credType String
  credToken String
} representation stringjoin {
  join ":"
}

type Authorization union {
	| Username "user:"
	| Credentials "auth:"
} representation stringprefix
```

By declaring a `stringprefix` union, we specify that the first characters of the string matching the `Authorization` node will discriminate which `type` the public key is. Those first characters will be sliced off and expected to be either `user:` or `auth:`, then the remainder of the string will be extracted and encapsulated inside either `Username` or further decoded as the `Credentials` type (by further splitting it by `:`) depending on the discriminator prefix.

### Bytesprefix Unions for Bytes

A special case union exists for handling Bytes kinds. Where a node contains a byte array (Bytes kind), we may want to discriminate between two different uses of that byte array at the application layer. For example, consider two different encoding schemes where we store a "key" field that is distinct for the each encoding scheme. For practical purposes they are both byte arrays, but at the application layer it helps to have them separated into distinct forms, perhaps so we can make simple assertions about getting the expected key type for the given encoding scheme. There are additional documentation clarity benefits for extracting distinct forms and naming them in a Schema that may factor in to such a decision.

```ipldsch
type Authorization struct {
  key PublicKey
  keySize Int
}

type PublicKey union {
  | RsaPubkey "00"
  | Ed25519Pubkey "01"
} representation bytesprefix

type RsaPubkey bytes
type Ed25519Pubkey bytes
```

By declaring a `bytesprefix` union, we specify that the bytes of the byte array found at the `key` node of `Authorization` will discriminate which `type` the public key is. Those first bytes will be expected to be either `0x00` or `0x01`, then the remainder of the byte array will be extracted and encapsulated inside either `RsaPubkey` or `Ed25519Pubkey` depending on the discriminator byte.

Discriminators must be at least one byte long and not conflict. They are represented as properly formed hexadecimal strings, using upper-case characters only.

## Copy

The Copy Schema kind is a special case that provides a mechanism for copying the definition of one named type into a new name. It uses the `=` token after the new type's name followed by name of the type being copied. It is not possible to copy an unnamed (anonymous) type.

```ipldsch
type Ping struct {
  ts Int
  nonce String
}

type Pong = Ping
```

This example is strictly equivalent to the following in terms of the interaction above the Schema layer:

```ipldsch
type Ping struct {
  ts Int
  nonce String
}

type Pong struct {
  ts Int
  nonce String
}
```

The Schema tooling and the reified form of the Schema retains a `copy` kind marker, but tooling that consumes Schemas is expected to treat this marker as an indirection to the named type being copied and copy the entirety of that type's definition to the new name.

The Copy type is provided for convenience and should also prove beneficial in pointing out relationships between types.

## Advanced Data Layouts

Advanced Data Layouts (ADL) are a mechanism for breaking out of Schema processing into custom logic where such logic cannot be expressed in Schemas but where connection with Schema kinds may be beneficial.

ADLs are not considered `type`s in the Schema sense, rather, they masquerade as types, or more specifically, have the ability to masquerade as Schema kinds when used in certain conditions.

Declaration of an ADL is similar to declaring a `type` but only requires a name:

```ipldsch
advanced ROT13
```

Once declared as an entity in the Schema, the name (`ROT13` in this case) may be used as a _representation_ elsewhere in the Schema. We do this with `representation advanced` followed by the name:

```ipldsch
type MyString string representation advanced ROT13
```

Coupling this `type` and the `advanced` definition, we are declaring that there exists above the Schema layer some logic labelled `ROT13` that is able to interact with the Data Model layer on behalf of `MyString` and present a standard String kind interface for such a purpose.

How the ADL logic is wired in to the Schema tooling will be language and tooling specific. For the purpose of Schema authoring, an `advanced` definition and usage can be considered as a mechanism to break out of the standard _Data-model-to-Schema_ processing that is performed, and instead, inserting custom logic in that flow for the particular node in question such that it becomes _Data-model-to-ADL-to-Schema_.

The interaction with the Data Model is also left up to the ADL, so it is not limited to consuming a particular node. Rather, it can consume any number of nodes (or no nodes!) and even traverse links in an opaque fashion. Another example of an ADL example provides an example of this. In this case, we declare a sharded Map kind which may be used to scale to Maps of very large size and therefore include multiple, independent, blocks:

```ipldsch
advanced ShardedMap

type MyMap { String : &Any } representation advanced ShardedMap
```

In this case, we declare a `MyMap` type that is considered a Map kind for the purpose of the rest of the Schema and presents as such above the Schema layer. Meanwhile we have inserted custom logic, labelled `ShardedMap`, that takes care of the decode/encode and traversal required to present a standard Map kind to the user of such a Schema.

**`representation advanced` is currently only available for Map, List and Bytes kinds**. Additional use cases (such as the hypothetical String kind above) may be considered in the future.

See [Advanced Layouts document](/docs/advanced-data-layouts) for more details regarding Advanced Data Layouts,
and [Indicating ADLs in Schemas](/docs/schemas/features/indicating-adls/) for more details on how to use them when using IPLD Schemas.

## Schemas in Markdown

IPLD Schemas are intended to serve a documentation role as well as a programmatic declarative role. In this documentation role, inline comments (`#`) can be helpful to expand on declarations with explanations, but expanding this documentation form to embedding IPLD Schemas in consumable Markdown is also possible. When embedded in Markdown in code blocks with the right language marker, IPLD Schema tooling can accept Markdown files and extract only those IPLD Schema portions it finds, substituting for a stand-alone Schema file.

When embedding IPLD Schema declarations in Markdown, use code blocks with the language marker `ipldsch`, i.e.:

<pre class="language-markdown"><code>
```ipldsch
type Foo struct {
  a   Int
  b   Int
  msg Message
}

type Message string
```
</code></pre>

Any such block found in a Markdown document will be extracted and stitched together to form a single Schema document.

Additionally, it is also possible to perform this process across multiple Markdown documents for sufficiently complex Schema declarations. When the IPLD Schema tooling is provided a list of Markdown files it will extract the `ipldsch` blocks and stitch them all together and assume they comprise a single stand-alone Schema document.
