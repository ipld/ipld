---
title: Advanced Data Layouts
eleventyNavigation:
  order: 46
---

Advanced Data Layouts
=====================

Advanced Data Layouts ("ADLs") are an IPLD convention for customizing how to see and interact with some data.

A slightly more technical definition is:
an ADL is some code which is applied to some [Data Model](/docs/data-model/) data
in order to make it look like another [Node](/docs/data-model/node/);
or when writing, an ADL presents a single [NodeBuilder](/design/libraries/nodes-and-kinds/#nodes-vs-nodebuilders)
which transforms any input into other [Nodes](/docs/data-model/node/)
(or possibly even several Nodes, perhaps even across several [blocks](/glossary/#block) when serialized!).

ADLs can be thought of like a "lens" for data: they can take some data and make it legible in a different way.

ADLs are typically implemented as some kind of plugin system in IPLD libraries.

One of the most common uses of ADLs is sharded datastructures.
However, other uses are possible.
(For example, IPFS uses ADLs to make UnixFS's user-facing pathing work.
Some people have researched using ADLs as part of encryption system design.
More examples will be discussed below!)

There are some forms of loose standardization for ADLs that are commonly used.
It's worth looking for existing ADLs that do what you need before rolling your own!
(For example: If you're looking for a sharded, scalable map -- you're not the first!
That's just one example of code you'll find you can share with others.)


Quick Examples
--------------

- Maps with sharded storage are often implemented using ADLs.  (The HAMT algorithm is popular, for example.)
- Lists with sharded storage can be implemented as ADLs, too.
- Large bytes sequences can be stored in sharded forms with ADLs.
- Application-level logic can sometimes be usefully represented in ADLs -- for example, pathing over a "filesystem"-like datastructure, one may want both use a sharded map for large directories, and also stride over metadata objects without remark, and this could be wrapped up into a single ADL that provides pathing directly to file contents.
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
	- but, Schemas can be useful for _signaling_ when ADLs should be used to handle data ([more on that later](#signaling-with-schemas));
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

We call this "the signaling problem".

In short: you don't.

Since the data composing the "raw", interior data of an ADL is just regular IPLD Data Model
(it must be, after all, since it's produced by some [Codec](/docs/codecs/), which by definition produces data structures describable by the Data Model),
then it follows that there's absolutely no way for this data to unambiguously indicate that it needs an ADL in order to be understood.
If there was, it would imply that there's some kind of "reserved words" in the Data Model,
which would violate some of our other central goals in IPLD, because it would mean some perfectly normal maps and lists would be invalid IPLD or gain magical meaning that they shouldn't;
we don't want any of that.

So!  Signaling must come from somewhere else.

There are a variety of valid options:

- [Signaling with Schemas](#signaling-with-schemas)
- [Direct action within libraries](#direct-action-within-libraries)
- [Other declarative signaling](#other-declarative-signaling)

#### Signaling with Schemas

One useful system we have which can provide an answer to the signaling question are IPLD Schemas.
Since Schemas are already a declarative way to talk about the structure of data,
it's quite reasonable that they should also be able to talk about where the structure of data uses an ADL.

A page on [Indicating ADLs with Schemas](/docs/schemas/features/indicating-adls/) talks more about this.

However, you don't have to use IPLD Schemas if you want to use ADLs.
Keep reading the next couple of sections for more alternatives that you can use to answer the signaling question.

:::todo
- a remark should be present here on the interesting limitation about *non*-recursive descriptions being somewhat high-friction to reach with this mechanism.
  (although maybe this belongs in a separate deeper-diving doc in another page).
:::

#### Direct action within libraries

:::todo
- discuss this
- link to the go-ipld-prime NodeReifier callback as an example of this
:::

#### Other declarative signaling

We have no currently active specifications for other forms of declarative signaling.

However, you can imagine making such a system yourself fairly easily:
all that's necessary is to decide what that declarative format is that you want,
and write a system that binds it to the relevant programmatic APIs of the IPLD libraries you use,
and everything should work out from there.

Additional declarative signaling specifications may be something that is ratified into IPLD in the future.
(If you'd like to drive this work, please feel free to get in touch!)

(Some systems have already done this in their own ways: for example,
parts of the Filecoin Lotus project expose "paths" in their CLI which have an extension
that is used in that application to signal where to engage ADLs.
You can do things like this in your own applications, too!
It's worth noting, however, that what the Filecoin Lotus project does here is not considered a well-specified IPLD behavior,
and in fact contains several caveats which constrains what is valid data for that application to process to a range that is far narrower than what the IPLD Data Model specifies.)


Practical Considerations for ADLs and using them
-------------------------------------------------

### not every application that processes IPLD data will necessarily support your ADLs

:::todo
- "running foreign code on somebody else's budget" is not something that happens at unbounded scale on public services
- availability in many languages/libraries, and authorship/maint effort implied -- it's better to use community-common things if you can
  - similar to codecs in this regard
- reminder that schemas *are* usable on public infra (like e.g. on hosted IPLD Explorer tools), because they have predictable computation cost envelopes -- reminder to prefer doing things with a schema rather than an ADL if you can; don't reach for ADLs just because you want a funky fresh custom format
:::

See [Open Research Problems: ADL autoexecution](/design/open-research/ADL-autoexecution/).
