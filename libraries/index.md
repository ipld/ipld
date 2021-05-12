---
title: "Libraries"
eleventyNavigation:
  order: 40
---

IPLD Libraries
==============

There are many libraries available for generating, reading, and working with IPLD data.

Here we index some of them and provide some examples of what working with them may look like.
Most libraries will have their own additional documentation; we'll link to that rather than repeat it here.

---

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}
