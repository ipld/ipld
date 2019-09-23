Example Selectors
=================

In this document, we will show some examples of selectors.

#### A quick note about formatting

We will typically show some sample data as JSON encoded documents,
and show the Selectors as YAML documents.
**Remember,** any IPLD document can be encoded in any multicodec;
these examples are JSON for convenience and by convention, but all
the examples would work the same even if they were in other formats.
Similarly, **Selectors themselves are just IPLD documents**, so while
we've written yaml forms here, they could just as well be e.g. JSON or CBOR.
When we write yaml, we'll also use quoted strings for user-supplied strings,
and unquoted strings as map keys when it's for a field specified by the schema.

For human convenience, we will also pretend there are a few modifications
to the Selector schema:

- we will disregard all 'rename' shortenings specified by the schema;
- and we will use type names (snakeCase'd) for union discriminators,
  instead of the shorter keys specified in the schema for those unions.

Therefore, note that the *real* serialized selectors will be significantly terser!


Examples
--------

### Deeply nested path

In some DAG you want to get one specific value you know the path of. Let's say you want to get the birth year of a specific character of a specific show.

Example data (as JSON):

```json
{
  "show": "start-trek-voyager",
  "characters": {
    "kathryn-janeway": {
      "birthday": {
        "day": 20,
        "month": 5,
        "year": 2328
      },
      "rank": "vice admiral"
    }
  }
}
```

A Selector to extract the "year" data could look like this:

```yaml
selectFields:
  "characters":
    selectFields:
      "kathryn-janeway":
        selectFields:
          "birthday":
            selectFields:
              "year":
                matcher: {}
```


### Getting a certain number of parent blocks in a blockchain

You want to get a certain number of parents from a certain block.

The shape of a block could look like this (in JSON):

```json
{
  "parent": "<cid of similar structure>",
  "time": 1549641260,
  "none": 3423545
}
```

If you know you want five parents you could continue to use explicit Field Selectors:

```json
{"selectFields":{"parent":
	{"selectFields":{"parent":
		{"selectFields":{"parent":
			{"selectFields":{"parent":
				{"selectFields":{"parent":
					{"matcher":{}}}}}}}}}}}}
```

This selector matches the fivth-deepest "parent" (and in the context of
graphsync or other merkleproof applications, will yield all five nodes).

But this gets a bit verbose.  We can explore the same tree in a similar
pattern with another mechanism -- recursive exploration:

```yaml
selectRecursive:
  depthLimit: 5
  next:
    selectFields:
      "parent":

```

// FIXME, well, at least it's obvious now how different it is.
// there's no 'after' system, though.  so we literally can't match the above.
// the whole example is bad.  it needs a larger corpus or it's wildly unclear.

This will traverse the same set of nodes as the previous example -- however,
it has has a *slightly* different effect!

Using a recursive selector in this way matches *each* of the "parent" nodes,
up to the depth limit -- meaning it matches five nodes, instead of the
previous example, which matches only the last one.

In terms of graphsync or other merkleproof applications, the selector will yield
the same set, since the set of nodes *considered* for matches is the same as
in the previous example.


### Getting changes up to a certain one

This use case is inspired by CRDTs, where you have a chain of changes. You observe a new change and want to get all the previous changes up to the one that you have already observed. It is a recursive query with a CID as stopping condition.

The shape of a change could look like this (in JSON):

```json
{
  "prev": "prevcid",
  "timestamp": 1549641260,
  "value": "abc"
}
```

It will be a Recursive Selector following along until it reaches a link of a
certain value (`somecid` in this case):

```json
{"selectRecursive": {
  "depthLimit": 5,
  "next":
    {"selectFields":{"parent":
      true}},
  "cidLimit": "somecid"
}}
```


### Getting a full sub-DAG

For getting a full file from UnixFSv1 you need to retrieve a full sub-DAG.

An example selector to get the full sub-DAG rooted at a certain CID:


```json
{"selectRecursive": {
  "next":
    {"selectFields":{"Links":
      {"selectAll":
        {"selectFields":{"multihash":
          true}}}}}
}}
```

If it's a file in some directory, you can also start at a deeper level:

```json
{"selectFields":{"with":
  {"selectFields":{"some":
    {"selectFields":{"subdirectory":
      {"selectRecursive": {
        "next":
          {"selectFields":{"Links":
            {"selectAll":
              {"selectFields":{"multihash":
                true}}}}}
      }}
}}}}}}
```
