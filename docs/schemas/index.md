---
title: Schemas
eleventyNavigation:
  order: 48
---

IPLD Schemas
============

IPLD Schemas are an [interface definition language](https://en.wikipedia.org/wiki/Interface_description_language).
They provide a way for protocol authors to define types, and process data using those types.
They can be used to give structure to protocol development,
to save developer effort by providing common patterns of data arrangement and data validation,
and enable other powerful development tooling.

:::info
This is a _docs_ chapter, contrasted with a _specs_ chapter -- if you want more mechanical details
(including, especially, the schema-schema!),
you may prefer to jump over to [Schemas in the specs chapters](/specs/schemas/) instead.
:::

### Motivation

IPLD Schemas are meant to be useful as a _design language_: they should make specifying protocols and coordinating groups of developers and their applications easier.

IPLD Schemas are meant to work well when "working in the open".
It should be easy to develop protocols that are described in IPLD Schemas
while evolving them incrementally,
it should be easy to do this even with multiple groups of developers,
and it should be easy to do this even without centralized or sequential communication between developers.

IPLD Schemas are meant to make developing and describing decentralized protocols easier.
They'll never introduce features which fixate upon client-server dichotomies;
and they have rich support especially suited for describing immutable document graphs based
on [content-addressable](/glossary/#content-addressing) [linking](/glossary/#link).

### Key Features

IPLD Schemas make some unique design choices in order to pursue the motivations above.
These are some the biggest ones to note first, in order to get a quick impression of the system:

IPLD Schemas are founded on the principle of _structural typing_.
Structural typing means that the names of types aren't expected to be found in the serialized data;
instead, whether a schema matches the data or not is decided based on whether the structural outline of the data matches the structural description in the schema.
The practical impact of this is **IPLD Schemas can be used to describe pre-existing data**.

IPLD Schemas are also noteworthy for the definition of a _type_ (the logical view of the data)
also requiring an associated _representation strategy_ for that type (which says how it is mapped into the IPLD [Data Model](/docs/data-model), and thence how it's serialized).
In addition to further supporting that **IPLD Schemas can be used to describe existing protocols**,
this lets protocol authors tune many details of their serialization (see more about this below).

IPLD Schemas are based on a concept of "unification": you take some data, and a schema,
and you attempt to "unify" them:
if successful, you now have typed data;
if unification fails... it's no big deal: you still have plain data,
and so _you can try again_ with a different schema.
This means **developers can compose their own protocol evolution and migration strategies freely with IPLD Schemas**.

IPLD Schemas are, of course, based on IPLD.
Because we get to reuse the layers of IPLD's [Data Model](/docs/data-model/) and IPLD's [Codecs](/docs/codecs/),
IPLD Schemas are a design language that **can be used with many different serial formats**.
IPLD Schemas also play well with other IPLD features,
such as always having well-defined [traversal](/docs/data-model/traversal) behaviors for all types,
supporting description of documents split across [links](/glossary/#link),
hosting [ADL signalling](./features/indicating-adls/), and more.

**IPLD Schemas allow the developer to exist at a point of their own choosing on
a gradient between "schema-free" and "schema-required" protocols.**
Some representation strategies will produce data as rich and human-readable (but as bulky) as JSON;
other representation strategies can produce data as compact on the wire as Protobuf
(but correspondingly, that data will be inscrutable without the schema).
IPLD Schemas even let you mix and match:
you can use rich human readable data in some parts of the protocol,
and use denser representations in other parts of the same protocol.
IPLD Schemas default to human-readable strategies, but ultimately,
the choice is yours.


Diving Further In
-----------------

The Schema documentation is split into many subpages:

---

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}

---
