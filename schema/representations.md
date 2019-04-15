
Kinds and their Representations
-------------------------------

A type at the Schema level must be mapped onto a representation expressible
within the Data Model.

For all Schema kinds which have equivalents at the Data Model level, there is
a default representation.  The default representation this is, broadly speaking,
a no-op: a string remains a string, and a map is easy to enough to represent as,
well, a map!

For the perceived kinds (those introduced at the Schema level, with no direct
equivalent in the Data Model), most also have default mappings: for example,
structs will simply be mapped into maps; enum values are mapped into strings.
Unions are a special case: there's no single widely agreed upon transcription
pattern for unions from before the establishment of IPLD, so these require
an explicit choice.

Customized representation strategies are also possible.
Each Schema type definition may specify such a custom representation, overriding
the default.

Representation strategies are identified by one primary keyword (which indicates
what Kind in the Data Model will be transcribed to), and may contain several
more detailed parameters which are specific to the strategy (e.g., the struct
map representation has a concept of 'default' values which is unique to that
strategy).

### table

(Kinds for which no meaningful customization is possible -- Null, Boolean,
Integer, Float, String, Bytes, and List -- are elided.
N.B., it's not ruled out that custom representations may be introduced for
these kinds in the future; there are simply none to date.
Link is also not described in this section, as it's a rather unique business.)

- Map
	- `map` representation -- the default -- transcribes to `map` in the Data Model.
	- `stringpairs` representation -- transcribes to `string` in the Data Model.
	- `listpairs` representation -- transcribes to `list` (of lists) in the Data Model.
- Union
	- `keyed` representation -- transcribes to a single-entry `map` in the Data Model.
	- `kinded` representation -- transcribes to varying (!) kinds in the Data Model.
	- `envelope` representation -- transcribes to a dual-entry `map` in the Data Model.
	- `inline` representation -- transcribes to a `map` in the Data Model (and has additional limitations).
- Struct
	- `map` representation -- the default -- transcribes to `map` in the Data Model.
	- `tuple` representation -- transcribes to `list` in the Data Model.
	- `stringpairs` representation -- transcribes to `string` in the Data Model.
	- `stringjoin` representation -- transcribes to `string` in the Data Model.
	- `listpairs` representation -- transcribes to `list` (of lists) in the Data Model.
- Enum
	- `string` representation -- the default -- transcribes the enum values as `string` in the Data Model.

Each of these representation strategies will be explored in detail in the
"Representation Strategy Reference" section, below.


Representation Strategy Reference
---------------------------------

In this section, we'll go into detail on each representation strategy,
and include examples of both schemas using it and data matching it.
See the "Kinds and their Representations" section for an introduction to
representation strategies.


### struct map representation

(TODO mostly interesting because defaults)
(which maybe we should discuss more in the Kinds page?  belongs with nullable, optional, and other cardinality talk.)

### struct tuple representation

Tuple representation allows structs to be packed into a list representation.
This list representation drops the struct fieldnames from the representation
entirely and relies purely upon the order of elements to denote meaning.
As such, it's generally a very compact way to represent data.

Tuple representations should be used cautiously.  Since they contain little
in the way of "self-describing" information, tuple representations can make for
very fragile protocols, increase the difficulty of migrations, and make
serialized data incomprehensible without the schema information in hand.

### struct map representation example schema with defaults

```ipldsch
type TypeList struct {
	valueType TypeTerm
	valueNullable Bool
} representation map {
	field valueNullable default "false"
}
```

#### struct tuple representation example schema

```ipldsch
```

#### struct tuple representation example data

```json
```

### struct stringjoin representation example schema

```ipldsch
## Fizzlebop is a pair of fields which serializes as "part1:part2" as a string.
type Fizzlebop struct {
	a String
	b String
} representation stringjoin {
	join ":"
}
```

### map stringpairs representation example

Say we're doing something awfully like the mount options in an /etc/fstab file:

```ipldsch
## MountOptions serializes as a string of comma-separated "k=v" entries, e.g. "k1=v1,k2=v2".
## This serial representation is limited (n.b. The domain of keys must exclude "=" and values must exclude ","!),
## but we've chosen it because other parts of our application protocol are drastically simplified by limiting this to a string.
type MountOptions map {String:String} representation stringpairs {
	innerDelim "="
	entryDelim ","
}
```

### union keyed representation example

```ipldsch
type MyKeyedUnion union {
	| Foo "foo"
	| Bar "bar"
} representation keyed

type Foo struct { froz Bool }
type Bar int
```

Some data matching `MyKeyedUnion` (shown as JSON) is:

```json
{"foo": {"froz": true}}
```

This data would also match, as the other type:

```json
{"bar": 12}
```

Note how kinded unions don't introduce any kind of wrapping object at all;
contrast this with each of the other union representation strategies, all
of which use at least one layer of map in their representation.

### union kinded representation example

```ipldsch
type MyKindedUnion union {
	| Foo map
	| Bar int
} representation kinded

type Foo struct { froz Bool }
type Bar int
```

Some data matching `MyKindedUnion` (shown as JSON) is:

```json
{"froz": true}
```

This data would also match, as the other type:

```json
12
```

Note that the syntax used in the type declaration is different for kinded
unions versus other union representations!
Kinded unions, unlike all other representation strategies, don't have
any kind of string keywords at all.  Instead, they encode all of their
discriminant information in the kind of the data itself!
Correspondingly, the tagging information in the type definition uses kind
keywords (unquoted) instead of quoted strings.

Note that the kinds valid in a kinded union are all Data Model-layer
*representation kinds*.  E.g. `string` and `map` are acceptable here;
`struct` is not.  The kind that a union member type is tagged with must
match that type's representation kind or the schema is invalid.

### union envelope representation example

```ipldsch
type MyEnvelopeUnion union {
	| Foo "foo"
	| Bar "bar"
} representation kinded {
	discriminantKey "tag"
	contentKey "msg"
}

type Foo struct { froz Bool }
type Bar int
```

Some data matching `MyEnvelopeUnion` (shown as JSON) is:

```json
{"tag":"foo", "msg":{"froz":true}}
```

This data would also match, as the other type:

```json
{"tag":"bar", "msg":12}
```

### union inline representation example

```ipldsch
type MyInlineUnion union {
	| Foo "foo"
	| Bar "bar"
} representation kinded {
	discriminantKey "tag"
}

type Foo struct { froz Bool }
type Bar struct { bral String }
```

Some data matching `MyInlineUnion` (shown as JSON) is:

```json
{"tag": "foo", "froz": true}
```

This data would also match, as the other type:

```json
{"tag": "bar", "bral": "zot"}
```

Note that our example schema contained different *kinds* of member types than
the other union examples!
This is because inline unions are only a defined concept when working with types
that have a map representation -- so, our `Bar` type in the previously examples,
which was of `int` kind, doesn't work for this example.  We replaced it with
another struct type, which -- since it has a `map` representation -- works.
