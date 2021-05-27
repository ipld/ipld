---
title: "Specs: FBL ADL"
navTitle: "FBL ADL"
---

FBL ADL
=======

The FBL ADL -- short for Flexible Byte Layout -- provides a [bytes](/docs/data-model/kinds/#bytes-kind) interface, while sharding data internally.

The FBL ADL can be used to store very large binary blobs in IPLD,
while breaking them down into small blocks which are easily transfered and checksummed individually.

The FBL ADL includes enough metadata and structure to support seeking operations reasonably efficiently.

The FBL ADL is not symmetric: it specifies how to seek and read over its constituent data,
but is not prescriptive about exactly how data is split up.

- [FBL ADL Specification](./spec/)
- Fixtures:
	- Fixtures for this system are currently lacking.  If you know of some and can link them here, please send an issue or PR.
