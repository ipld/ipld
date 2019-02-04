# CIDv1

# Content IDs

This document will use the words Content IDs or CIDs.

Prior base58 multihash links to protobuf data be called CID Version 0.

## CIDs Version 1

Putting together the IPLD Link update statements above, we can term the new handle for IPLD data CID Version 1, with a multibase prefix, a version, a packed multicodec, and a multihash.

```
<mbase><version><mcodec><mhash>
```

Where:
- `<mbase>` is a multibase prefix describing the base that encodes this CID. If binary, this is omitted.
- `<version>` is the version number of the cid.
- `<mcodec>` is a multicodec-packed identifier, from the CID multicodec table
- `<mhash>` is a cryptographic multihash, including: `<mhash-code><mhash-len><mhash-value>`

Note that all CIDs v1 and on should always begin with `<mbase><version>`, this evolving nicely.

### Multicodec Packed Representation

It is useful to have a compact version of multicodec, for use in small identifiers. This compact identifier will just be a single varint, looked up in a table. Different applications can use different tables. We should probably have one common table for well-known formats.

We will establish a table for common authenticated data structure formats, for example: IPFS v0 Merkledag, CBOR IPLD, Git, Bitcoin, and more. The table is a simple varint lookup.

### Distinguishing v0 and v1 CIDs (old and new)

It is a HARD CONSTRAINT that all IPFS links continue to work. This means we need to continue to support v0 CIDs. This means IPFS APIs must accept both v0 and v1 CIDs. This section defines how to distinguish v0 from v1 CIDs.

Old v0 CIDs are strictly sha2-256 multihashes encoded in base58 -- this is because IPFS tooling only shipped with support for sha2-256. This means the binary versions are 34 bytes long (sha2-256 256 bit multihash), and that the string versions are 46 characters long (base58 encoded). This means we can recognize a v0 CID by ensuring it is a sha256 bit multihash, of length 256 bits, and base58 encoded (when a string). Basically:

- `<mbase>` is implicitly base58.
- `<version>` is implicitly 0.
- `<mcodec>` is implicitly protobuf (for backwards compat with v0).
- `<mhash>` is a cryptographic multihash, explicit.

We can re-write old v0 CIDs into v1 CIDs, by making the elements explicit. This should be done henceforth to avoid creating more v0 CIDs. But note that many references exist in the wild, and thus we must continue supporting v0 links. In the distant future, we may remove this support after sha2 breaks.

Note we can cleanly distinguish the values, which makes it easy to support both. The code for this check is here: https://gist.github.com/jbenet/bf402718a7955bf636fb47d214bcef8a

### IPLD supports non-CID hash links as implicit CIDv1s

Note that raw hash links _stored in various data structures_ (e.g. Protobuf, Git, Bitcoin, Ethereum, etc) already exist. These links -- when loaded directly as one of these data structures -- can be seen as "linking within a network" whereas proper CIDv1 IPLD links can be seen as linking "across networks" (internet of data! internet of data structures!). Supporting these existing (or even new) raw hash links as a CIDv1 can be done by noting that when on data structure links with just a raw binary link, the rest of the CIDv1 fields are implicit:

- `<mbase>` is implicitly binary or whatever the format encodes.
- `<version>` is implicitly 1.
- `<mcodec>` is implicitly the same as the data structure.
- `<mhash>` can be determined from the raw hash.

Basically, we construct the corresponding CIDv1 out of the raw hash link because all the other information is _in the context_ of the data structure. This is very useful because it allows:
- more compact encoding of a CIDv1 when linking from one data struct to another
- linking from CBOR IPLD to other CBOR IPLD objects exactly as has been spec-ed out so far, so any IPLD adopters continue working.
- (most important) opens the door for native support of other data structures

### IPLD addresses raw data

Given the above addressing changes, it is now possible to address raw data directly, as an IPLD node. This node is of course taken to be just a byte buffer, and devoid of links (i.e. a leaf node).

The utility of this is the ability to directly address any object via hashing external to IPLD datastructures.

### Support for multiple binary packed formats

Contrary to prior Merkle objects (e.g. IPFS protobuf legacy, git, bitcoin, dat and others), new IPLD ojects are authenticated AND self described data blobs, each IPLD object is serialized and prefixed by a multicodec identifying its format.
