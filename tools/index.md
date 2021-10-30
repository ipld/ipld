---
title: "Tools"
eleventyNavigation:
  order: 60
---

IPLD Tools
==========

Here are a collection of links to tools that work with IPLD, or empower your development processes when working with IPLD.

### the ipldtool

The [ipldtool](https://github.com/ipld/go-ipldtool) (or just `ipld` in the command line)
is meant to provide a playful, pleasant CLI interface for working with data using IPLD.

It contains basic operations like `ipld read` (which includes the ability to do a variety of codec transformations),
`ipld put` (which lets you store a bunch of data, and get links to it, and thus build graphs),
and also contains subcommands for `ipld schema` usage (parsing, compiling -- even running codegen tools based on them)
and other advanced usage.

### the ipld explorer

https://explore.ipld.io/

(This needs no introduction ;)  Just look at it!)

---

:::todo
- We have several other pieces of content like this, but need docs on them!
- e.g. Syntax highlighter plugins for IDEs
- e.g. the schema-inferrer tools
- etc!
:::

---

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}
