# Etheruem Data Cryptographic Types
These types are the cryptographic primitives used throughout the Ethereum data structures but
are themselves not IPLD blocks.

```ipldsch
# Signature represents an ecdsa signature
# It is the standard ecdsa signature with an additional 'recovery id' (v) at the end which must be either 0 or 1
# The binary packed signature is in the [R || S || V] format where V is 0 or 1.
type Signature struct {
    R BigInt
    S BigInt
    V BigInt
}
```