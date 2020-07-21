The IPLD Data Model
===================

The IPLD "Data Model" refers to the most essential concepts of data that we understand and work with.

The IPLD Data Model is very simple and inspired by the minimality of JSON.

It is comprised of the following recursive kinds:

- maps
- lists

... and the following scalar kinds:

- strings
- booleans
- integer numbers
- floating point numbers
- bytes (this is an additional divergence, compared to JSON)
- links (a key part of what makes IPLD special)
- and null.


Where does the Data Model fit in?
---------------------------------

- the Data Model describes data in the abstract.
- almost all of the core interfaces you'll see in IPLD libraries revolve around the Data Model.
	- for example, [traversals](traversal.md) and [pathing](pathing.md)
- [Codecs](codecs.md) specify exactly how these data are transcribed into serialized bytes.
- [IPLD Schemas](schemas.md) can provide additional optional tooling on top of the Data Model which can further refine, describe, and constrain the range of acceptable data values --
  but also still present the resulting data according to the same interfaces as the Data Model.
- [Adavanced Data Layouts (ADLs)](advanced-data-layouts.md) also provide additional features for wrangling data --
  while presenting the results in a way that conforms to the Data Model interfaces.

In short: when you write code using IPLD libraries, you'll be interacting with Data Model concepts constantly.


Kinds, in detail
----------------

// TODO finish adding all the relevant h3's here, obviously

### integers

Integers in the IPLD Data Model are... what you expect.

In principle, we consider the range of integers to be infinite.
In practice, many libraries may choose to implement things in such a way that numbers may have limited sizes.
We require that IPLD libraries support integers up to at least size 2^53 in order to be considered a full-featured core-compliant IPLD library.

(There's a full document about [numeric size](/details/numeric-size.md) which you can refer to for more detail.)



There will be no more data kinds
--------------------------------

We will not be adding a "date" kind, or... anything else, really.

A data model should be simple.
You can create whatever you need to describe using recursive structure.
The popularity and endurance of simple systems like JSON, with its similarly minimal data model, demonstrate that this is a good approach.

A data model should be universally understood.
Introducing complex, subtle, or controvertial
(e.g. more than one level of complexity is justifiable, in various circumstances -- as is very much the case in "date" data, for example!)
kinds of data into the core of a data model is not a good idea.
The unpopularity and lack of widespread adoption of any of the serialization formats which have been "JSON plus dates" --
of which there have been *many* over time --
demonstrate the unwisdom of trying to introduce complex concepts in the basic data model.
