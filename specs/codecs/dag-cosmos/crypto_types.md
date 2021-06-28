# Tendermint and Cosmos Cryptographic Types

```ipldsch
# Signatures in Tendermint are raw bytes representing the underlying signature
type Signature bytes

# Public key
type PubKey bytes

# Private key
type PrivKey bytes

# Hashes from leaf's sibling to a root's child
type Aunts [Hash]

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
	LeafHash Hash # Hash of item value.
	Aunts    Aunts # Hashes from leaf's sibling to a root's child.
}
```