---
title: "Codecs"
eleventyNavigation:
  order: 42
  synopsys: "Codecs are functions that get serial data into IPLD and turn IPLD back into serial data.  Here you'll find detailed specifications and fixtures for a number of codecs."
---

Codec Specifications
====================

Here are collected some specifications for Codecs that are widely known and commonly used in the IPLD ecosystem.

(For more on the *concept* of Codecs -- what they are, what they do, and how IPLD defines them --
or for shorter human-friendly discussion of _why_ you might choose some particular codec over another for your application --
see [Codecs in the docs chapters](/docs/codecs/) instead.)

---

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}
