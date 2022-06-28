---
title: "WAC Specification"
navTitle: "Spec"
---

# Specification: WAC

**Status: Prescriptive - Exploratory **

* [Format](#format)
* [Implementations](#implementations)
    * [Go](#go)
    * [Rust/WASM](#rustwasm)

WAC supports bidirectional transport to and from the [IPLD Data Model].
In that way it is both a "complete" IPLD Data Model representation and "fitted" to the IPLD Data Model.
Terminology taken from [Codecs and Completeness].

It takes some inspiration from [Simple DAG], but differs in ways designed to make it reliably round-trip through the IPLD Data Model without loss of fidelity.

The initial motivating use case for WAC is to be a codec that can reliably transport IPLD Data Model data across WebAssembly boundaries while also not being particularly complex to implement.

## Format

### Spec

This format is a series of typing tokens, constant tokens, and inline value data.

Typing tokens are proceeded with the value data for that type.

Every type value can be parsed knowing only the type and without any outside context
like the container or positional delimiters.

#### Tokens

TODO: Make constants in code match spec

Note: The existing implementations of WAC in https://github.com/aschmahmann/wasm-ipld (Go + Rust/WASM) have different token numbers that we'll need to synchronize before merge.

The tokens for the codec roughly correspond with the [IPLD Data Model Kinds]

They are:
	Null   = 0
	True   = 1
	False  = 2
	Int    = 3
	NInt   = 4
	Float  = 5
	String = 6
	Bytes  = 7
	List   = 8
	Map    = 9
	Link   = 10

| Int | Token |
|---|---|
| 0 | TYPE_LINK |
| 1 | TYPE_INTEGER |
| 2 | TYPE_NEGATIVE_INTEGER |
| 3 | TYPE_FLOAT |
| 4 | TYPE_NEGATIVE_FLOAT |
| 5 | TYPE_STRING |
| 6 | TYPE_BINARY |
| 7 | TYPE_MAP |
| 8 | TYPE_LIST |
| 9 | VALUE_NULL |
| 10 | VALUE_TRUE |
| 11 | VALUE_FALSE |

#### TYPE_LINK

```
| 0 | CID |
```

Note: Simple-DAG put a VARINT_LENGTH before the CID indicating how long it was.

CIDs are self-delimiting so this didn't seem necessary.

#### TYPE_INTEGER

```
| 1 | VARINT |
```

#### TYPE_NEGATIVE_INTEGER

```
| 2 | VARINT |
```

#### TYPE_FLOAT

```
| 3 | MATISSA_LENGTH | VARINT
```

TODO: Floats (and negative floats) need definition here.
Making implementations actually bidirectional with respect to the IPLD Data Model seems difficult here.

#### TYPE_NEGATIVE_FLOAT

```
| 4 | MATISSA_LENGTH | VARINT
```

#### TYPE_STRING

```
| 5 | VARINT_LENGTH | STRING
```

Note: This is essentially the same as Binary, but with a different token flag.

As with the IPLD Data Model itself Strings are basically just Bytes with something to tag them as "string-like" but where UTF-8 is encouraged. See [Strings].

#### TYPE_BINARY

```
| 6 | VARINT_LENGTH | BINARY
```

#### TYPE_MAP

```
| 7 | VARINT_NUM_PAIRS | PAIRS
```

`PAIRS` contains alternating keys then values concatenated. i.e. ` KEY1 | VALUE1 | KEY2 | VALUE2 ...`

This codec does not have any form of canonical map sorting as that would make it ill-fitted to the IPLD Data Model.

As in the IPLD Data Model map keys must be of type String, however as described in the String section the only distinction between Strings and Bytes are identifier hints.

Note: Simple-DAG went with `KEYS_VARINT_LENGTH | VALUES_VARINT_LENGTH | KEYS | VALUES |`. Both seem doable,
this approach seemed to make writing encoder/decoders really simple. However, adding in more length prefixes
makes creating faster "zero copy" decoders very nice. It seems to mostly be a tradeoff for which side has to have bigger buffers, the encoder or the decoder.

Note: We could assert that keys are just `VARINT_LENGTH | STRING` and remove the String token since it's always a string.
It's some added complexity and really stops us from putting anything other than Strings in map keys, but that may not be too bad.

#### TYPE_LIST

```
| 8 | VARINT_NUM_ELEMENTS | VALUES |
```

`VALUES` contains every value concatenated.

Note: Simple-DAG went with `VARINT_LENGTH` (the size of the VALUES binary section) instead of `VARINT_NUM_ELEMENTS`
and in the `VALUES` section had every value proceeded by the length of the value.

Both seem doable, this approach seemed to make writing a decoder really simple. However, adding in more length prefixes makes creating faster "zero copy" decoders very nice. It seems to mostly be a tradeoff for which side has to have bigger buffers, the encoder or the decoder.

#### TYPE_NULL

```
| 9 |
```

#### TYPE_TRUE

```
| 10 |
```

#### TYPE_FALSE

```
| 11 |
```

### Strings

As with the IPLD Data Model itself Strings are basically just Bytes with something to tag them as "string-like" but where UTF-8 is encouraged.

## Implementations

### Go

Here and adheres to the specification. However, in a practical sense because it implements the go-ipld-prime interface and its limits on integers (and floats once specified) are currently bounded by those interfaces. Similarly any varints are capped around 64 bits.

### Rust/WASM

Adheres to the specification. However, in a practical sense its limits on integers and floats are currently bounded to be of fixed maximum sizes. Similarly, all varints are capped around 64 bits.

[IPLD Data Model]: /docs/data-model/
[IPLD Data Model Kinds]: /docs/data-model/kinds/
[go-ipld-prime]: http://github.com/ipld/go-ipld-prime
[Codecs and Completeness] : https://gist.github.com/warpfork/28f93bee7184a708223274583109f31c
[Simple DAG] : https://github.com/mikeal/simple-dag
[Strings]: /docs/data-model/kinds.md#string-kind