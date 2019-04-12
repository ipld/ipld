IPLD Data Model
===============

The IPLD Data Model is "layer 1" of the IPLD core models.
("Layer 0" are the [Codecs](Codecs); "layer 2" is called [Schemas](schema).)

The Data Model specifies what categories of data are representable in IPLD --
for example, booleans, and integers, and textual strings.
[Codecs](Codecs) specify exactly how these data are transcribed into serialized bytes.


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

Strings are generally understood to be UTF-8 text, in [NFC](https://www.unicode.org/reports/tr15/#Norm_Forms) canonicalization.

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
