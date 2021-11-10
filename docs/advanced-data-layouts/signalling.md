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

There are a variety of valid options:

- [Signalling with Schemas](#signalling-with-schemas)
- [Direct action within libraries](#direct-action-within-libraries)
- [Other declarative signalling](#other-declarative-signalling)

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
