

Schema Kinds
------------

Recursive types contain additional type definitions for either their
keys (in the case of maps),
values (in the case of maps and lists),
or fields (in the case of structs).

### table

- Null
- Boolean
- Integer
- Float
- String
- Bytes
- List
- Map
- Link
- Union
- Struct
- Enum


Value Type Modifiers
--------------------

Values and fields in recursive types can have modifiers.

### Nullable Values

The `nullable` modifier means that either the modified type may be present,
**or** its place may be occupied by the null value.

The `nullable` modifier is valid on map values, list values, and struct fields.

The presence of a `nullable` modifier increases the cardinality of a field's
valid members by one -- see the "Cardinality Examples" table below.

### Optional Fields

The `optional` modifier means that either the modified type

### Fields with Defaults

Defaults are somewhat more complicated than the other two modifiers,
and also unusually, are a concept that resides in the *representation* clause
rather than the *type* definition clause.

The precise semantics of defaults vary per representation strategy;
the discussion here is only for the general pattern, and you should also
refer to the [reference documentation for representation strategies](./representations.md#representation-strategy-reference)
for more details specific to the representations strategies you use.

(FUTURE: there's discussion that "default" may not be the clearest name for
this concepts.  Alternatives floated include "absent", "void", "omitted"...)

### Combining Nullable, Optional, and Default

The `nullable` and `default` modifiers may be freely combined without issue.

It is not valid to combine the `optional` and `default` modifiers.


Understanding Cardinality
-------------------------

### Cardinality Examples

<!-- forgive the html. -->
<!-- multi-line content and markdown tables don't mix, unfortunately. -->
<table>

<tr>
<th>Schema</th>
<th>Valid Matching Representations</th>
<th>Cardinality</th>
<th>Comments</th>
</tr>

<tr>
<td width=40%><pre>
type Foo struct {
	bar Bool
}
</pre></td>
<td width=20%>
<code>{"bar": true}</code><br>
<code>{"bar": false}</code><br>
</td>
<td>2</td>
<td>The cardinality of `Bool` is 2; the struct has no other members, so that's it.
</tr>

<tr>
<td><pre>
type Foo struct {
	bar nullable Bool
}
</pre></td>
<td>
<code>{"bar": true}</code><br>
<code>{"bar": false}</code><br>
<code>{"bar": null}</code><br>
</td>
<td>3</td>
<td>2+1.  The `nullable` modifier adds one to the cardinality, since a null value is now a valid match.</td>
</tr>

<tr>
<td><pre>
type Foo struct {
	bar optional Bool
}
</pre></td>
<td>
<code>{"bar": true}</code><br>
<code>{"bar": false}</code><br>
<code>{}</code><br>
</td>
<td>3</td>
<td>2+1.  The `optional` modifier adds one to the cardinality, since a map missing the key is now a valid match.</td>
</tr>

<tr>
<td><pre>
type Foo struct {
	bar optional nullable Bool
}
</pre></td>
<td>
<code>{"bar": true}</code><br>
<code>{"bar": false}</code><br>
<code>{"bar": null}</code><br>
<code>{}</code><br>
</td>
<td><b>4</b></td>
<td>2+1+1.  *Each* of the modifiers cumulatively adds one valid matching representation, and thus add one to the cardinality.</td>
</tr>

<tr>
<td><pre>
type Foo struct {
	bar Bool
} representation map {
	field bar default "false"
}
</pre></td>
<td>
<code>{"bar": true}</code><br>
<code>{}</code><br>
</td>
<td>2</td>
<td>Default values mean that encoding should never include the value if it's the default.  That means the set of valid representations *changes*, but it doesn't *grow* because one representation becomes invalid at the same time as a new representation is added.</td>
</tr>

</table>
