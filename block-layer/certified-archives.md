# Specification: Certified Archives (.car)

**Status: Draft**

When storing IPLD data in sequences of bytes, we can use the .car format (Certified ARchive).

A .car file is a serialized representation of any IPLD DAG as the concatenation of its blocks, plus a header that describes the graphs in the file (w/ root CIDs). The overhead is tiny (just the header) as the blocks themselves are just the raw graph data encoded with its native IPLD codec. Think of it as a super simple .tar file, but for IPLD DAGs. 

This diagram shows how IPLD blocks, their root CID, and a file header combine to form a .car file:
![Certified Archive Files Diagram](certifiedarchives.png)

### File header format

TODO - describe header structure, size, etc.

### Open problems

This is a DRAFT specification. Open problems include:
- Can a .car file contain no root nodes, to be used when very large files are split across multiple .car files? [go-car/#19](https://github.com/ipfs/go-car/issues/19)
- How to add seekability?
