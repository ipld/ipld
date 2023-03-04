---
title: "Transports"
eleventyNavigation:
  synopsys: "Transports are any technology for storage and transfer of collections of IPLD blocks.  Here you'll find specifications for many diverse mechanisms, both static and interactive (including CAR files and Graphsync, for example)."
  order: 50
---

Transports
==========

In these pages, we gather some information about systems you can use to transport IPLD data.

This is not an exhaustive list!  There are always other ways to carry data around.
(Sneakernet never fails; and IPLD-over-Carrier-Pigeon doesn't have an RFC, but it certainly could!)
Other technologies may exist than these that have pages here too.

When we describe "transport", we think of both file and stream formats that allow packing lots of IPLD data together,
and also more interactive transport systems which involve requests and responses.
You'll find examples of both in these pages.

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}
