# Ethereum Data Structure Basic Types
These types are used throughout the Ethereum data structures but are themselves not IPLD blocks.

```ipldsch
# Go big.Int
# Prefer presenting to users either as a number or a string view of the decimal number
# for readability.
type BigInt bytes

# Unsigned integer
# Used to explicitly specify that an integer cannot be negative
type Uint bytes

# Block nonce is an 8 byte binary representation of a block's nonce
type BlockNonce bytes

# Hash represents the 32 byte KECCAK_256 hash of arbitrary data.
type Hash bytes

# Address represents the 20 byte address of an Ethereum account.
type Address bytes

# Bloom represents a 256 byte bloom filter.
type Bloom bytes

# Balance represents an account's balance in units of wei (1*10^-18 ETH)
type Balance BigInt

# OpCode is a 1 byte EVM opcode
type OpCode bytes

# Time is a 64 bit uint UNIX timestamp
type Time bytes

# TxType is an 8 bit uint representing the type of the tx
type TxType bytes
```