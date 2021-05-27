---
title: "Codec Docs: DAG-PB"
navTitle: "DAG-PB"
---

Codec: DAG-PB
=============

DAG-PB is a codec that implements a very small subset of the IPLD Data Model in a particular set Protobuf messages.

DAG-PB can be parsed by Protobuf libraries,
and can be emitted by Protobuf libraries (with some caveats -- DAG-PB is actually stricter than Protobuf in some details).

DAG-PB implements only a very small fraction of the IPLD Data Model.
You should not expect to be able to take arbitrary IPLD documents and emit them as DAG-PB,
nor to be able to take documents from other codecs (e.g. DAG-CBOR) and transliterate them into DAG-PB --
DAG-PB isn't that flexible.

DAG-PB is mostly seen in IPFS, where it is a backbone of how Unixfsv1 data is serialized.

See the [DAG-PB specifications](/specs/codecs/dag-pb/) for details.
