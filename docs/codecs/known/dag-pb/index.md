---
title: "Codec Docs: DAG-PB"
navTitle: "DAG-PB"
eleventyNavigation:
  synopsys: a binary format for specific limited structures of data, which is highly used in IPFS and unixfsv1.
---

Codec: DAG-PB
=============

DAG-PB is a codec that implements a very small subset of the IPLD Data Model in a particular set Protobuf messages.

DAG-PB can be parsed by Protobuf libraries,
and can be emitted by Protobuf libraries (with some caveats -- DAG-PB is actually stricter than Protobuf in some details).

DAG-PB implements only a very small fraction of the IPLD [Data Model](/glossary/#data-model).
You should not expect to be able to take arbitrary IPLD documents and emit them as DAG-PB,
nor to be able to take documents from other codecs (e.g. [DAG-CBOR](/docs/codecs/known/dag-cbor/)) and transliterate them into DAG-PB --
DAG-PB isn't that flexible.

DAG-PB is mostly seen in IPFS, where it is a backbone of how Unixfsv1 data is serialized.

See the [DAG-PB specifications](/specs/codecs/dag-pb/) for details.


Quick Compare
-------------

#### interoperability

DAG-PB is based on Protocol Buffers, and Protobuf libraries are already ubiqituous and can be found in many languages.
If you are working in a language that doesn't have IPLD libraries yet, you can write DAG-PB interactions using other Protobuf libraries,
although it might require some care.

DAG-PB is a _subset_ of Protocol Buffers: It is a specific schema within Protobuf,
and also imposes some constraints that not all Protobuf systems will enforce.
Therefore it will be necessary to exercise some caution if making your own DAG-PB interactions using other Protobuf libraries.

#### performance

_(Standard performance caveat: implementation details always matter; performance is always situational;
always do benchmarks before presuming serialization performance is a critical bottleneck; etc.)_

DAG-PB is typically considered to be fast.
It's a binary, length-prefixed format.  These traits usually associate with good performance.

(In length-prefixed formats, strings can be scanned quickly without escaping, and encoded without escaping;
allocations can be made up front; etc; all these things contribute to speed and efficiency.)

#### human-friendliness

DAG-PB is not very human friendly.
It's a binary, length-prefixed format.
While these traits contribute to its performance, they do not make it easy to edit.

You cannot typically write or edit DAG-PB by hand.

#### generality

DAG-PB is **not general**.  Only very specific structures of data can be encoded in DAG-PB.
It is very unlikely that unstructured data in the [Data Model](/glossary/#data-model) will be encodable in DAG-PB
unless it has exactly the known structure matching DAG-PB.

Remember, as mentioned in the [interoperability](#interoperability) section,
DAG-PB is a _subset_ of Protocol Buffers: it is a specific schema within Protobuf,
and does not support general user-specified Protobufs.

See [DAG-PB Specs: Logical Format](/specs/codecs/dag-pb/spec/#logical-format) for details
on the specific structures which are encodable in DAG-PB.

### density

DAG-PB is slightly higher density compared to the same data encoded in DAG-JSON or DAG-CBOR,
because it does not encode the keys for its primary structure, which would otherwise often be redundant.

However, the tradeoff for this is DAG-PB's lack of generality, and lack of self-description.
The same design choices which give DAG-PB this density inherently mean it can be used for a narrower range of data structures.

This key elision also does not apply to any of the user's content stored within DAG-PB.
DAG-PB does not have any compression features.
