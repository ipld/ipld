---
title: "Docs"
eleventyNavigation:
  order: 10
---

IPLD Documentation
==================

These chapters in the documentation section provide human-readable guides to IPLD technology.

(You may also want to check out the [specs](/specs/) chapters,
or the [design notes](/design/),
or information on [libraries](/libraries).)

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}
