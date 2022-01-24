---
title: ADL Signalling
navTitle: Signalling ADLs
eleventyNavigation:
  order: 30
  synopsys: How are ADLs applied?  How does data signal that it should be interpreted with an ADL?
---

Advanced Data Layout Signalling
===============================

[Advanced Data Layouts](..) are a feature of IPLD which gives us "lenses" to view data in another way.

This page is about answering the question: "How do I tell IPLD when and where to apply an ADL while reading data?"

:::info
Read [the intro page about ADLs](../intro/) first, if you haven't already.
The broader concept of ADLs, and why they need a concept of "signalling", is introduced there.
:::


Always Optional
---------------

An important thing to remember about ADLs is that the use of them is _always optional_.

Data can be read with an ADL -- or without.
[Pathing](/docs/data-model/pathing/) over the data works differently depending on whether
an ADL is engaged or not, but the data can _be_ pathed over, in some way, either way.
If you don't want to use an ADL to read data, it's still legible --
just as the [plain data model](/docs/data-model/) content,
as a [codec](/glossary#codec) already gave it to you.

And different ADLs can be applied to the same data,
resulting in different views!
It's like putting on a different pair of glasses -- maybe some do
a better job of making the data legible than others!

Therefore, signalling mechanisms -- things that tell you, or tell an IPLD library,
when to engage an ADL, and [what ADL to engage](../identifying/) --
are *also* optional, and by nature, advisory.

We'll talk about some of the various mechanisms a system can use in the next sections.


Signalling Mechanisms
---------------------

There are many ways to approach solving the signalling problem.

In brief:

- [Code directly, without signalling](#code-directly-without-signalling)
- [Signalling with Schemas](#signalling-with-schemas)
- [Signalling with Selectors](#signalling-with-selectors)
- [Signal suites](#signal-suites)
- [Signalling in-band](#signalling-in-band)
- or there may be [other, new declarative signalling systems](#other-declarative-signalling) as yet undeveloped.

Some of these are concrete, standardized protocol solutions.
Some are more like design patterns.
(We'll always advise trying to use the more standardized solutions,
but we can't stop systems in the wild from wiring things as they please,
so we try to at least provide terminology for describing those less standardized approaches, too.)

You can also [combine signalling mechanisms](#combining-signalling-mechanisms).

Let's discuss each of these in a short section.
(As a rule of thumb, when you're designing a protocol -- you should probably be able to link to
one of these sections and say "this: this is what this protocol is doing"!)


### Code directly, without signalling

The most direct way to engage with the signalling problem is to simply _do things_, using application code, and directly calling library functions.

This approach is arguably not a signalling mechanism at all.
When we talk about direct action in code, we mean there isn't really any convention at all in play;
or if it is, it's "implementation defined" by the code you have written.
However, even if it isn't "signalling", it's worth remembering that this it's a practical reality:
applications can _always_ be written this way.
This is just the most degenerate, least useful, least standardized way of signalling.

:::tip
We encourage using one of the other mechanisms of signalling when working the IPLD ecosystem,
because the more declarative and standard of a signalling system you use,
the easier it will make it for others to interact with your data,
and the more that IPLD application and library developers can help you.
:::

Some IPLD libraries do provide feature hooks to help you do this.
For example, in the golang implementation, a [NodeReifer callback](https://pkg.go.dev/github.com/ipld/go-ipld-prime/linking#NodeReifier) provides a place to hook custom code into the flow for loading data,
which allows it to be used throughout other library behaviors like traversals.

But again, this is probably pretty disappointing, if you were looking for standardization.
So let's continue on to the next sections, which will describe other approaches
for more declarative and more standardized mechanisms of signalling.


### Signalling with Schemas

IPLD Schemas allow you to name "types" in data, and also allow you to declare
that you expect some data to processed by an ADL.

For example, the Schema DSL for this looks something like the following:

```ipldsch
advanced ShardMap { ADL "HAMT/v1" }
type Foobar map {String:String} using ShardMap
```

In this example, the declaration `using ShardMap` says that the `Foobar` type will be using an ADL,
and refers to an `advanced` clause elsewhere in the schema which must finish defining `ShardMap`.
Then, where the `advanced` clause states the string `"HAMT/v1"`,
that string is meant to [identify the ADL to use](../identifying/).
(Note that the schema also still states that it expects that type to be a [`map` kind](/docs/schemas/features/typekinds/#map) --
this is because ADLs "aren't special"; they're just presenting a plain datamodel kind to the schema layer when applied, and the schema layer still needs to turn that into a typekind.
Or from another justification: a human reading the schema should still know what typekind to expect here even if they have no idea what the ADL implementation is.)

Schema-based signalling is a very useful mechanism because it works recursively!

For example, imagine you're specifying a filesystem-like protocol,
and you want directories to use an ADL for sharding.
You can simply declare that your directory type uses an ADL,
say what it is, and say it acts like a map -- done!
This will automatically work for all directories, no matter how deeply they may be nested.
Declaring this is as simple as:

```ipldsch
type Dir union {
	| Data "leaf"
	| DirMap "dir"
}
type Data Bytes
advanced ShardMap { ADL "HAMT/v1" }
type DirMap map {String:Dir} using ShardMap
```

The Schema chapters of the documentation include a whole page on
[Indicating ADLs with Schemas](/docs/schemas/features/indicating-adls/) which talks more about this.


### Signalling with Selectors

[Selectors](/glossary/#selectors) can contain clauses which indicate that an ADL is to be applied at certain positions during the walk that the Selector is guiding.

See the `InterpretAs` clause in [the Selector spec](/specs/selectors/).
It can be placed anywhere within a Selector expression to say "apply an ADL here, before continuing the traversal".
The selector expressions which are children of that clause will then be evaluated on the synthesized ADL node.


### Signal suites

Suites which imply Signalling: some programs and protocols will implicitly (or explicitly) have _suites_ of logic which may include ADLs (and maybe other special behaviors that don't fit a clean plugin system) which are signalled by some protocol-specific mechanism.

A signal "suite" is differentiated from the other approaches to signalling in that it's been reduced down to **one value** -- or possibly even zero values, and the application itself implies a single fixed suite -- and that choice is considered suffusive in that application or protocol.

Signal suites can be implemented in several ways:

- Some applications may handle the signal value by using [code directly](#code-directly-without-signalling).
- Some applications and protocols may treat the signal value as a **shorthand**, and simply hand that off to other standard mechanisms like [schemas](#signalling-with-schemas).

Signal suites are a very common choice, because it's the one with the least cognitive overhead for application developers, and requires the least up-front planning.
If one just "starts writing code" and does no special planning, one ends up with an implicit single "suite" for the whole application.
If one does think about evolvability, but doesn't want to do anything user-configurable or extensible,
then a single "suite" is a very minimal and easy incremental step:
it's easy to add a single field to a protocol and declare it's for future-proofing by supporting a signal suite value, and start by hardcoding one value to that, and _that works_.
(It's also neat to observe that one can implement the initial behavior as a "suite" backed by a [code directly](#code-directly-without-signalling) system,
and then add a future "suite" which just hands off to use of one of the other more standardized and user-configurable signalling mechanisms!)

Signal suites aren't very standardized; by nature, they're usually "grown" (and sometimes become well-described only in retrospective).
Applications and protocols generally end up with their own specific enum values to name their well-known signal suites, and with their own unique place to convey the suite signal.

For an example of signal suites in the wild, consider IPFS.
Many of the APIs, both in the CLI and the HTTP API of IPFS, implicitly work on UnixFS.
Some of the APIs work on the raw IPLD Data Model, and don't consider UnixFS at all.
Generally, in the CLI of IPFS, it's the command name itself that's doing the "signalling" here.
In the HTTP API, similarly, a prefix of the URL path (or sometimes even a subdomain) may be doing "signalling" work and causing the UnixFS "suite" to be engaged.

While they are easy to do, note that there are several downsides to bespoke signal suites:

- First, it doesn't help you tap into other IPLD features.  For example, protocols like [Graphsync](/specs/transports/graphsync/) can only give you their maximum powers if you can communicate your ADL signalling in a standard way that Graphsync can understand.  Bespoke signal suites aren't that.
- Second, if one is working on a project that wants to build an ecosystem and become user-extensible, bespokeness is not to your advantage.  By having a signal suite of your own defining, one inevitably ends up with the need to begin "gatekeeping" the list of signal suites identifiers that are well-known in their system.  This just is no fun.

If you're building a protocol that hosts other protocols, or an application that hosts user-defined data,
it may be preferable to consider using some other more standardized and user-extensible signalling system,
such as [signalling with schemas](#signalling-with-schemas).


### Signalling in-band

Signalling in-band refers to a broad category of approaches:
if the idea is based on some part of the raw data containing a special piece of data
that says which ADL to use, we call that "in-band signalling".

We tend to recommend against in-band signalling, in broad strokes,
because it runs contrary to the idea that ADLs should be like lenses,
and that one should be able to use any ADL one wants to process some data,
or use more than one, varying the choice by context.


### Combining signalling mechanisms

You can write systems and protocols which use more than one signalling mechanism.

For example, it's no problem to have an API with parameters (or even defaults) that use some application-specific [suites](#signal-suites),
and also offers a different set of parameters that can take a user-supplied [schema](#signalling-with-schemas).

It's also no problem to define an API which takes its main signalling input from a [schema](#signalling-with-schemas),
but then allows overriding it (or disabling it) in certain positions via more signals in a [selector](#signalling-within-selectors).

Check your IPLD library implementations for what they can support.


### Other declarative signalling

We've already listed all of the declarative signalling mechanisms that are currently well-known.

However, additional systems are still possible -- just waiting for your invention and specification.
Some kind of declarative and recursive system that works without Schemas and is also independent of Selectors could be interesting, for example.
If you still want to try to specify such a system, draft a proposal!

Today, however, it's probably worth trying to use one of the systems that already exists.
See if one of our mechanisms detailed above can solve your problems today.


Signalling vs Picking an Algorithm
----------------------------------

Signalling that an ADL is to be used at all is half the battle.
Thereafter, one an IPLD library also has to react to that signal by figuring out what
ADL algorithm you wanted; getting some code that does it; and then actually applying.

These other steps are covered in the page on [Identifying ADLs](../identifying/),
and [Dynamic Loading](../dynamic-loading/).
