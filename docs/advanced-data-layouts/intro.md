---
title: Intro to ADLs
eleventyNavigation:
  order: 10
  synopsys: Defining ADLs, examples of what ADLs are used for, and discussion of where ADLs fit in the "big picture".
---

Intro to Advanced Data Layouts
==============================

Advanced Data Layouts ("ADLs") are how IPLD supports handling large data -- such as creating maps with millions of entries -- are often used for creating "indexes"; and can be customized to other usecases as well.
In general, ADLs are a way to customize how to see and interact with some data.
They can be thought of like a "lens" for data: they can take some data and make it legible in a different way.
ADLs usually appear as some kind of a plugin mechanism in IPLD libraries.

### Technical Definition

To give a slightly more technical definition, an ADL is:
- some code which is applied to some [Data Model](/docs/data-model/) data
  (can be one [Node](/docs/data-model/node/), or multiple, perhaps even spanning several blocks)...
- in order to make it look like another [Node](/docs/data-model/node/);

Or when writing:
- an ADL presents a single [NodeBuilder](/design/libraries/nodes-and-kinds/#nodes-vs-nodebuilders)...
- which transforms any input into one or more other [Nodes](/docs/data-model/node/)
  (perhaps even across several [blocks](/glossary/#block) when serialized).

We say that an ADL has a "synthesized" view -- which is the single Node, seen with the ADL --
and a "substrate" -- which is the data as it is serialized.

### Common Usecases

One of the most common uses of ADLs is sharded datastructures.
These allow creating very large maps or lists.

Large bytes values can be created via ADLs, while stored sharded.
This can be useful for representing "files" in IPLD
(while still having the data chunked up into [blocks](/glossary/#block),
which makes it easier to transfer the data in pieces).

Other uses are also possible!  For example:
- Sharding and big data, as discussed above;
- "Indexes" can be constructed over data by using a map ADL (or more than one of them).
- Whole application level behaviors can sometimes be useful to represent in ADLs!
  For example, IPFS uses ADLs to make UnixFS: the user-facing filesystem-like pathing of UnixFS can be cleanly encapsulated as ADLs.
- There is discussion of using ADLs as part of encryption systems.

### Plugability

ADLs usually resemble a "plugin" system.
There are many different ADLs.
Anyone can develop their own new ADL.

To maximize interoperability, and save development time for common needs,
we attempt to standardize the serial form for some ADLs that are commonly used.
It's worth looking for existing ADLs that do what you need before rolling your own!
(For example: If you're looking for a sharded, scalable map -- you're not the first!
That's just one example of code you'll find you can share with others.)

### Optional

Note that data is always still data you can operate on *without* the ADL that wrote it, too:
it's just going to look _different_.
You can do things like transfer data, and even walk over the data, without an ADL,
because it's still all IPLD [Data Model](/docs/data-model/).

### More Information

Learn briefly about where ADLs fit and what problems they solve in these sections:

- [Where are ADLs in the big picture?](#where-are-adls-in-the-big-picture)
  - [Codecs vs ADLs](#codecs-vs-adls)
  - [Schemas vs ADLs](#schemas-vs-adls)
- [Applications of ADLs](#applications-of-adls)

Then, learn more about the details of what ADLs are and the boundaries of their interface in these sections:

- [How ADLs Work](#how-adls-work)



Where are ADLs in the big picture?
----------------------------------

:::info
Read the docs about the [Data Model](/docs/data-model/) first, if you haven't already.
ADLs build upon the concepts that are introduced and standardized by the Data Model.
:::

ADLs appear at a middle level of the stack.
(You're definitely going to encounter codecs and the Data Model first.)

ADLs are also entirely optional parts of IPLD: they're useful,
but they're not the first thing you need to implement if building a new IPLD library in a new language.

- ADLs are generally perceived as "above" the [Data Model](/docs/data-model/), because ADLs convert [Data Model nodes](/docs/data-model/node/) into *another node*
  (or, when writing new data, provide an interface to go the other way: let the user act like they're creating a node, but in the background create several nodes, potentially in a very different arrangement, which stores that data).
- ... but ADLs are also "below" the [Data Model](/docs/data-model/), in the sense that ADLs synthesize a new [node](/docs/data-model/node/) that _implements_ the Data Model behaviors!
- ADLs are generally perceived as "above" [Codecs](/docs/codecs/) -- Codecs can deserialize and serialize the Data Model data that is the "raw" "interior" "substrate" content of an ADL.
	- ADLs are _codec agnostic_.  Because an ADL's substrate is just Data Model nodes, they can generally be composed with any codec.
- ADLs and [Schemas](/docs/schemas/) are on approximately the same level...
	- Neither Schemas nor ADLs depend on the other.
	- but, Schemas can be useful for _signalling_ when ADLs should be used to handle data ([more on that later](../signalling/#signalling-with-schemas));
	- and in practice, ADL specifications often include a Schema which describes them, simply for clarity (and ADL implementations might choose use that Schema in their internal code, too).
- [Traversals](/docs/data-model/traversal/) and [pathing](/docs/data-model/pathing/) work transparently over ADLs (which is part of why ADLs exist and what makes them awesome in the first place)!


### Codecs vs ADLs

Codecs take binary, illegible data, and turn it into [IPLD Data Model](/docs/data-model/).
By contrast, ADLs take already-legible data -- e.g., data that's already been parsed by a codec --
and make it legible in a different way.

ADLs implicitly used a codec already (although ADLs are not tied to *a* codec;
they just need to have *some* codec which handles serialization).
Codecs do not use ADLs.

In general, if you can accomplish some goal with an ADL instead of a codec,
you probably should -- you'll be interoperable with more things as a result.
(See also the [Getting Things Done](/docs/synthesis/gtd/) document about this.)

ADLs can deal with multi-block data.
This means they're suitable for solving a larger class of problems than a codec is.

Codecs tend to take considerably longer to develop than ADLs.
Codecs require more standardization effort,
and require agreeing on a multicodec indicator.
ADLs can be somewhat more freely developed,
because of their nature as an optional layer.


### Schemas vs ADLs

Both Schemas and ADLs can be described as "lenses" for data, but they have different purposes and scopes.
Schemas only allow very specific "lenses", are designed to be fast, and are mostly intended for structuralizing data and validating it.
ADLs have a much broader scope: ADLs allow arbitrary plugins, can contain complex data transformations,
and can even trigger multiple data load and store operations internally (as they do when used for sharding algorithms).

As described above, neither Schemas nor ADLs depend on the other.
Both are optional parts of IPLD.
Both can be used together or independently.

Schemas can be used to "signal" where to use ADLs in a large forest of data;
see the [Signalling](../signalling/) page for more on that.


What ADLs Enable
----------------

ADLs are generally used to make some complex system simpler, or more legible;
and, to unlock the ability of other IPLD features to apply over that data.

Because ADLs make complex data structures readable and writable as "just" a [Node](/docs/data-model/node/),
it means all the features of IPLD that work over regular Nodes work over ADLs, too!

For example:
- [Traversals](/docs/data-model/traversal/) and [pathing](/docs/data-model/pathing/) work transparently over ADLs;
- [Selectors](/glossary/#selectors) work transparently over ADLs;
- "IPLD Patch" tools (still forthcoming) work transparently over ADLs;
- any kind of custom library functions you've written that work over Nodes?  They'll "just work" with ADLs.

<!-- TODO: there should be a short h3 paragraph about each of these bullets. -->

This reusability makes a ton of features possible for building systems with ADLs,
and makes it work with a minimum of development effort.

In particular, the Selectors story is quite powerful, because it has no fallback.
Having a Selector walk over the inner state of an unknown datastructure
(let's take a HAMT as an example, though the principle is general)
is only possible if you know the load factor of the state structure,
or other specific details of its internal state.
For many applications of Selectors -- especially, say, the user of Selectors
to ask someone else on the internet to *send* you data that you don't already have --
this would make Selectors all but useless.
However, by running Selectors *over* an ADL, things work out nicely.
(You can see this principle working out in how [Graphsync](/specs/transport/graphsync/)
can fulfill transport of all the blocks necessary to traverse a UnixFS path --
just send the path itself, together with the instruction to look at the data with a UnixFS ADL,
and the protocol will figure the rest out for you.)
<!-- TODO: really need a page to link to for more detail about UnixFSv1. -->


How ADLs Work
-------------

ADLs require:

- some _interfaces_ in the IPLD library;
- some _code_, which is plugged in somehow;
- and some _signal_ which tells the IPLD library where to apply that code and thus return you that interface.

### ADLs need an interface

... but often that interface is quite minor.

For example, in the [go-ipld-prime definition of ADL](https://pkg.go.dev/github.com/ipld/go-ipld-prime/adl#ADL),
it's almost entirely simply the [Node](/docs/data-model/node/) interface --
the same interface already used for regular Data Model data.

There may also be some interfaces required for the creation of the ADL value.
(Starting to treat already-loaded nodes as an ADL is often called "reifying".)

The exact details of the interfaces will vary per [implementation library](/libraries/);
you'll need to consult the documentation of your library for more information.

### ADLs use code

ADLs use code, and some sort of plugin system is needed in IPLD libraries to support this.

How exactly those plugin systems work, and what kind of format the code needs to be authored in,
and exactly what interfaces need to be adhered to:
these will all vary per IPLD library and the language the IPLD library is in.

(Someday, a system for portable ADL code would be neat.
However, we currently consider that a research problem:
some notes can be found in [open-research/ADLs-we-can-autoexecute](/design/open-research/ADL-autoexecution/).)

### ADLs need to be signalled

Because ADLs are optional lenses that you can _choose_ (or not choose) to engage
when processing data, it follows that an application needs to "signal"
whether or not they want to use an ADL; where in the data they want to use it;
and which ADL to actually use on that data.

We call this "the signalling problem".

This gets quite in depth and has many possible solutions,
so we explore it in its own page: hop over to [ADL signalling](../signalling/) to learn more.


Can ADLs be Composed?
---------------------

Yes!  ADLs can be nested (an ADL can use another ADL inside itself),
and multiple ADLs can be used in sequence when [pathing](/docs/data-model/pathing/) (even without knowing about each other).

For example: the UnixFS ADL is actually composed of several smaller ADLs:

- there's an ADL for sharded bytes, which is used for files in UnixFSv1.
- there's a HAMT implementation, which acts like a map, and is part of how directories are implemented.
- because directories also contain some metadata, there's both a raw view
  (which may be a sharded map, and points to the metadata structures as its leaves)...
- ... and a synthesized view, which jumps from one directory straight to the next directory or file content
  (e.g., what you expect from pathing as a high level user!).

In this example, we see both sequential use of ADLs, and composition of ADLs.
When a directory points at another directory or a file, that's sequential use of two or more ADLs
(and sometimes different ADLs; the directory maps use one, and the file bytes use another).
When the UnixFS pathing ADL is used, that one composes *over* the other directory ADLs,
using them internally, and then decorating on more of its own logic as well.
