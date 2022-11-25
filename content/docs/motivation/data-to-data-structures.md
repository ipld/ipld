---
title: From Data to Data Structures
weight: 12
description: "Learn about data and how they fit into data structures."
---

Hashes are wonderful.

If you hash something you can give that hash to anyone else
in the world, anywhere in the galaxy (IP stands for InterPlanetary),
they can tell if they have that data and when they send
it to you, you're able to verify it was the right data even
without trusting that person.

If you think of hashes like URLs, you can pass them around and
ask people for them without fixing the place where that data exists
into the link the way you do with a URL. This is really powerful,
but by itself it's a bit limited.

For one thing, there are lots of hash algorithms, and they keep
getting better. A hash doesn't say *what* sort of hash it is. We
solved that with something called [`multihash`](https://github.com/multiformats/multihash)
which is just a hash that says "I'm a hash of this particular
algorithm."

So now, with multihash, a single identifier can get us any set
of binary data (what we call a "Block") from anywhere in the world.

That's *data*, we've got that covered, but now we need to go from
*data* to **data structures**.

This means that we have to think about different formats (JSON, CBOR,
Bitcoin, Ethereum, etc) and we also need to think about different
programming languages (JavaScript, Go, Rust, etc) because these
languages have different basic types that are used to represent data
structures in-memory.

That's IPLD.

IPLD is how we go from *data* to **data structures**.

**We do this with a new link type and a data model.**

## Links

For links we use a [CID](https://specs.ipld.io/block-layer/CID.html). A CID is an extension of `multihash`,
in fact a `multihash` is part of a `CID`. We simply add a *codec* to a `multihash`
that tells us what format the data is in (JSON, CBOR,
Bitcoin, Ethereum, etc). This way, we can actually link between
data in different formats and any link to data anyone ever gives
us can be decoded so that it can become more than just a series
of bytes.

CID is a [standard](https://github.com/multiformats/cid) that anyone can implement, even people that
have no other interest in IPLD beyond the need for hash links to
different data types can use it.

## The Data Model

The IPLD Data Model is a bit more conceptual and can be applied
to formats that have never considered IPLD.

Consider that every programming language has a library for JSON encoding and decoding. These
languages all adapt the JSON data model (types) into the
best fit for that language. A "number" in JSON has many potential mappings in
different languages, a JSON library has to decide how it is most appropriately represented.
Our data model is very similar to the JSON data model, but we add a few more types.

First, we add a **link** type using CID as our link format. We also
add a **binary** type, which are missing from JSON. We support nothing
beyond these and the other types that JSON has already defined quite well.

We then apply this data model to more than just our own formats. We
have specifications and libraries for interpreting many formats into
this data model. For instance, Bitcoin blocks know nothing about IPLD
since they were designed long before IPLD existed. We have a decoder
for Bitcoin that presents the data found in a Bitcoin block as the IPLD
Data Model.

This provides a consistent interpretation of all formats across all programming
languages in IPLD terms. For instance, Bitcoin data includes hashes to identify
blocks and transactions to form a heavily interlinked blockchain. Bitcoin doesn't
use CID's internally, but when you use an IPLD codec to read Bitcoin data, the
hashes will be normalized to CIDs so we maintain a consistent "link" type that
includes the content address (hash), the hash algorithm (double-SHA2-256) and the
IPLD codec (e.g. `bitcoin-block` or `bitcoin-tx`).

This lets you build data structures that freely link between formats
that can be traversed though a normalized data model. Effectively,
you can write format agnostic tools for reading, distributing, and
persisting all content addressed data. Your custom IPLD data structure, encoded
in your chosen IPLD codec, can link to anyone else's IPLD data, arbitrary
Bitcoin blocks, Git commits and a universe of content addressed data.
