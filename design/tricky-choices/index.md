---
title: "Tricky Choices"
eleventyNavigation:
  order: 60
---

Pages in Tricky Choices
-----------------------

{{ collections.all | eleventyNavigation(page.url) | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}
