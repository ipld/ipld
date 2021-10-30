---
title: Working With Encryption
navtitle: Encryption
eleventyNavigation:
  order: 200
  synopsys: References and resources about how the community has worked to connect IPLD and encryption.
---

Working With Encryption
=======================

Folks often want to combine IPLD and some kind of encryption.
It's natural for decentralization and privacy to go hand-in-hand as goals!

IPLD doesn't have any opinionated built-in encryption systems.
However, there are lots of systems developed by folks throughout the IPLD ecosystem,
and many of these are reusable -- either in specs, or in implementations.

Here are some projects that we know about, in brief:

Projects
--------

### Peergos

Peergos builds many cryptographic systems together in their product,
including one concept known as "Cryptrees", which is intended to be reusable.

More about Peergos can be read here:
https://book.peergos.org/

A whitepaper which overviews Cryptrees can be found here:
https://raw.githubusercontent.com/ianopolous/Peergos/master/papers/wuala-cryptree.pdf

---

### Ceramic

Ceramic uses systems such as DIDs and an encryption standard called
[DAG-JOSE](/specs/codecs/dag-jose/), and demonstrates how to use them here:
https://blog.ceramic.network/how-to-store-signed-and-encrypted-data-on-ipfs/

---

### Fission

Fission builds filesystems and other data structures which include encryption.

More details on Fission, and in particular, the Fission concept of "private directories"
can be found here: https://whitepaper.fission.codes/file-system/partitions/private-directories

And here: https://blog.fission.codes/web-native-file-system-presentation/

And here: https://guide.fission.codes/


Discussions
-----------

You can also find discussions about how to work with encryption and IPLD together
in many places on the web.  We probably can't compile an exhaustive list,
but here are some documents we know about:

- [in the notebook: exploration-reports/2021.09-dag-pb-encryption](https://github.com/ipld/ipld/tree/master/notebook/exploration-reports/2021.09-dag-pb-encryption.md)

If you're interested in any of those discussions, get in touch with their authors!


Your Reference Material Here!
-----------------------------

:::info
If you have a project that works with IPLD and encryption,
and would like to share info about it here, please get in touch!

You can find out more about how in the repo readme on github:
https://github.com/ipld/ipld/
:::
