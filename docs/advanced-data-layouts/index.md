---
title: Advanced Data Layouts
eleventyNavigation:
  order: 46
---

Advanced Data Layouts
=====================

Advanced Data Layouts ("ADLs") are an IPLD convention for customizing how to see and interact with some data.
ADLs can be thought of like a "lens" for data: they can take some data and make it legible in a different way.

ADLs are typically implemented as some kind of plugin system in IPLD libraries.

One of the most common uses of ADLs is sharded datastructures.
However, other uses are possible.
(For example, IPFS uses ADLs to make UnixFS's user-facing pathing work.
Some people have researched using ADLs as part of encryption system design.
More examples will be discussed below!)

There's a lot to cover about ADLs, so we've split most of the content up into pages:

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}

There are also pages in the specs chapters about ADLs: see [specs/advanced-data-layouts](/specs/advanced-data-layouts/).
Those pages talk mostly about common and popular ADLs that are well known, providing specifications (and including fixture data);
whereas the docs you'll find in these pages here are about the general concept, and how to implement your own.

