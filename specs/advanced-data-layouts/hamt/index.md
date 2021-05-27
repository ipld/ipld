---
title: "Specs: HAMT ADL"
navTitle: "HAMT ADL"
---

HAMT ADL
========

The HAMT ADL provides a [map](/docs/data-model/kinds/#map-kind) interface, while sharding data internally.

HAMTs can support very large volumes of data by using sharding to distribute data between many blocks.

HAMTs have the particularly interesting and useful property of _lacking hysteresis_ --
meaning that any two HAMTs with the same contents will reach the same sharding pattern,
regardless of the insertion order of the data or the history of how the data structure grew.
This is good news for determinism, and makes HAMTs very valuable in decentralized system design.

- [HAMT ADL Specification](./spec/)
- Fixtures:
	- Fixtures for this system are currently lacking.  If you know of some and can link them here, please send an issue or PR.
