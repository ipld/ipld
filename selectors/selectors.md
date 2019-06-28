# Specification: IPLD Selectors

**Status: Prescriptive - Draft**

This document is a designdoc for IPLD Selectors.

## [Meta: Status of this doc]

- Much of the problem definition was was written around 2018-10-16 ([video presentation](https://drive.google.com/file/d/1NbbVxZQFKXwW6mdodxgTaftsI8eID-c1/view))
  - It narrows down the decision space enough to make significant progress.
  - But it is not complete.
- More concrete proposals for selector implementations (circa 2019-06) can be seen later in the doc.
  - Particularly, in the [Schema](#schema) section.

## Motivation - what are Selectors?

*Prerequisites: [IPLD](https://github.com/ipld/ipld), IPLD data model, [CID](https://github.com/ipld/cid).*

IPLD Selectors are expressions that identify ("select") a subset of nodes in an IPLD dag.

This is a useful primitive to use along with: (a) systems that require distributing or pinning dags (IPFS, Filecoin, bitswap, graphsync, ipfs-cluster), (b) applications that require fetching subsets of data in specific orders or at specific times (video players, dataset viewers, file systems), (c) programs that transform graphs into other graphs (data transformations, ETL, etc). In short, it is a fundamental primitive required by most systems and applications in the IPLD and IPFS ecosystems, as important as [multihash](https://github.com/multiformats/multihash), [CIDs](https://github.com/ipld/cid), [IPLD Formats](https://github.com/ipld/), and more.

![](./selectors.jpg)

## Prior Work

There have been a lot of articulations about selectors in the history of the IPFS and IPLD projects. Many documents exist extolling all the kinds of use cases for selectors. Instead of giving a complete articulation here, this document will mention a few use cases and link to the other documents.

- [Designing IPLD Selectors (2017)](https://github.com/ipld/specs/issues/35)
- [IPLD Selector Thoughts (2017)](https://github.com/ipfs/notes/issues/272)
- [exprimental js-ipld-selector (2017)](https://github.com/ipld/js-ipld-selector)
- [Designing IPLD Selectors - Workshop (2016)](https://github.com/ipfs/2016-IPFS-Workshop-Lisbon/issues/5) (+ [notes](https://github.com/ipld/specs/issues/4))
- [IPLD Selector (original issue) (2015)](https://github.com/ipfs/notes/issues/12)

### Important Design Notes

**Learn from the best.** There have been dozens of graph selector systems implemented over the last few decades. There have been only a few that have been extremely successful, and productive. Study and learn from these systems. These include: unix globs, regular expressions, XPath, css selectors, and more.

**Selectors include paths to the root.** In most cases using IPLD Selectors, programs need to be able to verify authenticated data structures (they need to hash all the nodes in a path, all the way to the root). Therefore, for all these distributed, authenticated use cases, it is drastically easier to count on Selectors that yield a result that is verifiable (checkable against the original query -- the root).

**Self-describe and use multiple types.** Over the years, there has been much designing, without arriving at a complete, perfect solution. We have now recognized this as a feature where self-description and upgradability fit better than forcing a single language: there should just be many types of selectors and applications should use the ones that fit their needs. Due to the wide variety of use cases, we will not have a single perfect syntax. This will become easier over time, as systems that use IPLD acquire the ability to execute authenticated code.

**Aim for succinct, intuitive, human-readable, expressive power.** The most successful selector systems (unix globs, regular expressions, css selectors, etc.) have created very poweful and succinct expressions, that balance the nuance between making something human-friendly and highly efficient. Understandability, intuitiveness, expressivity, familiarity, and similar qualities are desired in the human-readable syntax. Self-description and types make this drastically easier, enabling whole new types to be made over time as better and better syntaxes are discovered, and even existing familiar syntaxes to be ported over.

**Aim for succinct, efficient, self-describing binary representations.** Various systems that use IPLD Selectors may need to distribute and store billions of selectors. Succinctness of expression is key. Self-description and types make this drastically easier, enabling whole new types to be made over time as more efficient syntaxes are discovered.

**Blocks have CIDs. IPLD Nodes have Paths.** It is very important that we align on the following two statements: (1) Blocks have CIDs. (2) IPLD Nodes have paths, not CIDs. This is important because it means that IPLD nodes may begin within the middle of a block, and may not be addressable directly by a CID. This is a key realization, as Selectors must always support Paths as a dag root, not just a CID.

## IPLD Selector System

### Narrowing down the problem

The problem of IPLD Selectors is narrowed down to a very concrete, simple problem:

> - How can we succinctly identify a dag subset, connected to the root?

These other questions are solved in other systems, above or below IPLD Selectors:

> - How can we represent arbitrary data structures or files in dags? (IPLD data model, user code)
> - How can we succinctly identify a dag subset, <u>not connected to the root</u> (User code on top of IPLD selectors)
> - How can we traverse a dag subset? (IPLD library implementations, using IPLD Selectors)
> - How can we make subset selection efficient? (IPLD library implementations)
> - How can we make selector combination efficient? (IPLD library implementations)
> - How can we strip a dag subset from links to objects not in the subset (IPLD Transformations, user code)
> - How can we convert one dag representation into another? (IPLD Transformations, user code)
> - How can we agree with multiple other parties who will pin or send subsets of a dag? (ipfs-cluster, graphsync)

With our problem narrowed down, we can focus on solving just that, and let all other concerns be solved elsewhere in the stack.

### Selector Requirements

- P0 - Selectors can express any valid dag subset (connected to the root).
- P0 - Selectors can select based on IPLD paths.
- P1 - Selectors can select based on values.
- P2 - Selectors can select with seeded pseudorandomness.
- P3 - Selectors can select based on sibling nodes (as in css3) and their descendants (as in css4).
- P1 - Selectors can be composed.
- P0 - Once written, selectors should work permanently. (selector code should not change under the users).
- P1 - Selector languages can evolve and improve over time (faster than other selector systems).
- P3 - Allow experimentation without requiring backward-compatible syntax (different from globs and css).
- P0 - There is a 1-1 mapping between human readable and binary syntaxes.
- P0 - Binary syntax is self-described, succinct, and efficient.
- P0 - Human readable syntax is powerful and expressive.
- P1 - Human readable syntax is intuitive and familiar.

Some of these may seem mutually exclusive. They are not.

## Approach: Selector Types

The requirements stated above are hard to meet. We have spent lots of time in the last few years trying to reconcile them into one language and syntax, with no success. Earlier this year (2018) we recognized that the solution to this problem should be flexibility and interoperability: let many selector languages and syntaxes flourish, and let them evolve over time. This would allow us to satisfy all constraints above, including both a permanent model that can also improve over time. And it reduces the core of our system into three components:

- (1) A system of selector types, that allows creating new selector languages and syntaxes, and can compose them.
- (2) An easy path for plugging selector types into IPLD libraries and other consumers of IPLD Selectors.
- (3) A light process for testing and admitting new selector types into standard IPLD libraries.

These components imply or expand into the following things:

- Well-defined binary and human-readable type self-description (codes in multicodec).
- A narrow `Selector` interface for most uses of selectors, agnostic to selector type.
- A standard way to add selector type implementations to IPLD libraries
- IPLD libraries that pervasively uses the abstract  `Selector` type, and can plug in concrete types.
- A few simple selector types that cover most common cases (cid, path, glob, ...)
- A selector type to allow composing selectors (MultiSelector)
- Aim for language independent implementations of selector implementations (parsers, execution, etc). (WASM?)
- Allow language-specific implementations of selectors (parsers, execution, etc).
- (IMPORTANT) Well-designed set of test vectors representing a variety of use cases for IPLD Selectors.
- A recommended structure for implementing a selector type, with an easy to use test suite.


Selector types
--------------

See [Schema](#schema) section below.


Use cases
---------

WARN: not all of these examples have been updated recently.
If in conflict, the [Schema](#schema) is more canonical, and the example in this section is out of date.

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

```json
{"selectFields":{"characters":
	{"selectFields":{"kathryn-janeway":
		{"selectFields":{"birthday":
			{"selectFields":{"year":
				true}}}}}}}}
```


### Getting a certain number of parent blocks in a blockchain

You want to get a certain number of parents from a certain block.

The shape of a block could look like this (in JSON):

```json
{
  "parent": "parentcid",
  "time": 1549641260,
  "none": 3423545
}
```

If you know you want five parents you could use Path Selectors:

```json
{"selectFields":{"parent":
	{"selectFields":{"parent":
		{"selectFields":{"parent":
			{"selectFields":{"parent":
				{"selectFields":{"parent":
					true}}}}}}}}}}
```

This selector matches the fivth-deepest "parent" (and in the context of
graphsync or other merkleproof applications, will yield all five nodes).

But this gets a bit verbose.  We can explore the same tree in a similar
pattern with another mechanism -- recursive exploration:

```json
{"selectRecursive": {
  "depthLimit": 5,
  "next":
    {"selectFields":{"parent":
      true}}
}}
```

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

Schema
------

This code block describes selectors using [IPLD Schemas](../schema-layer/schemas) syntax.

```ipldsch
## SelectorEnvelope is the recommended top-level value for serialized messages
## that don't have established existing context with marks the start of a selector:
## it's a single-member union used to kick us towards "nominative typing".
##
## See https://github.com/ipld/go-ipld-prime/blob/0692e3b8cd7f231fe5d9d16a103bbbacb23dbdb5/doc/schema.md#using-schema-match-checking-as-version-detection
## for a background on the theory behind this gentle-nominative concept.
type SelectorEnvelope union {
	| Selector "selector"
} representation keyed

type Selector union {
	| Matcher "."
	| ExploreAll "a"
	| ExploreFields "f" # note "ExplorePath" is a degenerate case of ExploreFields.
	| ExploreIndex "i"
	| ExploreRange "r"
	| ExploreRecursive "R"
	| ExploreUnion "|"
	| ExploreConditional "&"
	| ExploreRecursiveEdge "@" # sentinel value; only valid in some positions.
} representation keyed

## ExploreAll is similar to a `*` -- it traverses all elements of an array,
## or all entries in a map, and applies a next selector to the reached nodes.
type ExploreAll struct {
	next Selector (alias ">")
}

## ExploreFields traverses named fields in a map (or equivalently, struct, if
## traversing on typed/schema nodes) and applies a next selector to the
## reached nodes.
##
## Note that a concept of "ExplorePath" (e.g. "foo/bar/baz") can be represented
## as a set of three nexted ExploreFields selectors, each specifying one field.
## (For this reason, we don't have a special "ExplorePath" feature; use this.)
type ExploreFields struct {
	fields {String:Selector} (alias "f>")
}

## ExploreIndex traverses a specific index in a list, and applies a next
## selector to the reached node.
type ExploreIndex struct {
	index Int (alias "i")
	next Selector (alias ">")
}

## ExploreIndex traverses a list, and for each element in the range specified,
## will apply a next selector to those reached nodes.
type ExploreRange struct {
	start Int (alias "^")
	end Int (alias "$")
	next Selector (alias ">")
}

## ExploreRecursive traverses some structure using fragments of another
## Selector tree; whenever it reaches an ExploreRecursiveEdge marker in the
## Selector tree, it will instead produce another new Selector which is a
## copy of itself, but with a decremented maxDepth parameter.
##
## ExploreRecursive is useful when walking large tree structures.
##
## Be careful when using ExploreRecursive with a large maxDepth parameter;
## it can easily cause very large traversals.
type ExploreRecursive struct {
	sequence Selector (alias ":>")
	maxDepth Int (alias "d")
	stopAt Condition (alias "!") # if a node matches, we won't match it nor explore its children.
}

## ExploreRecursiveEdge is a special sentinel value which is used to mark
## the end of a sequence started by an ExploreRecursive selector: the recursion
## goes back to the initial state of the earlier ExploreRecursive selector,
## and proceeds again (with a decremented maxDepth value).
##
## An ExploreRecursive selector that doesn't contain an ExploreRecursiveEdge
## is nonsensical.  Containing more than one ExploreRecursiveEdge is valid.
## An ExploreRecursiveEdge without an enclosing ExploreRecursive is an error.
type ExploreRecursiveEdge struct {}

## ExploreUnion allows selection to continue with two or more distinct selectors
## while exploring the same tree of data.
##
## ExploreUnion can be used to apply a Matcher on one node (causing it to
## be considered part of a (possibly labelled) result set), while simultaneously
## continuing to explore deeper parts of the tree with another selector,
## for example.
type ExploreUnion list [Selector]

## Note that ExploreConditional versus a Matcher with a Condition are distinct:
## ExploreConditional progresses deeper into a tree;
## whereas a Matcher with a Condition may look deeper to make its decision,
## but returns a match for the node it's on rather any of the deeper values.
type ExploreConditional struct {
	condition Condition (alias "&")
	next Selector (alias ">")
}

## Matcher marks a node to be included in the "result" set.
## (All nodes traversed by a selector are in the "covered" set (which is a.k.a.
## "the merkle proof"); the "result" set is a subset of the "covered" set.)
##
## In libraries using selectors, the "result" set is typically provided to
## some user-specified callback.
##
## A selector tree with only "explore*"-type selectors and no Matcher selectors
## is valid; it will just generate a "covered" set of nodes and no "result" set.
type Matcher struct {
	onlyIf optional Condition # match is true based on position alone if this is not set.
	label optional String # labels can be used to match multiple different structures in one selection.
}

## Condition is expresses a predicate with a boolean result.
##
## Condition clauses are used several places:
##   - in Matcher, to determine if a node is selected.
##   - in ExploreRecursive, to halt exploration.
##   - in ExploreConditional,
##
##
## TODO -- Condition is very skeletal and incomplete.
## The place where Condition appears in other structs is correct;
## the rest of the details inside it are not final nor even completely drafted.
type Condition union {
	# We can come back to this and expand it later...
	# TODO: figure out how to make this recurse correctly, so I can say "hasField{hasField{or{hasValue{1}, hasValue{2}}}}".
	| Condition_HasField "hasField"
	| Condition_HasValue "=" # will need to contain a kinded union, lol.  these conditions are gonna get deep.)
	| Condition_HasKind "%" # will ideally want to refer to the DataModel ReprKind enum...!  will we replicate that here?  don't want to block on cross-schema references, but it's interesting that we've finally found a good example wanting it.
	| Condition_IsLink "/" # will need this so we can use it in recursions to say "stop at CID QmFoo".
	| Condition_GreaterThan "greaterThan"
	| Condition_LessThan "lessThan"
	| Condition_And "and"
	| Condition_Or "or"
	# REVIEW: since we introduced "and" and "or" here, we're getting into dangertown again.  we'll need a "max conditionals limit" (a la 'gas' of some kind) near here.
}
```

Other related work
------------------

- [Selectors package in go-ipld-prime](https://github.com/ipld/go-ipld-prime/tree/master/traversal/selector)
  - [Traversal func which uses Selectors](https://godoc.org/github.com/ipld/go-ipld-prime/traversal#Traverse)
  - note that these are still skeletal PoC implementations and not yet feature-complete
