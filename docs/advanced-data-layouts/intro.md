---
title: Intro to ADLs
eleventyNavigation:
  order: 10
  synopsys: Defining ADLs, examples of what ADLs are used for, and discussion of where ADLs fit in the "big picture".
---

Intro to Advanced Data Layouts
==============================

Advanced Data Layouts ("ADLs") are an IPLD convention for customizing how to see and interact with some data.

A slightly more technical definition is:
an ADL is some code which is applied to some [Data Model](/docs/data-model/) data
in order to make it look like another [Node](/docs/data-model/node/);
or when writing, an ADL presents a single [NodeBuilder](/design/libraries/nodes-and-kinds/#nodes-vs-nodebuilders)
which transforms any input into other [Nodes](/docs/data-model/node/)
(or possibly even several Nodes, perhaps even across several [blocks](/glossary/#block) when serialized!).

One of the most common uses of ADLs is sharded datastructures.
However, other uses are possible.
(For example, IPFS uses ADLs to make UnixFS's user-facing pathing work.
Some people have researched using ADLs as part of encryption system design.
More examples will be discussed below!)

There are some forms of loose standardization for ADLs that are commonly used.
It's worth looking for existing ADLs that do what you need before rolling your own!
(For example: If you're looking for a sharded, scalable map -- you're not the first!
That's just one example of code you'll find you can share with others.)

Learn briefly about where ADLs fit and what problems they solve in these sections:

- [Quick Examples](#quick-examples)
- [Where are ADLs in the big picture?](#where-are-adls-in-the-big-picture)
  - [Schemas vs ADLs](#schemas-vs-adls)
- [Applications of ADLs](#applications-of-adls)

Then, learn more about the details of what ADLs are and the boundaries of their interface in these sections:

- [How ADLs Work](#how-adls-work)


Quick Examples
--------------

- Maps with sharded storage are often implemented using ADLs.  (The HAMT algorithm is popular, for example.)
- Lists with sharded storage can be implemented as ADLs, too.
- Large bytes sequences can be stored in sharded forms with ADLs.  (Imagine: using this to store large files, while splitting them into chunks, to make it easier to transport the large file in small parts.)
- Application-level logic can sometimes be usefully represented in ADLs.  (For example, pathing over a "filesystem"-like datastructure, one may want both use a sharded map for large directories, and also stride over metadata objects without remark, and this could be wrapped up into a single ADL that provides pathing directly to file contents.)
- There is research into using ADLs for purposes like encryption.


Where are ADLs in the big picture?
----------------------------------

:::info
Read the docs about the [Data Model](/docs/data-model/) first, if you haven't already.
ADLs build upon the concepts that are introduced and standardized by the Data Model.
:::

ADLs appear at a middle level of most stacks, if they're present.

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


### Schemas vs ADLs

Both Schemas and ADLs can be described as "lenses" for data, but they have different purposes and scopes.
Schemas only allow very specific "lenses", are designed to be fast, and are mostly intended for structuralizing data and validating it.
ADLs have a much broader scope: ADLs allow arbitrary plugins, can contain complex data transformations,
and can even trigger multiple data load and store operations internally (as they do when used for sharding algorithms).

As described above, neither Schemas nor ADLs depend on the other.
Both are optional parts of IPLD.
Both can be used together or independently.


Applications of ADLs
--------------------

ADLs are generally used to make some complex system simpler, or more legible.

Because ADLs make complex data structures readable and writable as "just" a [Node](/docs/data-model/node/),
it means all the features of IPLD that work over regular Nodes work over ADLs, too.

For example:
- [Traversals](/docs/data-model/traversal/) and [pathing](/docs/data-model/pathing/) work transparently over ADLs;
- [Selectors](/glossary/#selectors) work transparently over ADLs;
- "IPLD Patch" tools (still forthcoming) work transprently over ADLs;
- any kind of custom library functions you've written that work over Nodes?  They'll "just work" with ADLs.

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



How ADLs Work
-------------

### ADLs make nodes look like another node

:::todo
- emphasis on *one* node as the result: whether it be map or list or bytes or etc, *one*.
- include concrete example of what kind of transformation you'd be better off doing with schema.
:::

### ADL interior data is still Data Model

:::todo
- clarify that without ADL code activated, the raw data can still be read and even traversed... just differently.
- clarify that codecs and ADLs compose, there's a clear layering there.
:::

### ADLs use code

ADLs use code, and some sort of plugin system is needed in IPLD libraries to support this.

How exactly those plugin systems work, and what kind of format the code needs to be authored in,
and exactly what interfaces need to be adhered to:
these will all vary per IPLD library and the language the IPLD library is in.

(Someday, a system for portable ADL code would be neat.
However, we currently consider that a research problem:
some notes can be found in [open-research/ADLs-we-can-autoexecute](/design/open-research/ADL-autoexecution/).)

### How do I know when to use an ADL to read data?

We call this "the signalling problem".

It has it's own page: go to [ADL signalling](../signalling/) to learn more.

