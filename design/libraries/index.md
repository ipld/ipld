---
title: "Library Design Guidance"
navTitle: "Libraries"
eleventyNavigation:
  order: 50
---

Library Design Guidance
=======================

This directory contains some documentation of recommendations for
library authors who want to make IPLD libraries in a new language
(or, perhaps for readers who want to understand an existing library better).

Some of the information expressed here comes down to opinions more so than specification;
what is good ergonomics may vary wildly per language, so take these as
recommendations rather than strictures.

---

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}
