# Specification: IPLD Paths

**Status: Descriptive - Draft**

## Summary

An IPLD "Path" is a string identifier used for deep references into IPLD graphs.
Paths follow similar escape and segmentation rules as URI paths.

An IPLD Path is a string identifier used for deep references into IPLD graphs.

IPLD Path's are constructed following the same constraints as [URI Paths](https://tools.ietf.org/html/rfc3986#section-3.3).

Similarly, the string `?` is reserved for future use as a query separator.

## Path Resolution

Path resolution is broken into two parts: full path resolution and block level resolution.

Block level path resolution is defined by individual codecs.

Full path resolution should use block level resolution through each block.
When a block level resolver returns an `IPLD Link` a full path resolution
should retrieve that block, load its codec, and continue on with additional
block level resolution until the full path is resolved. Finally, path resolution
should return a [**representation**](./IPLD-Path.md#representation)
of the value for the given path.
