# IPLD Selectors

This document is a designdoc for IPLD Selectors.

## [Meta: Status of this doc]

- This was written around 2018-10-16 ([video presentation](https://drive.google.com/file/d/1NbbVxZQFKXwW6mdodxgTaftsI8eID-c1/view))
- It narrows down the decision space enough to make significant progress.
- good enough for trying out an implementation to learn more and make choices.
- But it is not complete.
- some choices that need to be made:
  - [ ] select general binary and string format structure for selectors. (options given here)
  - [ ] binary and string formats for each selector. doesn't have to be here.
  - [ ] whether to dump all selector codes into multicodec table, or one code.
  - [ ] which S expression selector variant to use (may be out of scope for this doc)
- more prose here may help implementors.

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
> - How can we agree with multiple other parties who will pin or send subets of a dag? (ipfs-cluster, graphsync)

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


## Selector Types

Selectors have multiple types

```
<selector-code> <selector-string-code> <selector-type>
0, null, selects the empty set
1, cid, selects a specific cid
2, path, selects an ipld path
3, glob, selects a unix-style glob
4, multi, combines multiple selectors
5, css, selects in css style
6, git, selects with git tilde notation
7, bitfield, selects all the nodes expressed in a bitfield
```

**TODO**: put selectors into the grand magnificent global universal multicodec table...

### Cid Selector

This is a basic selector, that means exactly a single CID, and thus a single graph node. Nothing more.

```go
// Binary: <selector-code><length><cid-selector-code><binary-cid>
//     or: <cid-selector-code><binary-cid>
// String: /sel/cid/<multibase-encoded-cid>
type CidSelector struct {
  Cid Cid // el cid
}
```

### Path Selector

This is a selector w/ a path. Absolute ones must start with a CID

```go
// Binary: <selector-code><length><path-selector-code><binary-cid><binary-path>
//     or: <path-selector-code><length><binary-path>
// String: /sel/path/<multibase-encoded-cid>/a/b/c/d/...
type PathSelector struct {
  Path Path
}
```

### Glob Selector

This is a selector with a [unix shell glob](https://en.wikipedia.org/wiki/Glob_(programming)) style thing. Absolute ones must start with a CID. It supports the following syntax:

- `*` - means any number of single characters, except `/` -- ie matches any link within a level (as in shell `*`)
- `**` - means any decendant (as in shell `**`)
- `?` - matches any single character
- `{abc,def}` - means either `abc` or `def`
- [abc] - matches one character in the bracket set.
- [a-z] - matches one character from the (locale-dependent) range given in the bracket.

```go
// Binary: <selector-code><length><glob-selector-code><binary-cid><binary-path>
//     or: <glob-selector-code><length><binary-path>
// String: /sel/path/<multibase-encoded-cid>/a/*/**
type GlobSelector struct {
    Glob Path
}
```

### Multi Selector

This is a selector that combines other selectors. It is a set expression.

- `union` ($$ A \cup B $$) - takes all nodes expressed by either selectors (A _or_ B)
- `intersection` ($$ A \cap B $$) - takes all nodes expressed by both selectors (A _and_ B)
- `difference` ($$ A - B $$) - takes all nodes expressed in A, except those expressed in B (A *except* B)

```go
// Binary: <selector-code><length><multi-selector-code><sel-sexp>
//     or: <multi-selector-code><length><sel-sexp>
// String: /sel/multi/(string sel sexp)
//       no can do
type MultiSelector struct {
  Op   Operator
    Sels []Selector
}

type Operator int
const (
  OpUnion        Operator = 1
    OpIntersection Operator = 2
    OpDifference   Operator = 3
)
```

#### Selector S-expressions (`sel-sexp`)

[S-expressions](https://en.wikipedia.org/wiki/S-expression) are a simple way to combine objects into nested expressions. We define this in order to have Multi Selectors. A selector s-expression (`sel-sexp`) is defined as follows.

Option 1 - simpler, need to nest another multiselector to nest another expression (this seems better).

```
<sel-sexp>  ::= <varint-2+><operator>(<selector>)+
```

Option 2: more complicated at the `sel-sexp` level, but avoids having to embed the multiselector preamble.

```
<sel-sexp>  ::= <varint-0> |
                <varint-1><selector> |
                <varint-2+><operator>(<sel-sexp>)+

<operator>  ::= 1 (union) | 2 (intersection) | 3 (difference)
<varint-0>  ::= 0
<varint-1>  ::= 1
<varint-2+> ::= 2 or more (in a varint)
```

## IPLD Interfaces in Go with Selectors

This section presents a set of possible interfaces in Go, using IPLD dags and selectors. The main purpose of this example is to show how the Selector interfaces might work in practice.

```go
const (
    // ErrNotFound is returned when an object is not found at a particular dag.
    ErrNotFound = errors.New("not found")

    // ErrInvalidPath is returned when a path is not
    ErrInvalidPath = errors.New("invalid path")
)

// DAG is an object that provides access to an entire IPLD dag.
// It provides a handle to a set of data, all of which is rooted at one
// node (the Root).
// The interface is very simple, it only provides the Root, GetNode to retrieve
// any sub-object by path, and Traverse, to use in algorithms that need to
// sub-select or visit the entire dag.
// This could be entirely in memory, lazy-loaded, backed by a DagService,
// or be a proxy to a remote dag.
type DAG interface {
    // Root returns the Path of the ipld node that is the root of this DAG
    // We return the Path to avoid returning an error, as returning
    // the node itself may fail.
    Root() Path

    // GetNode returns an object identified by path.
    // Path may be absolute (start with a CID), or relative (from the root),
    // similar to how directories work in Unix filesystems.
    // Either way, the node returned MUST be a descendant of Root().
    // rest is the remainder if the Path, if any is left. if rest is not empty,
    // then err is not nil (ErrInvalidPath or ErrNotFound).
    // The return error may be ErrNotFound, ErrInvalidPath, or errors
    // propagated from underlying systems.
    GetNode(path Path) (n Node, rest Path, err error)

    // Traverse returns a Traverser object to walk through this whole Dag.
    // See the Traverser documentation for how to use it.
    Traverse() Traverser
}


// Traverser is an object that traverses a particular dag. Think of it like
// an iterator over the whole dag. This object is in principle similar to
// traversals like os.Walk, to iterators in c++/rust, to generators in Python,
// etc.
//
// The implementation of a traverser is highly Dag depenedent, thus usually
// an implementation of Dag will have a specific Traverser associated with it.
//
// Traversers support filtering via selectors, which is an important feature.
// Instead of requiring wrapping/nesting traversers (expensive), we allow
// filtering a single traverser with multiple selectors instead (much cheaper).
// This allows the logic of checking whether to consider a node to be applied
// efficiently, ideally before the node is fetched.
//
// TODO:
// - address skipping links, as in os.Walk. Maybe turn into a walk function.
// - return only the Path, not the node (avoid retrieving it if not needed?).
//   this is similar to how os.Walk works.
type Traverser interface {
  // Next returns the next node visited by this Traverser
  Next() (Path, Node, error)

  // Filter adds a new selector to filter the nodes the Traverser will return
  Filter(sel Selector)
}

// Selector is an object that expresses a sub-selection on a graph.
//
// For a more complete articulation of selectiors, read the IPLD selector
// design document.
//
// Note that selectors have different types, and each type will need its
// own Go object. User code should use the selector interface and avoid
// assuming a specific type of selector. Types are identified using a code,
// agreed upon in the multicodec table.
//
// The selector interface in Go is a simple construct that enables reducing
// a dag to a subset represented in a concise selector expression. All it
// does is check whether a path is included in the selector (IncludesPath).
// Using this, other objects (like the Traverser) can reduce a Dag to only
// the subdag represented by the selector.
//
// Important note: selectors select a subdag that is also connected to the
// same dag root. Whatever nodes are selected by the selector must
// include paths going all the way back to the root. There are no nodes
// selected that are disconnected from the root -- at least one of their parents
// (linked-from relationship) must also be selected.
//
// Serialization
// - Selectors have both string and binary representations. These are canonical
//   and can be used in a variety of places.
// - The binary representation should be used in memory, on the wire, on disk, etc.
// - The string representation should be used whenever a selector is shown to the
//   user, or when the user is inputting a selector. It can also be used in other
//   formats that aim to have high human readability (eg package.json, etc).
type Selector interface {
    // IncludesPath returns whether path p is included in this selector,
    // as applied to dag d.
    //
    // d is necessary in order to have a handle to the
    // whole dag. Selector objects themselves should be cheap and not
    // link to huge amounts of data.
    IncludesPath(d Dag, p Path) bool

    // IsAbsolute returns whether the selector is absolute (rooted at a specific
    // cid in the serialized expression) or not. If it's not, it is relative,
    // which means there is no cid in the expression, and thus the selector
    // root is the root of the dag it is applied to. Intuitively, this works
    // exactly the same as shell globs in unix filesystems:
    // - Absolute: /foo/bar/baz/**/*  -> <root-cid>/bar/baz/**/*
    // - Reltaive: baz/**/*           -> baz/**/*
    IsAbsolute() bool

    // Root returns the root Cid of this selector.
    // It may be nil if the selector is not absolute.
    Root() Cid

    // Type returns the selector type code.
    Type() SelectorType

    // Bytes returns the binary packed serialized representation of this selector.
    // Use this for all machine-oriented input/output (on the wire, disk, etc.)
    Bytes() []byte

    // String returns the string serialized representation of this selector.
    // Use this for all human readable input/output (terminal, etc).
    String() string
}

// SelectorType is the enum used for selector type codes. These type codes
// are part of the protocol and housed in the multicodec table.
type SelectorType int
const (
    NullSelector SelectorType = 0
    CidSelector SelectorType = 1
    PathSelector SelectorType = 2
)

// Select is a function that applies a selector to a dag, returning the resulting
// subdag. It is implemented using a Traverser. Given a lazy traverser
// implementation, it should be a lazy application and avoid visiting the whole
// dag until it needs to.
func Select(d Dag, s Selector) Dag {
    t := d.Traverse()
    t.Filter(s)
    return &traversedDag{d, s, t}
}

// traversedDag is a utility dag implementation that uses a traverser to
// to apply a selector. this is what Select uses.
type traversedDag struct {
    d Dag
    s Selector
    t Traverser
}

func (d *traversedDag) Root() Node {
    if d.s.IncludesPath(RootPath) {
        return d.d.Root()
    }
    return nil
}

func (d *traversedDag) GetNode(path Path) Node {
    if d.s.IncludesPath(path) {
        return d.d.GetNode(path)
    }
    return nil
}

func (d *traversedDag) Traverse() Traverser {
    return WrapTraverser(d.t)
}
```


