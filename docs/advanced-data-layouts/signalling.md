---
title: ADL Signalling
navTitle: Signalling
eleventyNavigation:
  order: 30
  synopsys: How are ADLs applied?  How does data signal that it should be interpreted with an ADL?
---

Advanced Data Layout Signalling
===============================

:::todo
- This page needs to be substantially rewritten to get to the point better.
:::

### How do I know when to use an ADL to read data?

We call this "the signalling problem".

In short: you don't.

Since the data composing the "raw", interior data of an ADL is just regular IPLD Data Model
(it must be, after all, since it's produced by some [Codec](/docs/codecs/), which by definition produces data structures describable by the Data Model),
then it follows that there's absolutely no way for this data to unambiguously indicate that it needs an ADL in order to be understood.
If there was, it would imply that there's some kind of "reserved words" in the Data Model,
which would violate some of our other central goals in IPLD, because it would mean some perfectly normal maps and lists would be invalid IPLD or gain magical meaning that they shouldn't;
we don't want any of that.

So!  Signalling must come from somewhere else.

There are a variety of valid options, and we'll explore some of them,
and examples of them, in the next sections.

Signalling Mechanisms
---------------------

- Signalling in Selectors: there is signalling for invoking ADLs at specific positions in Selector walks.
- Signalling with Schemas: there will be signalling for invoking ADLs at recurring positions in Schemas.  (It's on the roadmap, waiting for engineer allocation.)  (This one is useful because it works on recursive structures!)
- Acting directly in code: there will be choices made by people's code, regardless of any signalling mechanisms.  (This isn't really following any convention of signalling, but worth remember that it's a practical reality.)
- Suites which imply Signalling: some programs and protocols will implicitly (or explicitly) have _suites_ of logic which may include ADLs (and maybe other special behaviors that don't fit a clean plugin system) which are signalled by some protocol-specific mechanism.
	- (n.b., this is defacto how a lot of IPFS works!  All of unixfsv1 can be seen as such a "suite".)
- Signalling with "fat pointers": there might be information that is in-band to the serialized data which should signal where to use ADLs.
	- (Note that this is a *bad idea* if not combined with a "suite" or other form of larger wrapped-around signalling -- be careful not to do [in-band signalling](https://en.wikipedia.org/wiki/In-band_signaling), which generally leads to security issues or other design problems.)
	- (There have also been calls to make a standardized version of this and embed it in CIDs, creating a "CIDv2".)

:::todo
Some of the above bulletpoints have full sections below.  The others need sections too.
:::

#### Signalling with Schemas

One useful system we have which can provide an answer to the signalling question are IPLD Schemas.
Since Schemas are already a declarative way to talk about the structure of data,
it's quite reasonable that they should also be able to talk about where the structure of data uses an ADL.

A page on [Indicating ADLs with Schemas](/docs/schemas/features/indicating-adls/) talks more about this.

However, you don't have to use IPLD Schemas if you want to use ADLs.
Keep reading the next couple of sections for more alternatives that you can use to answer the signalling question.

:::todo
- a remark should be present here on the interesting limitation about *non*-recursive descriptions being somewhat high-friction to reach with this mechanism.
  (although maybe this belongs in a separate deeper-diving doc in another page).
:::

#### Direct action within libraries

:::todo
- discuss this
- link to the go-ipld-prime NodeReifier callback as an example of this
:::

#### Other declarative signalling

We have no currently active specifications for other forms of declarative signalling.

However, you can imagine making such a system yourself fairly easily:
all that's necessary is to decide what that declarative format is that you want,
and write a system that binds it to the relevant programmatic APIs of the IPLD libraries you use,
and everything should work out from there.

Additional declarative signalling specifications may be something that is ratified into IPLD in the future.
(If you'd like to drive this work, please feel free to get in touch!)

(Some systems have already done this in their own ways: for example,
parts of the Filecoin Lotus project expose "paths" in their CLI which have an extension
that is used in that application to signal where to engage ADLs.
You can do things like this in your own applications, too!
It's worth noting, however, that what the Filecoin Lotus project does here is not considered a well-specified IPLD behavior,
and in fact contains several caveats which constrains what is valid data for that application to process to a range that is far narrower than what the IPLD Data Model specifies.)
