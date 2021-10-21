Schema Fixtures for Maps
========================

Maps are both an IPLD [kind](/docs/data-model/kinds/)
and are also one of the [typekinds](/docs/schemas/features/typekinds/) in IPLD Schemas.



typed maps
----------

Map types can be declared like this:

[testmark]:# (map-basic/schema.ipldsch)
```ipldsch
type SimpleMap {String:Int}
```

Note that a maps declaration always refers to another type.
(Here, it's "`String`" for the key, and "`Int`" for the value,
which we will assume has already been defined as `type String string`
and `type Int int` per the [prelude](/specs/schemas/prelude/).)

The DMT form of that schema, in JSON, is:

[testmark]:# (map-basic/schema.dmt.json)
```json
{
	"types": {
		"SimpleMap": {
			"map": {
				"keyType": "String",
				"valueType": "Int"
			}
		}
	}
}
```

The following are blocks of data, expressed as json, that should match this schema:

[testmark]:# (map-basic/match/basic)
```json
{"a":1, "b":2, "c":100}
```

[testmark]:# (map-basic/match/empty)
```json
{}
```

The following are blocks of data, expressed as json, that do not match this schema:

[testmark]:# (map-basic/nomatch/string)
```json
"fooz"
```

(This doesn't match because a string isn't a map.)

[testmark]:# (map-basic/nomatch/list)
```json
[]
```

(This doesn't match because a list isn't a map, either.)

[testmark]:# (map-basic/nomatch/mixed-contents)
```json
{"foo": true}
```

(This doesn't match, even though it's a map,
because not all of the map's contents match the types specified.
In this case, the key is a string, so that matches;
but the value is a bool, where we expected an int:
so overall, this match is flunked.)

[testmark]:# (map-basic/nomatch/null-contents)
```json
{"foo": null}
```

(This doesn't match because the map data contains a null.
The map value type must be explicitly declared as `nullable` if this is desired to match.)



maps with nullable values
-------------------------

Maps with nullable values are declared with the addition of that keyword:

[testmark]:# (map-nullable/schema.ipldsch)
```ipldsch
type MapWithNullable {String:nullable String}
```

The DMT form of that schema looks very similar,
but notice that another field appears in the type's description:

[testmark]:# (map-nullable/schema.dmt.json)
```json
{
	"types": {
		"MapWithNullable": {
			"map": {
				"keyType": "String",
				"valueType": "String",
				"valueNullable": true
			}
		}
	}
}
```

(Note that for the entire `"valueNullable": false` to appear would be an invalid schema DMT document!
That field is an [implicit field](/docs/schemas/features/typekinds/#fields-with-implicit-values),
so if the value were to be false, the correct encoding is that the entire field must be absent.)

Now, data containing nulls will match this schema:

[testmark]:# (map-nullable/match/null-contents)
```json
{"just fine": null}
```
