---
title: Advanced Data Layouts
eleventyNavigation:
  order: 46
---

Advanced Data Layouts
=====================

Advanced Data Layouts ("ADLs") are a way to take data in IPLD and customize additional ways to see and interact it.
ADLs can be thought of like a "lens" for data: they can take some data and make it legible in a different way.

The result of processing data with an ADL is still a [Data Model](/docs/data-model/) [Node](/docs/data-model/node/),
which means other IPLD systems (like [pathing](/docs/data-model/pathing/) and [traversals](/docs/data-model/traversal/) and [Selectors](/specs/selectors/)) work transparently over ADLs.

One of the most common uses of ADLs is sharded datastructures.
However, ADLs are a fairly open-ended plugin system; other uses are also possible.

There's a lot to cover about ADLs, so we've split most of the content up into pages:

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}

There are also pages in the specs chapters about ADLs: see [specs/advanced-data-layouts](/specs/advanced-data-layouts/).
Those pages talk mostly about common and popular ADLs that are well known, providing specifications (and including fixture data);
whereas the docs you'll find in these pages here are about the general concept, and how to implement your own.
