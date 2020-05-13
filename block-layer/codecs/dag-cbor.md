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

DAG-CBOR supports the full [IPLD Data Model].

DAG-CBOR uses the [Concise Binary Object Representation (CBOR)] data format, which natively supports all [IPLD Data Model Kinds].

## Format

The CBOR IPLD format is called DAG-CBOR to disambiguate it from regular CBOR. Most CBOR objects are valid DAG-CBOR. The primary differences are:
  * tag `42` interpreted as CIDs
  * maps may only be keyed by strings
  * additional strictness requirements about valid data encoding forms

## Links

As with all IPLD formats, DAG-CBOR must be able to encode [Links]. In DAG-CBOR, links are the binary form of a [CID] encoded using the raw-binary identity [Multibase]. That is, the Multibase identity prefix (`0x00`) is prepended to the binary form of a CID and this new byte array is encoded into CBOR as a byte-string (major type 2), with the tag `42`.

The inclusion of the Multibase prefix exists for historical reasons and the identity prefix *must not* be omitted.

## Map Keys

In DAG-CBOR, map keys must be strings, as defined by the [IPLD Data Model].

## Strictness

DAG-CBOR requires that there exist a single way of encoding any given object, and that encoded forms contain no superfluous data that may be ignored or lost in a round-trip decode/encode.

Therefore the DAG-CBOR codec must:

1. Use no tags other than the CID tag (`42`). A valid DAG-CBOR encoder must not encode using any additional tags and a valid DAG-CBOR decoder must reject objects containing additional tags as invalid.
2. Use the canonical CBOR encoding defined by the the suggestions in [section 3.9 of the CBOR specification]. A valid DAG-CBOR decoder should reject objects not following these restrictions as invalid. Specifically:
   * Integer encoding must be as short as possible.
   * The expression of lengths in major types 2 through 5 must be as short as possible.
   * The keys in every map must be sorted lowest value to highest. Sorting is performed on the bytes of the representation of the keys.
     - If two keys have different lengths, the shorter one sorts earlier;
     - If two keys have the same length, the one with the lower value in (byte-wise) lexical order sorts earlier.
   * Indefinite-length items must be made into definite-length items.

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

[IPLD Data Model]: ../../data-model-layer/data-model.md
[Concise Binary Object Representation (CBOR)]: https://tools.ietf.org/html/rfc7049
[IPLD Data Model Kinds]: ../../data-model-layer/data-model.md#kinds
[Links]: ../../data-model-layer/data-model.md#link-kind
[CIDs]: ../CID.md
[Multibase]: https://github.com/multiformats/multibase
[section 3.9 of the CBOR specification]: https://tools.ietf.org/html/rfc7049#section-3.9
[borc]: https://github.com/dignifiedquire/borc
[dag-cbor]: https://github.com/ipld/js-ipld-dag-cbor/
[refmt]: https://github.com/polydawn/refmt/
[ipld-cbor]: https://github.com/ipfs/go-ipld-cbor
[ipld-prime]: http://github.com/ipld/go-ipld-prime
[ipld]: https://github.com/ipld/js-ipld
[@ipld/block]: https://github.com/ipld/js-block