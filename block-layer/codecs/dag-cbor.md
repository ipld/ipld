# Specification: DAG-CBOR

**Status: Descriptive - Draft**

* [Format](#format)
* [Links](#links)
* [Map Keys](#map-keys)
* [Strictness](#strictness)
  * [Floating Point Encoding (Unresolved)](#floating-point-encoding-unresolved)
* [Implementations](#implementations)
  * [JavaScript](#javascript)
  * [Go](#go)
  * [Java](#java)
* [Limitations](#limitations)
  * [JavaScript](#javascript-1)

DAG-CBOR supports the full [IPLD Data Model].

DAG-CBOR uses the [Concise Binary Object Representation (CBOR)] data format, which natively supports all [IPLD Data Model Kinds].

## Format

The CBOR IPLD format is called DAG-CBOR to disambiguate it from regular CBOR. Most simple CBOR objects are valid DAG-CBOR. The primary differences are:
  * tag `42` interpreted as CIDs, no other tags are supported
  * maps may only be keyed by strings
  * additional strictness requirements are applied to ensure canonical data encoding forms

## Links

As with all IPLD formats, DAG-CBOR must be able to encode [Links]. In DAG-CBOR, links are the binary form of a [CID] encoded using the raw-binary identity [Multibase]. That is, the Multibase identity prefix (`0x00`) is prepended to the binary form of a CID and this new byte array is encoded into CBOR as a byte-string (major type 2), with the tag `42`.

The inclusion of the Multibase prefix exists for historical reasons and the identity prefix *must not* be omitted.

## Map Keys

In DAG-CBOR, map keys must be strings, as defined by the [IPLD Data Model]. Other map keys, such as ints, are not supported and should be rejected when encountered.

## Strictness

DAG-CBOR requires that there exist a single, canonical way of encoding any given object, and that encoded forms contain no superfluous data that may be ignored or lost in a round-trip decode/encode.

Therefore the DAG-CBOR codec must:

1. Use no tags other than the CID tag (`42`). A valid DAG-CBOR encoder must not encode using any additional tags and a valid DAG-CBOR decoder must reject objects containing additional tags as invalid.
   * This includes any of the initial values of the tag registry in [section 2.4 of the CBOR specification], such as dates, bignums, bigfloats, URIs, regular expressions and other complex, or simple values whether or not they map to the [IPLD Data Model].
2. The only usable major type 7 minor types are those for encoding Floats (`25`, `26`, `27`), True (`20`), False (`21`) and Null (`22`).
	 * "Simple values" are not supported. This includes all registered or unregistered simple values that are encoded with a major type 7.
	 * Undefined (`23`) is not supported.
3. Use the canonical CBOR encoding defined by the suggestions in [section 3.9 of the CBOR specification]. A valid DAG-CBOR decoder should reject objects not following these restrictions as invalid. Specifically:
   * Integer encoding must be as short as possible.
   * The expression of lengths in major types 2 through 5 must be as short as possible.
   * The keys in every map must be sorted lowest value to highest. Sorting is performed on the bytes of the representation of the keys.
     - If two keys have different lengths, the shorter one sorts earlier;
     - If two keys have the same length, the one with the lower value in (byte-wise) lexical order sorts earlier.
   * Indefinite-length items are not supported, only definite-length items are usable.
4. Encode and decode a single top-level CBOR object and not allow back-to-back concatenated objects, as suggested by [section 3.1 of the CBOR specification] for _streaming applications_. All bytes of an encoded DAG-CBOR object must decode to a single object. Extraneous bytes, whether valid or invalid CBOR, should fail validation.

### Floating Point Encoding (Unresolved)

Strict **floating point** encoding rules need to be resolved. Current CBOR encoding implementations used by IPLD libraries are _not_ unified in their approach.

[borc], for JavaScript (used via [dag-cbor]), uses a smallest-possible approach:

 * Floating point values must be encoded as the smallest of 16-, 32-, or 64-bit floating point that accurately represents the value, even for integral values.

[refmt], for Go (used via [ipld-cbor] and [ipld-prime]), uses a consistent 64-bit approach:

 * All floating point values must be encoded as 64-bit floating point, even for integral values.

One of these approaches will be chosen and the libraries for the other language will be adjusted or replaced to harmonize.

## Implementations

### JavaScript

[dag-cbor], used by [ipld] and [@ipld/block] adheres to this specification, with the following caveats:

 * Strictness is not yet enforced on decode, blocks encoded that don't follow the strictness rules are not rejected
 * Floating point values are encoded as their smallest form (see above)

### Go

[ipld-cbor] and [ipld-prime] adhere to this specification, with the following caveats:

 * Strictness is not yet enforced on decode, blocks encoded that don't follow the strictness rules are not rejected
 * All floating point value are encoded as 64-bits

### Java

[java ipld from Peergos](https://github.com/Peergos/Peergos/tree/master/src/peergos/shared/cbor) adhere to this specification, with the following caveats:

 * Strictness is not yet enforced on decode, blocks encoded that don't follow the strictness rules are not rejected
 * Floats are disabled

## Limitations

### JavaScript

Users of DAG-CBOR that expect their data may be consumed or produced by JavaScript at some point should be aware of limitations that the language imposes on its use of DAG-CBOR, specifically concerning numbers.

All JavaScript numbers, both floating point and integer, (using the [`Number`] primitive wrapper) are represented internally as 64-bit [IEEE 754] floating-point values (i.e. double-precision). Some implications within JavaScript of this design choice are:

 * There is no clear differentiation between a pure integer type and a floating-point number where a developer may wish to have such a differentiation.
 * By convention, JavaScript engines and developers usually omit the decimal point when representing whole numbers, simulating integers where the number is not actually stored as an integer.
 * There are limits on maximum and minimum safe integer sizes representable in JavaScript that are more constrained than those of languages where there are 64-bit integer types. Numbers outside of the range of `Number.MAX_SAFE_INTEGER` (`2`<sup>`53`</sup>` - 1`) and `Number.MIN_SAFE_INTEGER` (`-(2`<sup>`53`</sup>` - 1)`) cannot be safely manipulated or inspected as they incur rounding effects imposed by the IEEE 754 representation.
 * Native bit-wise operations on "integers" are not able to be performed outside of the 32-bit range; larger numbers will be truncated.

The current CBOR encoder/decoder used by the primary JavaScript DAG-CBOR implementation uses the [bignumber.js] library to handle large numbers in some cases, although reliance on its wrapper type is not recommended by DAG-CBOR users.

The implications for DAG-CBOR of these limitaitons are:

 * Any `Number` serialized by the JavaScript CBOR encoder relies on a whole-number check (e.g. `x % 1 === 0`) to determine whether it should be encoded as an integer or a float.
 * Any float deserialized by the JavaScript CBOR decoder that does not have a fractional component will be indistinguishable from an integer to a JavaScript program.
 * Any `Number` greater than `Number.MAX_SAFE_INTEGER` or less than `Number.MIN_SAFE_INTEGER` cannot be properly inspected for its whole-number status and is therefore encoded by the JavaScript CBOR encoder as float regardless of whether it is a whole-number or has a fractional component.
 * Any integer deserialized by the JavaScript CBOR decoder greater than `Number.MAX_SAFE_INTEGER` or less than `Number.MIN_SAFE_INTEGER` will be returned as a bignumber.js wrapper type, which may be unexpected to users and have unexpected effects on downstream code.

A new [BigInt] built-in type is currently being adopted across JavaScript engines. Once support is widely available, it is expected that this type will assist with some of these challenges.

[IPLD Data Model]: ../../data-model-layer/data-model.md
[Concise Binary Object Representation (CBOR)]: https://tools.ietf.org/html/rfc7049
[IPLD Data Model Kinds]: ../../data-model-layer/data-model.md#kinds
[Links]: ../../data-model-layer/data-model.md#link-kind
[CIDs]: ../CID.md
[Multibase]: https://github.com/multiformats/multibase
[section 2.4 of the CBOR specification]: https://tools.ietf.org/html/rfc7049#section-2.4
[section 3.9 of the CBOR specification]: https://tools.ietf.org/html/rfc7049#section-3.9
[section 3.1 of the CBOR specification]: https://tools.ietf.org/html/rfc7049#section-3.1
[borc]: https://github.com/dignifiedquire/borc
[dag-cbor]: https://github.com/ipld/js-ipld-dag-cbor/
[refmt]: https://github.com/polydawn/refmt/
[ipld-cbor]: https://github.com/ipfs/go-ipld-cbor
[ipld-prime]: http://github.com/ipld/go-ipld-prime
[ipld]: https://github.com/ipld/js-ipld
[@ipld/block]: https://github.com/ipld/js-block
[`Number`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[IEEE 754]: https://en.wikipedia.org/wiki/Floating-point_arithmetic
[bignumber.js]: https://github.com/MikeMcl/bignumber.js
[BigInt]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
