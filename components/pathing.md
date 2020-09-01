Pathing in IPLD
===============

"Pathing" refers to the use of "paths" to describe navigation between nodes in IPLD data.

You can think of "pathing" in IPLD as being comparable to how you use "paths" in a filesystem:
paths are composed of a series of segments, and each segment is an instruction on how to navigate deeper into the filesystem.
With filesystems, each step is over a "directory" and leads you to either a "file" or another "directory";
for IPLD, each step is over a "node" and leads you to another "node"!

Paths are used in IPLD libraries to tell the library to traverse a graph of nodes.
Paths are also used in IPLD libraries to tell you about the progress you've made in a traversal,
or in error messages to describe where in a data graph the error was encountered.

Paths are also often user-facing -- it's very convenient for applications built on IPLD to use IPLD paths as part of their user interface.
(See the [how IPFS web gateways work tutorial](/tutorials/how-ipfs-web-gateways-work.md) for an example of this.)


Paths vs Path Segments
----------------------





Unified pathing
---------------

We have a concept of pathing which unifies the way we handle data in the (raw) Data Model, data processed with IPLD Schemas, and data which is accessed via ADLs.



Paths in various IPLD implementations
-------------------------------------

- in Golang:
	- in [go-ipld-prime](https://github.com/ipld/go-ipld-prime):
		- [ipld.Path (godoc)](https://godoc.org/github.com/ipld/go-ipld-prime#Path)
		- [ipld.PathSegment (godoc)](https://godoc.org/github.com/ipld/go-ipld-prime#PathSegment)
