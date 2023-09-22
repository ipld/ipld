
Numeric Domains: Size and Precision
===================================

This document is part of a series on [tricky choices](..) in IPLD design.


Integers
--------

In principle, we consider the range of integers to be infinite.
In practice, many libraries may choose to implement things in such a way that numbers may have limited sizes.

We require that IPLD libraries support integers up to at least size 2^53 in order to be considered a full-featured core-compliant IPLD library.

We love IPLD libraries that support arbitrarily large numbers.  But 2^53 is the critical minimum.


### Why?

Because.

But let's ask more detailed questions, and answer those:

### Why have size limits at all?

Most programming languages and compilers already have size limits when working with numbers.

Being in denial about this when we describe IPLD is unconstructive:
It's important for us to be able to provide concrete recommendations about what we expect from IPLD libraries --
and if that guidance is "always use a bigint type, regardless of whether your language and ecosystem provides a usable and widely adopted one",
then that guidance will be frequently ignored, regardless of how principled and well-intentioned it may be.

### Why 2^53?

This 2^53 number is chosen because it's reasonably high (e.g., you can use it for timestamps),
and also because it's reasonably practical (it happens to be the number above which JavaScript's handling of numbers gets Interesting).

**Above this number, it's likely that you'll want to consider application-level and language-level numeric compatibility issues which are bigger in scope than IPLD _anyway_.**

32-bit signed, 32-bit unsigned, 64-bit signed, and 64-bit unsigned integers are also all common numeric sizes to consider,
because those are often the well-supported numeric types in programming languages.
When writing a new IPLD library, we suggest you pick "64-bit signed" if these are your options.

(32-bit numbers are definitely small enough to get you into trouble;
the [2038 problem](https://en.wikipedia.org/wiki/Year_2038_problem) is coming up *very* soon now.
By contrast, a 53-bit integer used to represent a second-granularity timestamp should get you to about the year 285,618,384.
So... it should suffice.)

### Why not 2^64?

See [Why 2^53](#why-2-53).

(It's desirable to avoid conflict with JavaScript's numeric domain limitations.)

### What if I want to write an IPLD library that supports arbitrarily large ints?

**Go for it.**

If it is possible to support arbitrary "BigInt" in your library, that's fantastic.  Do it.

We just don't _mandate_ this as part of the minimum core feature checklist for IPLD libraries,
because we understand that it's impractical in some programming languages,
either because the "BigInt" types have different performance characteristics,
or aren't widely agreed upon in the community,
or are otherwise simply syntactically or ergonomically clunky to handle, etc.
But if you see it as easy to support: _go for it_.

### What if I ship an IPLD library that only supports 2^47?

(... or some other completely arbitrary number.)

Fine.

Please be very clear about that in your documentation.

We won't list your library in our own docs as being a full-featured core-compliant IPLD library.

But go nuts; nobody's going to stop you.
Your library may run into hard times processing data that's produced by other IPLD libraries, but that's a choice you're free to make.

### What if my IPLD library encounters serialized numbers that are bigger than it supports?

Then it must error.  Clearly, one would hope.

IPLD libraries must not quietly round down to their max (or up to their min) supported values -- they must error.

Fortunately, this rule gets us pretty far, pretty easily -- because we don't *do math* in IPLD,
these errors can really only arise during deserialization,
and should fit naturally into the error reporting flow that deserialization already naturally needs.



Floating Point
--------------

Floating point numbers are a tricky topic.

IEEE 754 establishes fairly common expectations for floating point numbers,
and we'll lean gently on that in how we imagine floats to work in IPLD.
(In particular, the "double64" format is the most widely used format that IEEE 754 specifies;
we'll be discussing that format in particular in the rest of this section.)

However, IEEE 754 is a format which is defined primarily around the constraints of CPU design,
and as a result, there are a lot of practical details in how _serialization formats_ have to map IEEE 754 numbers.
Additionally, IEEE 754 definitions are oriented around _speed_ in computations,
and as a result, tend to take considerable liberty with canonicalization.
Both of these can create issues when working with floating point numbers in or around IPLD,
since IPLD is inherently concerned with both serialization and canonicalization.

In the next couple of sections, we'll talk specifically about several known sources of issues.
However, the general takeaway is:
**it is recommended that Float values be avoided when developing systems on IPLD**.
We aim to describe float values just well enough to make interoperability possible with codecs that include such a concept,
but do not recommend that new protocols be produced which use these concepts.

### The base problem

Be aware that base-2 numbers and base-10 numbers are different.

For whole numbers, the bases are freely convertible without loss.  For decimal numbers, _they are not_.

IEEE 754 floating point numbers are base-2.

Codecs which are binary tend to also be able to use base-2 numbers naturally, and so for these codecs there are typically no issues.
(CBOR and DAG-CBOR are examples of this.)

Codecs which are textual and human readable *tend to use base-10 numbers*, and so far these codecs _there **are** typically conversion issues_.
(JSON and DAG-JSON are examples of this!)

### Fractions

Floating point numbers are not meant to contain fractions (or other non-rational numbers).

Values such as `1/3` are not representable in floating point numbers.
If you need to handle fractions in an application, you should not use floating point numbers:
you should design a way to handle fractions.
(Often, this can be as simple as tracking the numerator and denominator as two distinct integers.)

See [Representable numbers, conversion and rounding](https://en.wikipedia.org/wiki/Floating-point_arithmetic#Representable_numbers,_conversion_and_rounding) on Wikipedia for more discussion.

### Precision limits

IEEE 754 double64 numbers are composed of 11 exponent bits and 53 significand bits.

Since neither of those two numbers is "infinity", we can say that IEEE 754 double64 numbers will have some precision limits.

Very large numbers are unrepresentable.

Some very *small* numbers are also unrepresentable.

The granularity of gaps between numbers which are representable also varies, due to how the exponent bits are used.
Roughly speaking, the distribution of representable floating point numbers is denser nearer to zero.

(Bonus Fun fact: did you know the {the distribution of floating point numbers} and {the distribution of the _sums_ of floating point numbers} are different distributions?
[Indeed they are](https://link.springer.com/article/10.1007/BF02278709).)

### Special values

IEEE 754 specifies several special values such as `Infinity`, `-Infinity`, and `NaN`.

We generally exclude these from being considered floats in IPLD.
Partly, this is a principled choice (we suggest that if a protocol needs sentinel values, it is better to be explicit about them, separately from numbers).
Partly, this is a practical choice (because this is in keeping with the same choices made by popular and ubiquitous codecs such as JSON).

### NaN bits

"Not a Number" (NaN) can be encoded in _many distinct ways_ in IEEE 754 floats.

All of the following values, represented in hexadecimal, are considered acceptable binary representations of NaN:

- `7FF0 0000 0000 0001`
- `7FF8 0000 0000 0001`
- `7FFF FFFF FFFF FFFF`

Nor are the above an exhaustive list of options: NaNs contain a range of bits which are not particularly well specified at all,
and may be considered a "payload"... even though most applications (and indeed, most programming languages) disregard this.

This creates considerable questions for how to canonicalize floating point numbers for serialization purposes.

We simply state that NaN is not part of IPLD's definition of floating point numbers to avoid these issues.

See [Wikipedia for more information on NaN and its encoding](https://en.wikipedia.org/wiki/NaN#Encoding).

### Extended Precision

(It's not a good thing.)

Be aware that some environments (whether exotic programming languages, or _hardware itself_)
offers "[extended precision](https://en.wikipedia.org/wiki/Extended_precision)" when doing floating point math.
In short, this just means it uses more bits when in the middle of the mathematical operation,
and then rounds or truncates the data back down to double64 bit sizes when it's done.

This is not a problem for IPLD itself, per se;
but it's something you should be aware of if designing applications in a space where you care about
reproducibility of computations, or about convergence and canonicalization in data, because it may affect you.

Calculations which are done using extended precision can (and will) have _different results_ than
if the same input numbers were used in a calculation performed without extended precision.
This can be problematic if unexpected.

And it's especially problematic because _it's often unexpected_.
Many programming environments do not make this choice apparent to a programmer;
most environments pass the question off to the hardware directly;
and hardware can (and does) make its own choices in ways that are not necessarily reproducible on other hardware.
(See Java's [strictfp keyword](https://en.wikipedia.org/wiki/Strictfp) for a rare counter-example of this.)

Issues with reproducibility in computation is one of the reasons that
**it is recommended that Float values be avoided when developing systems on IPLD**.

### Avoid floats

(Please.)

Content-addressing works best where the content being addressed has a
stable meaning for the address it produces. Alternative methods for
representing this meaning, or for encoding fractional numbers with greater
precision and less variability, should be considered where possible.
