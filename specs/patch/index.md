---
title: "IPLD Patch Specs"
navTitle: "Patch"
eleventyNavigation:
  order: 70
  synopsys: "A declarative Patch system (based on JSON Patch) exists for working with IPLD."
---

IPLD Patch
==========

IPLD Patch is a system for declaratively specifying patches to a document, which can then be applied to produce a new, modified document.

IPLD Patch is roughly based on the [JSON Patch (RFC 6902)](https://datatracker.ietf.org/doc/html/rfc6902/) specification -- it should feel very familiar.

For the full details, see the [Fixtures](./fixtures/) -- the test fixture material is both for implementers, but also for end users, and provides rich examples and explanatory notes.

In brief highlights:

- There are six operations -- add, replace, remove, copy, move, test.
  - (This is the same as RFC 6902.)
- Operations are supplied in a list, and applied linearly.  Any operation erroring results in the entire patch not being applied.
  - (This is the same as RFC 6902.)
- Operations do not create parent paths automatically.
  - (This is the same as RFC 6902.)
- Because this is IPLD, both the subject data, as well as the patch instructions themselves, can be communicated in any codec.
  (e.g. you can easily serialize a patch in [CBOR](/docs/codecs/known/dag-cbor), and apply it to a document encoded in [dag-pb](/docs/codecs/known/dag-pb), and so on).
- Furthermore: because the Patch system is specified over the IPLD [Data Model](/docs/data-model/), you can expect it to work over other layers as well --
  for example, Patches can be applied over data processed with [Schemas](/docs/schemas/) or [ADLs](/docs/advanced-data-layouts/).
- The Patch system in IPLD is expected to maintain order whenever possible.  Wherever this is ambiguous (e.g. operations adding data to a map under a key that didn't previously exist), operations are defined as appending to the end of the relevant node.

See the [Fixtures](./fixtures/) for more details.
