---
title: "Schemas: Representation Strategies"
navTitle: "Representation Strategies"
eleventyNavigation:
  order: 40
---

# Representations of IPLD Schema Kinds

* [Available Representation Strategies](#available-representation-strategies)
* [Representation Strategy Reference](#representation-strategy-reference)
  * [Struct `map` Representation](#struct-map-representation)
  * [Struct `tuple` Representation](#struct-tuple-representation)
  * [Struct `stringpairs` Representation](#struct-stringpairs-representation)
  * [Struct `stringjoin` Representation](#struct-stringjoin-representation)
  * [Struct `listpairs` Representation](#struct-listpairs-representation)
  * [Map `map` Representation](#map-map-representation)
  * [Map `stringpairs` Representation](#map-stringpairs-representation)
  * [Map `listpairs` Representation](#map-listpairs-representation)
  * [Union `keyed` Representation](#union-keyed-representation)
  * [Union `kinded` Representation](#union-kinded-representation)
  * [Union `envelope` Representation](#union-envelope-representation)
  * [Union `inline` Representation](#union-inline-representation)
  * [Union `bytesprefix` Representation](#union-bytesprefix-representation)
  * [Enum `string` Representation](#enum-string-representation)
  * [Enum `int` Representation](#enum-int-representation)

A type at the Schema layer must be mapped onto a representation expressible within the Data Model. Each Schema type, therefore, has a "representation kind" which dictates what Data Model kind it is represented as. Each Schema type has a "representation strategy" for converting it, where required, into a "representation kind".

For all Schema kinds which have direct equivalents in the Data Model (e.g. Int, String, Float), that kind is also the representation kind and there is a default representation strategy (mostly implicitly) named after that kind, i.e. a String schema kind has a String representation kind and also a `string` representation strategy that is a direct transference through the Data Model. The default representation is, broadly speaking, a no-op: a string remains a string, and a map is easy to enough to represent as a map!

The Schema layer introduces additional kinds (see [TypeKinds](../typekinds/)) that can be thought of as "perceived kinds", in that they have no direct equivalent in the Data Model but can be represented there and perceived as something different when passing through the Schema layer. Most also have default mappings.

For example, A Struct maps directly to a Data Model Map, where the Struct's fields are Map keys and the Struct's field's values are the values found at the values of the Map's keys:

```ipldsch
type Foo struct {
  x   Int
  y   Int
  msg String
}
```

May be deserialized from a JSON map:

```json
{
  "x": 10005510,
  "y": -21183,
  "msg": "A treasure chest is found at this location"
}
```

By default, Enums map to String kinds where no other strategy is declared. Unions are a special case as there's no single widely agreed upon transcription pattern for unions (from before the establishment of IPLD), so these require
an explicit choice.

Maps, Structs, Enums and Unions all have more than one possible representation strategy.

The default representation strategy for Maps, Struct and Enums is implicit and need not be stated, but we could rewrite our example above to be explicit:

```ipldsch
type Foo struct {
  x   Int
  y   Int
  msg String
} representation map
```

Representation strategies are identified by one primary keyword, which indicates what kind in the Data Model will be transcribed to. Some representation strategies have additional parameters, some optional and some mandatory. Such parameters, where they apply to the type as a whole, may be located inside a separate block (`{`, `}`) following the declaration of the representation strategy. Where those parameters impact specific fields of a type, they are presented inline with the field in parens (`(`, `)`) to indicate that they do not directly impact the user-facing form of the type but rather the serialized form.

For example, a type declaration laden with representation parameters:

```ipldsch
type Foo struct {
  x Int (rename "a")
  y Int (rename "b" implicit "0")
  msg String
} representation stringpairs {
  innerDelim "="
  entryDelim ","
}
```

## Available Representation Strategies

Schema kinds for which no meaningful customization is possible: Null, Boolean, Integer, Float, String, Bytes, List and Link are not included in this list.
(Custom custom representation strategies for these kinds has not been ruled out and may be introduced in the future.)

In addition to the representation strategies that are built-in to IPLD Schemas, [Advanced Data Layouts](/glossary/#adl) can also be used to change the way data is perceived and persisted.
Discussion of Advanced Data Layouts and their ability to provide entirely custom representation strategies of various type can be found in the page on [Indicating ADLs in IPLD Schemas](../indicating-adls/).

The following are the representation strategies built-in to IPLD Schemas:

- **Map**
  - `map`: _(default)_ transcribes to _Map_ in the Data Model.
  - `stringpairs`: transcribes to _String_ in the Data Model.
  - `listpairs`: transcribes to _List_ (of Lists) in the Data Model.
- **Union**
  - `keyed`: transcribes to a single-entry _Map_ in the Data Model.
  - `kinded`: transcribes to varying kinds in the Data Model, see below for details.
  - `envelope`: transcribes to a dual-entry _Map_ in the Data Model.
  - `inline`: transcribes to a _Map_ in the Data Model (and has additional limitations).
  - `bytesprefix`: transcribes to _Bytes_ in the Data Model, only usable for unions of Bytes.
- **Struct**
  - `map`: _(default)_ transcribes to _Map_ in the Data Model.
  - `tuple`: transcribes to _List_ in the Data Model.
  - `stringpairs`: transcribes to _String_ in the Data Model.
  - `stringjoin`: transcribes to _String_ in the Data Model.
  - `listpairs`: transcribes to _List_ (of Lists) in the Data Model.
- **Enum**
  - `string`: _(default)_ transcribes the enum values as _String_ in the Data Model.
  - `int`: transcribes the enum values as _Int_ in the Data Model.

Each of these representation strategies will be explored in detail in below.

## Representation Strategy Reference

### Struct `map` Representation

**Representation Kind: Map**

A Data Model Map representation of Structs means that the Struct is represented as a Map, where the keys are the names of the Struct fields. This is a common and natural way to represent Structs and is therefore their default representation. As the default, this strategy is inferred in absence of any other.

**Example**

```ipldsch
type Foo struct {
  fieldOne String
  fieldTwo Bool
} representation map
```

In this case, `representation map` could have been elided.

Some data matching the `Foo` Struct (shown as JSON) is:

```json
{
  "fieldOne": "this is field one",
  "fieldTwo": true
}
```

The `map` Struct representation strategy also allows for field-specific parameters which may be specified after the fields in the main declaration. The two parameters are:

* `rename` to declare that at serialization and deserialization, this field has an alternate name in the underlying Data Model Map. This may be useful for providing verbose names at the Schema layer but compact names in the encoding, for example.
* `implicit` to declare that a particular value of this field is assumed if the field is omitted from serialized form. This applies to both serialization and deserialization. A common example may be `implicit "false"` so that a Bool field need only be present in the serialized form when it is `true`.

```ipldsch
type Foo struct {
  fieldOne String (rename "one")
  fieldTwo Bool (rename "two" implicit "false")
} representation map
```

The field-specific parameters (`rename` and `implicit`) are only available for the `map` Struct representation strategy. They are technically possible in some other forms (i.e. `listpairs` and `stringpairs`) and support may be extended in the future.

See [Value Type Modifiers](../typekinds/#value-type-modifiers) for a discussion on such matters as well as the impacts on value cardinality.

### Struct `tuple` Representation

**Representation Kind: List**

The `tuple` Struct representation strategy allows Structs to be packed into a compact List representation. This List representation drops the Struct field's names from the representation entirely and relies entirely on the order of elements to denote meaning. As such, it is generally a very compact way to represent data.

`tuple` Struct representation strategies should be used cautiously. Since they contain little in the way of "self-describing" information, `tuple` Struct representations can make for very fragile protocols, increase the difficulty of migrations, and make serialized data incomprehensible without the schema information in hand.

**Example**

```ipldsch
type Foo struct {
  fieldOne String
  fieldTwo Bool
} representation tuple
```

Some data matching the `Foo` Struct (shown as JSON) is:

```json
["this is field one", true]
```

Notice how this is the same data as in the `map` Struct representation strategy example above; it's just much more compact than it was in the map representation (and beware: correspondingly less self-describing!).

Optional or implicit fields are not possible with the `tuple` Struct representation strategy, all elements must be present.

No field-specific parameters are available for the `tuple` Struct representation strategy (i.e. `implicit` and `rename` which are available for `map`). One general parameter is available:

* `fieldOrder` declares that the fields are serialized in a particular order that may be different from the order presented in the type descriptor. This option is implicitly set to the declared order but may be overridden where needed.

**Example**

```ipldsch
type Foo struct {
  fieldOne String
  fieldTwo Bool
} representation tuple {
  fieldOrder ["fieldTwo", "fieldOne"]
}
```

Serialization of such a type in JSON may appear as:

```json
[ true, "this is field one" ]
```

### Struct `stringpairs` Representation

**Representation Kind: String**

The `stringpairs` Struct representation strategy encodes a Struct to a single String. It should be used with special caution as there are no escaping mechanisms in place to prevent incompatible data from disrupting the encoding and causing errors during decode operations.

The encoding presents key / value pairs as a delimited String. e.g. `"k1=v1,k2=v2"` rather than `{ "k1": "v1", "k2": "v2" }` if the same data used a `map` Struct representation strategy. The entry delimiter and the key / value (inner) delimiter must be specified as general parameters when `stringpairs` is used, there is no default for these. In our example, the `entryDelim` would be `","` while the `innerDelim` would be `"="`.

This serial representation is strictly limited: the domain of available for field names must exclude the `innerDelim` in any position and values and keys must exclude the `entryDelim` in any position. There is no facility for escaping, such as in escaped CSV. This also leads to a further restriction that this representation is only valid for Structs whose values may all be encoded to String kind in the Data Model layer. It is recommended, therefore, that its use be limited to Structs containing values with the basic data model kinds that exclude multiple values, i.e. no Maps, Lists, and therefore Structs or Unions or any other type that has a recursive representation kind.

**Example**

```ipldsch
type Foo struct {
  fieldOne String
  fieldTwo Bool
} representation stringpairs {
  innerDelim "="
  entryDelim ","
}
```

Some data matching the `Foo` Struct (shown as JSON) is:

```json
"fieldOne=this is field one,fieldTwo=true"
```

No field-specific parameters are available for the `stringpairs` Struct representation strategy (i.e. `implicit` and `rename` which are available for `map`). The two general parameters are mandatory:

* `innerDelim` declares a quoted string that is used to delimit a key from a value
* `entryDelim` declares a quoted string that is used to delimit entries from each other

### Struct `stringjoin` Representation

**Representation Kind: String**

The `stringjoin` Struct representation strategy encodes a Struct to a single String. It should be used with special caution as there are no escaping mechanisms in place to prevent incompatible data from disrupting the encoding and causing errors during decode operations.

`stringjoin` is very similar to `stringpairs` and caries many of the same notes of caution. The difference is that `stringjoin` omits the keys and relies instead on declared field order to assume the location of the field values, similar to the `tuple` representation.

**Example**

```ipldsch
type Fizzlebop struct {
  a String
  b String
} representation stringjoin {
  join ":"
}
```

Some data matching the `Fizzlebop` Struct (shown as JSON) is:

```json
"value-of-a:value-of-b"
```

Since there is no escaping mechanism, no value can contain the string used for `join` as this would disrupt decoding and result in an error. Additionally, optional or implicit fields are not possible with the `stringjoin` Struct representation strategy, all elements must be present.

No field-specific parameters are available for the `stringjoin` Struct representation strategy (i.e. `implicit` and `rename` which are available for `map`). The single general parameter is mandatory:

* `join` declares a quoted string that is used to delimit field values

### Struct `listpairs` Representation

**Representation Kind: List**

The `listpairs` Struct representation strategy encodes a Struct to a List of Lists at the Data Model layer. Similar to the `tuple` representation but the keys are also included in the encoding so the serialized form is not as opaque and more self-describing than `tuple`.

**Example**

```ipldsch
type Foo struct {
  fieldOne String
  fieldTwo Bool
} representation listpairs
```

Some data matching the `Foo` Struct (shown as JSON) is:

```json
[["fieldOne", "this is field one"], ["fieldTwo", true]]
```

Each entry of the parent List is a List containing exactly two entries, where the first is the exact field name and the second is the value.

No field-specific parameters are available for the `listpairs` Struct representation strategy (i.e. `implicit` and `rename` which are available for `map`).

### Map `map` Representation

**Representation Kind: Map**

Schema Maps are represented as Data Model Maps by default. Schema Maps differ from Data Model Maps in that their value types are constrained.

**Example**

```ipldsch
type FloatMap {String:Float}
```

Some data matching the `FloatMap` Map (shown as JSON) is:

```json
{
  "x": 0.812411,
  "y": 0.15,
  "z": 0.0
}
```

No parameters are available for the `map` Map representation strategy.

### Map `stringpairs` Representation

**Representation Kind: String**

The `stringpairs` Map representation strategy is roughly the same the `stringpairs` for Structs. It encodes a Map to a single String. It should be used with special caution as there are no escaping mechanisms in place to prevent incompatible data from disrupting the encoding and causing errors during decode operations.

The encoding presents key / value pairs as a delimited String. e.g. `"k1=v1,k2=v2"` rather than `{ "k1": "v1", "k2": "v2" }` if the same data used a `map` Map representation strategy. The entry delimiter and the key / value (inner) delimiter must be specified as general parameters when `stringpairs` is used, there is no default for these. In our example, the `entryDelim` would be `","` while the `innerDelim` would be `"="`.

This serial representation is strictly limited: the domain of available for keys must exclude the `innerDelim` in any position and values and keys must exclude the `entryDelim` in any position. There is no facility for escaping, such as in escaped CSV. This also leads to a further restriction that this representation is only valid for Maps whose values may all be encoded to String kind in the Data Model layer. It is recommended, therefore, that its use be limited to Maps containing values with the basic data model kinds that exclude multiple values, i.e. no Maps, Lists, and therefore Structs or Unions or any other type that has a recursive representation kind.

**Example**

A string that is similar in format to the options found in an /etc/fstab file might be defined as:

```ipldsch
type MountOptions {String:String} representation stringpairs {
  innerDelim "="
  entryDelim ","
}
```

Some data matching the `MountOptions` Struct (shown as JSON) is:

```json
"keys=values,serialized=thusly"
```

The two general parameters for the `stringpairs` Map representation strategy are mandatory:

* `innerDelim` declares a quoted string that is used to delimit a key from a value
* `entryDelim` declares a quoted string that is used to delimit entries from each other

### Map `listpairs` Representation

**Representation Kind: List**

The `listpairs` Map representation strategy is roughly the same the `listpairs` for Structs. It encodes a Map to a List of Lists at the Data Model layer.

**Example**

```ipldsch
type FloatMap {String:Float} representation listpairs
```

Some data matching the `FloatMap` Map (shown as JSON) is:

```json
[["x", 0.812411], ["y", 0.15], ["z", 0.0]]
```

Each entry of the parent List is a List containing exactly two entries, where the first is the key String and the second is the value.

No parameters are available for the `listpairs` Map representation strategy.

### Union `keyed` Representation

**Representation Kind: Map** (single entry of current node)

A Union using a `keyed` representation strategy determines which of the types in the Union is present by looking at the keys in the Map at the current node. Exactly one of the keys listed in the Union must be present at any such Union node for it to be valid.

When using a `keyed` Union representation strategy, the Union lists the quoted keys after each constituent type. These keys must be unique strings.

**Example**

```ipldsch
type MyKeyedUnion union {
  | Foo "foo"
  | Bar "bar"
} representation keyed

type Foo struct {
  froz Bool
}

type Bar int
```

Some data matching `MyKeyedUnion`, finding `Foo` present, (shown as JSON) is:

```json
{
  "foo": {
    "froz": true
  }
}
```

This data would also match, as `Bar`:

```json
{
  "bar": 12
}
```

No parameters are available for the `keyed` Union representation strategy.

### Union `kinded` Representation

**Representation Kind: _Various_**

`kinded` Unions discriminate between constituent types of the Union by inspecting the _representation kind_ present at the current node. Each type in the union must be associated with a unique representation kind and exactly one of these representation kinds must be present at the node for it to be a valid Union of the type in question.

The `kinded` Union representation strategy doesn't introduce any kind of wrapping Map in the serialized form at all. Maps are only present if `map` is one of the kinds listed in the Union. Contrast this with other union representation strategies, all of which use at least one layer of Map in their representation (other than `bytesprefix` Unions which are a special case).

**Example**

```ipldsch
type MyKindedUnion union {
  | Foo map
  | Bar int
} representation kinded

type Foo struct {
  froz Bool
}

type Bar int
```

Some data matching `MyKindedUnion`, finding `Foo` present, (shown as JSON) is:

```json
{
  "froz": true
}
```

This data would also match, as `Bar`:

```json
12
```

The syntax used in the type declaration is different for `kinded` Unions in comparison to other Union representation strategies. `kinded` Unions list a representation kind, unquoted, unlike other representation strategies which list a quoted key or discriminator (other than `bytesprefix` Unions, a special case).

The kind listed after each element of the Union must be a valid representation kind, that is, a kind at the Data Model layer, such as `string` and `map`. Schema kinds are not valid as they don't denote representation kinds (i.e. `struct` would not be a valid kind for a `kinded` Union).

It is only possible to discriminate _distinct_ representation kinds in a `kinded` Union, there may be at most one of each possible representation kind present in such a Union.

Note that a type that has a different Schema kind to its representation kind uses the latter:

```ipldsch
type MyKindedUnion union {
  | Foo map
  | Bar int
  | Bang string
} representation kinded

type Foo struct {
  froz Bool
}

type Bar int

type Bang {String:Int} representation stringpairs {
  innerDelim ":"
  entryDelim "|"
}
```

In this instance, even though `Bang` presents as a user-facing Schema Map kind, it encodes to a String representation kind and is therefore listed as a `string` in the `kinded` Union.

No parameters are available for the `kinded` Union representation strategy.

### Union `envelope` Representation

**Representation Kind: Map** (two entries of current node)

An `envelope` Union representation strategy discriminates between constituent types of the Union by inspecting the value of a pre-determined discriminator key (`discriminantKey`) in a Map, while the content of the type is decoded from the value of a predetermined content key (`contentKey`). `envelope` Unions are only valid for nodes that are Maps in the Data Model layer, it requires the ability to look up two distinct keys.

Each constituent type of an `envelope` Union is accompanied by a quoted string that is unique amongst the types that is used to match against the value of `discriminantKey` in the current node.

**Example**

```ipldsch
type MyEnvelopeUnion union {
  | Foo "foo"
  | Bar "bar"
} representation envelope {
  discriminantKey "tag"
  contentKey "msg"
}

type Foo struct {
  froz Bool
}

type Bar int
```

Some data matching `MyEnvelopeUnion`, finding `Foo` present, (shown as JSON) is:

```json
{
  "tag": "foo",
  "msg": {
    "froz": true
  }
}
```

This data would also match, as `Bar`:

```json
{
  "tag": "bar",
  "msg": 12
}
```

The `envelope` Union representation strategy is an "envelope" in the sense that the type is addressed within a value of the current node and the type itself is wrapped in another value of the current node, the current node being the envelope that exists only to contain and discriminate the type. `envelope` Unions are more self-describing and explicit than `inline` or `kinded` unions but are roughly comparable to `keyed` unions in that sense.

Two general parameters are mandatory for the `envelope` Union representation strategy:

* `discriminantKey` defines a quoted string that is used to look up a string in the Map at the current node to match against the keys provided with each of the constituent types of the Union.
* `contentKey` defines a quoted string that is used to look up a node that may decode to the type that the discriminator determines is the type of the Union.

### Union `inline` Representation

**Representation Kind: Map** (only some entries of current node)

The `inline` Union representation strategy decodes a Map node from the Data Model layer into one of the constituent types of the union by discriminating based on the value of a pre-determined key of that Map (`discriminantKey`).

This strategy is similar to the `envelope` Union representation strategy but it does not traverse into a child node to decode the type, instead it decodes that type from the current node. Therefore, constituent type of an `inline` Union _must_ have a Map representation kind (i.e. a Struct or a Map with default representation strategies).

Each constituent type of an `inline` Union is accompanied by a quoted string that is unique amongst the types that is used to match against the value of `discriminantKey` in the current node.

**Example**

```ipldsch
type MyInlineUnion union {
  | Foo "foo"
  | Bar "bar"
} representation inline {
  discriminantKey "tag"
}

type Foo struct {
  froz Bool
}

# Note that Bar is not an int as in our previous examples since this is not
# possible with an inline Union
type Bar struct {
  bral String
}
```

Some data matching `MyInlineUnion`, finding `Foo` present, (shown as JSON) is:

```json
{
  "tag": "foo",
  "froz": true
}
```

This data would also match, as `Bar`:

```json
{
  "tag": "bar",
  "bral": "zot"
}
```

Using a type that has a representation kind other than a Map with an `inline` Union would result in an error.

One general parameter is mandatory for the `inline` Union representation strategy:

* `discriminantKey` defines a quoted string that is used to look up a string in the Map at the current node to match against the keys provided with each of the constituent types of the Union.

### Union `stringprefix` Representation

**Representation Kind: String**

The `stringprefix` Union representation strategy is used strictly for String representation kinds. The `bytesprefix` Union representation strategy can only be used as a Union between types that can be represented as strings (e.g. plain Strings, structs with `stringjoin` representations, maps as `stringpairs`, etc.).

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

At the Data Model layer, strings at the `Authorization` node are prefixed with either `user:` or `auth:` and are decomposed into their matching types when represented at the Schema layer. In this case, the `Credentials` struct is further decomposed into a two-field struct by splitting the remainder of the string starting with `auth:` by the `:` characters.

No parameters are available for the `stringprefix` Union representation strategy.

### Union `bytesprefix` Representation

**Representation Kind: Bytes**

The `bytesprefix` Union representation strategy is used strictly for Bytes representation kinds. As there are currently no representation strategies other than the default for Bytes that encode as Bytes at the Data Model layer, the `bytesprefix` Union representation strategy can only be used as a Union between named Bytes types.

**Example**

```ipldsch
type Signature union {
  | Secp256k1Signature "00"
  | Bls12_381Signature "01"
} representation bytesprefix

type Secp256k1Signature bytes
type Bls12_381Signature bytes
```

At the Data Model layer, this presents as Bytes (a byte array), where the first bytes are the discriminator (`0x00` or `0x01`) and the remainder is sliced to form either of the two types depending on the discriminator.

No parameters are available for the `bytesprefix` Union representation strategy.

### Enum `string` Representation

**Representation Kind: String**

By default, a Schema Enum is simply represented as a String in the data model. An Enum in a Schema simply defines the list of possible strings that could be used at that node.

**Example**

```ipldsch
type Status enum {
  | Nope
  | Yep
  | Maybe
}
```

This Enum dictates that where `Status` is used, we should find one of `"Nope"`, `"Yep"` or `"Maybe"`.  No other value is valid where `Status` is used.

Where the serialized Strings are different to the values used for the Enum, they may be provided in parens as field-specific representation parameters:

**Example**

```ipldsch
type Status enum {
  | Nope ("Nay")
  | Yep  ("Yay")
  | Maybe
}
```

In this example, the serialization expects, and uses, the strings `Nay`, `Yay` and `Maybe`.

No general parameters are available for the `string` Enum representation strategy.

### Enum `int` Representation

**Representation Kind: Int**

An alternative representation strategy for enums is `int`, which is closer to what users may expect from Enums in some programming languages that map enum values to integers. In IPLD Schemas we explicitly define the mapping to integers, so the user can dictate the appropriate data model values.

**Example**

```ipldsch
type Status enum {
  | Nope  ("0")
  | Yep   ("1")
  | Maybe ("100")
} representation int
```

As with the `string` representation strategy, Enums with an `int` representation strategy still quote the integer strings when provided as field-specific representation parameters. This is standard practice for field-specific representation parameters as they are converted to the correct type depending on context. In this context, they are assumed to be integers so must be convertible to integers.

There are no optional values, as in the `string` representation strategy, all values must be provided when using `int` representation strategy.

In our example, serialization expects, and uses, data model integer values `0`, `1`, and `100`. No other values at this position are valid.

No general parameters are available for the `int` Enum representation strategy.
