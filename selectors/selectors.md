Specification: IPLD Selectors
=============================

**Status: Prescriptive - Draft**


Introduction
------------

### Motivation - what are Selectors?

*Prerequisites: [IPLD](https://github.com/ipld/ipld), IPLD data model, [CID](https://github.com/ipld/cid).*

IPLD Selectors are expressions that identify ("select") a subset of nodes in an IPLD dag.

This is a useful primitive to use along with: (a) systems that require distributing or pinning dags (IPFS, Filecoin, bitswap, graphsync, ipfs-cluster), (b) applications that require fetching subsets of data in specific orders or at specific times (video players, dataset viewers, file systems), (c) programs that transform graphs into other graphs (data transformations, ETL, etc). In short, it is a fundamental primitive required by most systems and applications in the IPLD and IPFS ecosystems, as important as [multihash](https://github.com/multiformats/multihash), [CIDs](https://github.com/ipld/cid), [IPLD Formats](https://github.com/ipld/), and more.

![](./selectors.jpg)

(Note: syntaxes in the image are for quick understanding, but are not literal selector syntaxes (yet; we have an extension pathway).)


Specification
-------------

Selectors are defined by an "AST" (Abstract Syntax Tree) which is itself
specified in IPLD, and uses IPLD Schemas for clarity.

Implementations of Selectors read this "AST" and evaluate its instructions to
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
## See https://github.com/ipld/specs/tree/master/schemas/migration.md
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

## ExploreIndex traverses a list, and for each element in the range specified,
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
## ExploreRecursive selector, but with a decremented maxDepth parameter, and
## continues evaluation thusly.
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
## Be careful when using ExploreRecursive with a large maxDepth parameter;
## it can easily cause very large traversals (especially if used in combination
## with selectors like ExploreAll inside the sequence).
type ExploreRecursive struct {
	sequence Selector (rename ":>")
	maxDepth Int (rename "d")
	stopAt optional Condition (rename "!") # if a node matches, we won't match it nor explore its children.
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
	condition Condition (rename "&")
	next Selector (rename ">")
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


Known issues
------------

- Note that the status of this document is "Draft"!
- The "Condition" system is not fully specified -- it is a placeholder awaiting further design.


Other related work
------------------

### Implementations

- [Selectors package in go-ipld-prime](https://github.com/ipld/go-ipld-prime/tree/master/traversal/selector)
  - [Traversal func which uses Selectors](https://godoc.org/github.com/ipld/go-ipld-prime/traversal#Traverse)
  - note that these are still skeletal PoC implementations and not yet feature-complete

### Design History

- See [Selector Design Goals](../design/history/exploration-reports/2018.10-selectors-design-goals.md) (2018).
