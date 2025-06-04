Schema Fixtures for Enums
=========================

Enums are one of the [typekinds](/docs/schemas/features/typekinds/) in IPLD Schemas.



enums, no fuss
--------------

[testmark]:# (enum-basic/schema.ipldsch)
```ipldsch
type SimpleEnum enum {
	| Foo
	| Bar
	| Baz
}
```

The DMT form of that schema, in JSON, is:

[testmark]:# (enum-basic/schema.dmt.json)
```json
{
	"types": {
		"SimpleEnum": {
			"enum": {
				"members": [
					"Foo",
					"Bar",
					"Baz"
				],
				"representation": {
					"string": {}
				}
			}
		}
	}
}
```

The following are blocks of data, expressed as json, that should match this schema:

[testmark]:# (enum-basic/match/1)
```json
"Foo"
```

[testmark]:# (enum-basic/match/2)
```json
"Bar"
```

[testmark]:# (enum-basic/match/3)
```json
"Baz"
```

(And that's an exhaustive list -- those are the *only* three valid matching documents.)

The following are blocks of data, expressed as json, that do not match this schema:

[testmark]:# (enum-basic/nomatch/string)
```json
"fooz"
```

(This doesn't match because the string isn't any of those that's a member of the enum.)

[testmark]:# (enum-basic/nomatch/int)
```json
1
```

(This doesn't match because int isn't even the right kind to possibly match up with something with a string representation.)



enums with custom string representations
----------------------------------------

Here's another enum, this time with some details of representation customized:


[testmark]:# (enum-strings/schema.ipldsch)
```ipldsch
type SimpleEnumWithValues enum {
	| Foo ("f")
	| Bar
	| Baz ("b")
}
```

Here we see the members of the enum are still named, in the same way as before;
additionally, representation details are customized by the clauses in the parenthesis.

There's not much customization allowed for enums, so really only one thing is allowed there:
a string value to use as the representation, which will be used instead of using the member name.

The DMT form of that schema, in JSON, is:

[testmark]:# (enum-strings/schema.dmt.json)
```json
{
	"types": {
		"SimpleEnumWithValues": {
			"enum": {
				"members": [
					"Foo",
					"Bar",
					"Baz"
				],
				"representation": {
					"string": {
						"Foo": "f",
						"Baz": "b"
					}
				}
			}
		}
	}
}
```

(Note that in the DMT, too, we only see the representation carrying info for the members with non-default details.)

The following are blocks of data, expressed as json, that should match this schema:

[testmark]:# (enum-strings/match/1)
```json
"f"
```

[testmark]:# (enum-strings/match/2)
```json
"Bar"
```

[testmark]:# (enum-strings/match/3)
```json
"b"
```

(And that's an exhaustive list -- those are the *only* three valid matching documents.)

The following are blocks of data, expressed as json, that do not match this schema:

[testmark]:# (enum-strings/nomatch/string)
```json
"fooz"
```

(Same as before: it's a string, but it's clearly not a member of the union.)

[testmark]:# (enum-strings/nomatch/membername-if-overriden)
```json
"Foo"
```

Notice that the member name _is no longer acceptable_ if the representation
for that member has been customized.  (There's always exactly one representation
allowed for any data described by an IPLD Schema; that means if you customize
anything's representation, the previous, default behavior is removed at the same time.)



enums with int representation
-----------------------------

Here's another enum, this time using an integer-based representation strategy:

[testmark]:# (enum-int/schema.ipldsch)
```ipldsch
type SimpleEnum enum {
	| Foo (0)
	| Bar (1)
	| Baz (100)
} representation int
```

This is very similar to how it worked for customizing details of string representations.
Here we see the members of the enum are still named, in the same way as before;
additionally, representation details are customized by the clauses in the parenthesis.

The DMT form of that schema, in JSON, is:

[testmark]:# (enum-int/schema.dmt.json)
```json
{
	"types": {
		"SimpleEnumWithValues": {
			"enum": {
				"members": [
					"Foo",
					"Bar",
					"Baz"
				],
				"representation": {
					"int": {
						"Foo": 0,
						"Bar": 1,
						"Baz": 100
					}
				}
			}
		}
	}
}
```

(Note that for the int representation of enums, we had to assign a number explicitly
to every member of the enum.  There are no default numberings.)

The following are blocks of data, expressed as json, that should match this schema:

[testmark]:# (enum-int/match/1)
```json
0
```

[testmark]:# (enum-int/match/2)
```json
1
```

[testmark]:# (enum-int/match/3)
```json
100
```

(And that's an exhaustive list -- those are the *only* three valid matching documents.)

The following are blocks of data, expressed as json, that do not match this schema:

[testmark]:# (enum-int/nomatch/string)
```json
"fooz"
```

(A string is definitely not going to match this enum, which is expecting to serialized as a number.)

[testmark]:# (enum-int/nomatch/membername-if-overriden)
```json
"Foo"
```

(As with string representations: it doesn't matter if this string happens to be
the name of a member; because a representation has been specified,
that representation is the only acceptable one.)
