---
title: "basic_types"
weight: 9
description: "Tendermint and Cosmos Data Structure Basic Types"
---

```ipldsch
# Uint is a non-negative integer
type Uint Int

# The main purpose of HexBytes is to enable HEX-encoding for json/encoding.
type HexBytes bytes

# Address is a type alias of a slice of bytes
# An address is calculated by hashing the public key using sha256
# and truncating it to only use the first 20 bytes of the slice
type Address HexBytes

# Hash is a type alias of a slice of 32 bytes
type Hash HexBytes

# Time represents a unix timestamp with nanosecond granularity
type Time struct {
    Seconds Uint
    Nanoseconds Uint
}

# Version captures the consensus rules for processing a block in the blockchain,
# including all blockchain data structures and the rules of the application's
# state transition machine.
type Version struct {
 Block Uint
 App   Uint
}

# BlockIDFlag is a single byte flag
type BlockIDFlag enum {
  | BlockIDFlagUnknown ("0")
  | BlockIDFlagAbsent ("1")
  | BlockIDFlagCommit ("2")
  | BlockIDFlagNil ("3")
} representation int
```
