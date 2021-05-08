Nodes and Kinds
===============

**Preface: purpose of this document:**

This document is intended for developers of new (or renovating) IPLD libraries.
It contains design suggestions based on the experience of building (and rebuilding)
IPLD libraries in various languages, and reflecting on the lessons learned.
It also contains both notes on practical limitations we've found for implementations,
and reflections on how to express things clearly within the type systems of the
host language a library is implemented in (whatever that may be).

**Preface: limitations of this document:**

Since this document is aimed at _new libraries_, it's also implicitly expecting
that the new library might be in a _new language_.
We can't presume to know precisely what that language will enable or encourage!
Therefore, there will be limits to how transferable the advice in this document may be.
We do expect that the best way to express IPLD concepts may vary based on
the language a library is created in.  We accept this and try to write this
document anyway, and make it as useful as it can be.

These guidelines are written with particular attention to the limitations that
are typical to strongly typed languages. (Some of the phrasing used reflect
this -- we refer to "types", "enumerations", "interfaces", "packages", etc.
However, these concepts can still translate even to languages with varying
amounts of compile-time type checking, and indeed even to those with none.
While the concepts are certainly not identical across all languages,
we hope that they're close enough to be meaningful to a thoughtful reader.)

We expect that common concepts for IPLD libraries will emerge across many languages,
and hope that some vocabulary for these concepts is something we can share.
Loosely and untyped languages may need to interpret these guidelines
appropriately while extracting the key concepts; but even among languages with
stricter concepts of compile-time type checking, the meaning of "interface"
can vary greatly -- _all_ readers will need to be ready to use their best judgement.

---

Cornerstone Types
=================

Your IPLD library should have two cornerstone types:

1. `Node`;
2. `Kind`.

`Node` should be an interface -- the membership should be open
(aka, it should be possible for other packages to implement it).

`Kind` should be an enumeration -- a fixed set of named members,
which should not be extendable.


Kind
----

`Kind` maps very directly onto the definition of
[Data Model Kinds](/docs/data-model/kinds/).

`Kind` does not include the Schema layer's concept of "struct", etc.

`Kind` must be an enum, **and not a sum type**.  Attempting to implement
kind as a sum type conflates it with `Node`.
(This may be tempting to try to combine `Kind` and `Node` into a single
sum type definition if you're only looking at the Data Model layer,
but it is a mistake: both Schema types and Advanced Layouts require
the ability to add more implementations of `Node`, so this conflation
will cause cataclysmic problems and force a painful refactor
as soon as you get to implementing those systems.
See the [different implementors of Node](#different-implementors-of-node)
section, later in this document, for more information on this.)


Node
----

`Node` is a monomorphized interface for handling data -- in other words,
we make all data look and act like a `Node`, so that we can write all of our
functions against the `Node` interface, and have that work for any sort of data.

`Node` has functions for examining any of the
[Data Model Kinds](/docs/data-model/kinds/).
For example, this means `Node` must be able to
do a key lookup for a map kind,
provide an iterator for a list kind,
or be convertible to a primitive if it's a integer kind.

`Node` is generally implemented by making an interface with the superset of all
these methods needed for the various kinds of data.
Some programming languages may also have a pattern-matching faculty which
may make this nicer; feel free to use it (but mind the caveats issued in the
[Kind](#kind) section above, and the
[different implementors of Node](#different-implementors-of-node) section below:
the membership of `Node` must remain *open*;
you do *not* want to use a sum type with a closed list of concrete members here,
or it will cause other roadblocks later that *will* force a redesign).
For languages where this is most straightforwardly implemented by a single
interface containing the superset of all necessary methods, many of the methods
will error if the `Node` refers to information of the wrong kind for that method;
this is fine.

`Node` should be clear about what sets of methods are valid for acting on it.
Typically, this is done by a `Node.Kind()` method, which should return
a member of the [Kind](#kind) enum.
This information is useful for anyone writing functions which use the `Node`
interface, because it's much more pleasant (and fast) to check the Kind and
know which methods can be expected to work than it is to have to probe every
method individually for failure.
(Again, programming languages with pattern-matching faculties may find
a cleverer way for their compiler and type system to support this.)

### different implementors of Node

Though the methods on the `Node` interface are defined as those necessary for
examining data of the [Data Model Kinds](/docs/data-model/kinds/),
**`Node` is not only implemented by the Data Model**:

- Yes, `Node` is implemented by types that just hold basic Data Model info;
- `Node` is also implemented by [Advanced Data Layouts](/docs/advanced-data-layouts/) ---
	- consider a HAMT that spans many separately-serialized chunks of data; it should still be usable as if it's a regular map.
- `Node` is also implemented by [Schema-typed Nodes](/docs/schemas/) --
	- Both if implemented by a single implementation that evaluates rules at runtime (so, finite count of implementing types and known at core library compile time)...
	- or if handled by codegen/macros (unknown count / open set of implementors of `Node`; not known at core library compile time; may be created in other packages that import the core, rather than core importing them!).

Even further, some libraries may choose to make even more various
implementations of `Node` for optimizing performance of specific tasks:
for example, a `Node` which implements basic Data Model "map" semantics,
but using some internal algorithm for memory layout which is known to be
efficient for certain workloads;
or for another example, a `Node` which is particularly efficient for handling
data of one particular serialization codec, and keeps a lazy-loading skip-tree
over the serialized bytes.
Clearly, neither of these should be the default implementation a library uses,
but clearly, both of them should be able to be used transparently,

With all seven (?! indeed, *seven*) of these different stories,
we can consider it conclusive that the `Node` interface should be ready
to support many, many diverse implementors.

### a default implementation of Node

As an IPLD library author, you may be tempted to make a single, "default"
implementation of `Node`.

Feel free to do so; but be cautious of giving it special privileges.
Try implementing it in a separate package from your core interfaces: this will
be a good exercise to make sure other implementations can later do the same.
(Since in the order of things you'll do when implementing a new IPLD library,
creating this basic default node implementation is likely quite early,
going about it in such a way that it forces design choices you'll need later
anyway will save you from potentially discovering the need for some costly
refactors later!)


Nodes vs NodeBuilders
---------------------

If you choose to pursue a distinction between mutable and immutable data
in the design of your library, it may be useful to create two separate
interfaces for each phase of the data's lifecycle.
These might be called "Node" (for the immutable data)
and "NodeBuilder" (for the mutating/building phase of the data's life).

It is not necessary to have distinct interfaces for this;
a library can also opt to have a mutable concept of "node".
Immutable interfaces can be particularly well-suited to IPLD data, though;
it's worth considering them.


Higher level functions
----------------------

Almost all features should be implemented to take `Node` arguments,
and return `Node` values.

Traversals and walks can be implemented in this way: e.g.
`function walk(start Node, visitorFn func(visited Node))`.

Selectors can be implemented in this way.
(Continue with the idea above for traversals.)

Transformations can be implemented in this way.
(Continue with the idea above for traversals.)

Codecs themselves can be implemented this way:
marshalling is a traverse over nodes, so `func marshal(obj Node) -> bytes`,
and unmarshalling is something like `func unmarshal(bytes, NodeBuilder) -> Node`.

(Note that if your library has a `Node`/`NodeBuilder` split for immutability purposes,
then of course any operation that builds new nodes,
such as transformations or codecs during unmarshalling,
will have a `NodeBuilder` parameter.
If your library has a mutable `Node`, these function signatures might appear differently.)

By defining all these functions in terms of `Node`, they can be used the same
in any of the various contexts described in the
[different implementors of Node](#different-implementors-of-node) section:

- traversals/selectors/transforms/etc work over various codecs (trivially,
	by transitive property).
- traversals/selectors/transforms/etc work regardless of in-memory layouts
	that may vary per `Node` implementation
- traversals/selectors/transforms/etc work transparently over ADLs!
- traversals/selectors/transforms/etc work transparently over schemas!

It is also useful to note that by implementing these features over the `Node`
interface, rather than *in* the `Node` interface, it becomes much more
possible to implement various kinds of e.g. traversal library
(perhaps you'll discover two different ways to go about it,
one with better ergonomics, and one with better performance?);
and it also requires much less code per `Node` implementation if things
like traversals are implemented from the outside.
