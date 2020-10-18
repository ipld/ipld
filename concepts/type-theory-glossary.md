A quick Primer and Glossary of Type Theory
==========================================

This document provides a quick overview of "type theory", and specifically,
how we use it to reason about data and design in IPLD.

We take "type theory" to mean primarily: a way of reasoning about programs
and data by counting how many possible states they may have.
We call this counting of possible, inhabitable states counting "cardinality".
(We acknowledge that there's much more to "type theory" than this in the
broader literature and history of computer science, but since IPLD is
about *data*, focusing on this subset of type theory suits our purposes.)

You'll find this document is linked to by the IPLD specs -- both for describing
key theoretical foundations of the Data Model, and also to better describe some
of the advanced features in the Schema layer (plus the reasons for them) --
*and* you'll also find this document linked to by the
[library design notes](../design/libraries), where we use some of this
terminology to describe features of programming languages without resorting
to language-specific vocabulary.


Cardinality
-----------

"Cardinality" means "[the number of elements in a set](https://en.wikipedia.org/wiki/Cardinality)".

In IPLD, we use the phrase "the cardinality of a type" to define how many members a type can have.

### Why is Cardinality important?

Cardinality is important to the way we define and think about our Data Model and Schema type systems,
because if the cardinality of two parts of a model aren't the same cardinality,
then that means one of them is less expressive.
If we intended two systems to be interchangeable, but they have unequal cardinality,
then we can quickly and clearly identify that there must be a bug somewhere!

Cardinality concepts are also useful for clear documentation.

Cardinality counting can be used as a design planning exercise:
count how many states your types *can* have, and then consider how many states
your code is designed to handle, and if they're not equal,
then it's clear that you have work to do!

In practical application, you can see some examples of cardinality-counting used
to describe `nullable` vs `optional` vs `implicit` values in the IPLD Schemas documentation:
[Cardinality Examples](../schemas/schema-kinds.md#cardinality-examples).
These cardinality countings are both key to the documentation,
and key to understanding and using those features to build unambiguous APIs.

### How do we Count Cardinality?

Counting cardinality is probably best done by example.

Consider a boolean: it can have the value 'true', or it can have the value 'false'.
We simply count these states up!  The cardinality of a boolean is `2`!

Now, consider a pair of boolean values: how many states can it have?
Four: `(true, true)`, `(true, false)`, `(false, true)`, or `(false, false)`.
So, the cardinality of two booleans is `4`.

The exercise gets more interesting as we consider larger accumulations of values.
We will also find that how the cardinality count accumulates differs based on
how the types are composed!

We'll explore more examples of this, and start identifying categories of
things where we can do predictable kinds of math with cardinality in
the next section: [Categories of Types](#categories-of-types).


Categories of Types
-------------------

We can identify a few categories of "types" based on how we evaluate their cardinality.
(These definitions will use names that are popularized in computer science,
and so they *may* match the name used in your favorite programming language -- but
whether or not the same is familiar, the *concept* is universal, even across languages!)

### enumerated types

Enumerated types (usually, "enum" for short) have a cardinality that is some integer.

For example, an enum might have members named "Foo", "Bar", and "Baz";
and the cardinality of that enum is "|3|".

(The term "enum" might make more sense if you think of it as short for
*enumerated*, rather than *enumerable* -- something with countable-infinity
members is **not** considered an "enum".
(We'd call that an [infinite scalar](#infinite-scalar) instead.))

### sum types

Sum types have a cardinality that is *the sum of cardinality of their member types*.

Sum types usually show up in prose descriptions of data as the word "or".

For example, say: "I have a boolean *or* an integer" --
this would be an example of a sum type,
and its cardinality would be "|inf+2|" --
countable infinity for the integer, and plus two for the boolean.

A clearer example might take two enums -- let's call them
"Animals" (it has members "cat", "dog", "rabbit"),
and "Furniture" (it has members "chair", and "desk") --
and say "I have an Animal *or* a furniture" --
then clearly I have one (and only one) of these five things:
the cardinality is "|3+2|".

Sum types go by many names in various communities: they're also commonly
known as "(discriminated) unions", "(tagged) variants", or other terminology.
(We use the "union" term ourselves, in the lexicon of IPLD Schemas!)

You can also consult the Wikipedia page on
[Sum Types](https://en.wikipedia.org/wiki/Sum_types)
for broader discussion of the topic.
https://chadaustin.me/2015/07/sum-types/ also contains some useful content
and examples from a variety of languages.

### product types

Product types have a cardinality that is *the multiplied cardinality of their member types*.

This may sound outlandish, but you've been using them all your life:
*"product types" are commonly known as "structs"*
(or, "classes", in more aggressively object-oriented languages).

Product types usually show up in prose descriptions of data as the word "and".

For example, say: "I have a boolean and another boolean and another boolean" --
you might write code for this as `struct{ a bool, b bool, c bool }`,
and its cardinality would be "|2\*2\*2|" -- "|8|" --
two for each of the booleans, and multiplied because each of them may vary independently,
and thus each of the booleans adds another "dimension" to the state space described by this combined value.

For another example, using our enums again above --
"Animals" (it has members "cat", "dog", "rabbit"),
and "Furniture" (it has members "chair", and "desk") --
we could say "I have an Animal, *and* it's on top of a Furniture" --
and then I could have any one of of *six* states
("cat on a chair", "cat on desk", "dog on a chair", etc):
the cardinality is "|3\*2|".

### infinite recursives

Infinite recursives, as it says in the name, have infinite cardinality.

Maps and lists are recursives because they can contain other values,
including more maps and lists.
Maps and lists are also infinite (even at a single level, before considering recursion):
since we can keep inserting entries into a map, or appending values to a list,
and still have a map or list respectively, we treat their cardinality as infinite.

Note that it's still useful to do math around these, though.
For example, if you have "maybe a map" (see the [maybe types](#maybe-types) section,
coming later, in the [Types in the Wild](#types-in-the-wild) chapter) you may
find it useful to declare that the cardinality of your map is "a" (an arbitrary placeholder),
and then the cardinality of "maybe map" is "|a+1|".

### infinite scalars

Infinite scalars is a term to describe things like strings:
because they can be unlimited in length, they have infinite cardinality.
Since we can take a string, append some more characters,
and still have string, we can't count its cardinality.

Infinite scalars aren't very different from infinite recursives, arguably.
("A string is just a list of characters" is one such argument.)
Still, we often regard these things as having separate categories in practice:
strings are usually treated as a single token in serializers, despite being "infinite";
numbers are infinite (even if there are some practical problems with this:
see [what about numbers?](#what-about-numbers) in the [Types in the Wild](#types-in-the-wild) chapter),
but certainly aren't usually considered to be recursive (though this does sometimes
see usage in theory -- see [Peano Arithmetic](https://en.wikipedia.org/wiki/Peano_arithmetic)!);
and so on.

As with infinite recursives, note that it's still useful to do math around these.
For example, if you have "a string or a null",
you have a [sum type](#sum-types) (more specifically, a [maybe type](#maybe-types)),
and even if the cardinality of string is "infinite", it's still useful to declare
the cardinality of your string is "a" (an arbitrary placeholder),
and then the cardinality of "string or null" is "|a+1|".
(In practice: how often have you had an API bug burn you on the difference
between null and an empty string, or the difference between null and absent?
This is why we keep counting cardinality even after an infinity shows up!)

### unit types

Let's talk about one last size of cardinality... "unit": unit just means "one".

"Unit" types don't come up too often... or at least, they're not often named as such.
Just like "product types" are quite common once you recognize them, though, so is "unit".

"Null" can be thought of as a "unit" type.

"Maybe"/"Optional" types (further discussion later in the [Types in the Wild](#types-in-the-wild) chapter,
specifically the [maybe types](#maybe-types) section) can be thought of as "unit plus a thing".

Enums can be considered a sum type of where every type is itself a just another named unit type!
(Whether or not you find this a *useful* perspective is up to you.  If it's confusing, forget it.)


Open vs Closed membership
-------------------------

All of the above [categories of types](#categories-of-types) have one thing in common:
they have "closed" membership.  That is, at "compile" (or other static analysis) time,
we know what their membership is, and we can completely count their cardinality (infinities notwithstanding).
Once the program is compiled(/analyzed), there's no way to add new members to any of these types,
and no reason to consider the idea of updating any of the cardinality accounting.

What if we want "open" membership, where I *don't* know all of the possible
types of values that will be part of a type in advance?

This "open membership" is commonly known as **interfaces**.

### interfaces

Interfaces have the concept of "open membership", and are also typically
combined with some definition of "features", also called as traits or behavior
in some languages, that are required if something will be considered to
implement the interface.

In programming languages, the definition of "features" usually is expressed in
terms of a set of methods.  This makes sense for programming languages,
because if you don't know what methods you can call on a thing,
you can't really do much with the thing!

One could also imagine using a different definition of "features" to describe
"interfaces" that apply purely to data:
For example, stating that some map has the features to conform to an interface
only if some entries of some known names and value types are present in the map.
(However, this is not often seen, so this document will continue to frequently
refer to "sets of methods" when discussing interfaces.)

### explicit versus structural interfaces

Interfaces as found in programming languages tend to fall into one of two large camps:
*explicit* interfaces, or *structural* interfaces.

Explicit interfaces require types implementing them to say so.

Structural interfaces state some set of methods (or more generally, features)
that must be present on a type for it to satisfy the interface;
then, any type that has those methods implements the interface.

Both explicit and structural styles of interfaces have "open" membership --
you can "compile" a program that has interfaces in it,
then add more libraries when you "link" the program and execute it,
and those libraries can add more implementors of the interfaces!

The explicit and structural styles vary in other practical details.
For example, explicit interfaces require referencing the interface they implement;
this makes them significantly less flexible, and creates many dependency management requirements.
By contrast, structural interfaces can knowingly conform to an interfaces contract
while still not referencing it directly; this can be extremely useful in
designing systems for independently upgradeable pieces.

(There are other yet more detailed ways in which these styles vary, but
since they're not really important in this document, we'll rest here.)


Types in the Wild
-----------------

These different categories of types are present in most programming languages,
but not all of them are present in every language (!),
and they often go by different names in different programming communities.
Here's a few (non-exhaustive) examples in a handful of languages:

### enums in the wild

In Java, the `enum` keyword maps directly the category of [enum](#enumerated-types) we've defined here.

In Go, *there is no direct support for enums*.
However, it's often implemented in practice by a typedef of an int, and a table of named constants.

In Rust, there's an `enum` keyword, and it may be used to implement [enum](#enumerated-types) as we've defined it here.
However, if you're coming from a Rust background, and trying to understand this document and compare to other languages,
be cautious here: the Rust `enum` keyword *also* provides what we call [sum types](#sum-types).

#### booleans

In many languages, the concept of `boolean` can be understood as a particular instance of an enum --
it's just an enum with two values!
Sure, it may be implemented as 'primitive' in many languages... but clearly,
for cardinality counting, we can see a boolean as exactly "|2|".

### sum types in the wild

In Java, *there is no direct support for sum types*.
The nearest thing possible is to create an interface,
and promise that only a known number of types will implement it.

In Go, *there is no direct support for sum types*.
The nearest thing possible is to create an interface with an unexported method,
and make sure only a known number of types in the same package implement it.
(See https://github.com/BurntSushi/go-sumtype for tooling to help support this;
the readme also contains good documentation of the concept!)

In Rust, the `enum` keyword (confusingly) also creates sum types.
Rust's sum types are at least properly closed (unlike Java's and Go's).

#### maybe types

In *many* languages, you may find a type in the standard library called "Maybe",
or equally frequently, "Optional", or, "Either".
These are a sum type!
They're typically explained as "either **none**, or **some** of a thing":
so, they take the cardinality of a thing and simply "plus one" to it,
and colloquially call that additional state the "none" state.

For some `Maybe<T>`, the cardinality is "1+|T|".

(This is also a great example for how we can use cardinality counting methods
to create clear comparisons between differently named but functionally
identical concepts between programming language communities!)

#### indiscriminate unions

Some languages (notably, C/C++) have a concept of "union" which is related,
but markedly _not_ a sum type, because this particular concept of a union
is not "discriminated" -- it doesn't actually itself contain all the info needed
to completely understand or handle it.
This kind of "union" can be used to _build_ a sum type semantic,
but only in combination with an additional bit of memory used to indicate
(or "discriminate", if you will) what member type the union actually contains.

We mention this here because the terminology is sometimes confusing.

### product types in the wild

In Java, `class` creates a product type.

In Go, `struct` creates a product type.

In Rust, `struct` creates a product type.

### interfaces in the wild

In Java, the `interface` keyword introduces an interface.
These interfaces are [*explicit*](#explicit-versus-structural-interfaces): a class must use the `implements` keyword to explicitly state that it can satisfy that interface.
(That the class has sufficient methods to match the interface is then also checked at compile time -- but having the methods is not necessary rather than sufficient for the "implements" relationship to be considered true).

In Go, the `interface` keyword introduces an interface.
These interfaces are [*structural*](#explicit-versus-structural-interfaces) -- a struct doesn't need to *say* it implements an interface;
if it has the relevant methods, then you can start using values of that type wherever the interface is required.

In Rust, the `trait` feature combined with the `impl`+`for` keywords is most comparable to the concept of interface in other languages.
Implementing a trait is [*explicit*](#explicit-versus-structural-interfaces) -- a type must use the `impl`+`for` keywords to explicitly state the methods that satisfy the trait.

### what about numbers?

Numbers are... interesting.

For the most part in computing, we tend to pretend and build abstractions as if
numbers are [infinite scalars](#infinite-scalars).

Of course, this is rarely true in practice.
Integers are often implemented in such a way that values that would require beyond 32 (or 64, etc) bits are unrepresentable;
arguably, this makes them more like a (very (*very*) large) enum than anything else.
Floating point numbers implemented in IEEE754 style also have their own entire host of foibles
(they're still subject to limitations that stem from finite bit-size implementations;
they have different ranges of representability than an integer of the same bit size;
the _precision_ they can represent varies with _how big_ the number in question is;
they include _interesting_ values such as signed zeros which one might readily
argue should not even be representable in an ideal system... and so on!).

Some languages provide "big" numbers in their standard libraries.
These "big" numbers are typically implemented by storing data as bytes,
and expose mathematical operations on themselves as methods.
By using a non-fixed number of bytes, they can be true [infinite scalars](#infinite-scalars).
However, these "big" numbers are typically *not interchangeable* with the language's built-in number types,
because the performance characteristics of these "big" numbers and their storage format
is radically different than that of fixed-bit-size built-ins.
(Attempts to shoe-horn "big" numbers and regular numbers into a single type tends
to result in increasing the size of regular numbers, and few languages accept this tradeoff.)
Since "big" numbers and built-in numbers usually aren't interchangeable,
"big" numbers complicate rather than simplify the discussion;
and since "big" numbers are the more rarely used of the two styles,
most of our concerns in practice continue to orbit around fixed-bit-size numbers.

The scope of this document is not to solve this conundrum, nor to try to convince you how you should consider numbers.
In IPLD, we usually do consider integers to be [infinite scalars](#infinite-scalars);
we add the caveat that libraries processing data which exceeds the boundaries they can process should error and halt explicitly.
(In IPLD, we have the good fortune that this definition is unusually easy to stick to:
since we only carry data around, and don't provide mathematical operations on it,
it's easy to expect that data which was processable on the way in will remain processable throughout the time we handle it.)


Types in IPLD Schemas
---------------------


The core features of IPLD Schemas map very closely to the categories of types we've discussed:

- [enumerated types](#enumerated-types) are `enum`.
- [sum types](#sum-types) are `union`.
- [product types](#product-types) are `struct`.
- [infinite recursives](#infinite-recursives) appear as `list` and `map`.
- [infinite scalars](#infinite-scalars) appear as `string`, `bytes`, and `int`.
- [sum types](#sum-types) specifically for [maybe](#maybe-types) show up as `optional` and `nullable`.
	- (there are two of them because each creates a sum with a different [unit type](#unit-types)!)

IPLD Schemas don't have a concept of [interfaces](#open-vs-closed-membership).
At least, *not exactly* -- not *within* the schema.
Instead, the *whole Schema* is treated as an interface:
since you can take some data and take a schema, and attempt to unify them to get typed data if the schema "matches"...
you can use a series of Schemas in the same way as you'd use a series of interfaces.
(IPLD Schemas are effectively [*structural*](explicit-versus-structural-interfaces) interfaces.)
