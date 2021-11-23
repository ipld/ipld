---
title: ADL Signalling
navTitle: Signalling
eleventyNavigation:
  order: 30
  synopsys: How are ADLs applied?  How does data signal that it should be interpreted with an ADL?
---

Advanced Data Layout Signalling
===============================

[Advanced Data Layouts](..) are a feature of IPLD which gives us "lenses" to view data in another way.

This page is about answering the question: "How do I know when to use an ADL to read data?"

### How do I know when to use an ADL to read data?

Trick question.  You don't.

Using an ADL to read data is **_always_ optional**.
If you don't want to use an ADL to read data, it's still legible --
just as the [plain data model](/docs/data-model/) content,
as a [codec](/glossary#codec) already gave it to you.

You can also use different ADLs to read the same data.
It's like putting on a different pair of glasses -- maybe some do
a better job of making the data legible than others!

### That wasn't helpful!

Okay, okay.  It was important to get that out of the way, though --
remember, there's going to be more than one answer coming up,
and several of them can be "correct" at the same time.

We call the question about how to decide to use an ADL
"the signalling problem".

There is more than one solution, and we call those "signalling mechanisms".


Signalling Mechanisms
---------------------

So, we've identified  "the signalling problem".  Now let's identify solutions!

Some of these will be design patterns; some are concrete and standardized protocol solutions.

In brief:

- Signalling in Selectors: there is signalling for invoking ADLs at specific positions in Selector walks.
- Signalling with Schemas: there will be signalling for invoking ADLs at recurring positions in Schemas.  (It's on the roadmap, waiting for engineer allocation.)  (This one is useful because it works on recursive structures!)
- Acting directly in code: there will be choices made by people's code, regardless of any signalling mechanisms.  (This isn't really following any convention of signalling, but worth remember that it's a practical reality.)
- Suites which imply Signalling: some programs and protocols will implicitly (or explicitly) have _suites_ of logic which may include ADLs (and maybe other special behaviors that don't fit a clean plugin system) which are signalled by some protocol-specific mechanism.
	- (n.b., this is defacto how a lot of IPFS works!  All of unixfsv1 can be seen as such a "suite".)
- Signalling with "fat pointers": there might be information that is in-band to the serialized data which should signal where to use ADLs.
	- (Note that this is a *bad idea* if not combined with a "suite" or other form of larger wrapped-around signalling -- be careful not to do [in-band signalling](https://en.wikipedia.org/wiki/In-band_signaling), which generally leads to security issues or other design problems.)
	- (There have also been calls to make a standardized version of this and embed it in CIDs, creating a "CIDv2".)

Let's discuss each of these in a short section.
(As a rule of thumb, when you're designing a protocol -- you should probably be able to link to
one of these sections and say "this: this is what this protocol is doing"!)

### Code directly, without signalling

:::todo
- discuss this
- link to the go-ipld-prime NodeReifier callback as an example of this
:::


### Signalling within Selectors



:::todo
- link to in-flight PRs
:::


### Signalling with Schemas

IPLD Schemas allow you to name "types" in data, and also allow you to declare
that you expect some data to processed by an ADL.

For example, the Schema DSL for this looks something like the following:

```ipldsch
advanced ShardMap { ADL "HAMT/v1" }
type Foobar map {String:String} using ShardMap
```

This is a very useful mechanism because it works recursively!

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


### Signal suites

A signal "suite" is differentiated from the other approaches to signalling in that it's been reduced down to **one value**.

Signal suites can be implemented in several ways:

- Some applications may handle the signal value simply by [code directly](#code-directly-without-signalling).
- Some applications and protocols may treat the signal value as a **shorthand**, and simply hand that off to other standard mechanisms like [schemas](#signalling-with-schemas).

Signal suites are a very common choice, because it's the one with the least cognitive overhead for application developers, and requires the least up-front planning.
It's easy to leave a cutout field in a protocol and declare it's for future-proofing by supporting a signal suite value, and _that works_.

Signal suites aren't very standardized, though.
Applications and protocols generally introduce their own specific enum values to name their well-known signal suites.
Thereafter, it also becomes unavoidable for the application or protocol author to need to "gatekeep" the list of signal suites identifiers that are well-known in their system.
If you're building a protocol that hosts other protocols, or an application that hosts user-defined data,
you should prefer using some other more standardized and user-extensible signalling system such as [signalling with schemas](#signalling-with-schemas).


### Signalling in-band

TODO

- by having wrapper structs (or other format of your choice -- this is roughly the same as the list of options you get with unions in the schema system, honestly)
- proposal of CIDv2 (roughly the same, just removes the question of what to call the fields in the wrapper struct, makes it less stringy, arguably shortens things (dubious))


### Combining Signalling Mechanisms

You can write systems and protocols which use more than one signalling mechanism.

For example, it's no problem to have an API with parameters (or even defaults) that use some application-specific [suites](#signal-suites),
and also offers a different set of parameters that can take a user-supplied [schema](#signalling-with-schemas).

It's also no problem to define an API which takes its main signalling input from a [schema](#signalling-with-schemas),
but then allows overriding it (or disabling it) in certain positions via more signals in a [selector](#signalling-within-selectors).

Check your IPLD library implementations for what they can support.


### Other declarative signalling

We've already listed all of the declarative signalling mechanisms that are currently well-known.

However, additional systems may be possible.
Some kind of declarative and recursive system that works without Schemas could be interesting, for example.

However, it's probably worth trying to use one of the systems that already exists.
See if it solves your problems first.

(If you still want to create something new afterwards, draft a proposal!)



Can't you just bake this in?
----------------------------

Nope.  IPLD describes ADLs as a plugin system, but leaves the trigger conditions and the assembly to you, on purpose.

Two reasons:

1. The IPLD Data Model does not have "reserved words".
2. It's *good* that ADLs

Since the data composing the "raw", interior data of an ADL is just regular IPLD Data Model
(it must be, after all, since it's produced by some [Codec](/docs/codecs/), which by definition produces data structures describable by the Data Model),
then it follows that there's absolutely no way for this data to unambiguously indicate that it needs an ADL in order to be understood.
If there was, it would imply that there's some kind of "reserved words" in the Data Model,
which would violate some of our other central goals in IPLD, because it would mean some perfectly normal maps and lists would be invalid IPLD or gain magical meaning that they shouldn't;
we don't want any of that.

So!  Signalling must come from somewhere else.

There are a variety of valid options, and we'll explore some of them,
and examples of them, in the next sections.
