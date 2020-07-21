Occasionally Asked Questions
============================

### How does compression relate to IPLD?

Compression in your data itself is frowned upon,
as it breaks the "emergent convergence" story.

Instead, make compression something that is transparently carried out by:
- transport ( e.g. HTTP gzip )
- or storage ( e.g. compressed badger blocks )

As a general rule of thumb: IPLD should be operating on the *logical* form of your data.
