---
title: "CDAG-JSON"
weight: 16
description: "A human-readable format, supporting almost the complete IPLD Data Model, and very convenient for interoperability, development, and debugging."
---

## Overview

DAG-JSON is a codec that implements the IPLD Data Model as JSON,
plus some additional conventions for encoding links,
which it does by claiming certain specific structures of map and assigning them this meaning.
DAG-CBOR also adds a "link" type using a CBOR tag, to bring it in line with the IPLD [Data Model](/glossary/#data-model).

DAG-JSON is a very convenient codec to use because of its interoperability with JSON,
and its human-friendliness to both read and write.
We recommend DAG-JSON, conditionally.
Please be aware of a few caveats before using it, though:
see the [generality notes](#generality), below.

DAG-JSON is especially handy as a debugging format.
Designing protocols as [DAG-CBOR](../dag-cbor/) primarily, and then using DAG-JSON as a debug and development format,
can be a highly effective combo for both final product efficiency and developer productivity.

See the [DAG-JSON specifications](/specs/codecs/dag-json/) for details.

## Quick Compare

### Interoperability

DAG-JSON is based on JSON, and JSON libraries are already ubiquitous and can be found in many languages.
If you are working in a language that doesn't have IPLD libraries yet, you can use another JSON library easily.

### Performance

_(Standard performance caveat: implementation details always matter; performance is always situational;
always do benchmarks before presuming serialization performance is a critical bottleneck; etc.)_

DAG-JSON is about as efficient to parse and emit as JSON...
which is to say, it's not bad, but it's also going to be much slower than any binary protocol.

DAG-JSON is relatively human readable: there are no length prefixes, and as a result, strings require escaping.
These traits imply upper bound limitations on performance.

(In length-prefixed formats, strings can be scanned quickly without escaping, and encoded without escaping;
allocations can be made up front; etc; all these things contribute to speed and efficiency.
In formats without such information, like DAG-JSON, that information has to be recalculated on the fly, which is inherently costly.)

### Human-friendliness

DAG-JSON is human friendly, like JSON.

You can easily write or edit DAG-JSON by hand.
It's exactly like editing regular JSON.

The only difference from regular JSON is that if you want to encode a link,
you take the [CID](/glossary/#cid), encode it in base58 (or base32, for CIDv0), and flank it in a map with a `"/"` key --
so it looks like this: `{"/":"Qmfoo"}`.

### Generality

DAG-JSON supports **most** of the IPLD [Data Model](/glossary/#data-model), but has several significant caveats.

- Maps with a key of `"/"` cannot be encoded or decoded safely -- because that space is reserved for the encoding of links.
- Strings with non-unicode bytes may be unrepresentable -- because JSON does not specify escaping mechanisms other than unicode.

See the [DAG-JSON specifications](/specs/codecs/dag-json/) for details of how implementations should handle these corner cases.

## Density

DAG-JSON's density is roughly comparable to JSON.  E.g. If a series of maps have the same keys repeated,
then those keys will be repeated in the DAG-JSON serial form.

DAG-JSON suffers considerable inflation when encoding bytes, because it must base64 encode them.
It is not advisable to use DAG-JSON for protocols where a large amount of the content is bytes.
Consider using [DAG-CBOR](../dag-cbor/) in such scenarios instead, which can encode bytes much more efficiently.
