---
title: "Tricky Choices"
eleventyNavigation:
  order: 60
---

Pages in Tricky Choices
-----------------------

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}
