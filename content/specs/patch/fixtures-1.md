---
title: "patch-fixtures-1"
weight: 61
---

This file contains a bunch of fixtures for the Patch system.
These are suitable both as mechanical test fixtures, and as examples for humans.

### What's covered?

All the fixtures in this file are operating on single blocks --
the data can still be a tree (maps, lists, etc), but contains no links.
(Other fixtures cover data that spans multiple blocks by use of links.)

### What's the fixture format?

This is the [testmark format](https://github.com/warpfork/go-testmark);
it can be consumed programmatically.
(Note that you probably _can't_ see these labels as this page is rendered on the website;
you'll have to find the markdown [source](/specs/about/#source).)

### This doesn't have to be JSON!

We've used JSON (representing the DAG-JSON format) here for the initial data, as well as the patch instructions and the results.
However, this is a totally stylistic choice.  We're just using JSON here because it's convenient and it's human-readable.
You can equally well express all of these objects in DAG-CBOR, or other [codecs](/docs/codecs/); it makes no difference to IPLD.
The patch instruction and the subject data don't even have to be in the same codec, either.

## Fixtures

### Adding an entry to a map

Given an initial document:

```json
{"foo": "bar"}
```

and a Patch OperationSequence:

```json
[
 { "op": "add", "path": "/baz", "value": "qux" }
]
```

The following document should result:

```json
{
 "foo": "bar",
 "baz": "qux"
}
```

Note that if order is sensitive, the additions are considered to go at the end of map.

### Inserting into a list

Given an initial document:

```json
["bar", "baz"]
```

and a Patch OperationSequence:

```json
[
 { "op": "add", "path": "/1", "value": "qux" }
]
```

The following document should result:

```json
[
 "bar",
 "qux",
 "baz"
]
```

### Removing an entry from a map

Given an initial document:

```json
{
 "baz": "qux",
 "foo": "bar"
}
```

and a Patch OperationSequence:

```json
[
 { "op": "remove", "path": "/baz" }
]
```

The following document should result:

```json
{
 "foo": "bar"
}
```

### Replacing an entry from a map

Given an initial document:

```json
{
 "baz": "qux",
 "foo": "bar"
}
```

and a Patch OperationSequence:

```json
[
 { "op": "replace", "path": "/baz", "value": "boo" }
]
```

The following document should result:

```json
{
 "baz": "boo",
 "foo": "bar"
}
```

### Copying a value

Given an initial document:

```json
{
 "foo": {
  "bar": "baz",
  "waldo": "fred"
 },
 "qux": {
  "corge": "grault"
 }
}
```

and a Patch OperationSequence:

```json
[
 { "op": "copy", "from": "/foo/waldo", "path": "/qux/thud" }
]
```

The following document should result:

```json
{
 "foo": {
  "bar": "baz",
  "waldo": "fred"
 },
 "qux": {
  "corge": "grault",
  "thud": "fred"
 }
}
```

### Moving a value

Given an initial document:

```json
{
 "foo": {
  "bar": "baz",
  "waldo": "fred"
 },
 "qux": {
  "corge": "grault"
 }
}
```

and a Patch OperationSequence:

```json
[
 { "op": "move", "from": "/foo/waldo", "path": "/qux/thud" }
]
```

The following document should result:

```json
{
 "foo": {
  "bar": "baz"
 },
 "qux": {
  "corge": "grault",
  "thud": "fred"
 }
}
```

### Testing and conditional modification

Given an initial document:

```json
{
 "baz": "qux",
 "foo": [
  "a",
  2,
  "c"
 ]
}
```

and a Patch OperationSequence:

```json
[
 { "op": "test", "path": "/baz", "value": "qux" },
 { "op": "test", "path": "/foo/1", "value": 2 },
 { "op": "add",  "path": "/bar", "value": "zar" }
]
```

(Note that this contains both test operations as well as a subsequent add operation!
The add operation should only apply if the test operations yield true.)

The following document should result:

```json
{
 "baz": "qux",
 "foo": [
  "a",
  2,
  "c"
 ],
 "bar": "zar"
}
```

### Testing and conditional modification - Failing case

Given an initial document:

```json
{
 "baz": "qux",
 "foo": [
  "a",
  2,
  "c"
 ]
}
```

and a Patch OperationSequence:

```json
[
 { "op": "test", "path": "/baz", "value": "qux" },
 { "op": "test", "path": "/foo/1", "value": 3 },
 { "op": "add",  "path": "/bar", "value": "zar" }
]
```

The operation should abort and the document should remain as:

```json
{
 "baz": "qux",
 "foo": [
  "a",
  2,
  "c"
 ]
}
```
