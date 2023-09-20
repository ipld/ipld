---
title: "Schemas: Migrations"
navTitle: "Migrations"
eleventyNavigation:
  order: 280
---

IPLD Schemas and migration
==========================

Fundamental to our approach to schemas is an understanding:

> Data Never Changes.  Only our interpretation varies.

Data can be created under one schema, and interpreted later under another.
Data may predate or be created without any kind of schema at all.
All of this needs to be fine.

Moreover, before talking about migration, it's important to note that we
don't allow the comforting, easy notion that migration is a one-way process,
or can be carried out atomically at one magically instantaneous point in time.
Because data is immutable, and producing updated versions of it doesn't make
the older version of the data go away, migration is less a thing that you do;
and more a state of mind.  Migration has to be seamless at any time.

Migration comes in two parts:

1. Understand what data we have;
2. and having a process to map it into the format of data we want.

We'll spend a few sections on part 1, and then get on to part 2.

Version detection
-----------------

We don't include any built-in/blessed concepts of versioning in IPLD Schemas.
It's not necessary: we have rich primitives which can be used to build
either explicit versioning or version detection, at your option.

Since it's easy to check if a schema fits over a piece of data, it's
easy to simply probe a series of schemas until finding one that fits.
Therefore, any constraint a schema makes has the potential to be used
for version detection!

There are a handful of recognizable patterns that are used frequently:

- Using a dummy union to get nominative typing at the document root.
  - e.g. `{"foo": {...}}`, using "foo" as the type+version hint.
    The union has only single member, and we use this in concert with multiple
    schemas and probing: it returns quickly in the case of a non-match.
  - Any union representation will do.
    - Keyed unions: `{"foo-v2": {...}}`
    - Envelope unions: `{"version": "2", "content":{...}}`
  - Inline unions: `{"version": "2", ...}`
  - A single-member struct would also fit the pattern, being functionally
          equivalent to a keyed union.
  - See the schema-schema for an example of this!
- Using a "version" union (with multiple members).
  - e.g. `{"version": "1.2.3", "data":{...}}`
  - Any union representation will do.
  - This might not be the best approach: in this approach, the multiple versions
    are implemented *within* one schema!  Typically it's considered easier to
    work with and more maintainable to use a separate schema per version.
- Using a struct with "version" field(s), then a second unpacking.
  - Two phases of matching allow user-specified decisions in the middle:
    - First a simple schema is used, containing some struct fields for version
      info, plus some ignored fields which will contain the further content.
      This simple schema is assumed to match completely.
    - Secondly, using information from that first pass, user-specified logic
      selects a complete schema, which is then used to handle the full data.

(Currently, this probing is left to the library user.  More built-in features
around this are expected to come in the future.)

Any of these approaches may also be composed.  For example, you might choose
to use a dummy union at the root of a document to sanity-check what general
type of data you're processing; and use an inline union inside that for more
specific version matching, and so forth.

(In the future, we may also be able to construct some specialized schemas that
suggest jumping to another schema specifically and directly (rather than
linear probing); some research required.  (Ideally this would work consistently
regardless of the ordering of fields in the arriving data, but there's some
tension between that and performance.)  It might also be possible to construct
these as a user already!)

NOTE that these conventions are easy to adopt even by systems not implemented
using IPLD Schemas!  If you're working on a system which hasn't started using
IPLD Schemas yet, and you aim to in the future, *start using version hinting*
based on these designs *now*; the benefits can be reaped later.

Versioning theory
-----------------

There are different philosophies of versioning: namely, explicit versioning
labels and version detection; which to use is a choice.

In short, explicit versioning with labels takes a prescriptive approach,
requiring coordinated labelling choices up front, and thus tends towards
fragility and is not particularly fork/community/decentralization-friendly.
Version detection -- also known as its generalized cousin, *Feature* detection
-- is strictly more powerful, but can be more complex.
Neither can be deployed to reliable effect without a plan.

Explicit versioning labelling is prone to treating the version label as a
semantic junk drawer, upon which we can heap unbounded amounts of
not-necessarily-related semantics.
This is a temptation which can be mitigated through diligence, but the
fundamental incentive is always there: like global variables in programming,
a document-global explicit version allows lazy coding and fosters presumptions.

Version/feature detection has the potential to become a fractal.
Using it well thus *also* requires diligence.  However, there is no built-in
siren temptation to misuse them in the same way as explicit versioning; the
trade-offs in complexity tend to be make themselves fairly pronounced and
as such are relatively easily communicated.

It's impossible to make a blanket prescription of how to associate version
information with data.  Different choices have different tradeoffs.
IPLD Schemas aim to make either choice (or hybrids of approach!) viable.

Strongly linked schemas
-----------------------

It is possible to have a document which links directly to its own Schema!
Since IPLD Schemas are themselves representable in IPLD, it's outright trivial
to make an object containing a CID linking to a Schema.

This may be useful -- in particular, it certainly solves any issue of choosing
unique version strings in using explicit versioning! -- but it is also worth
noting that is is not a solution to *migration*: while having a specific schema
explicitly linked is certainly one way to address the need to
"understand what data we have", remember that the definition of migration has a
second half: "having a process to map data into the format we want".

Unless it just so *happens* that this exact schema is the one you want, and have
already build your application logic against, etc... an explicitly linked schema
doesn't necessarily provide more value in terms of migration than any of the
other forms of versioning; it's essentially the same as using explicit labels.

Actually migrating
------------------

IPLD Schemas aren't completely magic.

Some part of migration is inevitably left up to application logic.
Almost by definition, "a process to map data into the format of data we want"
is at its most general going to be a turing-complete operation.

However, IPLD can still help: the relationship between the Data Model versus
the Schema provides a foundation for writing maintainable migrations.

Any migration logic can be expressed as a function from `Node` to `Node`.
These nodes may each be checking Schema validity -- against two different
schemas! -- but the code for transposing data from one node to the other
can operate entirely within Data Model.  The result is the ability to write
code that's effectively handling multiple disjoin type systems... without
any real issues.

Thus, a valid strategy for longlived application design is to handle each
major change to a schema by copying/forking the current one; keeping it
around for use as a recognizer for old versions of data; and writing a
quick function that can flip data from the old schema format to the new one.
When parsing data, try the newer schema first; if it's rejected, try the old
one, and use the migration function as necessary.

If you're using codegen based on the schema, note that you'll probably only
need to use codegen for the most recent / most preferred version of the schema.
(This is a good thing!  We wouldn't want tons of generated code per version
to start stacking up in our repos.)
Parsing of data for other versions can be handled by `ipldcbor.Node` or other
such implementations which are optimized for handling serial data; the
migration function is a natural place to build the codegenerated native typed
`Node`s, and so each half of the process can easily use the `Node`
implementation that is best suited.
