+++
type = "page"
title = "Tutorial"
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
{{< example title="Bitcoin - Block" text="Lorem ipsum dolor sit amet, te case moderatius est, ea sea malis oportere definitiones. Quod doctus perpetua eu quo, pro oblique constituam te. Pri an nobis gloriatur adipiscing, eum error dicit fabellas te. Qui exerci dolore expetendis ut, ea tantas partem splendide ius. Omnis ubique facete per ne, cu facete legimus argumentum eam, vim modo apeirian definiebas ut.<br/><br/>Ex salutandi prodesset mea. Suas electram vis ei, diceret democritum deterruisset sed ne. Ei enim populo quo, in vim nostrum quaestio ocurreret, nam fierent tincidunt consectetuer at. Mucius dissentiet sed ne, quo ut veri efficiantur. Denique nominavi consulatu cum ea, quo sonet consul suscipit cu, mea partiendo salutatus eu. Ei eius voluptua per." lines="9" language="json">}}
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
