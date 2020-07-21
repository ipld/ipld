Numeric sizes
=============


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
and if that guidance is "always use a bigint type, regardless of whether you language and ecosystem provides a usable and widely adopted one",
then that guidance will be frequently ignored, regardless of how principled and well-intentioned it may be.

### Why 2^53?

This 2^53 number is chosen because it's reasonably high (e.g., you can use it for timestamps),
and also because it's reasonably practical (it happens to be the number above which javascript's handling of numbers gets Interesting).

**Above this number, it's likely that you'll want to consider application-level and language-level numeric compatibility issues which are bigger in scope than IPLD _anyway_.**

32-bit signed, 32-bit unsigned, 64-bit signed, and 64-bit unsigned integers are also all common numeric sizes to consider,
because those are often the well-supported numeric types in programming languages.
When writing a new IPLD library, we suggest you pick "64-bit signed" if these are your options.

(32-bit numbers are definitely small enough to get you into trouble;
the [2038 problem](https://en.wikipedia.org/wiki/Year_2038_problem) is coming up *very* soon now.
By contrast, a 53-bit integer used to represent a second-granularity timestamp should get you to about the year 285,618,384.
So... it should suffice.)

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





Floating point
--------------

// a lot of text can go here.

// it would be nice if at least some of it can talk about the inherent issues of precision ambiguity in floating point,
// and how fixed point is actually an important consideration in many sufficiently scientific applications.
// discussion of fractions and how floating point approximations of them are necessarily wrong would also be appropriate.
// in general it would be great if this document can remind people that floats are rarely "the answer", and are certainly not the only answer.
