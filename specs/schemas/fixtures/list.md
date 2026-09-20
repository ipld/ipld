Schema Fixtures for Lists
=========================

Lists are both an IPLD [kind](/docs/data-model/kinds/)
and are also one of the [typekinds](/docs/schemas/features/typekinds/) in IPLD Schemas.



typed lists
-----------

List types can be declared like this:

[testmark]:# (list-basic/schema.ipldsch)
```ipldsch
type SimpleList [String]
```

Note that a list declaration always refers to another type.
(Here, it's "`String`", which we will assume has already
been defined as `type String string` per the [prelude](/specs/schemas/prelude/).)

The DMT form of that schema, in JSON, is:

[testmark]:# (list-basic/schema.dmt.json)
```json
{
	"types": {
		"SimpleList": {
			"list": {
				"valueType": "String"
			}
		}
	}
}
```

The following are blocks of data, expressed as json, that should match this schema:

[testmark]:# (list-basic/match/basic)
```json
["a", "b", "c"]
```

[testmark]:# (list-basic/match/empty)
```json
[]
```

The following are blocks of data, expressed as json, that do not match this schema:

[testmark]:# (list-basic/nomatch/string)
```json
"fooz"
```

(This doesn't match because a string isn't a list)

[testmark]:# (list-basic/nomatch/map)
```json
{}
```

(This doesn't match because a map isn't a list, either.)

[testmark]:# (list-basic/nomatch/mixed-contents)
```json
["almost", 12]
```

(This doesn't match, even though it's a list,
because not all of the list's contents match the type specified for the list content.)

[testmark]:# (list-basic/nomatch/null-contents)
```json
[null, "nope"]
```

(This doesn't match because the list data contains a null.
The list value type must be explicitly declared as `nullable` if this is desired to match.)



lists with nullable values
--------------------------

:::todo
TODO
:::



lists with an Any value
-----------------------

:::todo
TODO
:::
