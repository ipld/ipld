---
title: "Data Model Kinds"
navTitle: "Kinds"
eleventyNavigation:
  order: 10
---

Kinds
=====

The following is the list of essential _kinds_
of data representable in the IPLD Data Model:

* [Null](#null-kind)
* [Boolean](#boolean-kind)
* [Integer](#integer-kind)
* [Float](#float-kind)
* [String](#string-kind)
* [Bytes](#bytes-kind)
* [List](#list-kind)
* [Map](#map-kind)
* [Link](#link-kind)

(Note that we use the term "_kinds_" here to disambiguate this from "_types_",
which is a term we'll use at the [Schemas](/docs/schemas/) level.)

The _recursive kinds_ are:

* [List](#list-kind)
* [Map](#map-kind)

The _scalar kinds_ (the complement of recursive) are:

* [Null](#null-kind)
* [Boolean](#boolean-kind)
* [Integer](#integer-kind)
* [Float](#float-kind)
* [String](#string-kind)
* [Bytes](#bytes-kind)
* [Link](#link-kind)

(Note that [Schemas](/docs/schemas/) will introduce a few more kinds -- when clarification is necessary,
these Data Model kinds can be called the "_data model kinds_",
while the additional kinds introduced in the Schema layer are "_type kinds_".)


Kinds Reference
---------------

#### Null kind

Null is a scalar kind.  Its cardinality is one -- the only value is 'null'.

#### Boolean kind

Boolean is a scalar kind.  Its cardinality is two -- either the value 'true' or the value 'false'.

#### Integer kind

Integer is a scalar kind and refers to whole numbers without a fractional component.

It is important to consider codec and language limitations that may be imposed
on the serialization of integers from the IPLD Data Model. For example:

* Some codecs, such as DAG-CBOR, will assume that integers must be within the
  64-bit signed range and reject anything larger.
* IPLD libraries, such as go-ipld-prime, limit their in-memory representation
  of the integer kind to the signed 64-bit range.
* JavaScript has difficulties safely handling and representing integers outside
  of the 53-bit unsigned range and differentiating between integers and floats
  where there is no fractional component.

See the [Integers](/design/tricky-choices/numeric-domain/#integers) section in the "tricky design choices"
pages for more details on integer domains.

#### Float kind

Float is a scalar kind and refers to a number with a fractional component, represented with a decimal point.
This may also include numbers where the fractional component is zero.

The exact definition of float numbers in IPLD is somewhat ambiguous because
the typical definitions of float numbers throughout codecs in the wild that
IPLD commonly interfaces with are also somewhat ambiguous.

In practice, we say that floats are roughly what you'd expect from IEEE 754 floats,
but excluding special values such as `NaN`, `Infinity` and `-Infinity`.

While Float is a kind in the IPLD Data Model, **it is recommended that
Float values be avoided when developing systems on IPLD** (and
content-addressable systems in general) due to:

 * The broad scope for introducing variability in byte representations.
 * The ambiguity introduced in some languages that may cause round-trip
   discrepancies; specifically JavaScript which does not clearly disambiguate
   between "float" and "integer" in its memory model.

Some alternatives for representing floating point numbers include:

 * Integers that are divided by a fixed number (e.g. represent cents rather
   than dollars and cents and divide by 100 where necessary).
 * Pairs of integers representing the parts of a floating point, e.g
   significand & exponent.
 * A byte array backed by a programmatic construct with necessary accuracy,
   e.g. Go's `big.Float`.
 * A string form of the value with a fixed number of decimal places.

See the [Floating Point](/design/tricky-choices/numeric-domain/#floating-point) section in the "tricky design choices"
pages for more details on float numbers and the potential ambiguities.

#### String kind

String is a scalar kind.  Its cardinality is infinite -- string sequences do not have a length limit.

Strings are generally meant to contain "human readable" data,
and are typically suggested to contain UTF-8 encoded content.
However, the IPLD Data Model definition of Strings does not have any guarantees or strict requirements with regard to encoding.

All the hazards you typically find among programming languages and libraries working with binary
serialization of strings apply to strings in the IPLD data model. IPLD's data model is conceptual,
it takes the world as it is, and the world of strings has widely known compatibility issues.

* Some languages/libraries guarantee a string encoding (typically UTF8), some do not.
* Some languages/libraries can handle arbitrary byte data in strings, some do not.

While some codec specifications will define a required encoding it should be noted that in practice
many codec implementations leave this kind of validation and sanitization up to the consumer (application
code) and it is typical to find arbitrary byte data in strings even in codecs that explicitly forbid it.

Applications **SHOULD** only encode UTF8 data into string values and use byte values when they need
arbitrary bytes, but IPLD libraries may not provide these guarantees and rely on the application, or often the
programming language itself, to do so instead.

We recommend that if the library or application does check the unicode form, and wishes to do canonicalization,
then the [Unicode Normalization Form](http://www.unicode.org/reports/tr15/) should be NFC.

Applications that only serialize valid UTF8 in string values will have fewer compatibility
issues than applications that do not.

Codec implementations that can de-serialize and roundtrip
arbitrary byte data in strings will see fewer bug reports from people working with data produced by
applications that serialize arbitrary byte data into strings.

#### Bytes kind

Bytes is a scalar kind.  Its cardinality is infinite -- byte sequences do not have a length limit.

Bytes are distinct from strings in that they are not considered to have any character encoding nor
generally expected to be printable as human-readable text.
In order to print byte sequences as text, additional effort such as Base64 encoding may be required.

Codecs generally treat bytes and strings differently.
For example, in the DAG-JSON codec, strings will be emitted as JSON strings (and escaped as necessary),
while bytes will be emitted as a form of Base64 surrounded by some indicator data.

#### List kind

List is a recursive kind.

Values contained in lists can be accessed by their ordinal offset in the list.

#### Map kind

Map is a recursive kind.

Values in maps are accessed by their "key".
Maps can also be iterated over, yielding key+value pairs.

#### Link kind

A link represents a piece of information which points to more data in another IPLD [block](/glossary/#block).

Link is a scalar kind -- however, when "loaded", may become another kind, either scalar or recursive!

Links are concretely implemented as [`CID`](/glossary/#cid)s.


Implementation References
-------------------------

- Kinds in Go: [https://github.com/ipld/go-ipld-prime/blob/master/datamodel/kind.go](https://github.com/ipld/go-ipld-prime/blob/master/datamodel/kind.go)
