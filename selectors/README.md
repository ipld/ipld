IPLD Selectors
==============

IPLD Selectors are a declarative format for specifying a walk over a [Data Model](/data-model/) graph --
what nodes to walk over (or not), recursively; and, some positions to "visit" (with a callback, typically, though library implementation details may vary).
You can think of Selectors as being roughly like "regexps for graphs".

Selectors are natively implemented in most IPLD libraries (for performance reasons),
but the format itself is standardized.
The format is described in IPLD (using [IPLD Schemas](/schemas/)),
so it's possible to serialize Selectors in any [Codec](/codecs/) you want,
and it's also possible to inspect (and transform!) Selector documents using standard [Data Model](/data-model/) tools.

// TODO link to specs repo content
