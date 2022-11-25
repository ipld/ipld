---
title: "Goals"
weight: 28
description: "Outlines the IPLD Schema goals."
---

1. Provide a reasonable, easy to use, general type system for declaring useful properties about data.
2. Compose nicely over the [IPLD Data Model](/docs/data-model/): Schemas should be usable with any data format you can build an [IPLD Codec](/docs/codecs/) for.
3. Be efficient to verify: predictable; roughly linear in the size of the data and Schema; and absolutely not turing complete.
4. Be language-agnostic: many compatible implementations of the Schema tooling should exist, as well as bindings for many languages.
5. Assist rather than obstruct migration: we expect to be working with _existing_ data; we need to work well on this case.
6. Be a tool that adds value in collaboration and documentation: Schemas should provide a natural place for API documentation, and be a reasonable design literature.

In total: **Make developing decentralized & distributed applications easier, clearer, and more robust.**
