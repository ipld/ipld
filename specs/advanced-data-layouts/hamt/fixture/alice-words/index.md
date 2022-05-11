---
title: "alice-words"
eleventyNavigation:
  synopsys: "A catalog of words appearing in the first chapter of Alice in Wonderland"
---

alice-words
===========

This fixture builds a HAMT cataloging the locations of all words appearing in the first chapter of [Lewis Carroll's Alice in Wonderland](https://www.gutenberg.org/files/11/11-h/11-h.htm).

* The reference text is available in [words.txt](./words.txt).
* Words are matched using a simple `/\w+/` regular expression.
* The HAMT uses a `bitWidth` of `5` (maximum of 32 entries or buckets per node) and a `bucketSize` of `3`.
* Blocks are encoded using DAG-CBOR and CIDs use a SHA2-256 multihash.
* Each entry is keyed by the word (as `Bytes` as per the [HAMT spec](../../spec/)) and the values are stored inline.
* Values are an array of the line and column location of each occurrence of the word, in order of appearance.
* Values take the following form:

```ipldsch
type Value [Datum]
type Datum struct {
  line Int
  column Int
}
```

Once compiled:

* The root CID of such a HAMT should be `bafyreic672jz6huur4c2yekd3uycswe2xfqhjlmtmm5dorb6yoytgflova`. This root is listed as the root of the CAR containing the blocks.
* There will be 36 blocks: 1 root and 25 non-roots, matching the schema in the HAMT spec.

Files:

* [hamt.car](./hamt.car) - CAR containing 36 blocks 
* [hamt.json](./hamt.json) - A sorted JSON representation of the data contained in the HAMT, with a mapping of word to locations in the text.
* [words.txt](./words.txt) - The source text used to generate the data.
