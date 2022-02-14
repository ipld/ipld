Patch Fixtures 1
================

This file contains a bunch of fixtures for the Patch system.
These are suitable both as mechanical test fixtures, and as examples for humans.

### What's covered?

All the fixtures in this file are operating on single blocks --
the data can still be a tree (maps, lists, etc), but contains no links.
(Other fixtures cover data that spans multiple blocks by use of links.)

### What's the fixture format?

This is the [testmark format](https://github.com/warpfork/go-testmark);
it can be consumed programmatically.
(Note that you probably _can't_ see these labels as this page is rendered on ts.

### This doesn't have to be JSON!

We've used JSON here for the initial data, as well as the patch instructions and the results.
However, this is a totally stylistic choice.  We're just using JSON here because it's convenient and it's human-readable.
You can equally well express all of these objects in CBOR, or other [codecs](/docs/codecs/); it makes no difference to IPLD.
The patch instruction and the subject data don't even have to be in the same codec, either.


Fixtures
--------

### Adding an entry to a map

Given an initial document:

[testmark]:# (adding-a-map-entry/initial)
```json
{"foo": "bar"}
```
   
and a Patch OperationSequence:

[testmark]:# (adding-a-map-entry/patch)
```json
[
	{ "op": "add", "path": "/baz", "value": "qux" }
]
```

The following document should result:

[testmark]:# (adding-a-map-entry/result)
```json
{
	"foo": "bar",
	"baz": "qux"
}
```

Note that if order is sensitive, the additions are considered to go at the end of map.


### Inserting into a list

Given an initial document:

[testmark]:# (inserting-into-a-list/initial)
```json
["bar", "baz"]
```
   
and a Patch OperationSequence:

[testmark]:# (inserting-into-a-list/patch)
```json
[
	{ "op": "add", "path": "/1", "value": "qux" }
]
```

The following document should result:

[testmark]:# (inserting-into-a-list/result)
```json[
[
	"bar",
	"qux",
	"baz"
]
```

