---
title: "Golang"
weight: 2
---

## go-ipld-prime

The primary library for working with IPLD data in Golang is [`go-ipld-prime`](https://github.com/ipld/go-ipld-prime)
([godoc](https://pkg.go.dev/github.com/ipld/go-ipld-prime)).

The `go-ipld-prime` library is centered around a [Node interface which matches the IPLD Data Model](/design/libraries/nodes-and-kinds/).

The `go-ipld-prime` library comes "batteries included" with several codecs such as
[DAG-CBOR](/docs/codecs/known/dag-cbor/) and [DAG-JSON](/docs/codecs/known/dag-json/),
and also allows registering more codec implementations using the multicodec system
(or, even more directly, by customizing the `LinkSystem`, an API which allows arbitrary callbacks for hooking).

The `go-ipld-prime` library supports many advanced features such as
[ADLs](/docs/advanced-data-layouts/),
[Schemas](/docs/schemas/),
and [IPLD Selectors](/glossary/#selectors).

## Other libraries

### Legacy libraries

[go-ipld-format (github.com/ipfs/go-ipld-format)](https://github.com/ipfs/go-ipld-format/)
(and its friends, such as [go-ipld-cbor (github.com/ipfs/go-ipld-cbor)](https://github.com/ipfs/go-ipld-cbor/))
are legacy libraries.

These libraries are still supported, but minimally, and new features should not be expected in them.
It's recommend that new developments use [go-ipld-prime](#go-ipld-prime) instead.

In particular, be aware that features like [Selectors](/glossary/#selectors) are missing from these libraries,
and will not be implemented in them.
(These features require a foundational commitment to the [Data Model](/glossary/#data-model) which these libraries lack;
attempting to introduce that would be the same as doing a total rewrite of the library.)
