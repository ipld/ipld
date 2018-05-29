<p align="center">
  <a href="https://ipld.io"><img src="./logo/ipld-logo.png"  width="150px"/></a>
</p>

# IPLD

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai)
[![](https://img.shields.io/badge/project-ipld-orange.svg?style=flat-square)](https://github.com/ipld/ipld)
[![](https://img.shields.io/badge/freenode-%23ipld-orange.svg?style=flat-square)](https://webchat.freenode.net/?channels=%23ipld)

IPLD is the data model for the decentralized web. It allows us to treat all content-addressed data structures as subsets of one big information space, unifying all data models that link data with hashes as instances of IPLD.

- [Enter IPLD](#enter-ipld)
- [Docs](#docs)
- [Examples and Tutorials](#examples-and-tutorials)
- [Tools](#tools)
- [Implementations](#implementations)
- [New implementations](#new-implementations)
- [Glossary](#glossary)
- [Contribute](#contribute)
- [License](#license)

## Enter IPLD

**Watch the Merkle Forest Talk**

[![](/img/enter-merkle-forest.jpg)](https://www.youtube.com/watch?v=Bqs_LzBjQyk)

## Docs

- [IPLD Specs](https://github.com/ipld/specs)
- [CID spec](https://github.com/ipld/cid)
- [ipld.io](https://github.com/ipld/website)

## Examples and Tutorials

- Traversing IPLD graphs using the `ipfs dag` API: [ipfs/js-ipfs/examples/traverse-ipld-graphs](https://github.com/ipfs/js-ipfs/tree/master/examples/traverse-ipld-graphs)
- IPLD search index for wikipedia-on-ipfs.org: [magik6k/distributed-wiki-search](https://github.com/magik6k/distributed-wiki-search)
- Git IPLD/IPFS remote: [magik6k/git-remote-ipld](https://github.com/magik6k/git-remote-ipld)
- Using the Git IPLD plugin in go-ipfs: [ipfs/go-ipfs/docs/plugins.md](https://github.com/ipfs/go-ipfs/blob/master/docs/plugins.md)

## Tools

- IPLD graph builder: [ipld/js-ipld-graph-builder](https://github.com/ipld/js-ipld-graph-builder)
- CLI for interacting with IPLD: [tableflip/ipld-explorer-cli](https://github.com/tableflip/ipld-explorer-cli)
- CID inspector: [cid-utils.ipfs.team](http://cid-utils.ipfs.team/)

## Implementations

| Package | JavaScript | Go |
| ------- | ---------- | -- |
| CID | [ipld/js-cid](https://github.com/ipld/js-cid) | [ipfs/go-cid](https://github.com/ipfs/go-cid) |
| IPLD Node interface | [ipld/interface-ipld-format](https://github.com/ipld/interface-ipld-format) | [ipfs/go-ipld-format](https://github.com/ipfs/go-ipld-format) |
| IPLD Resolver | [ipld/js-ipld-resolver](https://github.com/ipld/js-ipld-resolver) | wip: [ipfs/go-ipld-format#8](https://github.com/ipfs/go-ipld-format/issues/8) |
| CBOR (default) | [ipld/js-ipld-dag-cbor](https://github.com/ipld/js-ipld-dag-cbor) | [ipfs/go-ipld-cbor](https://github.com/ipfs/go-ipld-cbor) |
| Merkledag/Protobuf (legacy) | [ipld/js-ipld-dag-pb](https://github.com/ipld/js-ipld-dag-pb) | wip: [ipfs/go-ipld-format#8](https://github.com/ipfs/go-ipld-format/issues/8) |
| Raw | [ipld/js-ipld-raw](https://github.com/ipld/js-ipld-raw) | wip: [ipfs/go-ipld-format#8](https://github.com/ipfs/go-ipld-format/issues/8) |
| Unixfs v2 (planning: [ipld/unixfs#1](https://github.com/ipld/unixfs/issues/1))
| Git | [ipld/js-ipld-git](https://github.com/ipld/js-ipld-git) | [ipfs/go-ipld-git](https://github.com/ipfs/go-ipld-git) |
| Bitcoin | | [ipfs/go-ipld-btc](https://github.com/ipfs/go-ipld-btc) |
| Zcash | | [ipfs/go-ipld-zcash](https://github.com/ipfs/go-ipld-zcash) |
| Ethereum | [ipld/js-ipld-ethereum](https://github.com/ipld/js-ipld-ethereum) | [ipfs/go-ipld-eth](https://github.com/ipfs/go-ipld-eth) |
| Bencode | [ipld/js-ipld-bencode](https://github.com/ipld/js-ipld-bencode) | |
| Torrent info | [ipld/js-ipld-torrent-info](https://github.com/ipld/js-ipld-torrent-info) | |
| Torrent file | [ipld/js-ipld-torrent-file](https://github.com/ipld/js-ipld-torrent-file) | |
| IPLD Selectors (experimental) | [ipld/js-ipld-selector](https://github.com/ipld/js-ipld-selector) | |

## New implementations

Are you working on your own implementation in another language? [Open an issue](https://github.com/ipld/ipld/issues) in this repository to discuss it with others, find help, and coordinate efforts. Eventually, we can move it to the organization if you like, add it above, and mention it on the website.

## Glossary

There are a variety of systems that use merkle-tree / content-addressing / hash-link / hash-chain inspired datastructures: e.g. Git, BitTorrent, IPFS, Tahoe-LAFS, SFS).

IPLD defines:

- merkle-links: the core unit of a merkle-graph
- merkle-dag: any graphs whose edges are merkle-links.
- merkle-paths: unix-style paths for traversing merkle-dags with named merkle-links
- IPLD Data Model: a flexible, JSON-inspired, self-describing structured data model for representing merkle-dags.
- IPLD Serialized Formats: a set of formats in which IPLD objects can be represented, for example JSON, CBOR, CSON, YAML, Protobuf, XML, RDF, etc.


## Contribute

Please contribute! [Look at the issues](https://github.com/ipld/ipld/issues)!

Check out our [contributing document](contributing.md) for more information on how we work, and about contributing in general. Please be aware that all interactions related to IPLD are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

This repository is mainly documents. All of these are licensed under a [CC-BY 3.0 Unported](LICENSE) License, © 2016 Protocol Labs Inc.
