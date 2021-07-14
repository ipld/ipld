# Filecoin Data Structures Basic Types

These types are used throughout the Filecoin data structures.

```ipldsch
# Address is a `https://github.com/filecoin-project/go-address` in its binary byte format.
# It may be used as a hamt key, and will be often visualized or presented to users
# in its more readable string form.
type Address bytes

# Go big.Int
# Prefer presenting to users either as a number or a string view of the decimal number
# for readability.
type BigInt bytes

# An indicator of which RPC method on an actor a message should trigger execution of.
type MethodNum int

# The 'f0...' subset of Addresses used for the actual indexes of actors in a state root.
type ActorID int

# the height of a block in the chain. Should fit in an Int64
type ChainEpoch int

# the ChainEpoch as bytes, where the integer is converted to its string form and
# the string's bytes are used
type ChainEpochBytes bytes

type TokenAmount BigInt

type PaddedPieceSize int

type PeerID bytes

type SectorSize int

type SectorNumber int

# the SectorNumber as bytes, where the integer is encoded as a uvarint and the
# resulting bytes are used
type SectorNumberBytes bytes

type PartitionNumber int

type BitField bytes

type StoragePower BigInt

type DataCap StoragePower

type DealID int

# the DealID as bytes, where the integer is encoded as a uvarint and the resulting
# bytes are used
type DealIDBytes bytes

type DealWeight BigInt

type Multiaddr bytes

type RegisteredSealProof int

type TransactionID # TxnID

# the TransactionID as bytes, where the integer is encoded as a varint (not uvarint)
# and the resulting bytes are used
type TransactionIDBytes bytes

# A quantity of space x time (in byte-epochs) representing power committed to the network for some duration.
type Spacetime BigInt

type ExitCode int

# Message parameters are encoded as DAG-CBOR and the resulting bytes are
# embedded as `Params` fields in some structs.
# See the Filecoin Messages Data Structures document for encoded DAG-CBOR message
# params
type CborEncodedParams Bytes

# Message receipt returns are encoded as DAG-CBOR and the resulting bytes are
# embedded as the `Return` field in `MessageReceipt`.
# See the Filecoin Messages Data Structures document for encoded DAG-CBOR message
# returns
type CborEncodedReturn Bytes
```

## Crypto Types

```ipldsch
type Signature union {
  SignatureSecp256k1 "01"
  SignatureBLS "02"
} representation bytesprefix
```
