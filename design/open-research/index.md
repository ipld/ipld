---
title: "Open Research"
eleventyNavigation:
  order: 90
---

Open Research Problems
======================

In this section of the IPLD design notes, we cover some known problem areas.
These are problems that require significant research (or significant prototyping -- or both),
and would provide considerable value to the IPLD ecosystem... but also should not be underestimated.

Pages in Open Research Problems
-------------------------------

{{ collections.all | eleventyNavigation(page.url) | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}
