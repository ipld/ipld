---
title: "crypto_types"
weight: 11
description: "Tendermint and Cosmos Cryptographic Types"
---

```ipldsch
# Signatures in Tendermint are raw bytes representing the underlying signature
type Signature bytes

# Public key
type PubKey bytes

# Private key
type PrivKey bytes

# AuntCIDs is a list of CID links to the nodes intervening a leaf's sibling and a root node's child
type AuntCIDs [AppStateNodeCID]

# Proof represents a Merkle proof.
# NOTE: The convention for proofs is to include leaf hashes but to
# exclude the root hash.
# This convention is implemented across IAVL range proofs as well.
# Keep this consistent unless there's a very good reason to change
# everything.  This also affects the generalized proof system as
# well.
type Proof struct {
 Total    Int  # Total number of items.
 Index    Int # Index of item to prove.
 LeafCID  AppStateNodeCID # CID link to the leaf containing the item to prove.
 AuntCIDs AuntCIDs
}
```
