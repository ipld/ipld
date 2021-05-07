---
title: "DAG-JSON Specification"
navTitle: "Spec"
---

# Specification: DAG-JSON

**Status: Descriptive - Final**

DAG-JSON very nearly supports the full [IPLD Data Model](/docs/data-model/).

There are some small specific exceptions around certain small maps with specific keys,
which are reserved in DAG-JSON to demarcate
[links](/docs/data-model/kinds/#link-kind) and
[bytes](/docs/data-model/kinds/#bytes-kind).

## Format

### Serialization

Codec implementors **MUST** do the following in order to ensure hashes consistently match for the same block data.

 - Sort object keys by their (UTF-8) encoded representation, i.e. with byte comparisons
 - Strip whitespace

This produces the most compact and consistent representation which will ensure that two codecs
producing the same data end up with matching block hashes.

### Natively supported kinds

All kinds of the IPLD Data Model except Bytes and Link are supported natively by JSON.

#### Numbers

Numbers are a special case. JSON only has a single number type, though many dynamically typed programming languages (e.g. Python, Ruby, PHP) distinguish between integers and floats when parsing JSON. A number consisting of an optional leading sign and only digits is parsed as integer, if it contains a decimal point, it's parsed as a float. In DAG-JSON the same method is used to represent integers and floats.

Contrary to popular belief, JSON as a format supports Big Integers. It's only
JavaScript itself that has trouble with them. This means JS implementations
of DAG-JSON can't use the native JSON parser and serializer if integers bigger
than `2^53 - 1` should be supported.

### Other kinds

The non-natively supported kinds are wrapped in an object, where the key is a slash (`"/"`) and the value is the actual kind.

#### Bytes kind

The Bytes kind is represented as an object with `"bytes"` as key and a [Multibase](https://github.com/multiformats/multibase) Base64 encoded string as value. The Base64 encoding is the one described in [RFC 4648, section 4](https://tools.ietf.org/html/rfc4648#section-4) without padding, hence the Multibase prefix is `m`.


```javascript
{"/": { "bytes": String /* Multibase Base64 encoded binary */ }}
```

#### Link kind

A link is represented as a base encoded CID. CIDv0 and CIDv1 are encoded differently.

 - CIDv1 is represented as a Multibase Base32 encoded string. The Base32 encoding is the one described in [RFC 4648, section 6](https://tools.ietf.org/html/rfc4648#section-6) without padding, hence the Multibase prefix is `b`.
 - CIDv0 is represented in its only possible Base58 encoding. The Base58 encoding is the one described in [Base58 draft](https://tools.ietf.org/html/draft-msporny-base58).

```javascript
{"/": String /* Base58 encoded CIDv0 or Multibase Base32 encoded CIDv1 */}
```
