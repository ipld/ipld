---
eleventyNavigation:
  key: "Codecs"
  parent: "Docs"
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

{{ collections.all | eleventyNavigation("Known Codecs") | eleventyNavigationToHtml({ showExcerpt: true }) | safe }}
