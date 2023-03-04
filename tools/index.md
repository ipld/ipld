---
title: "Tools"
eleventyNavigation:
  order: 60
---

IPLD Tools
==========

Here are a collection of links to tools that work with IPLD, or empower your development processes when working with IPLD.


### IPLD CLI

The [ipldtool](https://github.com/ipld/go-ipldtool) (or just `ipld` in the command line)
is meant to provide a playful, pleasant CLI interface for working with data using IPLD.

It contains basic operations like `ipld read` (which includes the ability to do a variety of codec transformations),
`ipld put` (which lets you store a bunch of data, and get links to it, and thus build graphs),
and also contains subcommands for `ipld schema` usage (parsing, compiling -- even running codegen tools based on them)
and other advanced usage.


### IPLD Explorer

https://explore.ipld.io/

The IPLD Explorer loads and visualizes IPLD data, and lets you navigate it interactively.

Some well-known example datasets are included in the front page, which you can navigate to get a quick idea of what IPLD is all about.

Some datasets using unixfs are specially treated, and can be navigated by the filesystem-like abstraction offered by unixfs.
(In the future, we hope to make these features more generalized, by the use of ADLs; at present, unixfs's special behaviors are hardcoded.)

Note that to be navigatable in the IPLD Explorer, the data has to be found somewhere in the public IPFS network swarm. Alternatively, a CAR file containing a DAG can be uploaded directly to the explorer for inspection.
(Code contributions to increase the variety of ways data can be supplied to the IPLD Explorer would be welcome!)

The source code for the IPLD Explorer is here: https://github.com/ipld/explore.ipld.io


### CID Inspector

https://cid.ipfs.tech/

This web tool allows pasting a CID into the form to have it broken down and explained:
it shows the CID version, multihash indicator code, the multicodec indicator code, etc, broken out legibly.


### Unixfs DAG visualizers

https://dag.ipfs.tech/

This web tool shows what kind of internal sharding can take place in storing a file in Unixfs.

Note that this visualizer is emphatic to Unixfs -- Unixfs data structuring is one of many (many) ways to structure data in IPLD.
The key takeaways from playing with this tool should be that: yes, you can store infinite amounts of data, scalably, in a merkle tree; and yes, you can parameterize that in many ways to tune for your desired outcomes.


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
