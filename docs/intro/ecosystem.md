---
title: InterPlanetary Ecosystem Overview
eleventyNavigation:
  order: 70
  synopsys: An overview of the various other "Interplanetary" and Protocol Labs projects, such as IPFS and libp2p, and how they typically fit together with IPLD in a bigger picture.
---

IPLD in the InterPlanetary Ecosystem
====================================

IPLD is a part of the "InterPlanetary Ecosystem".
You can use it without any of the other projects in that ecosystem, but it may be useful to understand this history;
and if you come to IPLD via one of the other InterPlanetary projects (such as IPFS),
this document can help you understand the relationship and the distinctions.

IPLD
----

IPLD is short for "InterPlanetary Linked Data".

As the name suggests, IPLD is all about _data_:
defining data structures, defining data serialization,
defining ways we can expect to traverse data,
and defining ways we can link data.

IPLD is primarily a set of specs and a series of libraries:
it's meant to help others write decentralized applications,
and is not an application itself.

See IPFS for an application that uses IPLD.

See libp2p for libraries that can be used to transport IPLD data over networks.


IPFS
----

IPFS is best understood as an application that glues together:

- IPLD, to describe data,
- libp2p, to transmit data around,
- some concrete implementations of data storage,
- and some fun features that make a concept of "files" and "directories" readily accessible to users of IPFS.

(There's also a bunch of neat features like a web interface that accesses the abstraction of "files",
various APIs, etc -- but check out the IPFS documentation for details of this, not ours ;))

In short: IPFS depends on IPLD.

IPLD does not depend on IPFS.

### history

The IPFS project is the first project of the InterPlanetary ecosystem.
Many early ideas emerged in this project... and were only extracted sometime later!

IPLD is one such idea that incubated in the IPFS project, and was only extracted later.
(libp2p is another project with a similar origin story!)

You may see stretch marks around this for some time:
comments in old code which, read today, seem ambiguous about the separations; etcetera.

We're working to increase the clarity of roles and responsibilities of all of these projects over time.
Newly written work in IPLD will generally not refer to IPFS at all;
and you can definitely count on it to not have direct dependencies on IPFS code.
We regard IPFS as just one consumer of the IPLD libraries.


libp2p
------

libp2p is a project which handles networking and transport of data.

The features of libp2p of the features range from
the basic (simple streaming transport APIs)
to the useful (NAT traversal, "hole punching", protocol negotiations, etc)
to the neat (pubkey-based persistent network peer identity toolkits)
to the awesome (DHTs and other advanced network routing and distributed storage components).

libp2p is developed by some of the same people as IPLD, IPFS, and the other InterPlanetary projects.
Like IPLD, libp2p is a project that historically emerged from IPFS when it became apparent that it would be widely reusable;
now, many other projects also use libp2p as a networking abstraction, or lean on its routing and storage components.

libp2p doesn't have any explicit dependency on IPLD, nor vice-versa.
We do design them to work well together, though!
libp2p is a great thing to check out if you want to build a distributed application with IPLD, and you need to handle networking.

libp2p uses several of the Multiformats specifications in describing their data and their protocol negotiation systems.
(However, they're often different subsets of the Multiformats than those that IPLD is most concerned with.)


CIDs
----

CIDs -- **C**ontent **ID**entifiers -- are a specification for identifying content based on cryptographic hashing.
See wikipedia on [Content Addressing](https://en.wikipedia.org/wiki/Content-addressable_storage#Content-addressed_vs._location-addressed) for a general introduction to this concept.

We use CIDs for "linking" in IPLD.  "Linking" in IPLD just has the semantic requirement of using immutable identifiers;
in practice, we satisfy this aim by using CIDs for links.

See also [CIDs in the IPFS documentation](https://docs.ipfs.io/concepts/content-addressing/).


Multiformats
------------

### multihash

Multihash indicators are a part of CIDs.  Therefore, you may see multihash in IPLD through linking, which uses CIDs.

### multicodecs

Multicodec indicators are a part of CIDs.  Therefore, you may see multicodec in IPLD through linking, which uses CIDs.

### multiaddrs

Multiaddrs are one of the multiformats that IPLD has the *least* to do with.

Multiaddrs are used to describe networking locations in libp2p.

IPLD is concerned with data formats, and not with networking;
therefore, it does not have direct interactions with Multiaddrs.


Other
-----

### graphsync

Graphsync is the name of a protocol and set of libraries for exchanging blocks of data containing IPLD data
(and it uses IPLD Selectors to allow a high degree of user power for saying what to exchange).

IPLD doesn't depend on graphsync, but they play together very nicely.

Graphsync has a comparable purpose to bitswap, although it is more recently created.

### bitswap

Bitswap is the name of another protocol and set of libraries for exchanging blocks of data containing IPLD data.

IPLD doesn't depend on bitswap, but bitswap is often used to exchange IPLD data.

Bitswap is a long-standing part of IPFS.  It's also comparable in purpose to Graphsync.
