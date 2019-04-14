IPLD Data Model
===============

The IPLD Data Model is a core part of the IPLD specification,
which describes what data is representable in IPLD --
for example, booleans, integers, textual strings, maps and lists, etc.

While the Data Model describes these representations in the abstract,
[Codecs](Codecs) specify exactly how these data are transcribed into serialized bytes.
(Another component of the IPLD specifications, [Schemas](schema), provide
additional optional tooling on top of the Data Model which can further refine,
describe, and constrain the range of acceptable data values.)


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
which is a term we'll use at the [Schemas](schema) level.)

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

(Note that [Schemas](schema) introduce a few more kinds -- when clarification is necessary,
these Data Model kinds can be called the "_representation kinds_",
while the additional kinds introduced in the Schema layer are "_perceived kinds_".)


### Null kind

Null is a scalar kind.  Its cardinality is one -- the only value is 'null'.

### Boolean kind

Boolean is a scalar kind.  Its cardinality is two -- either the value 'true' or the value 'false'.

### Integer kind


### Float kind


### String kind

String is a scalar kind.  Its cardinality is infinite -- strings do not have a length limit.

Strings should be UTF-8 text, in [NFC](https://www.unicode.org/reports/tr15/#Norm_Forms) canonicalization.

### Bytes kind

Bytes is a scalar kind.  Its cardinality is infinite -- byte sequences do not have a length limit.

Bytes are distinct from strings in that they are not considered to have any character encoding nor
generally expected to be printable as human-readable text.
In order to print byte sequences as text, addition effort such as Base64 encoding may be required.

### List kind

List is a recursive kind.

Values contained in lists can be accessed by their ordinal offset in the list.

### Map kind

Map is a recursive kind.

Values in maps are accessed by their "key".  Maps can also be iterated over,
yielding key+value pairs.

### Link kind

A link represents a link to another IPLD Block. The link reference
is a [`CID`](CID.md).

Link is a scalar kind -- however, when "loaded", may become another kind, either scalar or recursive!


Implementation References
-------------------------

- in Go: https://github.com/ipld/go-ipld-prime/blob/master/kind.go
