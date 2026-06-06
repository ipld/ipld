---
title: "Specs: Prolly Tree ADL"
navTitle: "Prolly Tree ADL"
---

Prolly Tree ADL
===============

The Prolly Tree ADL provides a [map](/docs/data-model/kinds/#map-kind) interface, while sharding data internally.

Prolly trees can support large volumes of ordered key-value pairs with configurable chunking strategies for how wide tree nodes should be.
They can also be merged determenistically with each other if they have compatible chunking configurations while skipping over similar key ranges.
In general they are a useful building block for database indexes and large append only logs which wish to make use of sparse querying.

- [Prolly Tree ADL Specification](./spec/)
