# IPLD Foundational Principles

This document outlines parts of IPLD that should and should not be changed to
ensure the success of future improvements and the continuity of direction.

**Definitions**

* Block: A block is a chunk of an IPLD DAG, encoded in a format.
  Blocks have [CID](./block-layer/CID.md)s.
* Node: A node is a *point* in an IPLD DAG (map, list, number, etc.).
  Many nodes can exist encoded inside one Block.
* Link: A link is a kind of IPLD Node that points to another IPLD Node.
  Links are what make IPLD data a DAG rather than only a tree.
  Links are content-addressable -- see [CID](./block-layer/CID.md).
* Path Segment: A path segment is a piece of information that describes a move
  from one Node to a directly connected child Node.  (In other words, a
  Path Segment is either a map key or a list index.)
* Path: A path is composed of Path Segments, thereby describing a traversal
  from one Node to another Node somewhere deeper in the DAG.

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

## Multicodecs Are Not Meant to Act As Types

Multicodecs are used to indicate the format of data in a Block, and thus the
codec which transforms that serial data into a tree of Nodes conforming to the
[IPLD Data Model](./data-model-layer/data-model.md).  This is the limit of
their purpose.

In particular, multicodecs should not be confused with a
[type system](https://en.wikipedia.org/wiki/Type_system).

**Motivation:** Since it is impossible to understand data at a *structural*
level without knowing the format, we use multicodecs describe the format.
With this information, we handle the transformation into the IPLD Data Model.
Beyond this, we don't want to use multicodecs further, because we should avoid
introducing new formats unnecessarily: *every* IPLD implementation needs to
support these new formats, and this is a burden it's preferable to minimize.

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
   *between* hash-linked blocks. Allowing link cycles on one level (e.g., in
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

### Higher Level Pathing

The "stable pathing" rule holds at the Data Model layer.
Some higher-level layers refine the rule.

For example, Advanced Data Layouts work by operating like an IPLD Node which
conforms with the Data Model specified behaviors in every way -- except that
they're internally implemented in some way that maps the Node content onto
Blocks in a more advanced way than the basic Data Model way.  This means we
can "path" across an Advanced Data Layout that acts like a map or a list as
if it's a regular Node.  We still aim for stable pathing: however, at this
layer, that stability now requires a fixed understanding of the Advanced Layout
logic itself.

Schemas describe data in terms of both semantic types and a representation
strategy, and in some cases the semantic type information contains a name
(such as a struct field name) even while the representation does not (such as
when a struct uses "tuple" representation, causing it to be transformed into
a list rather than a map when encoded).  In these cases, we can "path" across
data interpreted in context of a Schema using the field names, even if at the
Data Model layer it's been represented as a list (and thus has indexes instead
of map keys corresponding to the field names).  This kind of pathing can be
stable and predictable, but (as with the Advanced Data Layouts story), it
requires slightly more information: holding the Schema declaration.

**Motivation**: Different views onto data is a powerful and useful primitive.

More concretely, we can observe that some of the earliest examples of systems
built with IPLD's concepts immediately introduced higher-level pathing: for
example, IPFS's UnixFS.  Such concept of pathing, built a layer above the core
IPLD Data Model, has provided large amounts of value to applications.
Recognizing this, we seek to offer some components of IPLD which make it easy
to do these kind of constructions, but in a way that's reusable, and also fits
well with our principles of stability and predictability.

**Remaining true to principles**: Note that regular, core Data Model still
maintains stable pathing -- this is not compromised by higher level systems
which use additional rules and operate with additional context!  Falling back
to the core Data Model stable pathing is *always* possible on any data.

Even in higher level pathing: we still aim for stability, predictability, and
deterministic outcomes.  While more contextual information is required for
these higher level pathing modes, all of that information is by design easy
to immutably snapshot and address in the same ways we link other IPLD data.

## Link Transparent Pathing

Path resolution must transparently traverse links.

**Motivation:** Deduplication and composability. If links are *not* transparent,
programmers will have to either make many small objects (lots of hashing) or
inline data into large objects (lots of duplication and copying).

## Primitives

The "recommended" IPLD format (currently DAG-CBOR) needs to support *at a minimum*:

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
