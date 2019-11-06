IPLD Schemas
============

**Status: Prescriptive - Draft**

* **[IPLD Schemas Goals](./goals.md)**
* **[IPLD Schemas Feature Summary](./feature-summary.md)**
* **[An Introduction to IPLD Schemas](./introduction.md)**
  * [A Quick IPLD Primer](./introduction.md#a-quick-ipld-primer)
  * [Building on the Data Model](./introduction.md#building-on-the-data-model)
  * [Use Cases](./introduction.md#use-cases)
    * [Schemas as a documentation tool](./introduction.md#schemas-as-a-documentation-tool)
    * [Schemas as a validation tool](./introduction.md#schemas-as-a-validation-tool)
    * [Schemas as a versioning and migration tool](./introduction.md#schemas-as-a-versioning-and-migration-tool)
    * [Schemas as a transformational tool](./introduction.md#schemas-as-a-transformational-tool)
    * [Schemas as a code generation tool](./introduction.md#schemas-as-a-code-generation-tool)
  * [Schema Language: DSL and Reified Form](./introduction.md#schema-language-dsl-and-reified-form)
* **[Authoring IPLD Schemas](./authoring-guide.md)**
  * [Basics](./authoring-guide.md#basics)
    * [Records: `type` and `advanced`](./authoring-guide.md#records-type-and-advanced)
    * [Newlines and Whitespace](./authoring-guide.md#newlines-and-whitespace)
    * [Comments](./authoring-guide.md#comments)
  * [Schema Kinds](./authoring-guide.md#schema-kinds)
  * [Naming Types](./authoring-guide.md#naming-types)
  * [Named Scalar Types (typedefs)](./authoring-guide.md#named-scalar-types-typedefs)
  * [Links](./authoring-guide.md#links)
  * [Inline Recursive Types](./authoring-guide.md#inline-recursive-types)
  * [Representations](./authoring-guide.md#representations)
    * [Representation Options](./authoring-guide.md#representation-options)
  * [Structs](./authoring-guide.md#structs)
  * [Enums](./authoring-guide.md#enums)
  * [Unions](./authoring-guide.md#unions)
    * [Introduction to Unions: Kinded Unions](./authoring-guide.md#introduction-to-unions-kinded-unions)
    * [Limitations of Union Discrimination](./authoring-guide.md#limitations-of-union-discrimination)
    * [Alternative Discrimination Strategies](./authoring-guide.md#alternative-discrimination-strategies)
    * [Byteprefix Unions for Bytes](./authoring-guide.md#byteprefix-unions-for-bytes)
  * [Copy](./authoring-guide.md#copy)
  * [Advanced Data Layouts](./authoring-guide.md#advanced-data-layouts)
  * [Schemas in Markdown](./authoring-guide.md#schemas-in-markdown)
* **[Links and IPLD Schemas](./links.md)**
  * [Link Destination Type Hinting](./links.md#Link-destination-type-hinting)
* **[IPLD Schema Kinds](./schema-kinds.md)**
  * [Extending the IPLD Data Model](./schema-kinds.md#Extending-the-IPLD-Data-Model)
    * [Data Model Kinds](./schema-kinds.md#Data-Model-Kinds)
    * [Schema Kinds](./schema-kinds.md#Schema-Kinds)
  * [Value Type Modifiers](./schema-kinds.md#Value-Type-Modifiers)
    * [Nullable Values](./schema-kinds.md#Nullable-Values)
    * [Optional Fields](./schema-kinds.md#Optional-Fields)
    * [Fields with Implicit Values](./schema-kinds.md#Fields-with-Implicit-Values)
    * [Combining Nullable, Optional, and Implicit](./schema-kinds.md#Combining-Nullable-Optional-and-Implicit)
    * [Choosing between Optional and Implicit](./schema-kinds.md#Choosing-between-Optional-and-Implicit)
  * [Understanding Cardinality](./schema-kinds.md#Understanding-Cardinality)
    * [Cardinality Examples](./schema-kinds.md#Cardinality-Examples)
* **[Representations of IPLD Schema Kinds](./representations.md)**
  * [Available Representation Strategies](./representations.md#available-representation-strategies)
  * [Representation Strategy Reference](./representations.md#representation-strategy-reference)
    * [Struct `map` Representation](./representations.md#struct-map-representation)
    * [Struct `tuple` Representation](./representations.md#struct-tuple-representation)
    * [Struct `stringpairs` Representation](./representations.md#struct-stringpairs-representation)
    * [Struct `stringjoin` Representation](./representations.md#struct-stringjoin-representation)
    * [Struct `listpairs` Representation](./representations.md#struct-listpairs-representation)
    * [Map `map` Representation](./representations.md#map-map-representation)
    * [Map `stringpairs` Representation](./representations.md#map-stringpairs-representation)
    * [Map `listpairs` Representation](./representations.md#map-listpairs-representation)
    * [Union `keyed` Representation](./representations.md#union-keyed-representation)
    * [Union `kinded` Representation](./representations.md#union-kinded-representation)
    * [Union `envelope` Representation](./representations.md#union-envelope-representation)
    * [Union `inline` Representation](./representations.md#union-inline-representation)
    * [Union `byteprefix` Representation](./representations.md#union-byteprefix-representation)
    * [Enum `string` Representation](./representations.md#enum-string-representation)
    * [Enum `int` Representation](./representations.md#enum-int-representation)
* **[Advanced Layouts](./advanced-layouts.md)**
  * [Basic Schema Definition and Use](./advanced-layouts.md#Basic-schema-definition-and-use)

Additional Resources:

* [IPLD Schemas represented as an IPLD Schema (schema-schema)](schema-schema.ipldsch) and its canonical [JSON representation form](schema-schema.ipldsch.json)
* [Basic typical usage examples](examples.ipldsch) and its canonical [JSON representation form](examples.ipldsch.json)
