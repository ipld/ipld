# Specification: DagCBOR

**Status: Descriptive - Draft**

DagCBOR supports the full [IPLD Data Model].

CBOR already natively supports all [IPLD Data Model Kinds].

## Format

The CBOR IPLD format is called DagCBOR to disambiguate it from regular CBOR.
Most CBOR objects are valid DagCBOR. The only hard restriction is that any field
with the tag 42 must be a valid CID.

## Link Format

As with all IPLD formats, DagCBOR must be able to encode [Links].
In DagCBOR, links are encoded using the raw-binary identity [Multibase] in a
field with a byte-string type (major type 2), with the tag 42.

(the inclusion of the Multibase exists for historical reasons)

## Map Key Restriction

In DagCBOR, map keys must be strings.

## Canonical DagCBOR

Canonical DagCBOR must:

1. Use no tags other than the CID tag (42). Other tags may be lost in
   conversion.
2. Use the [canonical CBOR](https://tools.ietf.org/html/rfc7049#section-3.9)
   encoding.


[IPLD Data Model]: ../../data-model-layer/data-model.md
[IPLD Data Model Kinds]: ../../data-model-layer/data-model.md#kinds
[Links]: ../../data-model-layer/data-model.md#link-kind
[Multibase]: https://github.com/multiformats/multibase
[canonical CBOR]: https://tools.ietf.org/html/rfc7049#section-3.9
