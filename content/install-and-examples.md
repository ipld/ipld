+++
type = "page"
title = "Install & Examples"
description = "A description"
tags = [ "page" ]
date = "2016-11-10"
+++

# Install & Examples

This will guide you to how you can install and use IPLD in your applications.


## Install

We currently provide two different IPLD implementations.

{{ fill out more with what you can do with the following packages }}

### JavaScript

{{< highlight bash >}}
$ npm install --save ipld
{{< /highlight >}}

{{ add usage }}

### Go

{{< highlight bash >}}
$ go get github.com/ipld/go-ipld
{{< /highlight >}}

{{ add usage }}

## Examples

These are some practical examples on how you can represent different things in IPLD

**A link, represented in json as a "link object"**

{{< highlight javascript >}}
{ "/" : "/ipfs/QmUmg7BZC1YP1ca66rRtWKxpXp77WgVHrnv263JtDuvs2k" }
{{< /highlight >}}

`/` is the link key

`/ipfs/QmUmg7BZC1YP1ca66rRtWKxpXp77WgVHrnv263JtDuvs2k` is the link value

**Object with a link at foo/baz**

{{< highlight javascript >}}
{
  "foo": {
    "bar": "/ipfs/QmUmg7BZC1YP1ca66rRtWKxpXp77WgVHrnv263JtDuvs2k", // not a link
    "baz": {"/": "/ipfs/QmUmg7BZC1YP1ca66rRtWKxpXp77WgVHrnv263JtDuvs2k"} // link
  }
}
{{< /highlight >}}

**Object with pseudo "link object" at `files/cat.jpg` and actual link at `files/cat.jpg/link`**

{{< highlight javascript >}}
{
  "files": {
    "cat.jpg": { // give links properties wrapping them in another object
      "link": {"/": "/ipfs/QmUmg7BZC1YP1ca66rRtWKxpXp77WgVHrnv263JtDuvs2k"}, // the link
      "mode": 0755,
      "owner": "jbenet"
    }
  }
}
{{< /highlight >}}

When dereferencing the link, the map itself is to be replaced by the object it points to unless the link path is invalid.

The link can either be a multihash, in which case it is assumed that it is a link in the `/ipfs` hierarchy, or directly the absolute path to the object. Currently, only the `/ipfs` hierarchy is allowed.

If an application wants to use objects with a single `/` key for other purposes, the application itself is responsible to escape the `/` key in the IPLD object so that the application keys do not conflict with IPLD's special `/` key.

### Datastructure Examples

It is important that IPLD be a simple, nimble, and flexible format that does not get in the way of users defining new or importing old datastractures. For this purpose, below I will show a few example data structures.

#### Unix Filesystem

**A small File**

{{< highlight javascript >}}
{
  "data": "hello world",
  "size": "11"
}
{{< /highlight >}}
