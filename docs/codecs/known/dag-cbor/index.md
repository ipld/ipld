---
title: "Codec Docs: DAG-CBOR"
navTitle: "DAG-CBOR"
eleventyNavigation:
  synopsys: a binary format, supporting the complete IPLD Data Model, with excellent performance, and suitable for any job.
---

Codec: DAG-CBOR
===============

DAG-CBOR is a codec that implements the IPLD Data Model as a subset of CBOR,
plus some additional constraints for hash consistent representations.
DAG-CBOR also adds a "link" type using a CBOR tag, to bring it in line with the IPLD [Data Model](/glossary/#data-model).

DAG-CBOR is a codec we recommend using.
It has very complete mapping to the IPLD Data Model;
it's binary and length-delimited (meaning it's generally very efficient to parse);
and it's widely supported through the IPLD ecosystem.

See the [DAG-CBOR specifications](/specs/codecs/dag-cbor/) for details.


Quick Compare
-------------

#### interoperability

DAG-CBOR is based on CBOR, and CBOR libraries are already ubiquitous and can be found in many languages.
If you are working in a language that doesn't have IPLD libraries yet, you can use another CBOR library easily.

#### performance

_(Standard performance caveat: implementation details always matter; performance is always situational;
always do benchmarks before presuming serialization performance is a critical bottleneck; etc.)_

DAG-CBOR is typically considered to be fast.
It's a binary, length-prefixed format.  These traits usually associate with good performance.

(In length-prefixed formats, strings can be scanned quickly without escaping, and encoded without escaping;
allocations can be made up front; etc; all these things contribute to speed and efficiency.)

#### human-friendliness

DAG-CBOR is not very human friendly.
It's a binary, length-prefixed format.
While these traits contribute to its performance, they do not make it easy to edit.

You cannot typically write or edit DAG-CBOR by hand.

#### generality

DAG-CBOR supports the **full** IPLD [Data Model](/glossary/#data-model), completely losslessly.

### density

Theoretically, DAG-CBOR's density is roughly comparable to JSON,
because they're structurally similar.
E.g. If a series of maps have the same keys repeated,
then those keys will be repeated in the DAG-CBOR serial form,
just as they would be in a JSON encoding.

In practice, DAG-CBOR can often be significantly more compact than JSON,
due to the densely packed binary coding.
(Numbers are often smaller; booleans are single bytes instead of four or five;
strings don't gain bytes when content needs escaping; etc.)
Note that this is highly data-dependent; your mileage may vary.

DAG-CBOR will especially compare favorably to JSON or DAG-JSON when it comes to binary content.
In DAG-JSON and typical JSON systems, binary content is base64 encoded, which results in 33% expansion.
In DAG-CBOR there is no such expansion.

### simplicity

CBOR, and thus DAG-CBOR, is reasonably simple to implement, and well-specified.

Care should be taken around some details of DAG-CBOR which are subsets of CBOR.
For example, canonical DAG-CBOR should always use length prefixes,
even though CBOR supports an "indefinite length" mode for maps and lists.

CBOR includes some bit-wrangling to implement,
because kind indicators and length indicators are combined into a single byte when lengths are small.
This mechanism is well specified and generally considered easy to implement.

CBOR does not require any escaping routines to be implemented;
the length prefix parsing is sufficient instead.
This makes CBOR easier to implement than encoding systems that do require escaping mechanisms
(as well as rules out the possibility of security issues arising from incorrectly implemented escaping).
