---
title: Advanced Data Layouts
eleventyNavigation:
  order: 46
  synopsys: "Advanced Data Layouts are lenses applied to data in IPLD to empower data, and are used for features like sharding.  Specifications and fixtures for some well known ADLs are found here."
---

Advanced Data Layout Specifications
===================================

Here are collected some specifications for ADLs that are widely known and commonly used in the IPLD ecosystem.

(For more on the *concept* of ADLs -- what they are, what they do, and how they fit together --
see [ADLs in the docs chapters](/docs/advanced-data-layouts/) instead.)

---

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}
