---
title: "Schema Specs"
navTitle: "Schemas"
eleventyNavigation:
  order: 48
---

IPLD Schema Specifications
==========================

Here are collected the specifications and fixtures for IPLD Schemas.

:::info
This is a _specs_ chapter, rather than a _docs_ chapter.  It's geared for in-depth details.

For more introductory and human-friendly material on Schemas -- what they are, what they do, and how to use them -- see [Schemas in the docs chapters](/docs/schemas/) instead.)
:::

The Schema-Schema
-----------------

The IPLD Schema specification is self-hosting: it is primarily described by the "schema schema".

The schema-schema can be seen in two forms: in DSL form, or as the equivalent parsed Schema DMT in JSON encoding:

- [schema-schema.ipldsch](./schema-schema.ipldsch)
- [schema-schema.ipldsch.json](./schema-schema.ipldsch.json)

### DSL vs DMT

We have something called the "DSL" and something called the "DMT".  What's that stand for?

- "DSL" is short for "[Domain Specific Language](https://en.wikipedia.org/wiki/Domain-specific_language)", a common term of art in computer science.
  We mean it in the usual way: the IPLD Schema DSL is a custom, fit-for-purpose syntax for describing IPLD Schemas.
- "DMT" is short for "[Data Model Tree](/glossary/#dmt)", and that's a term we've coined in IPLD.
  The IPLD Schema DMT is the normalized essential form of IPLD Schemas, and use this as the interchange format and source of truth for reasoning about them.

The IPLD Schema DSL can be compiled down to DMT form, and then passed around (typically, as JSON).
(This makes it easy to build IPLD Schema tools and libraries in new languages, without having to necessarily build a DSL parser!)

Note that the Schema DMT is not exactly an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) for the Schema DSL.
The DMT is meant for mechanical, logical use; whereas the DSL is made for human readability and writability.
As a result of those different priorities, they structure information in somewhat different ways.
(The DMT is more redundant, because it insists on having type-level information be completely defined even if representation information were to be stripped,
whereas the DSL AST avoids making the human repeat the same information twice for any reason;
the DSL AST would probably see some representation information as adjacent to type information (e.g. next to struct fields, which is where syntactically the annotations go in that part of the DSL),
whereas the DMT consistently specifies it all in one place under one object of representation information per type;
etc.)
As a user, you probably don't need to think about this, but as a library developer, keeping in mind that these are different may be a useful clarification.

### The Prelude

The IPLD Schema "prelude" is a series of type declarations that are implicitly present at the top of all schemas.
It provides common types like `String` and `Map` and `List` as named types, without you needing to define them yourself.

[More information about the Prelude](./prelude/)


Examples and Fixtures
---------------------

- Examples:
	- An example Schema, in DSL form, with matching parsed Schema DMT in JSON encoding:
		- [examples.ipldsch](./examples.ipldsch)
		- [examples.ipldsch.json](./examples.ipldsch.json)
- Fixtures:
	- Aside from the schema-schema and examples above, more fixtures for this system are currently lacking.  If you know of some and can link them here, or are willing to write some, please send an issue or PR.


Bootstrapping a Schema implementation
-------------------------------------

The schema-schema is intentionally designed to be relatively easy to parse.
We chose to use features when defining the schema-schema that are the clearest to implement,
and the most likely to be early selections for a high priority in implementing anyway;
and we in some cases carefully avoided using features that would've been nice-to-have but technically nonessential.

For example: the schema-schema only uses keyed and kinded unions, which are some of the most clear to implement.

As another example: the schema schema in several places uses `type X struct {}` rather than
using a `unit` typekind (a la `type X unit representation emptymap`).
We chose to do this, even though use of a unit type would be more semantically explicit,
because we figure that one less thing to implement before being able to successfully wrangle the schema-schema
is probably going to be well-received by anyone implementing schemas in a new language.

It's still probably wise to start with smaller goals than biting off the whole schema-schema at once
as the first target for bootstrapping a new schema implementation in a new language.
Still, we hope these choices in the design _help_.
