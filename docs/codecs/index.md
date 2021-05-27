---
title: "Codecs"
eleventyNavigation:
  order: 42
---

IPLD Codecs Documentation
=========================

IPLD codecs are functions that transform IPLD Data Model into serialized bytes so you can send and share data,
and transform serialized bytes back into IPLD Data Model so you can work with it.

There are lots of supported IPLD codecs, and you can write your own.

Related to IPLD codecs, there is a specification known as "multicodecs", which provides some identifier codes.
These Multicodec identifier codes can be used in applications and protocols that support multiple IPLD codecs.
Typically these identifier codes are associated with serialized data so that it's clear how to deserialize it.
(You may wish to see CIDs for a typical complete usage story that includes the ways multicodecs are typically used.)

Known Codecs
------------

Some codecs that are widely known in IPLD are documented here.

(Remember, this is not an exhaustive list of codecs.  But it's some of the ones we use most widely!)

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url+"known/") }}

:::todo
- Several more codecs need short pages herein.
  - Each of these pages should include a humane description of why we might recommend or disrecommend that codec.
  - Each of these pages should link to the spec page for that same codec.
:::

Codecs in Code
--------------

Here are pointers to key parts of how Codecs are seen implemented in some of the IPLD libraries:

- in Golang:
	- a pair of functional interfaces describe codecs:
	  [ipld.Encoder (godoc)](https://pkg.go.dev/github.com/ipld/go-ipld-prime#Encoder) and
	  [ipld.Decoder (godoc)](https://pkg.go.dev/github.com/ipld/go-ipld-prime#Decoder)
