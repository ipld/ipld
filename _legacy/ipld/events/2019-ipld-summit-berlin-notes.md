# 2019 IPLD Summit Notes

May 2019, Berlin

IPLD Team:
 - @mikeal
 - @vmx
 - @warpfork
 - @rvagg
 - + @aschmahmann

## Day 1

13-May-2019, IPLD team

Aim: address things best done while together.

### Governance in github.com/ipld/specs/

Mikeal drafted initial version: https://github.com/ipld/specs/pull/122

### IPLD Vision

 - Value proposition
 - Guide to performance of IPLD - trade-offs

#### Vision brainstorm

 - One hash describes everything about a document / all-inclusive snapshot addressing
 - Interoperability
   - Format-agnostic data description and linking
   - Programming language agnostic, widely available
 - Data connects to an ecosystem, code is secondary
   - Fertility for growing an ecosystem
     - Everything should be self describing
     - Goal: no out-of-band information is necessary to understand the data structures (permanent web)
   - Data > Apps || Data > APIs
 - Sensible defaults + flexibility
 - Bazaar over cathedral
   - Coordination among uncoordinated actors
   - Freedom to fork
   - Solving the temporal problem of migrations
      - data pool has permanence and connectivity across time is easier to describe
      - well-organized and highly-available bazaar
  - Data, metadata and organization are separate
    - freedom for arbitrary slicing and dicing organization - across time, across usage models within a bazaar
  - Atomicity for free
    - Concurrency for large write batches is easy

### Terminology

 - Discussion about multiformats / multicodecs / multibase
 - Volker to rename the "multicodec" repo to "multiformat"
 - Discussed "format" and "codec", current status exists at https://github.com/ipld/specs/#codec
   - "Therefor, a format is the standardized representation of IPLD Links and Paths. It describes how to translate between structured data and binary.

### Team Priorities

 - Schemas:
   - Goal: HAMT and UnixFSv2 with Schemas as good example
   - Q2: HAMT + Schema in JavaScript complete, stretch: JavaScript UnixFSv2 + Schemas
     - Diversion to discussion on Schemas in go-ipld-prime ipld.Node interface
     - Interfaces suggested for multi-block collections (https://github.com/ipld/specs/blob/master/data-structures/multiblock-collections.md) may map on to ipld.Node so it may be able to serve as an interface to Schema levels

## Day 2

14-May-2019, IPLD team

### Documentation TODO

For github.com/ipld/specs:

- Cardinality
- CIDs introduction
- Compatibility
- Immutability / Authenticated
- Ambiguities: including notes about how your programming language will bite you even if our data model is :thumbsup:
- Convergence / reproducible importabilty
- Replication: no one-size-fits-all

### Path Spec:

 - How it applies at different levels
 - It's **not** selectors - not ranges, slices, etc.
 - Relation (or not) to merklepath
 - Index segments vs string/map segments
 - Character encoding - reuse of URI escaping?
 - Specials like '.' and '..' (no!)

### Schemas:

Based on predicates, not presumptions (our data has existed longer than this schema, or this version of the schema). Schemas should be an ally in migrations, even incremental migrations.

CONCERN ONE: the signalling mechanism

- it can be a `"_type"` property in data
- it can be in the schema
- or both. porque no los dos?

CONCERN TWO: longjump to implementation

- (string that looks up a package?  CID of the balls-out wasm?)
- should be exactly like codec lookups, a registry
- let's do strings
  - better error message
- ... what if we do CID of the schema of the adv layout internals
  - it's unclear if that is fragile in the 'right ways'
  - among other things...

CONCERN THREE: there are params other than the implementation itself

- e.g. 'breadth' is a lot easier to parameterize than algo itself.
- this is interesting because it's *easier* than Concern Two.

Perhaps a hamt's internal schema:

```ipldsch
type HamtRoot struct {
	paramA Int
	paramB Int
	chunk HamtHunk
}

type HamtHunk union {
	| HamtLeaf "*"
	| HamtMid "%"
} representation keyed

type HamtMid struct {
	moreChunks {String:HamtHunk}
}

type HamtLeaf struct {
	obj Any
}
```

Perhaps a schema using a multiblock collection:

```ipldsch
type Top map {String:Foo} // regular map

type Foo struct {
	fancy {String:Bar}<MySaucyHamt>
}

type Bar int // whatever

advLayout MySaucyHamt {
	// note that we already know this has to be kind==map
	//   because `{String:Bar}` -- `{` means map.
	// or maybe we say it here again for explicitness.
	
	kind map // 'map' means must have Get(string), MapItr(), etc.
	
	implementation "HAMTv1" // this is the longjump to code
	physicalLayout struct {
		schema  &Schema
		rootTypeName String
	}

	bitwidth 14
	hashalgo "murmur"
}
```

Remember, we need to create new data programmatically:

```go
// reading some bytes:
ipld.Unmarshal(someByteReader, schemaptr, "Top") -> Node

// creating nodes:
mb := schemaptr.GetType("Top").NodeBuilder().MapBuilder()
mb.Insert("key", schemaptr.GetType("Foo").NodeBuilder() /*...*/)
```

## Day 3

15-May-2019, Community Summit, IPLD team + @Gozala

### Unixfsv2

* Discussion on block layout with reference to SSB https://ssbc.github.io/scuttlebutt-protocol-guide/#encrypting
  - New schema work that may help with representing encrypted blocks in a way that's different to the raw data model representation (schema as a representation modifier)
  - Codec/format for SSB
  - Link-loaders (in Go IPLD for now) - register a loader for links (like ipfs-repo on the JS side?) - use it to provide nicely formatted IPLD blocks from a non-IPLD store
  - Discussed path resolution within advanced layouts and parameretization, e.g. with private keys to decode sections of blocks which are only path-addressable when you decrypt them. CID/foo/bar/baz - where foo/baz traverses in to an encrypted block and 'baz' is only accessible once you decrypt an encrypted representation and in the data model 'baz' isn't a thing, only when you transform it with a schema + advanced layout.
  - Discussed "prompts" for additional out-of-band information, such as private keys or passwords

## Day 4

16-May-2019, IPLD Open Day, IPLD team + @Gozala, @Raynos, and others ..

- Revision of Schemas discussion, multi-block data structures on top of schemas, programatic representation
  - Discussion of Go and its needs from schemas, the current go-ipld-prime implementation, codegen, "generic" and "hypergeneric" (blame @warpfork for this language)
- Discussion of JavaScript and its interaction with schemas and IPLD in general
  - Introduction of programatic IPLD interaction in a manner similar to how jQuery interacts with the DOM
  - i.e. wrap and extend, provide an abstracted interface for interaction that can cover over the gory details and provide a useful interface.
  - Aim for idiomatic as much as possible while allowing multi-block traversal (i.e. jumping out of pure data model interaction into "advanced" types that pretend to be base kinds) and schema validation & translation
