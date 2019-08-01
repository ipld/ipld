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

An IPLD block should never be interpreted in the context of *anything* not
contained in the block (and CID).

For example, assuming we add support for relative links, the following
definition of `foo` would not be a valid IPLD block:

```
var foo = {
  // points outside of the current block, into the parent's "baz" field.
  "baz": {"/": "../../baz"}
}
var bar = {
  "foo": CidOf(foo),
  // `/foo/baz` points here.
  "baz": "something"
}

// resolution throug block `foo` depends on block `bar`.
Resolve("/ipld/${CidOf(bar)}/foo/baz/")
```

For the same reason, IPLD links can't rely on an authority (e.g., a blockchain).

Note: Links like this can still be encoded at the application level but they
won't be handled by the IPLD resolver (and won't get the special "link" type).

**Motivation:** IPLD needs to be easy to reason about.

**Caveat:**

We *may* want to relax this if we want to move schemas into separate,
deduplicated blocks (referenced by CID). If we do that, we'd need to fetch a
block's schema before being able to interpret the it.

However, we need to *thoroughly* discuss any changes to this requirement.

1. The space savings may not be worth it given the size of CIDs (>40 bytes),
   compression, smart transports, and smart datastores.
2. This change would introduce some weird interface complexities and potential
   network dependencies.

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
