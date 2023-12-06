---
title: "DAG-CBOR Specification"
navTitle: "Spec"
---

# Specification: DAG-CBOR

**Status: Descriptive - Draft**

* [Format](#format)
* [Links](#links)
* [Map Keys](#map-keys)
* [Strictness](#strictness)
  * [Decode strictness](#decode-strictness)
* [Implementations](#implementations)
  * [JavaScript](#javascript)
  * [Go](#go)
  * [Java](#java)
* [Limitations](#limitations)
  * [JavaScript Numbers](#javascript-numbers)

DAG-CBOR supports the full [IPLD Data Model].

DAG-CBOR uses the [Concise Binary Object Representation (CBOR)] data format, defined by [RFC 8949] (formerly [RFC 7049]), which natively supports all [IPLD Data Model Kinds].

## Format

The CBOR IPLD format is called DAG-CBOR to disambiguate it from regular CBOR. Most simple CBOR objects are valid DAG-CBOR. The primary differences are:

  * Tag `42` interpreted as CIDs, no other tags are supported.
  * Maps may only be keyed by strings.
  * Additional strictness requirements are applied to ensure canonical data encoding forms. See [Strictness](#strictness) below.

## Links

In DAG-CBOR, [Links] are the binary form of a [CID] encoded using the raw-binary identity [Multibase]. That is, the Multibase identity prefix (`0x00`) is prepended to the binary form of a CID and this new byte array is encoded into CBOR as a byte-string (major type 2), and associated with CBOR tag `42`.

Tag `42` is associated in the [CBOR Tags Registry] as "IPLD content identifier" and is further defined in [IPLD content identifiers (CIDs) in CBOR].

The inclusion of the Multibase prefix exists for historical reasons and the identity prefix *must not* be omitted.

## Map Keys

In DAG-CBOR, map keys must be strings. Other map keys, such as ints, are not supported and should be rejected when encountered.

## Strictness

DAG-CBOR requires that there exist a single, canonical way of encoding any given set of data, and that encoded forms contain no superfluous data that may be ignored or lost in a round-trip decode/encode.

Therefore the DAG-CBOR codec must:

1. Use no tags other than the CID tag (`42`). A valid DAG-CBOR encoder must not encode using any additional tags and a valid DAG-CBOR decoder must reject objects containing additional tags as invalid.
   * This includes any of the well defined tag numbers listed [section 3.4 of RFC 8949], such as dates, bignums, bigfloats, URIs, regular expressions and other complex, or simple values whether or not they map to the [IPLD Data Model].
2. Use the "Deterministically Encoded CBOR" rule suggestions defined in [section 4.2 of RFC 8949] except for map key ordering, which follow the original rules as defined in [section 3.9 of RFC 7049]. Therefore, a valid DAG-CBOR encoder should produce encoded forms that adhere to the following rules, and a valid DAG-CBOR decoder should reject encoded forms not adhering to the following rules:
   * Integer encoding must be as short as possible.
   * The expression of lengths in major types 2 through 5 must be as short as possible.
   * The expression of tag numbers (specifically only `42`) must be as short as possible for major type 6. Therefore, for valid DAG-CBOR, the only tag token that can appear is `0xd82a` - where `0xd8` is "major type 6 with 8-bit integer to follow" and `0x2a` is the number `42`.
   * The keys in every map must be sorted length-first by the byte representation of the string keys, where:
     - If two keys have different lengths, the shorter one sorts earlier;
     - If two keys have the same length, the one with the lower value in (byte-wise) lexical order sorts earlier.
   * Indefinite-length items are not supported, only definite-length items are usable. This includes strings, bytes, lists and maps. The "break" token is also not supported.
3. The only usable major type 7 minor types are those for encoding Floats (minors `25`, `26`, `27`), False (minor `20`), True (minor `21`) and Null (minor `22`).
   * [Simple Values] other than False, True and Null are not supported. This includes all registered or unregistered simple values that are encoded with a major type 7 other than False, True and Null.
   * Undefined (minor `23`) is not supported as it is not part of the [IPLD Data Model].
4. Floating point values must always encoded in 64-bit, double-precision form, regardless of whether they can be represented as half (16) or single (32) precision.
5. [IEEE 754] special values `NaN`, `Infinity` and `-Infinity` must not be accepted as they do not appear in the [IPLD Data Model]. Therefore, tokens `0xf97c00` (`Infinity`), `0xf97e00` (`NaN`) and `0xf9fc00` (`-Infinity`), their 16-bit, 32-bit and 64-bit variants, and any other [IEEE 754] byte layout that is interpreted as these values, should not appear, or be accepted in DAG-CBOR binary form.
6. Encode and decode must operate on a single top-level CBOR object. Back-to-back concatenated objects are not allowed or supported, as suggested by [section 5.1 of RFC 8949] for _streaming applications_. All bytes of an encoded DAG-CBOR object must decode to a single object. Extraneous bytes included in an IPLD block, whether valid or invalid CBOR, must not be accepted as valid DAG-CBOR.

### Decode strictness

Due to the existence and active use of historical data, and the existence and active use of non-conforming encoders, DAG-CBOR decoders may relax strictness requirements by default. A strictness opt-in may be offered for systems where round-trip determinism is a desirable feature and backward compatibility with old, non-strict data is unnecessary.

In particular, the following rules may be relaxed in order to allow interoperability with historical, and other loosely encoded data:

* Map key ordering: map entries may be accepted in any order
* Integer encodings need not be as short as possible
* Length descriptors of major types 2 through 5 need not be as short as possible
* The expression of tag `42` need not be as short as possible (`0xd82a`)
* Floating point values may be represented as single and half precision

## Implementations

### JavaScript

JavaScript users are encouraged to use **[@ipld/dag-cbor]** for DAG-CBOR encoding and decoding.

**[@ipld/dag-cbor]**, for use with [multiformats] adheres to this specification, with the following caveats:
 * Some strictness is enforced on decode; integer encodings and lengths (major types 2 through 5) must be as short as possible and tag `42` may only be represented as `0xd82a`. However, map key ordering and float encoding sizes are not enforced.
 * [`BigInt`] is accepted along with `Number` for encode, but the smallest-possible rule is followed when encoding. When decoding integers outside of the JavaScript "safe integer" range, a [`BigInt`] will be used.

The legacy **[ipld-dag-cbor]** implementation adheres to this specification, with the following caveats:

 * Strictness is not enforced on decode; as per the items listed above in [#decode-strictness](Decode strictness).
 * Floating point values are encoded as their smallest form rather than always 64-bit.
 * Many additional object types outside of the Data Model are currently accepted for decode and encode, including `undefined`.
 * [IEEE 754] special values `NaN`, `Infinity` and `-Infinity` are accepted for decode and encode.
 * Integers outside of the JavaScript "safe integer" range will use the third-party [bignumber.js] library to represent their values.

Note that inability to clearly differentiate between integers and floats in JavaScript may cause problems with round-trips of floating point values. See the [IPLD Data Model] and the discussion on [Limitations](#limitations) below for further discussion on JavaScript numbers and recommendations regarding the use of floats.

### Go

Go users are encouraged to use **[go-ipld-prime]** for DAG-CBOR encoding and decoding.

**[go-ipld-cbor]** and **[go-ipld-prime]** adhere to this specification, with the following caveats:

 * Strictness is not enforced on decode; as per the items listed above in [Decode strictness](#decode-strictness).
 * [IEEE 754] special values `NaN`, `Infinity` and `-Infinity` are accepted for decode and encode.

**[cbor-gen]** adheres to this specification with the following caveats:

 * Strictness is not enforced on decode; as per the items listed above in [Decode strictness](#decode-strictness).
 * Map keys are sorted in alphanumeric order using [sort.Strings()] on encode.

### Java

[Java IPLD from Peergos] adheres to this specification, with the following caveats:

 * Strictness is not enforced on decode; as per the items listed above in [Decode strictness](#decode-strictness).
 * Floats are disabled.

## Limitations

### JavaScript Numbers

Users of DAG-CBOR that expect their data may be consumed or produced by JavaScript at some point should be aware of limitations that the language imposes on its use of DAG-CBOR, specifically concerning numbers.

All JavaScript numbers, both floating point and integer, (using the [`Number`] primitive wrapper) are represented internally as 64-bit [IEEE 754] floating-point values (i.e. double-precision). Some implications within JavaScript of this design choice are:

 * There is no clear differentiation between a pure integer type and a floating-point number where a developer may wish to have such a differentiation.
 * By convention, JavaScript engines and developers usually omit the decimal point when representing whole numbers, simulating integers where the number is not actually stored as an integer.
 * There are limits on maximum and minimum safe integer sizes representable in JavaScript that are more constrained than those of languages where there are 64-bit integer types. Numbers outside of the range of `Number.MAX_SAFE_INTEGER` (`2`<sup>`53`</sup>` - 1`) and `Number.MIN_SAFE_INTEGER` (`-(2`<sup>`53`</sup>` - 1)`) cannot be safely manipulated or inspected as they incur rounding effects imposed by the [IEEE 754] representation.
 * Native bit-wise operations on "integers" are not able to be performed outside of the 32-bit range; larger numbers will be truncated.

[@ipld/dag-cbor] supports [`BigInt`] for values outside of the safe integer range, while the legacy [ipld-dag-cbor] uses the third-party [bignumber.js] library to handle these values.

The implications for DAG-CBOR of these limitations are:

 * Any integer deserialized by the JavaScript CBOR decoder greater than `Number.MAX_SAFE_INTEGER` or less than `Number.MIN_SAFE_INTEGER` will be returned as a [`BigInt`] from [@ipld/dag-cbor] or a [bignumber.js] wrapper type from [ipld-dag-cbor], which may be unexpected to users and have unexpected effects on downstream code.
 * Any `Number` serialized by the JavaScript CBOR encoder relies on a whole-number check (i.e. `Number.isInteger()`, roughly `x % 1 === 0`) to determine whether it should be encoded as an integer or a float.
 * Any float deserialized by the JavaScript CBOR decoder that does not have a fractional component will be indistinguishable from an integer to a JavaScript program and may not round-trip to the same bytes if originally produced by non-JavaScript code.
 * Any `Number` greater than `Number.MAX_SAFE_INTEGER` or less than `Number.MIN_SAFE_INTEGER` cannot be properly inspected for its whole-number status and is therefore encoded by the JavaScript CBOR encoder as float regardless of whether it is a whole-number or has a fractional component. [`BigInt`] should be used for [@ipld/dag-cbor] when dealing with integers outside of the safe range to ensure proper handling.

[IPLD Data Model]: /docs/data-model/
[Concise Binary Object Representation (CBOR)]: https://cbor.io/
[RFC 8949]: https://tools.ietf.org/html/rfc8949
[RFC 7049]: https://tools.ietf.org/html/rfc7049
[IPLD Data Model Kinds]: /docs/data-model/kinds/
[Links]: /docs/data-model/kinds/#link-kind
[CID]: /glossary/#cid
[Multibase]: https://github.com/multiformats/multibase
[CBOR Tags Registry]: https://www.iana.org/assignments/cbor-tags/cbor-tags.xhtml
[IPLD content identifiers (CIDs) in CBOR]: https://github.com/ipld/cid-cbor/
[section 3.4 of RFC 8949]: https://tools.ietf.org/html/rfc8949#section-3.4
[section 4.2 of RFC 8949]: https://tools.ietf.org/html/rfc8949#section-4.2
[section 3.9 of RFC 7049]: https://tools.ietf.org/html/rfc7049#section-3.9
[Simple Values]: https://tools.ietf.org/html/rfc8949#section-2.1
[section 5.1 of RFC 8949]: https://tools.ietf.org/html/rfc8949#section-5.1
[@ipld/dag-cbor]: https://github.com/ipld/js-dag-cbor/
[multiformats]: https://github.com/multiformats/js-multiformats/
[`BigInt`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
[ipld-dag-cbor]: https://github.com/ipld/js-ipld-dag-cbor/
[go-ipld-cbor]: https://github.com/ipfs/go-ipld-cbor
[go-ipld-prime]: http://github.com/ipld/go-ipld-prime
[cbor-gen]: https://github.com/whyrusleeping/cbor-gen
[sort.Strings()]: https://pkg.go.dev/sort#Strings
[Java IPLD from Peergos]: https://github.com/Peergos/Peergos/tree/master/src/peergos/shared/cbor
[`Number`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[IEEE 754]: https://en.wikipedia.org/wiki/Floating-point_arithmetic
[bignumber.js]: https://github.com/MikeMcl/bignumber.js
