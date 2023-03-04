---
title: FAQ
eleventyNavigation:
  order: 110
---

Occasionally Asked Questions
============================

General
-------

### How does compression relate to IPLD?

Compression in your data itself is frowned upon,
as it breaks the "emergent convergence" story.

Instead, make compression something that is transparently carried out by:
- transport ( e.g. HTTP gzip )
- or storage ( e.g. compressed badger blocks )

As a general rule of thumb: IPLD should be operating on the *logical* form of your data.


Codec-related
-------------

### Wouldn't it be nice to have all the links outside the codec, so you don't need to know the codec code to parse them?

Perhaps.  Let's walk through what that would imply.

The main upside of the idea is that one could detect links, and walk graphs of blocks, using only one codec.

The inherent flip side of this is it means putting the links separate and distinct from the rest of the document.

The big trouble with this separational approach is that one ends up with some kind of data paradigm that's very unfamiliar.
It's neither traditional DB/relational style, nor what would typically be called document model.
The result is that one then ends up in a bit of a no-mans-land; there are basically no inhabitants of this conceptual area.

The other problem here is that, without realizing it, this is really just trying to describe "one true codec".
You'd still have to have code which can parse the payload hunk
(which, incidentally, we'd still expect to use other codecs, not necessarily the "one true codec" to parse)
and then parse that list of links -- right?
That code is a codec.
So, "put the links outside the codec"... didn't, really.  It just made us have nested codecs.
It's dubious whether that's helping, or if it's just pushing the problem around.

If you want to try it... there's good news:
The [DAG-PB codec](/docs/codecs/known/dag-pb/) is very close to this.
If you want to try out the experience, you can get a lot of it by using that codec.

We... don't really recommend this, though.
Our experience with DAG-PB isn't especially positive.
The option is available.  However, for whatever reason, it seems to attract and retain few new users.
The conceptual inflexibility about where to have links to other data
doesn't seem to mesh well with how we see most people want to write protocols.


Schema-related
--------------

### What's the difference between a union and an enum?

Unions are a recursive, and can contain any other type (with... some details and restrictions in IPLD Schemas, due to representations).
Enums are a scalar with countable cardinality.

Unions are also known as "sum types" in some literature.
We latched onto the term "union" because A) it's one word; and B) due to the popularization of that term for it in Facebook's GraphQL.
Another common term for this concept is "variant".


ADL-related
-----------

### Why couldn't you just bake in ADL signalling to the serial data in one clear way?

Two major reasons:

- We want to allow the same data to be viewed using various ADLs!  This is a critical feature -- and if the signalling mechanism is always embedded in the data itself, it makes this harder, not easier.
- We don't want the IPLD Data Model to end up with "reserved words" -- and reserved words would be a requirement if we were baking ADL signalling into the serial data.  We won't go there; that would effectively break IPLD's promises for supporting arbitrary data.

This means we end up with [many options for ADL signalling](/docs/advanced-data-layouts/signalling/).
