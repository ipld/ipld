# An Introduction to IPLD Schemas

## A Quick IPLD Primer

IPLD concerns itself with the data layer of the distributed web. Its scope begins above the data storage and transmission layer, only interested in how data elements are encoded and decoded to a particular storage format and then presented in a consistent and usable form when above this encoding layer.

IPLD uses a [Data Model](https://github.com/ipld/specs/blob/master/data-model-layer/data-model.md) to bound what form its standard data elements can take. The data model allows for standard scalar data types found across most programming languages and a large number of generic data encoding formats (JSON, CBOR, etc.), such as String and Int. It also includes two recursive types that are used to build more complex data structures upon the scalar types. These recursive types are List and Map and should be familiar to most programmers and are also common in many generic data encoding formats. The IPLD Data Model doesn’t include many of the types available in some encoding formats (such as the many Int sizing options available in CBOR). Similarly, it doesn’t support many of these same types available in some programming languages. Instead, it uses this bounded data presentation model as a way to build practical tools that can span many encoding formats and be practically usable in many programming languages.

IPLD’s Data Model is useful for building an abstraction at the data layer. It pushes concerns about encoding and decoding to its own dedicated domain where such concerns only have to deal with a limited set of data types and how to convert to and from those data types. But it also makes room for the development of an ecosystem of libraries and tools that are able to build on top of this model and can therefore operate according to shared assumptions about how data is presented. Such an ecosystem should empower significantly more sharing of algorithms, tools, techniques and code in the distributed web community, rather than siloing these assets in codebases that are concerned entirely use-case-specific stacks.

## Building on the Data Model

IPLD treats its Data Model as the base layer for data representation. As such, rather than referring to the elements of the data model as “types”, they are “kinds”. As we explore IPLD Schemas, this distinction becomes important. A “kind” is what is present at the Data Model layer as far as the tools for the Data Model are concerned (such as encoding formats). 

We can take the Data Model's list of kinds and categorise them as either "scalar kinds" or "recursive kinds". A scalar kind being a singular element that does not contain additional kinds, such as an Int or String. A recursive kind is one that may contain other kinds. The recursive kinds are Map and List.

IPLD Schemas introduce additional kinds, without breaking the Data Model, simply by adding abstractions over the existing kinds. So schemas introduce:

* Unions: to describe a node that may be one (and only one) of a number of well-defined types.
* Structs: typically constructed of a Map with well-defined key/value pairs.
* Enums: a pre-defined set of strings or ints that a particular node must be.

An additional "meta kind" is also introduced for convenience: Copy. A Copy is a mechanism whereby a Schema author may describe one named type as copying the descriptor for another named type.

An IPLD Schema document uses these kinds to define "types". A Schema "type" refers to the data elements that are described by Schemas, where we can piece together the basic kinds to form much more sophisticated data structures that have well-defined shapes and are generally associated with a name (there is limited support for anonymous types for convenience).

Read more about [IPLD Schema kinds](./schema-kinds.md).

Schemas are an important tool for extending IPLD’s scope into the application layer, where coherent and useful data structures are important, rather than disjointed and atomized data elements. In this way, IPLD Schemas provide a barrier to prevent data encoding and storage concerns from leaking too heavily into the application layer. Instead, IPLD can present a clear data abstraction to distributed web developers, a strong separation of concerns. Further, IPLD Schemas contain tools to embed advanced logic able to power bi-directional transformations, further pushing data representation concerns out of the application layer.

## Use Cases

### Schemas as a documentation tool

At their most basic, IPLD Schemas are simply a method of describing the properties of data. They do this bounded by the IPLD Data Model so there isn't a large amount of room for complexity. One goal of IPLD Schemas is efficiency, which makes them useful for validation (see next section), but that goal provides additional constraints on the simplicity of what can be expressed in the Schema DSL.

Various constraints about data cannot be expressed with IPLD Schemas, by design. For example:

  * There are no [dependenent types](https://en.wikipedia.org/wiki/Dependent_type), so you cannot express constraining relationships between values.
  * The Data Model doesn't express certain limitations that may be useful in a specific programming language (e.g. unsigned integers).

But these limitations mean the IPLD Schema DSL as a useful documentation tool because it is fairly easy to understand without much prior exposure. This is in contrast to many other schema languages which attempt to encompass a much broader scope and suffer the complexity consequences of doing so.

IPLD Schemas define the basic data layout and properties according to the IPLD Data Model, for the purpose of documentation and authoring specifications this provides an excellent base layer. Additional layers may introduce constraints and the relationship of the data layout to specific code where appropriate. Future iterations of IPLD Schemas are likely to introduce additional methods to express constraints, primarily for the purpose of code generation, but these will be expressed as adjuncts rather than in the core schema language.

### Schemas as a validation tool

IPLD Schemas are designed to be efficient and have simple and predictable paths to matching data layouts for the purpose of validation. The data layouts describable by IPLD Schemas are not exhaustive but cover the most common forms that are fast to validate. Therefore IPLD Schema types do not need to be deeply traversed to provide validation feedback.

The "union" type in IPLD Schemas provides the most interesting examples of this fast validation. IPLD Schemas only allow you to express a type that "may be X or Y" that is verifiable either by looking at the keys or kinds of immediate child nodes. If "X" and "Y" are not differentiable either by an associated key or by their representation kind, they are unable to be validated with efficiency. These forms are considered anti-patterns and are discouraged by the inability to express them with IPLD Schemas. In most cases, poorly formed constructs such as these need only a small amount of modification to provide fast validation (e.g. by providing a discriminator key that allows for immediate differentiation).

This fast-validation nature of IPLD Schemas will become clearer as you explore the data layouts that are describable and those that are not.

### Schemas as a versioning and migration tool

The fast-validation nature of IPLD Schemas also lends itself to an excellent data versioning tool. As the form of serialized data changes over time, different schemas may be used to express those forms. Being able to attempt validation against different schemas and having efficiency guarantees means IPL Schemas can be used as a data versioning tool. With some are applied to data layout, IPLD Schemas can provide a future-proofing mechanism to match historical forms and determine how to interpret them.

Taken a step further, IPLD Schemas as a two-way (decode and encode) data description tool, abstract the representation layer for the programmer. Migrating data from older formats to newer ones can be performed by focusing on the higher-level transformation function that is applied to the schema-representation data nodes.

Read more about [migrations and versioning](./migration.md).

### Schemas as a transformational tool

IPLD Schemas don't provide a sophisticated set of data transformational tools but they do provide a basic abstraction layer that can turn the simple IPLD Data Model types into forms that are more sympathetic to application design. Examples of this include:

* Mapping a List or a Map data structure at the Data Model layer into a Struct with well-defined and limited members.
* Mapping "may be X or may be Y" union data structures at the Data Model layer into concrete nested data structures with predictable behavior and shape.
* Mapping a List of tuples representing key/value pairs at the Data Model layer to a Map.
* Abstracting the stored data through transformational logic to present entirely new forms via "advanced layouts", where code is associated with schema for two-way transforms (more on this in the [Advanced Layouts](advanced-layouts.md) section).

### Schemas as a code generation tool

IPLD Schemas provide a means to connect the serialization and deserialization process with application layer data structures. As such, they can be used to generate APIs and code to simplify and more tightly bound the data layer of a distributed web application. The aim of IPLD Schemas as a code generation tool is to simplify the process of managing data and create a cleaner and stricter abstraction than is found today in distributed web applications.

Work on code generation is ongoing.

## Schema Language: DSL and Reified Form

IPLD Schemas take two forms: a dedicated DSL and a reified form that is generally presented as JSON. The DSL is designed for expressibility and clarity as a user-facing tool. It is useful for as a specifier as well as a documentation tool. The DSL also allows for inline comments and allows for some flexibility regarding newlines and whitespace. The reified form, however, is more stable. It does not capture comments and is more tightly constrained within JSON form. It is intended that user-facing instances of IPLD Schemas will present the DSL, while internal, programmatic uses will use the reified form. The IPLD Schema tools in [JavaScript](https://github.com/ipld/js-ipld-schema) and [Go](https://github.com/ipld/go-ipld-schema) can perform various conversions and validations between these formats.

The IPLD Schema’s own internal representation is also defined in the schema language itself. This is referred to as the “**schema-schema**”. The [DSL form](schema-schema.ipldsch) and the [reified form](schema-schema.ipldsch.json) of the schema-schema are kept up to date with the IPLD Schema specification. This schema-schema makes IPLD Schemas *mostly* self-describing, in that an instance of an IPLD Schema can be validated against the schema-schema to determine if it has a valid form. There are some additional constraints on IPLD Schema forms that are not strictly covered in the schema-schema itself, such as rules around valid characters for type names. While there are comments in the schema-schema that make it a very useful document for understanding the internal representation of IPLD Schemas, additional specification is required, particularly for the DSL which is not adequately covered by schema-schema.
