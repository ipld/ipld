---
title: "Rust Libraries"
navTitle: "Rust"
---

Rust IPLD Libraries
===================

Stand-alone
-----------

### libipld

The currently most feature rich stand-alone IPLD implementation in Rust is [libipld](https://github.com/ipfs-rust/libipld).

It has the [Data Model](/glossary/#data-model) at its core, but it can also directly serialize/deserialize from Rust data types into codecs like DAG-CBOR.


### Datalove IPLD

[Datalove IPLD](https://github.com/datalove-app/ipld) is an experimental implementation of IPLD focusing on Schemas.



Integrated into other projects
------------------------------

### rust-ipfs

rust-ipfs, one of the Rust IPFS implementations, has an [integrated IPLD implementation](https://github.com/rs-ipfs/rust-ipfs/tree/master/src/ipld). That code is based on an early fork of libipld.


### Forest

Forest, a Filecoin implementation in Rust, has an [integrated IPLD implementation](https://github.com/ChainSafe/forest/tree/main/ipld) implementation tailored for their needs.
