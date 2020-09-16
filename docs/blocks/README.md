Blocks in IPLD
==============

In IPLD, "blocks" refer to raw serialized data which hasn't been processed by a [Codec](/codecs/) yet.

Very rarely to users of IPLD work with blocks directly:
mostly, an IPLD [Codec](/codecs/) is used to process a block into a [Data Model](/data-model/) structure, which is easier to work with.
Blocks are still important for a couple of reasons, however:

- Blocks are the unit of granularity on which we do hashing!
- Blocks are (generally) the units that are stored and transported when building persistence and networking systems.

// TODO additional discussion of CIDs

// TODO consider mentioning carfiles here (they subvert the "unit of storage" claim, so, worth just a quick disambiguation.)
