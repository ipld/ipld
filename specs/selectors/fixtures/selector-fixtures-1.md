Selector Fixtures 1
===================

This file contains a bunch of fixtures for selectors.
These are suitable both as mechanical test fixtures, and as examples for humans.

### What's covered?

All the fixtures in this file are operating on single blocks --
the data can still be a tree (maps, lists, etc), but contains no links.

Walking will be exercised;
determinism of order will be exercised;
and "matched node" vs "reached node" distinctions will be exercised.

### What's the fixture format?

The fixture data is contained in markdown code blocks.
(These should render nicely, and even with syntax highlighting,
if you're looking at this in the website.)

These code blocks are also tagged with a markdown "comment" which labels them.
This is the [testmark format](https://github.com/warpfork/go-testmark);
it can be consumed programmatically.
(Note that you probably _can't_ see these labels as this page is rendered on the website;
go look at the "raw" form of the page, from a git clone of the repo.
Otherwise: the headings rendered here say the same things.)

Each fixture will have the following hunks of data:

- `data` -- this is the "block".  It's arbitrary example data.  They're all in json (or dag-json) format, for simplicity.
- `selector` -- this is the selector.  Again, as json.
- `expect-visit` -- these are json lines (one json object on each line) containing description of each node that should be visited, in order.

### How do I interpret this data?

To test your selector implementation:

1. First parse the "data" (this is just a prerequisite; parsing this should already be known to work);
2. Then parse the "selector" (this should succeed -- there are no trick documents here that should fail to parse as selectors);
3. Then evaluate the selector on the data...
4. Each step of the selection process should yield {a path, the node at that path, and whether that point is "matched"}.
   Each line in the "expect-visit" hunk should correspond to one of these steps.

### This doesn't have to be JSON!

Remember -- none of these things are locked-in on JSON as a serialization format.
You can equally well serialize a Selector declaration as CBOR.
You can also apply Selectors on CBOR data just as well as JSON (or apply them on Git data, or anything else there's an IPLD [codec](/docs/codecs/) for)!

We're just using JSON here because it's convenient and it's human-readable.

---


Fixtures
--------

### matching a single node

This test is the simplest hello-world.
The data just has a single node,
and the selector just matches exactly the node it was applied on.

#### data

[testmark]:# (single-node/data)
```json
"basic test"
```

#### selector

[testmark]:# (single-node/selector)
```json
{
	".": {}
}
```

#### expected visit events

[testmark]:# (single-node/expect-visit)
```json
{"path": "", "node": {"string": "basic test"}, "matched": true}
```

---


### matching a small map

This test matches on a small map.
It doesn't recurse; it just matches one element.

Note how we do the expectation data here!
If the node is a map or list kind, we say just "null" as the value;
this is to avoid making the data oversized and redundant.

#### data

[testmark]:# (simple-map/data)
```json
{
	"foo": true,
	"other": {}
}
```

#### selector

[testmark]:# (simple-map/selector)
```json
{
	".": {}
}
```

#### expected visit events

[testmark]:# (simple-map/expect-visit)
```json
{"path": "", "node": {"map": null}, "matched": true}
```

---


### exploring fields

This test takes several steps over a small map.
So, it's our first fixture that's actually going to have several entries in the visit expectations list!

But, note that it does not touch every entry in the map --
with a "fields" selector, the traverse only touches what's explicitly described.

Also notice that this selector traverses the map node during its exploration,
but does *not* match the map node itself --
while it *does* match the fields.

#### data

[testmark]:# (explore-fields/data)
```json
{
	"bar": false,
	"foo": true,
	"some_other": {}
}
```

#### selector

[testmark]:# (explore-fields/selector)
```json
{
	"f": {
		"f>": {
			"foo": {
				".": {}
			},
			"bar": {
				".": {}
			}
		}
	}
}
```

This looks like a mouthful but is pretty simple:

- The map with the `"f"` key is an `ExploreFields` clause.
- The `"f>"` is the `ExploreFields.fields` value.
- The two entries in there -- `"foo"` and `"bar"` -- are the field names we're saying we want to explore under.
- The next thing we do after each of those is a `Matcher` clause.
- Done!

#### expected visit events

[testmark]:# (explore-fields/expect-visit)
```ipldsch
{"path": "",    "node": {"map": null}, "matched": false}
{"path": "foo", "node": {"bool": true}, "matched": true}
{"path": "bar", "node": {"bool": false}, "matched": true}
```

Note how the root node, though it's necessarily been visited, is not "matched".

Also note that the order of fields in the `ExploreFields` clause determined the order of the results!
(It dominated the ordering of the data; notice how the data would've had `"bar"` come first.)

---


### exploring fields, nested

This test is similar to the previous fixture,
but shows how selector clauses can be nested.

#### data

[testmark]:# (explore-fields-nested/data)
```json
{
	"nested": {
		"newt": 8
	},
	"foo": true,
	"bar": 5
}
```

#### selector

[testmark]:# (explore-fields-nested/selector)
```json
{
	"f": {
		"f>": {
			"foo": {
				".": {}
			},
			"nested": {
				"f": {
					"f>": {
						"newt": {
							".": {}
						}
					}
				}
			}
		}
	}
}
```

That got deeper!  If it looks daunting, look back up to the prior fixture, though (and its explainer).
It's the same stuff, just more of it.

#### expected visit events

[testmark]:# (explore-fields-nested/expect-visit)
```json
{"path": "", "node": {"map": null}, "matched": false}
{"path": "foo", "node": {"bool": true}, "matched": true}
{"path": "nested", "node": {"map": null}, "matched": false}
{"path": "nested/newt", "node": {"int": 8}, "matched": true}
```

---


### explore by index

Exploration can also be done over indexes of lists.

This is very similar to using `ExploreFields`, but uses integers instead of strings,
because it's working with lists, rather than maps.

#### data

[testmark]:# (explore-index/data)
```json
[
	"0",
	"1",
	"2"
]
```

#### selector

[testmark]:# (explore-index/selector)
```json
{
	"i": {
		"i": 1,
		">": {
			".": {}
		}
	}
}
```

#### expected visit events

[testmark]:# (explore-index/expect-visit)
```json
{"path": "", "node": {"list": null}, "matched": false}
{"path": "1", "node": {"string": "1"}, "matched": true}
```

---


### exploring a range

Another form of selector clause can specify _ranges_ over lists.

This is more compact to declare than listing each element you want out of a list,
if there's several things you want in a row.

#### data

[testmark]:# (explore-range/data)
```json
[
	0,
	null,
	"s",
	{}
]
```

#### selector

[testmark]:# (explore-range/selector)
```json
{
	"r": {
		"^": 1,
		"$": 3,
		">": {
			".": {}
		}
	}
}
```

#### expected visit events

[testmark]:# (explore-range/expect-visit)
```json
{"path": "", "node": {"list": null}, "matched": false}
{"path": "1", "node": {"null": null}, "matched": true}
{"path": "2", "node": {"string": "s"}, "matched": true}
```

---

### slice matching

Matching a node that is a string or bytes can match a subset of the string or
bytes. This is primarily helpful in the case of an ADL that reifies a complex
representation into a simplified single string or bytes node, such as one that
represents a multi-block bytes node as a single bytes node.

#### data

[testmark]:# (match-subset/data)
```json
"a long string that we want to match a subset of"
```

#### selector

[testmark]:# (match-subset/selector)
```json
{
	".": {
		"subset": {
			"[": 30,
			"]": 44
		}
	}
}
```

#### expected visit events

[testmark]:# (match-subset/expect-visit)
```ipldsch
{"path": "", "node": {"string": "match a subset"}, "matched": true}
```

---

### slice matching with negative indexes and extreme values

Negative indexes for both "from" and "to" can be used to count from the end of
the string or bytes node. The "to" index can be greater than the length of the
string or bytes node, in which case it is treated as the length of the string
or bytes node.

After adjusting "from" and "to" values to the known length of the string or
bytes node, the following rules are applied:

 * Overflow of "to" is allowed and is interpreted as the end of the slice. This
   allows for a simple way to specify a slice from a particular index to the
   end of the slice, without needing to know the length of the slice.
 * Underflow of "from" is allowed (which can only occur when "from" is a
   negative that is greater than the length of the slice), and is interpreted
   as the beginning of the slice.
 * Overflow of "from" and underflow of "to" are not adjusted or reinterpreted.
   These conditions will cause the selector to fail to match anything.
 * Where the from:to range fails to match within the byte range of the node,
   (e.g. where they select a range beyond the end of the node), or where they
   resolve to a negative, or zero-length range (from>=to), the selector will
   fail to match. However, in the case where from==to, the selector will
   match, but the matched node will be an empty string or bytes.

#### data

[testmark]:# (match-subset-extremities/data)
```json
"a long string that we want to match a subset of"
```

#### selector

This selector uses the max signed 64-bit integer as the "to" index as a way to
specify the end of the string or bytes node.

[testmark]:# (match-subset-extremities/selector)
```json
{
	".": {
		"subset": {
			"[": -9,
			"]": 9223372036854775807
		}
	}
}
```

#### expected visit events

[testmark]:# (match-subset-extremities/expect-visit)
```ipldsch
{"path": "", "node": {"string": "subset of"}, "matched": true}
```

---

### hello recursion!

Selectors have a recursion clause!

(Terrifying, right?)

More selector clauses can be placed inside the recursion clause...
and then, eventually, a recursion stop clause, which will cause the selection process
to jump back to the recursion start marker.

This recursion uses an `ExploreAll` clause, which is sort of like a wildcard match.
The recursion clause then turns that single-level wildcard match into a full recursive graph walk!

Recursive selectors have a depth limit.
On this data, we'll reach the depth limit before we explore all of the data,
so notice how the expectation list for visits is relatively short.

Note that there's no actual matcher clause anywhere in this selector.
That means this selector will still explore and visit a lot of nodes,
but none of them are considered to "match".

#### data

[testmark]:# (hello-recursion/data)
```json
[
	{
		"one": [
			{
				"two": [
					3
				]
			}
		]
	}
]
```

#### selector

[testmark]:# (hello-recursion/selector)
```json
{
	"R": {
		"l": {
			"depth": 4
		},
		":>": {
			"a": {
				">": {
					"@": {}
				}
			}
		}
	}
}
```

- `"l"` is the `limit` specifier for the recursion clause.
- `":>"` is the selector clause that gets applied again at each level of recursion.
- `"@"` is the recursion edge.

#### expected visit events

[testmark]:# (hello-recursion/expect-visit)
```json
{"path": "", "node": {"list": null}, "matched": false}
{"path": "0", "node": {"map": null}, "matched": false}
{"path": "0/one", "node": {"list": null}, "matched": false}
{"path": "0/one/0", "node": {"map": null}, "matched": false}
```
