# Interplanetary Linked Data

Welcome to the internet of data structures!

## What is IPLD?

IPLD isn't a project or a library, it's an ecosystem. An
ecosystem of formats and data structures for building
applications that can be fully decentralized.

This ecosystem is held together by a few concepts and
standards that ensure compatibility between formats
and programming languages.

You'll find numerous libraries for working with IPLD.
You may even create a few of your own. That library is
part of the IPLD ecosystem and you're now a part of its
community. You don't need to be a committer in repository
in the IPLD GitHub org to be a part of this community,
you're already almost there just by reading this far.

### From Data to Data Structures

Hashes are wonderful.

If you hash something you can give that hash to anyone else
in the world, anywhere in the galaxy (IP stands for Interplanetary),
they can tell if they have that data and when they send
it to you, you're able to verify it was the right data even
without trusting that person.

If you think of hashes like URLs, you can pass them around and
ask people for them without fixing the place where that data exists
into the link the way you do with a URL. This is really powerful,
but by itself it's a bit limited.

For one thing, there are lots of hash algorithms, and they keep
getting better. A hash doesn't say *what* sort of hash it is. We
solved that with something called [`multihash`]()
which is just a hash that says "I'm a hash of this particular
algorithm."

So now, with multihash, a single identifier can get us any set
of binary data (what we all a "Block") from anywhere in the world.

That's *data*, we've got that covered, but now we need to go from
*data* to **data structures**.

This means that we have to think about different formats (JSON, CBOR,
Bitcoin, Ethereum, etc) and we also need to think about different
programming languages (JavaScript, Go, Rust, etc) because these
languages have different basic types that are used to represent data
structures in-memory.

That's IPLD.

IPLD is how we go from *data* to **data structures**.

We do this with a new link type and a data model.

For links we use a [CID](). A CID is an extension of `multihash`,
in fact a `multihash` is part of a `CID`. All we extend it with
is a *codec* that tells us what format the data is in (JSON, CBOR,
Bitcoin, Ethereum, etc). This way, we can actually link between
data in different formats and any link to data anyone ever gives
us can be decoded so that it can become more than just a series
of bytes.

CID is a [standard]() that anyone can implement, even people that
have no other interest in IPLD beyond the need for hash links to
different data types can use it.

The IPLD Data Model is a bit more conceptual, as it is applied
to formats that had never considered IPLD.

Every language has a library for JSON encoding and decoding. These
languages all adapt the JSON data model (types) into whatever the
best fit for their language is. Our data model is very similar,
but we add a few more types.

First, we add a link type using CID as our link format. We also
add binary values, which are missing from JSON. We support nothing
beyond that other than the types JSON has already defined quite well.

We then apply this data model to more than just our own formats. We
have specifications and libraries for interpreting many formats into
this data model. For instance, Bitcoin blocks know nothing about IPLD
since they were designed long before IPLD existed. We have a decoder
for Bitcoin that presents the data found in a Bitcoin block as IPLD
Data Model.

This provides a consistent interpretation of all formats across all programming
languages in IPLD terms. For instance, the links in Bitcoin blocks are
only to other Bitcoin blocks and do not use CID's internally, but when
you use an IPLD codec to read them the links will all be normalized
to CID's that link to Bitcoin blocks.

This lets you build data structures that freely link between formats
that can be traversed though a normalized data model. Effectively,
you can write format agnostic tools for reading, distributing, and
persisting all content addressed data.

## Tutorials

We highly recommend you read the following tutorials
before trying to use IPLD. These tutorials are language
agnostic and include examples in JavaScript, Go and Rust.

* [Thinking in data structures](./tutorials/thinking)
  * [Decentralizing data]()
  * [Introduction to IPLD Schemas]()

## Getting Started

Using IPLD can vary from language to language.

* [Getting started in JavaScript](./getting-started/js)
  * [Persisting IPLD data in `js-ipfs` and `js-ipfs-lite`](./getting-started/js#storing-ipld-data-in-ipfs)
* [Getting started in Go]()
  * [Persisting IPLD data in `go-ipfs`]()
* [Getting started in Rust]()
  * [Persisting IPLD data in `rust-ipfs`]()

## Advanced Topics

* [Complete IPLD Schema Documentation]()
* [Comparing IPLD to traditional Databases]()
* [How does IPFS use IPLD?]()
