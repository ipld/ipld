---
title: "Specs: Selectors"
navTitle: "Selectors"
eleventyNavigation:
  order: 60
  synopsys: "Selectors are a declarative API for describing walks across IPLD data."
---

Selectors
=========

Introduction
------------

### What are Selectors?

:::info
You'll want to read up on the [IPLD Data Model](/docs/data-model/) first, before learning about Selectors.
:::

IPLD Selectors are expressions that describe a traversal over an IPLD dag,
and mark ("select") a subset of nodes during that walk.

You can think of Selectors as roughly like regexps for textual data, but made for IPLD graphs.

This is a useful primitive to use along with: (a) systems that require distributing or pinning dags (IPFS, Filecoin, bitswap, graphsync, ipfs-cluster)
(b) applications that require fetching subsets of data in specific orders or at specific times (video players, dataset viewers, file systems),
(c) programs that transform graphs into other graphs (data transformations, ETL, etc).


Specification
-------------

Selectors are defined by an "DMT" (Data Model Tree -- similar to the concept of Abstract Syntax Tree, but syntax-agnostic)
which is itself specified in IPLD, and uses IPLD Schemas for clarity.

Implementations of Selectors read this "DMT" and evaluate its instructions to
traverse a graph, and select nodes in it.


### Schema

This code block describes Selectors using [IPLD Schemas](../schemas/) syntax.

Descriptions of how each node should be evaluated can be found in comments
inline in the schema.

```ipldsch
## SelectorEnvelope is the recommended top-level value for serialized messages
## that don't have established existing context with marks the start of a selector:
## it's a single-member union used to kick us towards "nominative typing".
##
## See https://ipld.io/docs/schemas/using/migrations/
## for a background on the theory behind this gentle-nominative concept.
type SelectorEnvelope union {
	| Selector "selector"
} representation keyed

type Selector union {
	| Matcher "."
	| ExploreAll "a"
	| ExploreFields "f"
	| ExploreIndex "i"
	| ExploreRange "r"
	| ExploreRecursive "R"
	| ExploreUnion "|"
	| ExploreConditional "&"
	| ExploreRecursiveEdge "@" # sentinel value; only valid in some positions.
	| InterpretAs "~"
} representation keyed

## ExploreAll is similar to a `*` -- it traverses all elements of an array,
## or all entries in a map, and applies a next selector to the reached nodes.
type ExploreAll struct {
	next Selector (rename ">")
}

## ExploreFields traverses named fields in a map (or equivalently, struct, if
## traversing on typed/schema nodes) and applies a next selector to the
## reached nodes.
##
## Note that a concept of exploring a whole path (e.g. "foo/bar/baz") can be
## represented as a set of three nexted ExploreFields selectors, each
## specifying one field.
type ExploreFields struct {
	fields {String:Selector} (rename "f>")
}

## ExploreIndex traverses a specific index in a list, and applies a next
## selector to the reached node.
type ExploreIndex struct {
	index Int (rename "i")
	next Selector (rename ">")
}

## ExploreRange traverses a list, and for each element in the range specified,
## will apply a next selector to those reached nodes.
type ExploreRange struct {
	start Int (rename "^")
	end Int (rename "$")
	next Selector (rename ">")
}

## ExploreRecursive traverses some structure recursively.
## To guide this exploration, it uses a "sequence", which is another Selector
## tree; some leaf node in this sequence should contain an ExploreRecursiveEdge
## selector, which denotes the place recursion should occur.
##
## In implementation, whenever evaluation reaches an ExploreRecursiveEdge marker
## in the recursion sequence's Selector tree, the implementation logically
## produces another new Selector which is a copy of the original
## ExploreRecursive selector, but with a decremented depth parameter for limit
## (if limit is of type depth), and continues evaluation thusly.
##
## It is not valid for an ExploreRecursive selector's sequence to contain
## no instances of ExploreRecursiveEdge; it *is* valid for it to contain
## more than one ExploreRecursiveEdge.
##
## ExploreRecursive can contain a nested ExploreRecursive!
## This is comparable to a nested for-loop.
## In these cases, any ExploreRecursiveEdge instance always refers to the
## nearest parent ExploreRecursive (in other words, ExploreRecursiveEdge can
## be thought of like the 'continue' statement, or end of a for-loop body;
## it is *not* a 'goto' statement).
##
## Be careful when using ExploreRecursive with a large depth limit parameter;
## it can easily cause very large traversals (especially if used in combination
## with selectors like ExploreAll inside the sequence).
##
## limit is a union type -- it can have an integer depth value (key "depth") or
## no value (key "none"). If limit has no value it is up to the
## implementation library using selectors to identify an appropriate max depth
## as necessary so that recursion is not infinite.
##
## stopAt specifies a Condition that stops the traversal when it is fulfilled.
## If throughout the traversal the selector encounters a node that matches
## Condition it will finish exploring the current node and it won't recurse more,
## stopping the traversal immediately.
## If Condition is never matched, the selector performs the traversal seamlessly
## until the end. This feature is of particular interest for applications that need to
## recurse a large linked structure up to a specific point. stopAt can be used to
## let the selector know where to stop recursing preventing from having to traverse
## the full structure.
type ExploreRecursive struct {
	sequence Selector (rename ":>")
	limit RecursionLimit (rename "l")
	stopAt optional Condition (rename "!") # if a node matches, we won't match it nor explore its children.
}

type RecursionLimit union {
	| RecursionLimit_None "none"
	| RecursionLimit_Depth "depth"
} representation keyed

type RecursionLimit_None struct {}
type RecursionLimit_Depth int

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
type ExploreUnion [Selector]

## Note that ExploreConditional versus a Matcher with a Condition are distinct:
## ExploreConditional progresses deeper into a tree;
## whereas a Matcher with a Condition may look deeper to make its decision,
## but returns a match for the node it's on rather any of the deeper values.
type ExploreConditional struct {
	condition Condition (rename "&")
	next Selector (rename ">")
}

## InterpretAs is a clause that instructs the traversal to attempt to 'reify' the current node
## using an ADL, which is specified by the 'as' field.
## ADLs are identified by agreed-upon strings, similar to libp2p protocols.
## Once reified, the traversal continues upon the newly reified view of the data,
## rather than the original raw data.
##
## If the selection interpreter doesn't have an ADL implementation available
## by the name requested, the traversal cannot continue.
##
## The reification process may consume a data-dependent amount of budget on evaluation,
## based on the specific traversal and ADL implementation.
## Similarly, steps across the ADL once reified may also consume data-dependent
## amounts of any resource budgets.
type InterpretAs struct {
	as String
	next Selector (rename ">")
}

## Slice is a predicate that selects only a subset of node.
## This is applicable primarily in the context of reified nodes based on the
## InterpetAs clause above, where the primitive (bytes or string) node is
## actually composed from multiple underlying substrate nodes.
##
## The slice is specified by a "from" index, which is inclusive, and a "to"
## index, which is exclusive. That is: [from, to).
##
##  * Overflow of "to" is allowed, in which case a reified node
##    implementation should interpret the overflow as the end of the slice. This
##    allows for a simple way to specify a slice from a particular index to the
##    end of the slice, without needing to know the length of the slice.
##
##  * Negative values are allowed for "from" and "to", and are interpreted as
##    offsets from the end of the slice. e.g. -1 is the last element, -2 is the
##    second to last, etc. When a negative "from" value resolves to a negative
##    index once the length of the slice is known (i.e. an underflow), the
##    "from" value will be adjusted to be 0.
##
##    Reified node implementations may choose to not implement negative ranges
##    due to difficulties in implementing them efficiently. In these cases, the
##    selector will fail to match.
##
##  * Where the from:to range fails to match within the byte range of the node,
##    (e.g. where they select a range beyond the end of the node), or where they
##    resolve to a negative, or zero-length range (from>=to), the selector will
##    fail to match. However, in the case where from==to, the selector will
##    match, but the node should be empty.
type Slice struct {
	from Int (rename "[")
	to Int (rename "]")
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
	subset optional Slice # if set, only the subset of the node specified by the slice is matched.
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
} representation keyed
```

### fixtures

- [selector-fixtures-1](./fixtures/selector-fixtures-1/)


Known issues
------------

- The "Condition" system is not fully specified -- it is a placeholder awaiting further design.
- The limit systems around recursion are primitive, and more like advisories than any kind of security feature.  Subsequent recursions can always start over with new limits.


Other related work
------------------

### Implementations

- [Selectors package in go-ipld-prime](https://github.com/ipld/go-ipld-prime/tree/master/traversal/selector)
  - [Traversal func which uses Selectors](https://godoc.org/github.com/ipld/go-ipld-prime/traversal#Traverse)
