---
title: Hello, World
eleventyNavigation:
  order: 10
  synopsys: An introduction to IPLD, and what range of concepts are inside it.
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
instead, it's based on content-addressing (which means referring to data by a hash of its content).
IPLD uses a format called [CIDs](/glossary/#cid) for this, to be specific.

What's neat about content-addressing is that because it does _not_ involve talking about data _location_,
it's inherently friendly to decentralization.
This means large graphs of documents can be linked together,
and once you have some of the document graph,
you don't need to go look online _to some specific server_ to get the rest of the linked documents;
you can get them anywhere that content can be found.

Content-addressing also separates document _identity_ from discussion of _authority_.
This again contributes to decentralization-friendly systems:
once you get part of a document graph, and have decided it's the document you're looking for,
you can get all the related documents without having to bounce through some other
system to re-determine what the authoratitive document is for every related document --
you already know what that is, because you already have its content ID.

[See more about Content-Addressing on ProtoSchool](https://proto.school/content-addressing)!

### Powerful Features

Then we provide a couple other ways to handle data via the Data Model:
[Schemas](/docs/schemas/), which can describe the structure of data, and be used for validation, detecting structure, and some kinds of basic data transformation;
and [Advanced Data Layouts](/docs/advanced-data-layouts/), which let us do things like assemble complex data structures to be presented as simpler ones (so you can work on them "like basic Data Model", even if they have more power, such as sharded, or encryption, or etc).

### Diagram

<a href="../../../img/what-is-ipld.svg">
<img src="../../../img/what-is-ipld.svg" width=100%>
<small><i>(click to enlarge)</i></small>
</a>

- The `Raw Data Model` is how IPLD represents data. It is designed for maximal utility while being practical to support in a wide variety of programming languages and able to represent a diversity of data encodings.
- `Schemas` are a means of formalizing the shape of data structures within the bounds of the Data Model and may present the data in an altered form. (e.g. a "struct" containing a fixed list of fields, serialized as an array with fixed ordering).
- `Advanced Data Layouts` couple programmatic functionality with data structures, allowing for complex data structuring while presenting as the Data Model (e.g. encryption, large multi-block spanning data structures). Note that ADL APIs are more stable for reading than writing as write APIs are under development.
- `Codecs` are bound by the data model to include a set of data types, including links (currently represented as CIDs). Codecs supporting a subset of the Data Model (DAG-PB, plain CBOR, plain JSON, etc.) likewise have limited support from functionality from Data Model components.
- `Blocks` are arbitrary arrays of bytes identified by a CID (content identifier, including hash and codec details). IPLD doesn't concern itself with the source or nature of these bytes as long as its Codecs can read and/or write them. Limitations (size, location, availability, etc.) are concerns of the data source.
- The `Universal Interface` is the interface that applications use which abstracts over top of the raw data model and lenses like Schemas and ADLs. It can then be used by higher level APIs to load and manipulate data.
- `Traversal` is the act of following links and fields inside IPLD data.
- You can `Print` IPLD data in a human-readable format which preserves it's structure.
- `Selectors` are expressions that describe a traversal over an IPLD dag and "select" a subset of nodes during that walk.
- You can `Transform` IPLD data using different techniques like traversing it and using selectors to choose nodes to modify.
- You can also `Patch` data using the Universal Interface to apply changes to it. Note that patch APIs are currently [under development](https://github.com/ipld/go-ipld-prime/pull/350).

### Up Next

For the next step up in level of details, you can continue with [The Brief Primer](/docs/intro/primer/).

Otherwise, you can jump anywhere throughout the docs and specs using the nav menu at the left.
(If you're on a mobile screen, tap the menu icon at the top left of the page to open the nav menu.)
