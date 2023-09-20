---
title: The Brief Primer
eleventyNavigation:
  order: 11
  synopsys: A technicality-heavy "one pager" quick reference, spanning all of IPLD and all its details.
---

A Terse, Quick IPLD Primer for the Engineer
===========================================

:::info
> Forward: This is meant to be a _terse_ primer -- the aim is just to introduce the basic terms and scope and provide a good foundation for further understanding.  The reader will likely still need to seek more information from other documents, or ask questions in support channels, in order to fully learn how to use (or contribute to) IPLD.  The primer should simply provide a good grounding for integrating that further information.
:::

:::info
> Key terms are in **Bold Title Case** to highlight them.  These are terms you should be able to "ctrl-f" through the page to find other mentions of.
:::

:::info
> Familiarity with some computer science concepts will be presumed.  E.g., if the reader is unfamiliar with the concept of an "AST", it will be necessary to look that up in some other source.
:::

Key Concepts
------------

### Core: Data Model & Codecs & Linking

- The IPLD **Data Model** is like an "AST" for data -- but without the "S"; the Data Model is independent of syntax.

- The IPLD **Data Model** looks and feels roughly like JSON -- there are maps and lists for building nested structures, and strings and booleans and so forth.  We also add a concept of byte sequences, and a concept of **Link**s (we'll come back to defining **Linking** and **Link**s later).

- IPLD data held in the **Data Model** can be marshalled into a serial form via a **Codec** -- and vice versa: serialized data can be unmarshalled to **Data Model** form via a **Codec**.

- **Codec**s are pluggable.  IPLD supports many codecs.  Some common ones include the JSON and CBOR formats, but there are many more.  The only constraint on a Codec is that it must produce and consume **Data Model**, and exchange it with the codec's serial format.
	- If you're thinking to yourself "wow, there's a lot of details that need specification there", you're certainly right!  There's a whole writeup about "Codecs and Completeness" subject in [another document](https://gist.github.com/warpfork/28f93bee7184a708223274583109f31c).

- It is possible to take serialized data (e.g., a **Block**) and pass it through a (cryptographic) hashing function.  (This isn't a new idea, but one we apply -- IPLD didn't invent hashing; we're just identifying an important fact here.)  The resulting "hash" value is useful as a shorthand identifier for the full data.

- **Linking** in IPLD is done using hashes of data.  A **Link** points to a **Block**.  (More on **Block**s later, in the next section.)

- Because **Linking** is based on cryptographic hashes, graphs (DAGs, more specifically) of data of unlimited size can be made and reference other subgraphs easily.  Unlike URLs or other forms of "linking", this works without any central name registration authority -- this is useful, because it means anyone can create linked data, and consume and traverse linked data, without coordination: it works totally offline.

- **Linking** in IPLD is implemented using a spec called **CID** (short for **C**ontent **ID**entifier).  CIDs contain both the hash of the target data, and some info about what **Codec** to use when parsing it, meaning the target data can be turned directly into **Data Model** (!).

- Now we are ready to produce a thesis statement about the purpose of IPLD:
    - Given the IPLD libraries and specs, it should be possible to produce a new system "like git" (in that it's content-addressed, decentralized, and excellent) in one order of magnitude less time than it would otherwise take.
    - IPLD takes all of the _incidental_ choices that must be made (but don't "matter", per se) such as choice of codec, choice of hashing function, and so on, and turns them into pluggable components... so you can start developing on the **Data Model** level (where the important semantics are!) and pick the rest later.
    - Furthermore: other people should be able to develop their own programs for interacting with your data easily: they should be able to target the **Data Model** and only worry about the semantics of the data.  The codecs and other details should be out-of-box handled already for them, so they can get to business quickly.

### Blocks vs Nodes

- A unit of serialized data is called a **Block** in IPLD.  Marshalling turns **Data Model** into in a **Block**; Unmarshalling turns a **Block** into **Data Model**.

- A **Link** targets a **Block**.  (This is necessarily true because a **Block** is the unit of granularity which we hash.)

- The **Data Model** is composed of **Node**s -- each map is a **Node**; each list is a **Node**; each string is a **Node**; each boolean is a **Node**; each **Link** is a **Node**; etc.

- A **Block** may contain one **Node**, or many **Node**s in a tree.
	- By example: `{"foo":"bar","baz":1}` has five nodes: a map node, three string nodes (two are keys in the map; one is a value), and an int node.
	- You could put all of `{"foo":"bar","baz":1}` in one **Block**.
	- You could equally well put `"a single long string"` in one **Block**.
	- Note that a single **Block** cannot contain more than one unconnected tree of **Node**s.

### Pathing

- A key benefit of having a standardized **Data Model** is that we can define **Pathing** over it -- a **Path** is a simple textual description of how to move from one node in the **Data Model** to another node that is a child (or grandchild, or great-grandchild, etc) of it.

- A **Path** is composed of **PathSegment**s.

- Each **PathSegment** is either a key for traversing across a map, or an index for traversing across a list.

- **Path**s are a 1->1 thing: they start from one position in a DAG, and get you to single destination position.  If you want something that visits many nodes in a graph, rather than having a single destination, you want **Selectors**.

- **Pathing** in IPLD can also cross over **Link**s transparently -- meaning a **Path** can get you anywhere in a large graph of data.

- **Pathing** in IPLD doesn't contain a concept of "`..`" (meaning "go up one") because that's not always a defined operation in an a DAG.  (Also because "`..`" is a perfectly valid map key!)
	- To understand how this could be ambiguous, consider a scenario where multiple **Block**s are connected by **Link**s: if the "`..`" segment stays within one **Block**, it's clear enough; but if it would point outside of a **Block**... there's no way to interpret that other than look back at the **Path** you were following and chop off a segment.  Therefore, one might as well just process the path accordingly, first.

- The combination of a **CID** and a **Path** is a context-free way to reference any information that's legible via IPLD.  (This is sometimes called a "merklepath".)

### Advanced Interpretations

- There are two more "advanced" ways of interpreting information that we introduce in IPLD because of their utility: **Schema**s and **ADL**s (short for **A**dvanced **D**ata **L**ayout).

- Both of these advanced interpretation systems still present their data as **Data Model** -- so **Pathing** and all the other core IPLD concepts still apply over them!

### Schemas

- **Schema**s provide developer-friendly ways to describe outlines of data structures that a program wants to handle.
    - This provides a useful "design language" for IPLD!
    - Implicitly, it also describes the errors that can be generated when attempting to handle data that doesn't match this structural outline.

- **Schema**s describe two things: **type** information -- which is all about semantics -- and **representation** information -- which is all about how the information is represented at the **Data Model** level.
    - Separating these two things mean that **Schema**s can be used to describe anything in IPLD, even if it was made *without* use of Schemas.
    - In fact, **Schema**s can even usefully describe data that was created *without IPLD at all*.
    - **Schema**s layer cleanly with **Codec**s.  You can describe the semantics of data... and pick a codec separately.

- The kinds of "types" that **Schema**s support are the same as the "kinds" in the **Data Model** (map, list, string, etc)... plus a few more: "struct", "union" (aka sum types), "enum", etc.

- **Schema**s support a variety of possible representations for each type.
    - For example, the default representation for a "struct" type is simply as a "map", where the keys are the names of the struct's fields.
    - But instead, the representation for that "struct" could also be "tuple" mode (meaning the representation will be a "list" in **Data Model** understanding).  In this case, the struct field names aren't present in the representation at all.
    - Some representation strategies contain more redundant data (meaning they're easier to "eyeball" and understand without a schema!); others lean towards higher entropy (meaning that "eyeballing" it might become impractical and a schema might become necessary to understand them fully).  We make schemaless and schemafull systems into _a gradient_: you can choose where on the gradient you want to be (and vary that choice with each type -- e.g., one can start a large data graph with schemaless data, and then use increasingly compact/high-entropy/schemafull representations for data deeper in the graph).

- Every **Schema** type also has a defined way of being perceived as **Data Model** -- so, you can **always** apply concepts like **Pathing** _over the parsed Schema data_ just like you would the raw data.  It'll just be a little different.
    - For example: you can have a struct with tuple representation, and it will act like a "map"... at the same time as its representation is a "list".  You can traverse and do **Pathing** over either view of the data, at your option.

- It's critical to note that **Schema**s are *not Turing complete*.  In fact, they're not even close.  There's been a considerable effort made to keep the amount of computation required to decide if data "matches" a Schema or not to be minimal, and at most, proportional to the complexity of the schema (which in turn can be loosely approximated by its sheer textual size).

- Because the amount of computation needed to determine if a **Schema** "matches" data or not is minimal, it's possible to build _version detection_ and _feature detection_ by simply *trying several Schemas in a row*.

- It is not necessary to embed a reference to a **Schema** in a document because of the above reason.  In fact, it's desirable *not* to: explicit versioning is fragile; feature detection allows smooth growth and natural evolution.

- **Schema**s coincidentally provide a very useful input for code-generation tools, which can make Very Fast code for handling the structures described by the Schema.


### ADLs

- **ADL** is short for **A**dvanced **D**ata **L**ayout.

- The purpose of an **ADL** is to make data legible as a **Data Model** **Node** -- but also, it's distinct from a **Codec**, in that the raw input is *also* **Data Model** (though it may be one **Node** or *many*; the input may even span multiple **Block**s).

- It's probably easiest to understand **ADL**s in terms of some of the problems we've used them to solve:
    - Having large maps is important.  One example of this is for directories in filesystem-like applications.  When we want maps that might be larger than can fit reasonably well into a single **Block**, we use an ADL!  In particular, "HAMT" is an ADL that we have made and recommend for this purpose.  A HAMT splits the map data across many blocks, somewhat like a B+ tree, but presents the whole thing as if it's a single map, conforming to all the **Data Model** **Node** interfaces, so you can program against it normally.
    - Having large byte sequences is important.  One example of this is for storing files!  When we want to store a byte sequence that might be larger than can fit reasonably well into a single **Block**, we use an ADL!  In particular, "FBL" is an ADL that we have made and recommend for this purpose.  An FBL can split the byte sequence across many blocks, somewhat like a B+ tree, but presents the whole thing as if it's a single contiguous byte sequence, conforming to all the **Data Model** **Node** interfaces, so you can program against it normally.
    - Encrypting data is neat.  We suspect **ADL**s are suitable for describing this, and making encryption operate smoothly within IPLD, without baking any particular algorithm or constructions into IPLD (which would make them harder to innovate on and change).  We don't have any fully worked examples of this yet, however.

- In contrast to **Schema**s, **ADL**s support topological transformations of data.  Because topological transformations do not have an obvious way to have bounded computational costs, we've given up on making **ADL**s be less than Turing-complete.
    - Accordingly, we've chosen to implement **ADL**s as a "plugin" system: they're usually written in a host language, and must be reimplemented in every IPLD library.
    - In the future, some sort of "bytecode" or "IR" might be introduced which allows more portable definitions of **ADL**s, but no such system is yet specified.
    - **ADL**s remain distinct from **Schema**s because the bounded computational costs of **Schema**s makes them suitable for doing "feature detection" with a "try stack"; doing this with ADLs would be prohibitively unpredictable.

- Since **ADL**s have raw **Data Model** as their input, it raises the question of how we decide whether an ADL is used on some data.  We call this the "signalling problem".
    - One solution to the signalling problem is "Use a **Schema** to provide the signal".
    - It is possible for other signalling mechanisms to be used.  (But there aren't a lot of examples or fully-worked specifications for this yet.)

### Yet More Stuff

- **Selectors** are a declarative format for specifying a DAG traversal, both stating what parts of the graph to traverse, and providing a way to mark certain nodes as highlighted.  There is a standardized **Data Model** tree structure for expressing Selectors (in fact, it's specified by a **Schema**), and most IPLD libraries will provide a native function for evaluating them (typically this involves callbacks for visiting the "highlighted" nodes).

- **Graphsync** is a protocol which builds on **Selectors**, and aims to allow two or more communicating agents to exchange **Block**s of data efficiently: by describing what parts of the graph they're interesting in exchanging, the number of round-trips required to communicate groups of related **Block**s can be greatly reduced.

### Synthesis

- It should now be clear from all this: the **Data Model** **Node** interface carries a lot more weigh than just that of the **Data Model** itself: it also defines the necessary (and in many ways the possible) behavior of **Schema** systems and **ADL**s as well; **Codec**s are defined entirely in terms of it; and it is the center of all **Pathing** and other forms of traversal (such as **Selectors**) as well.


Getting Things Done with IPLD
-----------------------------

(There's [a fuller document](/docs/synthesis/gtd/) on this in another chapter of the docs.)

tl;dr:

- Try to do things with the plain **Data Model** first.
- When you want more rigour and assistive tooling for your data structures, try **Schema**s.
- If you need to do multi-block data structures, or some other Interesting interpretation of data before you treat it as **Data Model**, then reach for **ADL**s.
  (But do this judiciously: your data will become incomprehensible to a client that doesn't have your ADL code.  It's always better to use a common ADL than to invent a new one.)
- As a last resort: you can invent a new **Codec**.  If you need to process binary forms of data into **Data Model**, and IPLD has never had a codec for this binary format before, then this is what you need.
  (But do this truly only as a last resort: ideally, this is only done to bridge additional legacy formats into IPLD; new projects should be able to express their logic via the **Data Model** first, and then _pick_ a codec that suits, off the shelf, without additional development effort!)



Finer Points
------------

- Strings are really just bytes: they can contain the same range of data (anything).  However, strings carry the implication that they are human readable.
    - Strings tend to be treated differently by various presentation layers and user-facing tools and debugging representations.
    - Strings and bytes are also serialized distinctly in many **Codec**s.

- Maps have a stable, defined iteration order.  But it's not necessarily a _sorted_ order.
    - This is necessarily the case, because some **ADL**s (in fact, HAMTs, specifically) have a natural iteration order, and implementing any other iteration order would be prohibitively expensive, and yet that order is not a sorted order.
    - Some **Codec**s specify a sorted order.  If they do so, note that that's the codec's choice; the **Data Model** is more expressive, since it can persist any order.

- Lists are not sparse.  (Although nothing stops an ADL from making such a thing.)

- Map keys are strings.
    - Not bytes.  (But remember, the distinction between strings and bytes is mostly in interpretation.  In essence, this statement means: map keys are treated as being printable.)
    - Not integers.  (It would complicate libraries significantly, and be unsupportable by many codecs, and would create a great deal of ambiguity for tools that want to make human-readable presentations of data.)

- There's no way to distinguish **PathSegment**s that are strings (for map keys) vs integers (for list indexes).  It's determined by the data it's applied to.

- Some **PathSegment** do require escaping when conjoined into a **Path**.  **Path**s are usually encoded using "/" as a separator; however, "/" is also a valid key in a map (it's just another regular string, after all!); therefore, it follows that escaping may be necessary for some values.


More Info
---------

- Continue with the other [docs](/docs)!
- For high details, go to the [specs](/specs)!
- For information about known libraries: check out the [libraries](/libraries) chapter!
