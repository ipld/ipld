+++
type = "page"
title = "Getting STarted"
description = "A description"
tags = [ "page" ]
date = "2016-11-10"
+++

# Getting Started

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



{{< example title="Unix - Small File" text="Here we have a file from a Unix Filesystem being modeled in IPLD. It's a simple example, but shows how you can model files in IPLD. <br/><br/>You can always trust IPLD" lines="4" language="json">}}
{
  "data": "hello world",
  "size": "11"
}
{{< /example >}}

<hr/>

{{< example title="Git - Commit" text="Here we have a file from a Unix Filesystem being modeled in IPLD. It's a simple example, but shows how you can model files in IPLD. <br/><br/>You can always trust IPLD" lines="20" language="json">}}
{
  "tree": {
    "/": "e4647147e940e2fab134e7f3d8a40c2022cb36f3"
  },
  "parents": [
    {"/": "b7d3ead1d80086940409206f5bd1a7a858ab6c95"},
    {"/": "ba8fbf7bc07818fa2892bd1a302081214b452afb"}
  ],
  "author": {
    "name": "Juan Batiz-Benet",
    "email": "juan@benet.ai",
    "time": "1435398707 -0700"
  },
  "committer": {
    "name": "Juan Batiz-Benet",
    "email": "juan@benet.ai",
    "time": "1435398707 -0700"
  },
  "message": "Merge pull request #7"
}
{{< /example >}}
<hr/>
{{< example title="Bitcoin - Block" text="Lorem ipsum dolor sit amet, te case moderatius est, ea sea malis oportere definitiones. Quod doctus perpetua eu quo, pro oblique constituam te. Pri an nobis gloriatur adipiscing, eum error dicit fabellas te. Qui exerci dolore expetendis ut, ea tantas partem splendide ius. Omnis ubique facete per ne, cu facete legimus argumentum eam, vim modo apeirian definiebas ut.<br/><br/>Ex salutandi prodesset mea. Suas electram vis ei, diceret democritum deterruisset sed ne. Ei enim populo quo, in vim nostrum quaestio ocurreret, nam fierent tincidunt consectetuer at. Mucius dissentiet sed ne, quo ut veri efficiantur. Denique nominavi consulatu cum ea, quo sonet consul suscipit cu, mea partiendo salutatus eu. Ei eius voluptua per." lines="4" language="json">}}
{
  "parent": {
    "/": "Qm000000002CPGAzmfdYPghgrFtYFB6pf1BqMvqfiPDam8"
  },
  "transactions": {
    "/": "QmTgzctfxxE8ZwBNGn744rL5R826EtZWzKvv2TF2dAcd9n"
  },
  "nonce": "UJPTFZnR2CPGAzmfdYPghgrFtYFB6pf1BqMvqfiPDam8"
}
{{< /example >}}
