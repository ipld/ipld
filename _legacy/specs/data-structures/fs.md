# Specification: unixfs-v2

**Status: Prescriptive - Draft**

The following schema is used to represent files and directories in pure IPLD Data Model. It
differ substantially from UnixFSv1 which is built exclusively on `dag-pb` and is currently
integrated into IPFS.

This schema makes use of two existing data structures, HAMT and FBL.

```sh
type Symlink struct {
	target String
}

type DirEnt struct {
	attribs optional Attribs
	content AnyFile
}

type AnyFile union {
	| "f" FBL
	| "d" &HAMT
	| "l" Symlink
} representation keyed

type Attribs struct {
	# we'll discuss this in the next section;
	# for now, it's enough to reserve the position where it's used.
}
```
