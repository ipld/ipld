---
title: "Bencode Specification"
navTitle: "Spec"
---

# Specification: Bencode

**Status: Prescriptive - Experimental**

* [Format](#format)
* [Implementations](#implementations)
    * [Go](#go)
    * [Rust/WASM](#rustwasm)

[Bencode] is an existing format most commonly associated with the [BitTorrent] protocol. While it's both possible and likely that candidates working with BitTorrent data may want codecs that more specifically target those formats so as to properly resolve [Links] rather than leaving them as Bytes, being able to work with the Bencode data using IPLD seems reasonable as well.

## Format

From the [BitTorrent] v1 spec Bencode is defined as:

- Strings are length-prefixed base ten followed by a colon and the string. For example 4:spam corresponds to 'spam'.
- Integers are represented by an 'i' followed by the number in base 10 followed by an 'e'. For example i3e corresponds to 3 and i-3e corresponds to -3. Integers have no size limitation. i-0e is invalid. All encodings with a leading zero, such as i03e, are invalid, other than i0e, which of course corresponds to 0.
- Lists are encoded as an 'l' followed by their elements (also bencoded) followed by an 'e'. For example l4:spam4:eggse corresponds to ['spam', 'eggs'].
- Dictionaries are encoded as a 'd' followed by a list of alternating keys and their corresponding values followed by an 'e'. For example, d3:cow3:moo4:spam4:eggse corresponds to {'cow': 'moo', 'spam': 'eggs'} and d4:spaml1:a1:bee corresponds to {'spam': ['a', 'b']}. Keys must be strings and appear in sorted order (sorted as raw strings, not alphanumerics).

### Strings

Bencode Strings are represented as IPLD Data Model Strings. This is because, despite not being UTF-8 it makes it very simple to put a Bencode String into a Bencode Dictionary given that IPLD Data Model maps require String keys. As a result these Strings must take advantage of the IPLD Data Model flexibility to support non-UTF-8 data as Data Model Strings.

### Integers

Bencode Integers are represented as IPLD Data Model Integers

### Lists

Bencode Lists are represented as IPLD Data Model Lists

### Dictionaries

Bencode Dictionaries are represented as IPLD Data Model Maps

### Go
**[aschmahmann/go-ipld-bittorrent](https://github.com/aschmahmann/go-ipld-bittorrent)**

### Rust/WASM

**[wasm-ipld](https://github.com/aschmahmann/wasm-ipld)** 

[Bencode] : https://www.bittorrent.org/beps/bep_0003.html#bencoding
[BitTorrent] : https://www.bittorrent.org/beps/bep_0003.html
[Links]: /docs/data-model/kinds/#link-kind
[IPLD Data Model]: /docs/data-model/
[IPLD Data Model Kinds]: /docs/data-model/kinds/
[Codecs and Completeness] : https://gist.github.com/warpfork/28f93bee7184a708223274583109f31c
[Simple DAG] : https://github.com/mikeal/simple-dag
[Strings]: /docs/data-model/kinds.md#string-kind