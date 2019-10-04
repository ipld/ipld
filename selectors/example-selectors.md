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
we've written YAML forms here, they could just as well be e.g. JSON or CBOR.
When we write YAML, we'll also use quoted strings for user-supplied strings,
and unquoted strings as map keys when it's for a field specified by the schema.

For human convenience, we will also pretend there are a few modifications
to the Selector schema:

- we will disregard all 'rename' shortenings specified by the schema;
- and we will use type names for union discriminators,
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
Selector:
  ExploreFields:
    fields:
      "characters":
        ExploreFields:
          fields:
            "kathryn-janeway":
              ExploreFields:
                fields:
                  "birthday":
                    ExploreFields:
                      fields:
                        "year":
                          Matcher:
                            {}
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

```yaml
Selector:
  ExploreFields:
    fields:
      "parent":
        ExploreFields:
          fields:
            "parent":
              ExploreFields:
                fields:
                  "parent":
                    ExploreFields:
                      fields:
                        "parent":
                          ExploreFields:
                            fields:
                              "parent":
                                Matcher:
                                  {}
```

This selector matches the fivth-deepest "parent"

But this gets a bit verbose.  We can explore the same tree in a similar
pattern with another mechanism -- recursive exploration:

```yaml
Selector:
  ExploreRecursive:
    maxDepth: 5
    sequence:
      ExploreFields:
        fields:
          "parent":
            ExploreRecursiveEdge
```

This will traverse the same set of nodes as the previous example -- however,
it has has a *slightly* different effect.

Using a recursive selector in this way matches *each* of the "parent" nodes,
up to the depth limit -- meaning it matches five nodes, instead of the
previous example, which matches only the last one.

Implementations that return all visited notes (and not only the matched ones)
will return the same set of notes for both examples.


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

```yaml
Selector:
  ExploreRecursive:
    maxDepth: 100
    sequence:
      ExploreFields:
        fields:
          "prev":
            ExploreRecursiveEdge
    stopAt:
      TBD: # Conditions are specified yet
```


### Retrieving data recursively

[UnixFSv1] is a good case of a recursive data structure. Any number of links can be used to create deeply nested structures. The following example is inspired by UnixFSv1, but uses a simplified structure, so that we don't get lost in UnixFSv1 specific implementation details.

Our basic structure looks like this:

```json
{
  "data": "<only-nodes-without-further-links-have-this-set>",
  "links": [{
    "name": "<name-of-the-link>",
    "cid": "<a-cid-that-points-to-another-block>"
  },
  …
  ]
}
```

The recursion comes into play with the `cid` field that points to another block that has exactly the same structure. As you can transparently path through IPLD structures that are composed of several blocks, we just omit those in the following example and pretend that we have a single large object describing our file system.


```json
{
  "links": [{
    "name": "subdir1",
    "cid": {
      "links": [{
        "name": "somedata.txt",
        "cid": {
          "data": "there's data in here",
          "Links": []
        }
      }]
    }
  },{
    "Name": "subdir2",
    "cid": …
  }]
}

```

The following selector visits all `links` and matches all `data` fields:


```yaml
Selector:
  ExploreRecursive:
    maxDepth: 1000
    sequence:
      ExploreFields:
        fields:
          "data":
            Matcher:
              {}
          "links":
            ExploreAll:
              next:
                ExploreFields:
                  fields:
                    "cid":
                      ExploreRecursiveEdge
```

[UnixFSv1]: https://github.com/ipfs/specs/tree/master/unixfs
