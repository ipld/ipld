---
title: "selector-fixture-1"
weight: 62
---

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

## Fixtures

### matching a single node

This test is the simplest hello-world.
The data just has a single node,
and the selector just matches exactly the node it was applied on.

#### data

```json
"basic test"
```

#### selector

```json
{
 ".": {}
}
```

#### expected visit events

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

```json
{
 "foo": true,
 "other": {}
}
```

#### selector

```json
{
 ".": {}
}
```

#### expected visit events

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
but does _not_ match the map node itself --
while it _does_ match the fields.

#### data

```json
{
 "bar": false,
 "foo": true,
 "some_other": {}
}
```

#### selector

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

```json
[
 "0",
 "1",
 "2"
]
```

#### selector

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

```json
[
 0,
 null,
 "s",
 {}
]
```

#### selector

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

```json
{"path": "", "node": {"list": null}, "matched": false}
{"path": "1", "node": {"null": null}, "matched": true}
{"path": "2", "node": {"string": "s"}, "matched": true}
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

```json
{"path": "", "node": {"list": null}, "matched": false}
{"path": "0", "node": {"map": null}, "matched": false}
{"path": "0/one", "node": {"list": null}, "matched": false}
{"path": "0/one/0", "node": {"map": null}, "matched": false}
```
