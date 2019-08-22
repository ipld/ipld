Cardinality
-----------

"Cardinality" means "[the number of elements in a set](https://en.wikipedia.org/wiki/Cardinality)".

In IPLD, we use the phrase "the cardinality of a type" to define how many members a type can have.

Cardinality is important to the way we define and think about our Data Model and Schema type systems,
because if the cardinality of two parts of a model aren't the same, then that means one of them is less expressive,
and if they were intended to be interchangeable, this would then be a bug!

Cardinality concepts are also useful for clear documentation and understanding semantics of some of the type
modifier keywords.

You can see some examples of cardinality-counting used to describe `nullable` vs `optional` vs `defaults`
in the schema docs: [Cardinality Examples](/schemas/schema-kinds.md#cardinality-examples).

