---
title: Hello, World
eleventyNavigation:
  order: 10
  synopsys: The briefest possible introduction to IPLD, and what range of concepts are inside it.
---

Hello, World
============

IPLD is a system for understanding and working with data.

It's made up of a [Data Model](#data-model-and-codecs) and [Codecs](#data-model-and-codecs),
some tools for [Linking](#linking),
and then a handful of other [Powerful Features](#powerful-features)
which make developing decentralized applications a breeze.

### Data Model and Codecs

Firstly, we define a "[Data Model](/docs/data-model/)" which says what the domain and range of data is.
This is important because its the foundation of everything else we will build.

(Broadly, we can say the Data Model is "like JSON", and you've probably got the right idea -- maps, strings, lists, etc.)

Thereafter, we define "[Codecs](/docs/codecs/)", which say how it can be parsed from serial messages and emitted as serial messages.

IPLD has *lots* of Codecs.
You can choose to use different codecs based on what other applications you'd like to interface with,
or just based on what fits the performance vs human-readability that you prefer for your own applications.

### Linking

A key part of IPLD is its ability to link together documents.

IPLD linking isn't like some other forms of linking, like URLs (which refer to "locations" of data) --
instead, it's based on content-addressing (which means refering to data by a hash of its content, a process which does not involve data _location_).
This means large graphs of documents can be linked together, but you don't need to go look online in some specific place to get the rest of the linked documents; you can get them anywhere that content can be found.

:::todo
- Linking needs a whole page.  Put it under data model docs?
:::

### Powerful Features

Then we provide a couple other ways to handle data via the Data Model:
[Schemas](/docs/schemas/), which can describe the structure of data, and be used for validation, detecting structure, and some kinds of basic data transformation;
and [Advanced Data Layouts](/docs/advanced-data-layouts/), which let us do things like assemble complex data structures to be presented as simpler ones (so you can work on them "like basic Data Model", even if they have more power, such as sharded, or encryption, or etc).

### Diagram

<a href="../what-is-ipld.png">
<img src="../what-is-ipld.png" width=100%>
<small><i>(click to enlarge)</i></small>
</a>

### Up Next

For the next step up in level of details, you can continue with [The Brief Primer](/docs/intro/primer/).

Otherwise, you can jump anywhere throughout the docs and specs using the nav menu at the left.
(If you're on a mobile screen, tap the menu icon at the top left of the page to open the nav menu.)
