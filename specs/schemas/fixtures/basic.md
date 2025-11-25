Schema Fixtures for Basic Scalar Types
======================================

ints
----

Types of kind `int` can be declared like this:

[testmark]:# (basic-int/schema.ipldsch)
```ipldsch
type SimpleInt int
```

The DMT form of that schema, in JSON, is:

[testmark]:# (basic-int/schema.dmt.json)
```json
{
	"types": {
		"SimpleInt": {
			"int": {}
		}
	}
}
```

The following are blocks of data, expressed as json, that should match this schema:

[testmark]:# (basic-int/match/1)
```json
100
```

[testmark]:# (basic-int/match/2)
```json
0
```

[testmark]:# (basic-int/match/3)
```json
-100
```

The following are blocks of data, expressed as json, that do not match this schema:

[testmark]:# (basic-int/nomatch/string)
```json
"fooz"
```

(This doesn't match because a string is not an int.)

[testmark]:# (basic-int/nomatch/float)
```json
100.1
```

(This doesn't match because a float is not an int...!)

[testmark]:# (basic-int/nomatch/bool)
```json
true
```

(This doesn't match because a bool is not an int.)


[testmark]:# (basic-int/nomatch/map)
```json
{}
```

(This doesn't match because a map is not a int.)



bytes
-----

Types of kind `bytes` can be declared like this:

[testmark]:# (basic-bytes/schema.ipldsch)
```ipldsch
type SimpleBytes bytes
```

The DMT form of that schema, in JSON, is:

[testmark]:# (basic-bytes/schema.dmt.json)
```json
{
	"types": {
		"SimpleBytes": {
			"bytes": {}
		}
	}
}
```



floats
------

Types of kind `float` can be declared like this:

[testmark]:# (basic-float/schema.ipldsch)
```ipldsch
type SimpleFloat float
```

The DMT form of that schema, in JSON, is:

[testmark]:# (basic-float/schema.dmt.json)
```json
{
	"types": {
		"SimpleFloat": {
			"float": {}
		}
	}
}
```

The following are blocks of data, expressed as json, that should match this schema:

[testmark]:# (basic-float/match/1)
```json
100.1
```

[testmark]:# (basic-float/match/2)
```json
0.1
```

[testmark]:# (basic-float/match/3)
```json
100.0
```

[testmark]:# (basic-float/match/4)
```json
-1.0
```

The following are blocks of data, expressed as json, that do not match this schema:

[testmark]:# (basic-float/nomatch/string)
```json
"fooz"
```

(This doesn't match because a string is not a float.)

[testmark]:# (basic-float/nomatch/bool)
```json
true
```

(This doesn't match because a bool is not a float.)


[testmark]:# (basic-float/nomatch/map)
```json
{}
```

(This doesn't match because a map is not a float.)



unit
----

Types of typekind `unit` can be declared like this:

[testmark]:# (basic-unit/schema.ipldsch)
```ipldsch
type Nothing unit representation null
```

Note that the representation clause is not optional for `unit` types;
they have no default representation, so it must always be stated.

The DMT form of that schema, in JSON, is:

[testmark]:# (basic-unit/schema.dmt.json)
```json
{
	"types": {
		"Nothing": {
			"unit": {
				"representation": "null"
			}
		}
	}
}
```

There's really only one document (expressed as json) that can match this schema:

[testmark]:# (basic-unit/match/1)
```json
null
```

The following are blocks of data, expressed as json, that do not match this schema:

[testmark]:# (basic-unit/nomatch/string)
```json
"null"
```

(This doesn't match because a string is not the null token -- not even if it's composed the characters 'n' 'u' 'l' 'l'.)
