# IPLD Codecs

A codec exposes serialization and deserialization for IPLD blocks.
If it also supports content addressable links then the codec exposes those links as CIDs.
A codec also supports atomic IPLD Path lookups on the block.
