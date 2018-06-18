<p align="center">
  <a href="https://ipld.io"><img src="./logo/ipld-logo.png"  width="150px"/></a>
</p>

# IPLD

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](https://protocol.ai)
[![](https://img.shields.io/badge/project-ipld-blue.svg?style=flat-square)](https://github.com/ipld/ipld)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](https://webchat.freenode.net/?channels=%23ipfs)

IPLD 是分布式互联网的数据模型，它将内容寻址的数据结构转化为大型信息存储空间的子集，统一数据模型并用 IPLD 哈希值来连接索引数据。

- [走进 IPLD](#走进-ipld)
- [文档](#文档)
- [案例与教学](#案例与教学)
- [工具](#工具)
- [实现](#实现)
- [新的实现](#新的实现)
- [术语表](#术语表)
- [贡献](#贡献)
- [许可证](#许可证)

## 走进 IPLD

**默克尔森林演讲视频**

[![](/img/enter-merkle-forest.jpg)](https://www.youtube.com/watch?v=Bqs_LzBjQyk)

## 文档

- [IPLD Specs](https://github.com/ipld/specs)
- [CID spec](https://github.com/ipld/cid)
- [ipld.io](https://github.com/ipld/website)

## 案例与教学

- 通过 `ipfs dag` API 生成 IPLD 图像: [ipfs/js-ipfs/examples/traverse-ipld-graphs](https://github.com/ipfs/js-ipfs/tree/master/examples/traverse-ipld-graphs)
- IPLD wiki: [magik6k/distributed-wiki-search](https://github.com/magik6k/distributed-wiki-search)
- IPLD/IPFS Git 仓库: [magik6k/git-remote-ipld](https://github.com/magik6k/git-remote-ipld)
- 在 go-ipfs 中使用 GIT IPLD 插件: [ipfs/go-ipfs/docs/plugins.md](https://github.com/ipfs/go-ipfs/blob/master/docs/plugins.md)

## 工具
- IPLD 图表生成器: [ipld/js-ipld-graph-builder](https://github.com/ipld/js-ipld-graph-builder)
- IPLD 交互客户端: [ipld/js-ipld-cli](https://github.com/ipld/js-ipld-cli)
- CID 检查器: [cid-utils.ipfs.team](http://cid-utils.ipfs.team/)

## 实现

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

## 新的实现

你在使用其他语言实现 IPLD 吗？在这个仓库 [Open an issue](https://github.com/ipld/ipld/issues) 来与大家讨论，如果你愿意，我们将会把它转移到组织的仓库里，在整个互联网里面提到它。

## 数据表

有大量的系统使用 merkle-tree / content-addressing / hash-link / hash-chain 构建数据结构，如：Git, BitTorrent, IPFS, Tahoe-LAFS, SFS

IPLD 定义:

- merkle-links: merkle-graph 的基本单位
- merkle-dag: merkle-links 连接的图表
- merkle-paths: 通过 merkle-links 构成 merkle-dags 的 unix 风格路径
- IPLD Data Model: 一个响应式，类似于 JSON 的，自我描述来描述表现 merkle-dags 的结构数据模型
- IPLD Serialized Formats: IPLD 对象的格式，如 JSON, CBOR, CSON, YAML, Protobuf, XML, RDF 等

## 贡献

Please contribute! [Look at the issues](https://github.com/ipld/ipld/issues)!
通过看我们的文档来了解我们如何工作与做出贡献 [contributing document](contributing.md)。我们对 IPLD 做出的贡献将会帮助到 IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md)。

提示: 如果想要修改 README，请将具体内容提交到 [standard-readme](https://github.com/RichardLitt/standard-readme) 。


## 许可证

本篇文档是 IPLD 的核心文档。 这里所有的项目都使用了 [CC-BY 3.0 Unported](LICENSE) 许可证，© 2016 Protocol Labs Inc.
