---
title: "Schemas: Type Kinds"
navTitle: "Type Kinds"
eleventyNavigation:
  order: 30
---

# IPLD Schema Kinds

* [Extending the IPLD Data Model](#extending-the-ipld-data-model)
  * [Data Model Kinds](#data-model-kinds)
  * [Schema Kinds](#schema-kinds)
    * [List](#list)
    * [Map](#map)
    * [Union](#union)
    * [Struct](#struct)
    * [Enum](#enum)
    * [Copy](#copy)
* [Value Type Modifiers](#value-type-modifiers)
  * [Nullable Values](#nullable-values)
  * [Optional Fields](#optional-fields)
  * [Fields with Implicit Values](#fields-with-implicit-values)
  * [Combining Nullable, Optional, and Implicit](#combining-nullable-optional-and-implicit)
  * [Choosing between Optional and Implicit](#choosing-between-optional-and-implicit)
* [Understanding Cardinality](#understanding-cardinality)
  * [Cardinality Examples](#cardinality-examples)

## Extending the IPLD Data Model

### Data Model Kinds

IPLD Schemas define a set of "kinds" that are built upon the
[IPLD Data Model](https://github.com/ipld/specs/blob/master/data-model-layer/data-model.md#kinds).
The Data Model defines the basic set of data types (kinds) that are easily
representable by common programming languages and are supportable by expressive
serialization formats such as JSON and CBOR. The Data Model defines its list of
kinds as:

  * Null
  * Boolean
  * Integer
  * Float
  * String
  * Bytes
  * List
  * Map
  * Link

### Schema Kinds

IPLD Schemas, while built upon the data model, enables the definition of data
structures that give us new discrete kinds, thus extending the Data Model Kinds
into a new list of Schema Kinds:

  * Null
  * Boolean
  * Integer
  * Float
  * String
  * Bytes
  * List
  * Map
  * Link
  * **Union**
  * **Struct**
  * **Enum**
  * **Copy**
  
Blocks encoded with the `raw` codec are considered valid `Bytes` kinds. You can refer
to the codec specifications to see how other kinds are encoded in each codec.

We define ***"Recursive Kinds"*** as the kinds that are comprised of other
kinds: List, Map, Union, Struct, and Enum. These kinds provide the primary
mechanism through which IPLD Schemas can be used to describe non-trivial
data structures.

Further, we define Copy as a ***"Meta Kind"*** because it is useful for
simplifying schema authoring and/or increasing the descriptiveness of a schema
for the purpose of documentation. It exists only within schema tooling and is
not exposed to user-facing code or data.

#### List

As a Schema Kind, Lists have more restrictions in the data they can contain. In
the data model, a List is defined simply as a list of arbitrary data model
kinds with no strict restrictions that may require uniformity. At the schema
layer, a List is defined as a list of one specific schema type. For example,
`type Foo [String]` defines a list of Strings, and _only_ matches a list of
Strings. This restriction isn't as limiting as it may appear because Unions
allow for significant flexibility, particularly in the case of `kinded` Unions.

#### Map

Similar to List, a Map at the schema layer requires a strict definition of the
value types. The data model dictates that IPLD only supports string keys, so any
type used as keys in schema Maps must be represented as strings. The value types
have the same restrictions as for List element types. For example,
`type Bar {String:Float}` matches a map with Float values, and _only_ Float
values. But as in List, Unions allow for additional flexibility in the data
model kinds that may appear as values.

#### Union

Unions are represented as a **Map** in the data model for `keyed`, `envelope`
and `inline` representations, and varying data model kinds for `kinded` unions,
as described by the page on [Representation Strategies](../representation-strategies/).

#### Struct

Structs are represented as a **Map** in the data model by default but may be
used to describe **String** and **List** encodings,
as described by the page on [Representation Strategies](../representation-strategies/).
#### Enum

Enums are represented as either a **String** or **Int** in the data model,
as described by the page on [Representation Strategies](../representation-strategies/).

#### Copy

Copy is a Meta Kind that indicates that a type should be implemented and encoded
the same as another type but with an alternate name. This is a short-hand to
avoid defining multiple types of the same shape and encoding but with different
names.

## Value Type Modifiers

Values and fields in recursive types can have modifiers.
These modifiers are:

- `nullable` for map values, list values, and struct fields
- `optional` for struct fields
- `implicit` for struct fields -- in some representations

### Nullable Values

The `nullable` modifier means that either the modified type may be present,
**or** its place may be occupied by the null value.

The `nullable` modifier is valid on map values, list values, and struct fields.

The presence of a `nullable` modifier increases the cardinality of a field's
valid members by one -- see the "Cardinality Examples" table below.

### Optional Fields

The `optional` modifier means that either the modified type may be present,
**or** it may be missing entirely in the data.  This is distinct from null:
for example, in a map, optionality regards if the key is *missing*,
in contrast to the key being present but with a value of null.

The `optional` modifier is only valid on struct fields (and only for some
representation strategies; structs represented as maps and structs represented
as lists have slightly different optionality semantics (e.g. list-based
representations may only allow optionals at the beginning and end of the list)).

The presence of an `optional` modifier increases the cardinality of a field's
valid members by one -- see the "Cardinality Examples" table below.

The `optional` modifier may be stacked with the `nullable` modifier.

### Fields with Implicit Values

An `implicit` modifier declares that when a field is found absent in data,
it should instead be treated as some other value in the domain.
At the same time, if an application sets the field to that value,
it will be mapped to absence of that field when represented.

Implicit values may be considered similar to "defaults" -- and if you're looking
for defaults, you should look at implicits -- but we've chosen a distinctive
name for implicits because "defaults" are often a one-way conversion;
whereas we've designed the implicit value system specifically to work
bidirectionally -- both during serialization and deserialization -- without
losing information.

It may be interesting to note that implicits are a concept that resides in
the *representation* clause rather than the *type* definition clause.
This is the case because implicits do not change the cardinality of the type
(see the [Understanding Cardinality](#understanding-cardinality) table
later in this document for more examples of what this means, and how it
compares in semantics with the other modifiers).
As a representational rather than type definition feature, the syntactic
position for an implicit declaration is on the end of the line declaring a
field, and in parenthesis (the same as where the 'rename' and other
representation-level directives can be found).

The precise semantics of implicit values may vary per representation strategy;
the discussion here is only for the general pattern, and you should also
refer to the [reference documentation for representation strategies](../representation-strategies/#representation-strategy-reference)
for more details specific to the representations strategies you use.

### Combining Nullable, Optional, and Implicit

The `nullable` and `optional` modifiers may be freely combined without issue,
as may be the `nullable` and `implicit` modifiers.

It is not valid to combine the `optional` and `implicit` modifiers -- since
both regard behavior around struct fields when the data is absent in the serial
form, it only makes sense to use exclusively one or the other on a field.

There may be additional restrictions on whether `optional` and `implicit`
modifiers may be used on a struct field based on what kind of representation
strategy the struct has.  For example, `optional` and `implicit` cannot be
used in fields in the middle of a struct when the representation is as tuple,
because this could make parsing ambiguous.  The
[reference documentation for representation strategies](../representation-strategies/#representation-strategy-reference)
should provide more detailed information on this.

### Choosing between Optional and Implicit

Use `implicit` when the absence of a value should be treated as another
value that fits unambiguously into your domain; use `optional` when there's
no such in-domain value.

For example, if you have some integer field, and if `0` is distinctive from
from the field being absent, use `optional`.
If `0` (or some other value of your choice like `-1`) can be used as a
sentinel value in your application logic, while not being serialized as such,
then you may wish to consider using `implicit`.

One usage pattern to particularly note: imagine writing a schema for defining
configuration that a user may provide, and it has some concept of "defaults".
If your application also needs to be able to *remember* whether a value was
the default or explicitly user-provided (e.g. to re-emit the config without
altering this), you want to use `optional`!
In this situation, `implicit` may cause the provided value to be lost at the
application-layer if it was equal to the default, whereas `optional` will
expose and correctly preserve the value's presence or absence.

## Understanding Cardinality

For more information on cardinality and the basics of how we reason about it,
check out the [Type Theory Glossary](/design/concepts/type-theory-glossary/)
from the [Design Concepts](/design/concepts/) documentation.

### Cardinality Examples

These examples show how we count cardinality in IPLD Schemas
in the presence of the `nullable` and `optional` keywords:

<!-- forgive the html. -->
<!-- multi-line content and markdown tables don't mix, unfortunately. -->
<table>

<tr>
<th>Schema</th>
<th>Valid Matching Representations</th>
<th>Cardinality</th>
<th>Comments</th>
</tr>

<tr>
<td width=40%>

```ipldsch
type Foo struct {
	bar Bool
}
```

</td>
<td width=20%>
<code>{"bar": true}</code><br>
<code>{"bar": false}</code><br>
</td>
<td>2</td>
<td>The cardinality of `Bool` is 2; the struct has no other members, so that's it.
</tr>

<tr>
<td>

```ipldsch
type Foo struct {
	bar nullable Bool
}
```

</td>
<td>
<code>{"bar": true}</code><br>
<code>{"bar": false}</code><br>
<code>{"bar": null}</code><br>
</td>
<td>3</td>
<td>2+1.  The `nullable` modifier adds one to the cardinality, since a null value is now a valid match.</td>
</tr>

<tr>
<td>

```ipldsch
type Foo struct {
	bar optional Bool
}
```

</td>
<td>
<code>{"bar": true}</code><br>
<code>{"bar": false}</code><br>
<code>{}</code><br>
</td>
<td>3</td>
<td>2+1.  The `optional` modifier adds one to the cardinality, since a map missing the key is now a valid match.</td>
</tr>

<tr>
<td>

```ipldsch
type Foo struct {
	bar optional nullable Bool
}
```

</td>
<td>
<code>{"bar": true}</code><br>
<code>{"bar": false}</code><br>
<code>{"bar": null}</code><br>
<code>{}</code><br>
</td>
<td><b>4</b></td>
<td>2+1+1.  *Each* of the modifiers cumulatively adds one valid matching representation, and thus add one to the cardinality.</td>
</tr>

<tr>
<td>

```ipldsch
type Foo struct {
	bar Bool (implicit false)
}
```

</td>
<td>
<code>{"bar": true}</code><br>
<code>{}</code><br>
</td>
<td>2</td>
<td>Implicit values mean that encoding should never include the value if it's the default/implicit value.  That means the set of valid representations *changes*, but it doesn't *grow* because one representation becomes invalid at the same time as a new representation is added.
<br><br>Note also that the `implicit` keyword is in parens -- a slightly different syntax than how `optional` and `nullable` are used.  This is because it's a representational change; not a type change.  Representational annotations are denoted in parens, like this.
</td>
</tr>

</table>
