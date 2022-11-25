---
title: "string-domain"
weight: 15
description: "This document is part of a series on [tricky choices](..) in IPLD design."
---

{{< alert icon="📝" context="note">}}

- Significant content work is needed here!
{{< /alert >}}

## Comparing Other Projects

### git

Git makes a very similar set of choices to what IPLD has also chosen:

- UTF-8 is advised, and presumed;
- more specifically, NFC normalization is the default behavior;
- but other encodings are treated as a warning, at most;
- and existing data will never be forcibly re-encoded, since that may be lossy.

The documentation for [`git-commit-tree`](https://git-scm.com/docs/git-commit-tree#_discussion)
discusses character encoding behaviors of Git in greater detail.
