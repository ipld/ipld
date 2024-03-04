---
title: "Data Model"
eleventyNavigation:
  order: 44
---

The IPLD Data Model
===================

Overview
--------

The IPLD Data Model is a central part of IPLD.
It describes what data is representable in IPLD --
for example, booleans, integers, textual strings, maps and lists, etc.

The Data Model describes these data ranges in the abstract.

The Data Model is roughly similar to what you know and expect from JSON --
but we add a few more critical kinds of data: bytes, and _links_ (which are content-addressable, hash-based links).
See the [kinds](./kinds/) page for more details on these.

Having this understanding of a Data Model lets us do things like specify
[pathing](./pathing/) and [traversals](./traversal/) over any data which conforms it,
which lets us write "generic" code to examine and manipulate data in the Data Model.

Then other parts of IPLD specify in more detail how to move data in and out:

- [Codecs](/docs/codecs/) specify exactly how these information in the Data Model can be transcribed back and forth into serialized bytes.
- [IPLD Schemas](/docs/schemas/) provide additional optional tooling on top of the Data Model which can further refine, describe, and constrain the range of acceptable
data values (as well as do certain kinds of basic lensing and transforms).
- [Advanced Data Layouts](/docs/advanced-data-layouts/) are a kind of plugin system which allows making complex data visible as "plain" Data Model, which is useful for programmatic access.


Motivation
----------

There is not **one** block format but **many** serial formats widely used today in content addressed data structures.
We assume that we'll see more of these block formats in the future and not fewer.
It is quite clear then that a reasonable and more future-proof approach to using these data structures is to be serial format agnostic.

The data model defines a common representation of basic types that **are easily representable by common programming languages**
and **found in the most common and successful serialization formats**.
By aiming to select and standardize around these most common key elements,
we hope to be able to build the smoothest bridges to the largest amount of existing serial data,
and also reach for low friction for libraries, which should be able to be built using familiar native types in a programmer's preferred language.


Pages within Data Model
-----------------------

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}
