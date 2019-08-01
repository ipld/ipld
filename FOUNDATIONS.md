# IPLD Foundational Principles

This document outlines parts of IPLD that should and should not be changed to
ensure the success of future improvements (especially type systems).

**Definitions**

* Block: A block is a chunk of an IPLD DAG, encoded in a format. Blocks have CIDs.
* Fragment: A piece of an IPLD DAG. Blocks contain fragments.
* Node: A node is a *point* in an IPLD DAG (object, array, number, etc.).
* Link: A link is an IPLD Node that points to another IPLD Node.
* Path: A paths a human readable pointer to an IPLD Node.

## Linked

IPLD must support linking to any IPLD node (even if the node is in the middle of
a block). That is, IPLD must support arbitrary IPLD paths in links.

**Motivation:** Considering this in the context of programming languages, not
being able to *store* a pointer to a struct *inside* of another struct would be
severely limiting.

NOTE: We don't currently support arbitrary paths but, in the context of
programming, we really need to.

## Immutable

IPLD links must be immutable. We'll likely define a mutable link spec on top of
IPLD but there needs to be an immutable layer at the bottom.

**Motivation:** *Having* an immutable layer is important for a lot of analysis,
memoization, type checking, etc.

## Multicodecs Are Not Types

It's impossible to understand IPLD data at a *structural* level if we don't know
the format. Therefore, we should avoid introducing new formats unnecessarily as
*every* IPLD implementation needs to support these new formats.

## No Non-Local Reasoning

Transforming content of a Block into Nodes conforming to the IPLD
[Data Model](./data-model-layer/data-model.md) should never require
interpretation in the context of anything not contained in the Block plus CID.

Similarly, traversing an IPLD Node according to a Path should not require
interpretation in the context of anything not already contained in that Node plus Path.

**Motivation:** IPLD needs to be easy to reason about.  Systems which use
nonlocal reasoning become harder to reason about, and much harder (if not
impossible) to compose smoothly or with predictable results; therefore we
should avoid this.

**Negative Examples:**

```javascript
// This is an example of what is NOT possible.
var foo = {
  "baz": Link("../../zot") // NOT legal: makes a non-local reference.
}
var bar = {
  "foo": CidOf(foo),
  "zot": "something" // `./foo/baz` imagines pointing here.
}

// resolution through block `foo` depends on block `bar`...
Resolve("/ipld/${CidOf(bar)}/foo/baz/")

// meaning this would be undefined, which is why relative links are NOT allowed:
Resolve("/ipld/${CidOf(foo)}/baz/")
```

For the same reason, IPLD links can't rely on an authority (e.g., a blockchain).

**Note:** Concepts that seem similar to relative linking can still be encoded
at the application level.  This is fine, but distinct from "IPLD Links", because
such linking won't be interpreted by IPLD path and link resolution (e.g. they
won't get the special "link" type, and won't violate the constraints that the
IPLD Data Model expresses a DAG, etc).

### Moving beyond local reasoning

The "no non-local reasoning" rule holds at the Data Model layer.
Some higher-level layers relax the rule.

For example, Advanced Data Layouts which split data across multiple blocks
defacto carry some logical information in mind as they wield their constituent
blocks (jumping into a HAMT mid-way through its trie with no context is unlikely
to make any semantic sense, for example -- even though the data can still be
parsed in terms of the Data Model).

Schemas describe constraints around data and are typically applied over
a whole DAG which may span multiple Blocks, and are themselves usually
located in another Block (for ease of reference by CID).  Schemas thus also
can be seen as using some forms of non-local reasoning.

Applications built on top of IPLD can also use their own contextual reasoning,
as described earlier in the relative linking example.

**Motivation**: Systems like HAMTs and Schemas are important to our goals in
having good tooling in the ecosystem; both of these depend on some forms of
reasoning which take context and apply it in addition to what's available
strictly at the Data Model level.

**Remaining true to principles**: though we're refining the rules in this section,
these are not contradictions of the "no non-local reasoning" rule; it's just
relaxed for these high-level systems, in that the scope of "local" can be
understood more broadly.

Since we can always interpret block structurally (e.g., parse them at least to
the Data Model layer) -- even in data that's also meant to be used with
Advanced Data Layouts or Schemas other application logic that uses contextual
concepts, etc -- we can still have replication and hashing and DAG traversal
and all the rest of the important promises of the IPLD Data Model regardless of
that other context, meaning these systems are purely value-add and do not
compromise any of the other core promises of IPLD.

## No Cycles

IPLD links must not be cyclic, even if we add support for relative links.

**Motivation:**

1. Security: Forbidding link cycles ensures that any graph traversal terminates.
   This makes it easier to correctly and securely implement some graph
   algorithms, even on potentially untrusted data in a distributed system.
2. Consistency: Without complex hacks, it's impossible to create link cycles
   *between* hash-linked blocks. Allowing link cycles one one level (e.g., in
   relative links within a single block) but not on a larger scale (between
   blocks) is inconsistent (even though there's nothing we can do about it).

## Stable Pathing

An IPLD path always means the same thing, everywhere, every time. Importantly,
users shouldn't be able to configure their IPLD library to change how path
resolution works. They should be able to use alternative path resolution
algorithms for *non*-IPLD paths (e.g., IPFS paths) but those should be built
on top of IPLD.

**Motivation:** Deterministic computations on top of a IPLD need to produce the
same result every time.

## Link Transparent Pathing

Path resolution must transparently traverse links.

**Motivation:** Deduplication and composability. If links are *not* transparent,
programmers will have to either make many small objects (lots of hashing) or
inline data into large objects (lots of duplication and copying).

## Primitives

The "recommended" IPLD format (currently DagCBOR) needs to support *at a minimum*:

* 32/64 bit integers without losing information.
* 32/64 bit floats without losing information.
* Unicode strings.
* Binary strings.
* Objects (with string keys, at least).
* Arrays.
* Booleans.
* A bottom type (null).

**Motivation:** Convenience, really.

## Non-Cyclic, Block-Local Relative Links

That is, relative links that don't traverse out the back of an object. See the
conclusions from: [#1](https://github.com/ipld/specs/issues/1).

**Motivation:** This is required to efficiently represent a highly connected DAG
of tiny nodes.

**Caveat:** This brings in some sticky issues around mutability. Depending on
the implementation, relative links within an object may be act like mutable
links (from the perspective of the user). The concern here is that we don't want
users to bundle nodes together into single block *because* they want this
mutability.

# To Do

Working through this, I realized we have a few things we really need to finish a few things before we can
call IPLD ready.

* **Path links.** Pointers that can only point to objects at block boundaries
  are useful but severely gimped. We've been fine up till now because we
  generally don't *edit* complicated datastructures but this will change.
  ([#83](https://github.com/ipld/specs/issues/83))
* **Slice links.** For the same reason, we really should support
  `/ipld/QmID/start..stop` as a syntax for slicing an array. Most programming
  languages support this so *not* supporting it would be a bit awkward.
  ([#84](https://github.com/ipld/specs/issues/84))
* **Link Spec.** We need to specify a complete and formal link spec and stick
  with it.
* **Relative Links.** [#1](https://github.com/ipld/specs/issues/1).
