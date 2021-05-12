---
title: "Codec Docs: DAG-CBOR"
navTitle: "DAG-CBOR"
---

Codec: DAG-CBOR
===============

DAG-CBOR is a codec that implements the IPLD Data Model as a subset of CBOR,
plus some additional constraints for hash consistent representations.
DAG-CBOR also adds a "link" type using a CBOR tag, to bring it in line with the IPLD [Data Model](/glossary/#data-model).

DAG-CBOR is a codec we recommend using.
It has very complete mapping to the IPLD Data Model;
it's binary and length-delimited (meaning it's generally very effecient to parse);
and it's widely supported through the IPLD ecosystem.

See the [DAG-CBOR specifications](/specs/codecs/dag-cbor/) for details.
