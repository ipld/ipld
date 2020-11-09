# Getting Started with IPLD in Go

In Go, the primary way to use IPLD is via the `github.com/ipld/go-ipld-prime`
module.

Its API is centered around `Node`s, which can be built from scratch and encoded
into blocks, where we can then obtain `Link`s to them.

First, we'll need to import some IPLD packages and define a define a link
builder, which specifies all the codecs and hashing features we'll use:

```go
package main

import (
	"github.com/ipfs/go-cid"
	"github.com/ipld/go-ipld-prime"
	_ "github.com/ipld/go-ipld-prime/codec/dagcbor"
	"github.com/ipld/go-ipld-prime/fluent"
	cidlink "github.com/ipld/go-ipld-prime/linking/cid"
	basicnode "github.com/ipld/go-ipld-prime/node/basic"
)

var linkBuilder = cidlink.LinkBuilder{cid.Prefix{
	Version:  1,    // Usually '1'.
	Codec:    0x71, // dag-cbor as per multicodec
	MhType:   0x15, // sha3-384 as per multihash
	MhLength: 48,   // sha3-384 hash has a 48-byte sum.
}}
```

With that out of the way, we can build our first nodes. Beware that, for the
sake of brevity, we aren't handling any errors.

```go
func main() {
	ctx := context.Background()
	// For now, we're not storing the blocks anywhere.
	store := func(ipld.LinkContext) (io.Writer, ipld.StoreCommitter, error) {
		return ioutil.Discard, func(lnk ipld.Link) error { return nil }, nil
	}

	eric := fluent.MustBuildMap(basicnode.Prototype.Any, 1, func(na fluent.MapAssembler) {
		na.AssembleEntry("name").AssignString("Eric Myhre")
	})
	ericLink, _ := linkBuilder.Build(ctx, ipld.LinkContext{}, eric, store)
	people := fluent.MustBuildList(basicnode.Prototype.Any, 1, func(na fluent.ListAssembler) {
		na.AssembleValue().AssignLink(ericLink)
	})
	peopleLink, _ := linkBuilder.Build(ctx, ipld.LinkContext{}, people, store)
	fmt.Println(peopleLink)
}
```

We encode both nodes into blocks with `dag-cbor`, which can encode all JSON
types, binary data, and IPLD links (CIDs). Finally, the `people` node contains a
link to Eric's block.

You can also implement a storage layer to save and retrieve blocks. For example,
here's an in-memory map store:

```go
func main() {
	ctx := context.Background()
	storage := make(map[ipld.Link][]byte)
	store := func(ipld.LinkContext) (io.Writer, ipld.StoreCommitter, error) {
		buf := bytes.Buffer{}
		return &buf, func(lnk ipld.Link) error {
			storage[lnk] = buf.Bytes()
			return nil
		}, nil
	}
	loader := func(lnk ipld.Link, _ ipld.LinkContext) (io.Reader, error) {
		return bytes.NewReader(storage[lnk]), nil
	}

	eric := fluent.MustBuildMap(basicnode.Prototype.Any, 1, func(na fluent.MapAssembler) {
		na.AssembleEntry("name").AssignString("Eric Myhre")
	})
	ericLink, _ := linkBuilder.Build(ctx, ipld.LinkContext{}, eric, store)
	daniel := fluent.MustBuildMap(basicnode.Prototype.Any, 1, func(na fluent.MapAssembler) {
		na.AssembleEntry("name").AssignString("Daniel Martí")
	})
	danielLink, _ := linkBuilder.Build(ctx, ipld.LinkContext{}, daniel, store)
	people := fluent.MustBuildList(basicnode.Prototype.Any, 2, func(na fluent.ListAssembler) {
		na.AssembleValue().AssignLink(ericLink)
		na.AssembleValue().AssignLink(danielLink)
	})
	peopleLink, _ := linkBuilder.Build(ctx, ipld.LinkContext{}, people, store)

	nb := basicnode.Prototype.Any.NewBuilder()
	_ = peopleLink.Load(ctx, ipld.LinkContext{}, nb, loader)
	people2 := nb.Build()
	for itr := people2.ListIterator(); !itr.Done(); {
		_, value, _ := itr.Next()
		personLink, _ := value.AsLink()

		nb := basicnode.Prototype.Any.NewBuilder()
		_ = personLink.Load(ctx, ipld.LinkContext{}, nb, loader)
		person := nb.Build()

		name, _ := person.LookupByString("name")
		nameStr, _ := name.AsString()
		fmt.Println(nameStr)
	}
}
```

This gives you an idea of what it's like to use links to connect pieces of data
together.

TODO: show that if two links are identical, the data is too
TODO: show how to store IPLD data on IPFS with go-ipfs
