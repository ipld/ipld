# Specification: IPLD Data Model

**Status: Descriptive - Draft**

The IPLD Data Model is a core part of the IPLD specification,
which describes what data is representable in IPLD --
for example, booleans, integers, textual strings, maps and lists, etc.

While the Data Model describes these representations in the abstract,
[Codecs](../block-layer/codecs) specify exactly how these data are transcribed
into serialized bytes. (Another component of the IPLD specifications,
[Schemas](../schemas), provide additional optional tooling on top of the Data
Model which can further refine, describe, and constrain the range of acceptable
data values.)

Motivation
----------

There is not **one** block format but **many** block formats widely used today in content 
addressed data structures. We assume that we'll see more of these block formats in the 
future and not less. It is quite clear then that a reasonable and more future proof approach 
to using these data structures is to be block format agnostic.

The data model defines a common respresentation of basic types that **are easily representable
by common programming languages.** This provides the foundation for block format agnostic tools
to be built using familiar native types in a programmer's preferred language. As such, there
is an element of "lowest common denominator" to the IPLD Data Model in that it cannot support
some advanced features (like non-string keys for Maps) because support for such a feature
is not common enough among programming languages.

This does not mean that a block format could not support more advanced features than exist in the 
data model, it just means that the common set of tools IPLD is building w/ its block format 
agnostic approach cannot be easily leveraged to use those features.

Kinds
-----

The following is the list of essential _kinds_ (or more formally, _representation kinds_)
of data representable in the IPLD Data Model:

* Null
* Boolean
* Integer
* Float
* String
* Bytes
* List
* Map
* Link

(Note that we use the term "_kinds_" here to disambiguate this from "_types_",
which is a term we'll use at the [Schemas](../schemas) level.)

The _recursive kinds_ are:

* List
* Map

The _scalar kinds_ (the complement of recursive) are:

* Null
* Boolean
* Integer
* Float
* String
* Bytes
* Link

(Note that [Schemas](../schemas) introduce a few more kinds -- when clarification is necessary,
these Data Model kinds can be called the "_representation kinds_",
while the additional kinds introduced in the Schema layer are "_perceived kinds_".)

### Kinds Reference

Each of the following sections provides details about each of the kinds
introduced in the summary table above.

#### Null kind

Null is a scalar kind.  Its cardinality is one -- the only value is 'null'.

#### Boolean kind

Boolean is a scalar kind.  Its cardinality is two -- either the value 'true' or the value 'false'.

#### Integer kind

Integer is a scalar kind and refers to whole numbers without a fractional
component.

It is important to consider codec and language limitations that may be imposed
on the serialization of integers from the IPLD Data Model. For example:

* Some codecs, such as DAG-CBOR, will assume that integers must be within the
  64-bit signed range and reject anything larger.
* IPLD libraries, such as go-ipld-prime, limit their in-memory representation
  of the integer kind to the signed 64-bit range.
* JavaScript has difficulties safely handling and representing integers outside
  of the 53-bit unsigned range and differentiating between integers and floats
  where there is no fractional component.

#### Float kind

Float is a scalar kind and refers to a number with a fractional component,
represented with a decimal point. This may also include numbers where the
fractional component is zero (although the distinction between these numbers
and integers is blurred in some cases—specifically the JavaScript memory model).

There is not a strict 1:1 mapping between the Float kind and any particular
specified memory layout. Even though IEEE 754 is the most common memory and
binary format for expressing floating point values, the IPLD Data Model does
not treat this format as the definition of "Float". However, for practical
purposes, the IPLD Float kind will be implemented using IEEE 754 primitives and
byte layout in most languages and codecs due to its ubiquity. Parts of the IEEE
754 specification that go beyond the representation of simple floating-point
numbers are not included in the IPLD Data Model. This includes the special
values `NaN`, `Infinity` and `-Infinity`, which are commonly available where
IEEE 754 is supported (`NaN` in particular introduces considerable variability
in byte representations). These should not be supported by IPLD tooling.

While Float is a formal kind in the IPLD Data Model, **it is recommended that
Float values be avoided when developing systems on IPLD** (and
content-addressable systems in general) due to:
 * The broad scope for introducing variability in byte representations.
 * The ambiguity introduced in some languages that may cause round-trip
   discrepancies; specifically JavaScript which does not clearly disambiguate
   between "float" and "integer" in its memory model.
The imprecise nature of representing the range of possible fractional numbers
(infinite) in a fixed number of bits means that floating point operations
typically involve a margin of tolerance (i.e. strict equality is rarely a
correct way to compare floating point numbers generated by different systems).
Content-addressing works best where the content being addressed has a
stable meaning for the address it produces. Alternative methods for
representing this meaning, or for encoding fractional numbers with greater
precision and less variability should be considered where possible.

Some alternatives for representing floating point numbers include:

 * Integers that are divided by a fixed number (e.g. represent cents rather
   than dollars and cents and divide by 100 where necessary).
 * Pairs of integers representing the parts of a floating point, e.g
   significand & exponent.
 * A byte array backed by a programmatic construct with necessary accuracy,
   e.g. Go's `big.Float`.
 * A string form of the value with a fixed number of decimal places.

#### String kind

Strings do not have any guarantees or requirements with regard to encoding.

All the hazards you typically find among programming languages and libraries working with binary
serialization of strings apply to strings in the IPLD data model. IPLD's data model is conceptual,
it takes the world as it is, and the world of strings has widely known compatibility issues.

* Some languages/libraries guarantee a string encoding (typically UTF8), some do not.
* Some languages/libraries can handle arbitrary byte data in strings, some do not.

While some codec specifications will define a required encoding it should be noted that in practice
many codec implementations leave this kind of validation and sanitizaton up to the consumer (application
code) and it is typical to find arbitrary byte data in strings even in codecs that explicitely forbid it.

Applications **SHOULD** only encode UTF8 data into string values and use byte values when they need
arbitrary bytes, but IPLD libraries may not provide these guarantees and rely on the application, or often the
programming language itself, to do so instead.

Applications that only serialize valid UTF8 in string values will have fewer compatibility
issues than applications that do not.

Codec implementations that can de-serialization and roundtrip
arbitrary byte data in strings will see fewer bug reports from people working with data produced by
applications that serialize arbitrary byte data into strings.

The [Unicode Normalization Form](http://www.unicode.org/reports/tr15/) should be NFC.

#### Bytes kind

Bytes is a scalar kind.  Its cardinality is infinite -- byte sequences do not have a length limit.

Bytes are distinct from strings in that they are not considered to have any character encoding nor
generally expected to be printable as human-readable text.
In order to print byte sequences as text, additional effort such as Base64 encoding may be required.

#### List kind

List is a recursive kind.

Values contained in lists can be accessed by their ordinal offset in the list.

#### Map kind

Map is a recursive kind.

Values in maps are accessed by their "key".  Maps can also be iterated over,
yielding key+value pairs.

#### Link kind

A link represents a link to another IPLD Block. The link reference
is a [`CID`](CID.md).

Link is a scalar kind -- however, when "loaded", may become another kind, either scalar or recursive!

### Kinds Implementation References

- Kinds in Go: https://github.com/ipld/go-ipld-prime/blob/master/kind.go
