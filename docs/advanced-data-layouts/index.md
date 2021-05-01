---
title: Advanced Data Layouts
eleventyNavigation:
  order: 46
---

Advanced Data Layouts
=====================

Advanced Data Layouts (or just Advanced Layouts, or ADLs for short) are a kind of plugin system for IPLD
which is used when we want to present some data as if it were a [Data Model](/docs/data-model/) [Node](/docs/data-model/node/),
while actually storing it as a different Node (or as several Nodes!).

This is easiest to understand by example:

- // sharded map example

- // sharded bytes example

- // encryption example


Where do ADLs fit in?
---------------------

You should probably read the doc about the [Data Model](/docs/data-model/) first, if you haven't already.
ADLs build upon the concepts that are introduced standardized by the Data Model.

- ADLs convert [Data Model nodes](/docs/data-model/node/) into *another node*
  (or, when writing new data, provide an interface to go the other way: let the user act like they're creating a node, but in the background create several nodes, or a different structure, which stores that data).
- [Codecs](/docs/codecs/) and ADLs compose smoothly -- Codecs can deserialize and serialize the Data Model data that is the "raw" "interior" content of an ADL.
- [Schemas](/docs/schemas/) technically have nothing to do with ADLs...
	- but, Schemas can be useful for _signaling_ when ADLs should be used to handle data ([more on that later](#signaling-with-schemas));
	- and in practice, ADL specifications often include a Schema which describes them, simply for clarity (and ADL implementations might choose use that Schema in their internal code, too).
- [Traversals](/docs/data-model/traversal/) and [pathing](/docs/data-model/pathing/) work transparently over ADLs (which is part of why ADLs exist and what makes them awesome in the first place)!


How ADLs Work
-------------

### ADLs make nodes look like another node

// emphasis on *one* node as the result: whether it be map or list or bytes or etc, *one*.

// n.b. [..concrete example of what kind of transformation you'd be better off doing with schemas..]

### ADL interior data is still Data Model

// clarify that without ADL code activated, the raw data can still be read and even traversed... just differently.

// clarify that codecs and ADLs compose, there's a clear layering there.

### ADLs use code

ADLs use code, and some sort of plugin system is needed in IPLD libraries to support this.

How exactly those plugin systems work, and what kind of format the code needs to be authored in,
and exactly what interfaces need to be adhered to:
these will all vary per IPLD library and the language the IPLD library is in.

(Someday, a system for portable ADL code would be neat.
However, we currently consider that a research problem:
some notes can be found in [open-research/ADLs-we-can-autoexecute](open-research/ADLs-we-can-autoexecute.md).)

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

#### Signaling with Schemas

One useful system we have which can provide an answer to the signaling question are IPLD Schemas.
Since Schemas are already a declarative way to talk about the structure of data,
it's quite reasonable that they should also be able to talk about where the structure of data uses an ADL.

However, you don't have to use IPLD Schemas if you want to use ADLs.
Keep reading the next couple of sections for more alternatives that you can use to answer the signaling question.

// TODO a doc on this, complete with syntax examples, is necessary.

// a remark should be present here on the interesting limitation about *non*-recursive descriptions being somewhat high-friction to reach with this mechanism.
//  maybe this belongs in a separate deeper-diving doc in another page, though.

#### Direct action within libraries


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

// "running foreign code on somebody else's budget" is not something that happens at unbounded scale on public services

// availability in many languages/libraries, and authorship/maint effort implied -- it's better to use community-common things if you can
// similar to codecs in this regard

// reminder that schemas *are* usable on public infra (like e.g. on hosted IPLD Explorer tools), because they have predictable computation cost envelopes -- reminder to prefer doing things with a schema rather than an ADL if you can; don't reach for ADLs just because you want a funky fresh custom format
