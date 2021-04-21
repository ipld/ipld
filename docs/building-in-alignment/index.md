---
title: "Building in Alignment"
---

Building in Alignment with IPLD
===============================

Building "in alignment" with IPLD -- meaning, building protocols such that they're interpretable by IPLD, _**even if** you don't use IPLD libraries yourself_ -- is fairly easy to do.

The asks are simple:

- Build using JSON or CBOR;
- That's it.

The one and only thing we want to steer people actively away from is schema-required formats -- such as protobuf -- because these are very difficult (if not impossible) to support within the level of information that CIDs and Multicodec indicators can readily convey.
A data format is just not a good citizen for the merkle forest if it has stripped away all self-description and become a schema-required format.

...

Okay, okay, there's a few more asks:

- If you're using CBOR, use the fixed length forms of maps and lists; don't use the CBOR tag feature; etc.  (Congrats, now you're effectively using DAG-CBOR!  That was easy, wasn't it?)
- Think twice when using URLs in any data.  Could you achieve the same effect, but more content-addressably, by using a CID to link to that data instead?
- It would be really great if you try to spec out your messages in IPLD Schemas... but, hey, no pressure.
  We designed IPLD to be agnostic to all this stuff.  It's all optional icing on the cake.
  And your data can probably be described by schemas after-the-fact, too; that's fine.
  Really, the only reason we even mention it is because it can be a useful design tool if you pick it up early.
