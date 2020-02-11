<p align="center">
  <a href="https://ipld.io"><img src="./logo/ipld-logo.png"  width="150px"/></a>
</p>

# IPLD

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai)
[![](https://img.shields.io/badge/project-ipld-orange.svg?style=flat-square)](https://github.com/ipld/ipld)

### Welcome to the Internet of Data-Structures

IPLD is a set of standards and implementations for creating decentralized data-structures that are universally addressable and linkable. These structures will allow us to do for data what URLs and links did for HTML web pages.

- [Docs](#docs)
- [Stacks](#stacks)
- [Examples and Tutorials](#examples-and-tutorials)
- [Tools](#tools)
- [Implementations](#implementations)
- [New implementations](#new-implementations)
- [Glossary](#glossary)
- [Contribute](#contribute)
- [License](#license)

## Docs

- [IPLD Specs](https://github.com/ipld/specs)
- [CID spec](https://github.com/multiformats/cid)

## Stacks

IPLD has a [layer model]() and is much more than "one thing." As such, implementations of IPLD aren't single libraries but stacks of libraries that vary a bit by programming language.

### Go

### JavaScript

### Rust

## Examples and Tutorials
- ProtoSchool Tutorials: 
   - [P2P data links with content addressing](https://proto.school/#/basics/) - An introduction to CIDs and the IPFS DAG API
   - [Blogging on the Decentralized Web](https://proto.school/#/blog/) - An intermediate coding challenge using CIDs to build and update a complex web of data with the IPFS DAG API
- Traversing IPLD graphs using the `ipfs dag` API: [ipfs/js-ipfs/examples/traverse-ipld-graphs](https://github.com/ipfs/js-ipfs/tree/master/examples/traverse-ipld-graphs)
- IPLD search index for wikipedia-on-ipfs.org: [magik6k/distributed-wiki-search](https://github.com/magik6k/distributed-wiki-search)
- Git IPLD/IPFS remote: [magik6k/git-remote-ipld](https://github.com/magik6k/git-remote-ipld)
- Using the Git IPLD plugin in go-ipfs: [ipfs/go-ipfs/docs/plugins.md](https://github.com/ipfs/go-ipfs/blob/master/docs/plugins.md)

## Tools

- IPLD graph builder: [ipld/js-ipld-graph-builder](https://github.com/ipld/js-ipld-graph-builder)
- CLI for interacting with IPLD: [tableflip/ipld-explorer-cli](https://github.com/tableflip/ipld-explorer-cli)
- CID inspector: [cid-utils.ipfs.team](http://cid-utils.ipfs.team/)

## Codec Implementations

| Package | JavaScript | Go | Java |
| ------- | ---------- | -- | ---- |
| CBOR (default) | [ipld/js-ipld-dag-cbor](https://github.com/ipld/js-ipld-dag-cbor) | [ipfs/go-ipld-cbor](https://github.com/ipfs/go-ipld-cbor) |[ipld/java-ipld-cbor](https://github.com/ipld/java-ipld-cbor) |
| Merkledag/Protobuf (legacy) | [ipld/js-ipld-dag-pb](https://github.com/ipld/js-ipld-dag-pb) | wip: [ipfs/go-ipld-format#8](https://github.com/ipfs/go-ipld-format/issues/8) | |
| Raw | [ipld/js-ipld-raw](https://github.com/ipld/js-ipld-raw) | wip: [ipfs/go-ipld-format#8](https://github.com/ipfs/go-ipld-format/issues/8) | |
| Unixfs v2 (planning: [ipfs/unixfs-v2](https://github.com/ipfs/unixfs-v2/issues))
| Git | [ipld/js-ipld-git](https://github.com/ipld/js-ipld-git) | [ipfs/go-ipld-git](https://github.com/ipfs/go-ipld-git) | |
| Bitcoin | | [ipfs/go-ipld-btc](https://github.com/ipfs/go-ipld-btc) | |
| Zcash | | [ipfs/go-ipld-zcash](https://github.com/ipfs/go-ipld-zcash) | |
| Ethereum | [ipld/js-ipld-ethereum](https://github.com/ipld/js-ipld-ethereum) | [ipfs/go-ipld-eth](https://github.com/ipfs/go-ipld-eth) | |
| Bencode | [ipld/js-ipld-bencode](https://github.com/ipld/js-ipld-bencode) | | |
| Torrent info | [ipld/js-ipld-torrent-info](https://github.com/ipld/js-ipld-torrent-info) | | |
| Torrent file | [ipld/js-ipld-torrent-file](https://github.com/ipld/js-ipld-torrent-file) | | |
| IPLD Selectors (experimental) | [ipld/js-ipld-selector](https://github.com/ipld/js-ipld-selector) | | |

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
