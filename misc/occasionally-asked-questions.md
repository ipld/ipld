Occasionally Asked Questions
============================

General
-------

### How does compression relate to IPLD?

Compression in your data itself is frowned upon,
as it breaks the "emergent convergence" story.

Instead, make compression something that is transparently carried out by:
- transport ( e.g. HTTP gzip )
- or storage ( e.g. compressed badger blocks )

As a general rule of thumb: IPLD should be operating on the *logical* form of your data.


Schema-related
--------------

### What's the difference between a union and an enum?

Unions are a recursive, and can contain any other type (with... some details and restrictions in IPLD Schemas, due to representations).  Enums are a scalar with countable cardinality.

Unions are also known as "sum types" in some literature.  We latched onto the term "union" because A) it's one word; and B) due to the popularization of that term for it in Facebook's GraphQL.
