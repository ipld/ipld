---
title: "How IPFS Web Gateways Work"
eleventyNavigation:
  order: 100
  synopsys: An example of how a larger system (IPFS's web "gateways") was built up using IPLD primitives.
---

How IPFS Web Gateways Work
==========================

This document talks through how IPFS web gateways work;
the various forms of abstraction used in accomplishing parts of that task;
and how and why these designs are cool (and how you can reuse parts of them).

:::info
> Note!  This is an _aspirational_ document -- IPFS web gateways are a feature
> which has substantial history.  They haven't always worked like this.
:::

What are the goals?
-------------------

### What are IPFS Web Gateways, anyway?

The "web gateway" is a feature of IPFS that serves the contents of _files_ over _HTTP_.
It selects what content to serve by taking the path from the URL requested,
and splitting it into two parts: the _CID_ and the remainder of the _path_.

The CID is used to pick some piece of data to start at.
The remainder of the path will be used as instructions to traverse IPLD data,
starting from that data which the CID identified.
At the end of that traversal, we'll try to understand whatever is pointed to as
a bunch of bytes (a "file" isn't much more than that)... and pour it out into an HTTP response.

This is useful because it means we can store data in IPFS,
and that data can become easily accessible as normal webpages.


How do we do it?
----------------

There's actually a ton of moving parts to this.
Let's break it down:

### files are just bytes

"Files" are really just "large byte sequences".

... for the most part.  Let's accept this simplification for a minute.
(We'll add back in concepts about permissions and metadata later.)

### large bytes are provided by ADLs (FBL, specifically)

We can use the ["Flexible Byte Layout (FBL)" ADL](/specs/advanced-data-layouts/fbl/) to describe file bodies.
This ADL provides a generalized way to read sharded large byte sequences.
It even supports efficient seeking!

### directories are just maps

"Directories" are really just "maps":
a "directory" maps a filename to either another directory, or a file; that's it.

... for the most part.  Let's accept this simplification for a minute.
(We'll add back in concepts about permissions and metadata later.)

### directories are provided by ADLs (HAMT, specifically)

We can use the [HAMT ADL](/specs/advanced-data-layouts/hamt/) to describe directories.
This ADL gives us sharded maps, which means we can store directories of arbitrary size.

### navigating the path is defined by the Data Model

... which is neat, because it means we don't need any special custom logic
to describe how we're going to walk over this data.
Because the path traversals are all going through ADLs,
as we just described in the previous sections,
that's... all there is to it.

Because having an ADL definition means we have a way make the ADL's
[substrate](/glossary/#substrate) data legible as regular IPLD Data Model semantics,
we can use standard library functions for pathing over this data.
No special path handling logic is written for the Web Gateways
(or other users of unixfsv2) at all!

### knowing where to use ADLs, and which ones, is defined by IPLD Schemas

... and more specifically, the Unixfsv2 schema,
which is pretty common and used by much more than the IPFS web gateway system.

The web gateways know about the schema for unixfsv2,
and they assume that it applies to whatever data is being requested through the gateway system.

If the data doesn't match, it won't be renderable through the web gateway
(and we return errors about how and where the data ceased to match the
schema that's expected for unixfsv2 data).

If the data does match: then the schema also tells us where to expect ADLs
to come into effect, and also tells us what Data Model semantics to expect
from the data that is made available once the ADL logic is applied.

### different parts of the system can use different views

:::todo
- Directories are actually a map pointing to metadata and to more filenodes.
- Sometimes you use the plain HAMT ADL and see all of that;
- Sometimes you use an ADL that steps past the HAMT **and** directly to the filenode.
- The former is necessary for writing new data.
- The latter provides the kind of pathing that an end-user wants when navigating and reading like a filesystem!
:::

### if you don't have this data: we fetch it

This part hits the limits of what is directly in the scope of IPLD,
but in brief, what happens in IPFS is:

- a request for info about anyone who might have the missing content will be made to the DHT (provided by libp2p)
- contact with those other IPFS nodes will be made (again brokered by libp2p, which might be handling NAT traversal, etc)
- a protocol like bitswap or graphsync will be used to ferry raw blocks of IPLD data from those other IPFS nodes
- ... and then the data is local: the process picks up again normally from there.


What if we want to peek behind the curtain?
-------------------------------------------

All of the structures above are serialized in CBOR.
All the magic comes from IPLD semantic features like ADLs and Schemas.

What's neat about this is it's also very easy to drop all the magic
and look directly at the raw data.

Want to see the raw CBOR objects that make up all these structures?  No problem.
They're hidden just barely under the hood, and we try to make it easy to lift that hood
up and take a peek.

In fact, you can inspect all the raw CBOR objects making up these structures
simply by using IPLD libraries to start at the same CID,
and then use regular Data Model traversal mechanisms to stroll around.
If you provide the Unixfsv2 schema (and thereby its hints about where to apply ADLs),
you'll get the high level view of "directories" (maps) and "files" (bytes);
if you don't, you'll get to stroll around the raw CBOR objects instead.


What's reusable?
----------------

Gosh.  Dang near everything.

- The Unixfsv2 schema is reusable.  If you want to describe filesystem-like data, it's probably got what you want.
- The Flexible Byte Layout (FBL) Advanced Data Layout is reusable for any of your big-sharded-byte-sequence needs!
  It's not unique to Unixfsv2 nor the IPFS web gateways; you can drop it in anywhere you want in any IPLD system.
- The HAMT ADL is similarly reusable for any of your big-sharded-map needs!
  It's not unique to Unixfsv2 nor the IPFS web gateways; you can drop it in anywhere you want in any IPLD system.
- ... even if you don't want any of these things in particular, hopefully this is
  a good example of how you can use the various parts of the IPLD system to accomplish your own goals!

The whole IPFS web gateway system was built in terms of standard IPLD components, assembled:
schemas, ADLs, and plain basic pathing and traversal over the Data Model were all we needed to accomplish all this.


What other limits does this have?
---------------------------------

It's important to note that the web gateways do almost all of this work
using IPLD libraries and not much else... but, ADLs also have some special caveats.

Because ADLs need some logic to make their translations of data work,
and because IPLD doesn't itself include an interpreter or scripting language runtime
(and even if it did, we'd be worried about capping its resource budget)...
IPLD libraries typically require that a list of allowed ADLs be defined explicitly.

The IPFS web gateways specifically allow the FBL and HAMT ADLs.

If you wanted to produce data that used other sharding algorithms,
but was otherwise structurally matching the Unixfsv2 schema,
and wanted those to be correctly displayed by some IPFS web gateway?
You'd need to reconfigure that gateway to expand the list of allowed ADLs
to include whatever sharding system it is your wanted to use.


Historically: how did this previously work?
-------------------------------------------

> :closed_book:
> This section is historical notes -- it's here for readers who were familiar
> with the old system, and want to be refreshed on how it compares to the new
> designs documented above, or for readers who want to understand some of the
> learning experiences gathered from previous bouts at this work.
> However, you shouldn't really need to read it unless one of those two
> sources of curiosity appeals to you.

The earliest implementations of IPFS used a codec called "dag-pb" to represent files and directories.
("dag-pb" is still around as an IPLD codec -- but nowadays, we consider it one of the more limited codecs, and a very esoteric one at that.)

The "dag-pb" codec included many responsibilities that we now handle separately:
it included the concept of directories (and sharding them) in the codec itself (whereas we now split this out into map ADLs);
similarly, it include the concept of files (and sharding their component bytes) in the codec itself (whereas we now split this out into bytes ADLs).

By baking these things into the codec itself, there were several major disadvantages compared to the present IPLD system design:

- by baking these sharding mechanisms into a single codec, it was not possible to reuse them with other codecs;
- because the sharding mechanisms were baked in the codec (and at the time,
  there wasn't really any coherent definition of a Data Model at all),
  there was no way to _switch_ between high level and raw views of the data --
  as a result, these systems were much harder to debug;
- because the sharding mechanisms were tightly bound into the codec,
  there was no way to introduce or even experiment with other sharding mechanisms!

Looking at the other direction, "dag-pb", even with all its special features, was more limited than the modern IPLD system designs:

- by extracting the concept of ADLs, we've made it possible to shard other datastructures as well --
  for example, we can now easily support sharded lists, a concept which simply didn't exist in dag-pb.
- dag-pb had very (very) rigid ideas about the topology of data.
  In modern terms, we would say it doesn't support the complete IPLD Data Model.
  The huge behavioral gaps and asymmetry in representability between dag-pb and
  other early IPLD codecs produced a great deal of confusion.
