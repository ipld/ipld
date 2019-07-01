Schema DSL
==========

IPLD Schemas can be represented in a compact, human-friendly
[DSL](https://en.wikipedia.org/wiki/Domain_specific_language).
IPLD Schemas can also be naturally represented as an IPLD node graph;
the human-friendly DSL compiles into this IPLD-native format.

TODO:FUTURE: more exposition.


Notes
-----

These errata document some of the finer details of the schema DSL
which you don't need to read to get started, but may help clarify the
internal logic of why some parts of the syntax look the way they do.

### Parens after field descriptions

For the most part,
text in the "type" block describes properties of the type -- meaning: things
which affect the cardinality and essence of how we treat the thing --
and text in the "representation" block describes everything else -- meaning
things which change how we map things into the Data Model, but conserve
cardinality.

Sometimes a line which describes a field in a struct has some additional
text at the end of the line which is surrounded by parenthesis.
These parenthesis denote that the contained text is actually "representation"
description.  If we kept to the rule above, in order to specify information
relating to a specific field down in the representation block, we'd end up
repeating the field name.  The parenthesis are our solution to avoiding this
textual redundancy, while also continuing to mark the difference between type
and representational information.

If you look at the IPLD-native format rather than the DSL, you'll see that
the representation and type information remains in clearly separate trees,
and does indeed repeat field names; this concession of the parenthesis is
for the DSL's convenience only.
