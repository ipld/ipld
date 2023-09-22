# An Investigation Into DAG-PB Implementations and Use

***August 2020 by @rvagg***

This document is a result of some digital archaeology initially spurred by the differences introduced while porting go-ipfs' `dag` commands to use go-ipld-prime, and therefore the latest dag-pb codec, causing differences in putput: `Data`/`Links` (new) vs `data`/`links` (old). It turns out that there's a deep rabbit hole here.

We document [some of this in the dag-pb spec](https://ipld.io/specs/codecs/dag-pb/spec/#alternative-legacy-pathing) but only as it relates to pathing. The fact that we’ve mostly siloed into our separate language stacks meant that the gulf between JS & Go and how we view these things hasn’t been clear. Until now, since we’re integrating go-ipld-prime into go-ipfs and it’s bringing in the new unified dag-pb codec work, where [js-dag-pb](https://github.com/ipld/js-dag-pb) and [go-codec-dagpb](https://github.com/ipld/go-codec-dagpb) are fundamentally doing the same thing under the hood, as per much clarified dag-pb specification, and we’re finally exposing a more “pure” data model up through the `dag` APIs in go-ipfs.

## In the beginning

dag-pb (I don't know when it started being called that but it was originally just the data serialisation form) was originally defined as a protobuf schema, which you can find [here](https://ipld.io/specs/codecs/dag-pb/spec/#serial-format). With `Data`  and `Links` on the `PBNode`, and the `PBLink`s have `Tsize`, `Name`, `Hash`.

## Go data forms

go-ipfs defers all its dag-pb concerns to [go-merkledag](https://github.com/ipfs/go-merkledag/). Which in turn serves as a translation layer between the serialized forms and the in-memory forms of these nodes. Serialization happens in [go-merkledag/pb](https://github.com/ipfs/go-merkledag/tree/master/pb) which started life as a protobuf codegen but has been manually tweaked since then by a few of us for various reasons.

go-merkledag/pb has `PBNode` and `PBLink`, matching the protobuf schema.

go-merkledag, on the other hand, has `ProtoNode`, but uses [go-ipld-format](https://github.com/ipfs/go-ipld-format) for its `ipld.Link` type. `ProtoNode` uses lower-case `data` and `links` and does explicit translation when converting to and from `PBNode`. It also has JSON marshal and unmarshallers that are careful to retain these names as they are (if you're not a Go person, keep in mind that Go uses the capitalisation of the first character of variable names as an indicator of public accessibility of struct fields, so there's often hoops you have to jump through to make things appear publically as lower-case, including JSON serialization for which you have to write custom code to access those lower-case fields, or do other funky stuff with tags).

_But_, it defers to go-ipld-format for `ipld.Link` which does some translation of its own. It keeps the upper-case first character and `Name` is the same, but `Tsize` becomes `Size` and `Hash` becomes `Cid`. There's no special JSON handling because these properties are publically accessible (aside from `Cid` custom JSON marshalling from go-cid), but two of them are different from the PBLink form already.

go-ipfs has been relying on JSONification for its `dag get` API for the most part. If you `dag get CID` then it's going to JSON print the object it gets back, so it's up to the codec to get its self in order for JSON marshalling. If you do that for a dag-pb block then you get `{"data":"base64bytes","links":[...]}` because `ProtoNode` sets itself up for that. The `"links"` array is going to have entries of `ipld.Link` forms, like so: `[{"Name":"name","Size":x,"Cid":{"/":"Qm..."}},...]`. It will also work in the reverse, so you can feed it that form of JSON and it'll unmarshal as a `ProtoNode` and its `ipld.Link`s as required.

Interestingly (for me at least), the `"data"` fields are base64, because that's what the Go JSON encoder chooses to do with bytes, perhaps uniquely. From [encoding/json#Marshal](https://pkg.go.dev/encoding/json#Marshal):

> []byte encodes as a base64-encoded string

This is "standard" base64, which comes _with_ padding. We've created [dag-json](https://ipld.io/specs/codecs/dag-json/) which has only really been properly solidified this year (even though the basics have been in place for a while) that formalises bytes in a similar way, but uses _unpadded_ base64 and nests them under a structure to reduce potential namespace collisions (`{"/":{"bytes":"base64here"}}`).

## JS data forms

The JS IPLD stack has arrived at using pure JavaScript objects to represent the IPLD data model. So for dag-pb, you get an object that can be JSONified and also created from a JSON parse. We don't have funky `[]byte` handling in JavaScript which is (I believe) one of the forces that created dag-json, so our dag-json encoder and decoder will do its special byte handling.

However, the original incarnation of the dag-pb codec, [js-ipld-dag-pb](https://github.com/ipld/js-ipld-dag-pb) (which was in wide usage, mainly via js-ipfs until last month's 0.56.0 release that performed a major migration to the new stack) uses a custom object form for `PBNode` and `PBLink` with constructors and helper functions. `PBNode` has a custom `toJSON()` that translates `Data` to `data` and `Links` to `links`, but also adds in a `size` as the cumulative size of the node and its links' `Tsize` properties. The `PBLink` has a custom `toJSON()` that translates `Name` to `name`, `Tsize` to `size`, and `Hash` to `cid`. The `data` of a node is a plain `Uint8Array` (previously a Node.js `Buffer`) and the `cid` of a link is just a plain base58btc string form of the CID, so JSONificiation is not really useful in practice, especially since the `data` property is going to end up as an ugly associative array: `{"data":{"0":115,"1":111,"2":109,"3":101,"4":32,"5":100,"6":97,"7":116,"8":97},"links":[...]}`.

Rather than using codec-level JSONificiation, js-ipfs uses [custom code _within_ `dag get`](https://github.com/ipfs/js-ipfs/blob/ipfs@0.55.3/packages/ipfs-cli/src/commands/dag/get.js#L82-L89) to print the same forms that go-ipfs provides, translating `{Data,Links:[{Name,Tsize,Hash},...]}` to `{"data":"..","links":[{"Name":"..","Tsize":x,"Hash":{"/":"Qm..."}},...]}`. **But it can't do the reverse**, if you `dag put` then it _must_ be in the raw codec form of `{Data,Links:[{Name,Tsize,Hash},...]}` (but JSON). If you feed `dag get` dag-pb output back into `dag put` then you'll end up with an empty node because it (1) won't find data in the JSON because of casing, and (2) won't error that you have extraneous properties.

During the development of the JavaScript stack, in 2017, there was a conscious decision to [not “translate”](https://github.com/ipld/js-ipld-dag-pb/pull/29) the forms that arise out of the data and just present them as they are (where "as they are" really means, "as the PB schema says they are", this is the crux of the topic of this post). So we get objects with `Data` and `Links`, even though the original code had `data` and `links`, and links have the `Tsize` and `Hash` properties, translating the protobuf schema.

## DAG-PB specification

Prior to 2020, [the dag-pb specification](https://ipld.io/specs/codecs/dag-pb/spec/) only referenced the protobuf schema and included notes about ordering and the some details about the differences in pathing between the two stacks.

In https://github.com/ipld/specs/issues/245 and then https://github.com/ipld/specs/pull/247 an IPLD Schema form of dag-pb was merged. There was some discussion about casing of names at https://github.com/ipld/specs/pull/247#discussion_r390220519 where it was resolved that we should match the protobuf schema. We were apparently oblivious to the additional `ProtoNode` representation, _or_ we didn't consider it relevant to the "data model" form of dag-pb. (There is probably some valid critique of the previous siloing between IPFS and IPLD here too since the IPLD team haven't noticed any of these problems until now.)

The IPLD Schema has since been used to rewrite the new JS and Go codecs for dag-pb, but this was not a major departure since these codecs (originally js-ipld-dag-pb and go-merkledag/pb) at their protobuf level were always using these forms. We were adding additional lenses onto these codecs before they presented themselves at the IPFS `dag` API - via `ProtoNode`, `ipld.Link` and the custom printing forms in js-ipfs `dag get`.

## Path resolution

go-ipfs path resolution uses the `Resolve()` API that codecs implement to figure out what `/a/path/means`. go-merkledag takes paths to mean links, by name, nothing else. If it is asked to resolve `/a/path/a/b/c` then it will assume that `a` is the `Name` of one of its links, and return `/path/a/b/c` as the remainder once resolving that link. Otherwise, if `a` isn't a `Name` of one of it's links, the path won't resolve.

js-ipfs, prior to v0.56.0, also resolves named links as a [special case in js-ipld-dag-pb](https://github.com/ipld/js-ipld-dag-pb/blob/master/src/resolver.js#L28-L35) of the standard codec path resolution, which looks at object properties on the instantiated data model forms. In theory it should also be able to resolve all other properties on the `{Data,Links:[{Name,Tsize,Hash},...]}` object set, but in practice, because js-ipfs does form translation prior to printing, the node it resolves to is coerced into the `{data,links:[{Name,Size,Cid},...]}` form from the expected original form. So if you resolve `Qm.../Data`, or `Qm.../Links`, etc. you'll simply get the empty node in the form of `{"links":[]}` even though they are properly being resolved under the hood.

But, because it still does proper data model form path resolution, you can retrieve CIDs via `Qm.../Links/X/Hash` (where `X` is an index of the `Links` array) and it will resolve properly to linked block. So JavaScript gives us two ways to resolve links in dag-pb: `Qm.../NamedLink` and `Qm.../Links/X/Hash`. go-ipfs gives us `Qm.../NamedLink`.

After js-ipfs v0.56.0, which contained the upgrade to the newer js-multiformats IPLD stack that uses much more plain object forms for representing the data model, **both pathing options now no longer appear to work**, although it still returns `{"links":[]}` if the path should be valid, suggesting that resolution is working but we're not seeing the nodes, but that CIDs are not being followed. There are some bugs here that we should chase down.

### Sharded directories

Sharded directories present a special-case for link name resolution. Requesting `QmFoo/DirName/foo` where `DirName` is a sharded directory will lookup `DirName` in the sharded HAMT starting at `QmFoo`, which may mean traversal of multiple blocks to find the block that encodes the `DirName` data.

Requesting this same path with the prefix `/ipld/` _does not_ have the same behaviour. Instead, the `/ipld/` prefix interprets the nodes at the block layer rather than through the UnixFS lens. However, since it still uses the `Resolve()` function for the block it will still only resolve named links but on the UnixFS sharded block, so the names are HAMT prefixes rather than user-readable names. Our names are 2-character uppercase hexadecimal numbers and this is what the `/ipld/` pathing resolves. `QmFoo/AA/` may give us the same result as `QmFoo/DirName` if `DirName` ended up alone as `AA` in the HAMT (precise details here are unimportant for this discussion).

In the current go-ipfs, the `/ipld/` has the effect of halting the use of UnixFS semantics when traversing dag-pb blocks and the impact of this is primarily that sharded directories lose their ability to be pathed by the directory names, but we are able to path by HAMT prefixes instead.

## go-ipld-prime in go-ipfs

As of writing, the go-ipld-prime in go-ipfs work as represented in https://github.com/ipfs/go-ipfs/pull/7976 changes all of this for go-ipfs.

1. go-merkledag is no longer used in the primary `dag get` and `dag put` path as far as IPLD block handling and pathing are concerned.
2. go-codec-dagpb is used to instantiate full `{Data,Links:[{Name,Tsize,Hash},...]}` forms, [as per the IPLD Schema in the dag-pb spec](https://ipld.io/specs/codecs/dag-pb/spec/#logical-format) (matching the protobuf schema).
3. go-ipld-prime handles path resolution / traversals for `dag get`
4. There is special-casing, via go-unixfsnode, such that loading a dag-pb node will attempt to reify it into a [UnixFS data model form which has a custom `LookupByString`](https://github.com/ipfs/go-unixfsnode/blob/main/pathpbnode.go) that will search its dag-pb node `Links` array for a named link and return that CID if it has one by that name.
5. The custom `LookupByString` means that you can't resolve anything else in the data model form of the dag-pb node.
   1. Sharded directories can still be pathed through directory names, so `QmFoo/DirName/foo` works as expected
6. There is an `/ipld/` override for resolution, such that when the path is prefixed with this, will _not_ perform the unixfsnode reification and you'll get the "pure" data model form and can resolve all of the properties of `{Data,Links:[{Name,Tsize,Hash},...]}` in a standard pathing form.
   1. The `/ipld/` prefix no longer performs link name resolution, for either plain or sharded directory nodes.
   2. The primary loss of functionality here is that you can no longer `/ipld/QmFoo/AA/...` where `AA` is a HAMT prefix in a sharded UnixFS directory. Although it seems unlikely that this was a useful piece of functionality or that there is a measurable user group that knew about, or used this.

## Where to from here?

Some possibilities for how to move forward.

### Option 1: This is how it is now

`{Data,Links:[{Name,Tsize,Hash},...]}` is the data model form of dag-pb, it's in agreement with the protobuf schema and we're being honest about "data model".

go-ipfs and js-ipfs should present this "pure" form when traversing via `/ipld/` prefixed paths, but should _only_ translate sub-paths as named links without the `/ipld/` prefix. `dag get Qm.../NamedLink/foo` should work, `dag get Qm.../Links/0/Hash/foo` should not. Likewise, `dag get /ipld/Qm.../NamedLink/foo` should _not_ work, `dag get /ipld/Qm.../Links/0/Hash/foo` _should_.

When printing a dag-pb node with default settings via `dag get`, we should pass the pure dag-pb data model form through dag-json to get its version of the `{Data,Links:[{Name,Tsize,Hash},...]}` forms. Likewise, when using `dag put` and a `--format` of `dag-pb`, we should only accept this form, parsed as a dag-pb node.

Implications:

* Printing no longer has the lower-cased names, and the links have `Tsize` and `Hash` instead of `Size` and `Cid`.
* Resolving all of the data model pieces of a dag-pb node is possible with the `/ipld/` prefix (i.e. even though you can currently print a JSON version of a `ProtoNode` and its `ipld.Link`s, you can't do a whole lot with them without passing them on to some other tool).
* Custom JSON printing is gone (it's gone anyway with the go-ipld-prime refactor for `dag get`) and we have pure dag-json printing now
* JavaScript's ability to `dag get Qm.../Links/0/Hash/foo` would need to go and support named links only for bare pathing.
  * js-ipfs needs to implement named link resolution somewhere new, since it's now not available at the codec level (perhaps something similar to the go-unixfsnode layering ...) and we don't have any `resolve()` in our codecs
* js-ipfs needs `/ipld/` functionality for data model pathing
* js-ipfs needs to stop forcing dag-pb results from `dag get` back through the dag-pb codec, just output what is resolved in the codec requested
* js-ipfs needs other new goodness introduced in go-ipld-prime in go-ipfs

### Option 2: We got the data model form wrong

The truth is that the data model form of dag-pb is whatever we want it to be. We instantiate from bytes whatever we want and the protobuf schema isn't our master here. We could choose to interpret it in the way `ProtoNode` and `ipld.Link` have been presenting it.

The diff in the IPLD Schema would look something like this:

```diff
 type PBNode struct {
-  Links [PBLink]
-  Data optional Bytes
+  data optional Bytes
+  links [PBLink]
 }

 type PBLink struct {
-  Hash Link
+  Cid Link
   Name optional String
-  Tsize optional Int
+  Size optional Int
 }
```

We would need to fix up js-dag-pb and go-codec-dagpb. These changes would have cascading impacts up the stack, particularly through to js-ipfs which has already adopted these forms throughout its codebase, and go-unixfsnode which is written assuming that `PBNode` and `PBLink` look like they do now. But it would allow us to remove some of the layering that exists and we'd get closer to existing output of `dag get` and js-ipfs would get a `dag put` that mirrors `dag-get`.

Implications:

* We would still need the go-unixfsnode layering to get named link resolution
* js-ipfs would still need many of the changes listed above
* Users would get the same output from `dag get` as they do now for dag-pb nodes **except for the dag-json differences with encoding bytes**(!).
* Are there any implications for changing this for Filecoin which currently uses the new dag-pb codec for graphsync?

# Option 3: Reintroduce `ProtoNode`-style name translation

This option is a compromise and would formalise the middle layer between the dag-pb codec and the user. Current go-ipfs has protobuf decode -> `ProtoNode` -> UnixFS. With the jump to `ProtoNode` providing the lowercasing of `data` and `links` and transformation of links into their `ipld.Link` form as well as named link resolution. Although for practical purposes in go-ipfs, the stage prior to `ProtoNode` is not exposed to the user in a meaningful way.

go-ipld-prime gives us `PBNode` (go-codec-dagpb) -> `PathedPBNode` (go-unixfsnode) || `UnixFSBasicDir` || `UnixFSHAMTShard`. Where `PathedPBNode`, `UnixFSBasicDir` and `UnixFSHAMTShard` are ADLs that translate raw `PBNode`s into forms that make go-ipfs happy. `PathedPBNode` and `UnixFSBasicDir` simply add named link functionality back by overriding `LookupByString()` to find the name in the list of links (and therefore removing `Data` and `Links` from traversal). Otherwise it presents a pass-through to `PBNode`. `UnixFSHAMTShard` adds the same named link functionality but is able to traverse multiple substrate nodes in its HAMT structure to address the name being requested.

The majority of functionality for `PathedPBNode` and `UnixFSBasicDir` simply passes through to `PBNode` (so we see plain `PBNode`s when we request a `dag get` for example), which includes field name lookup for `Data` and `Links`. It ought to be a straightforward matter of using a modified schema for this layer and translate `data` to `Data` and `Links` to `links`. An additional ADL type for links would also be required to translate those names. Inspecting a node would then look like the old forms (although the json -> dag-json bytes output differences would still differ).

`/ipld/` pathing would then fall back to pure data model layer semantics, inspecting `PBNode` and `PBLinks` with no go-unixfsnode reification involved.

The challenges are introduced mainly on the write side. If you gave dag-json input via `dag put -f dag-pb`, the `dag-pb` would presumably remain `Data`, `Links`, etc., or would it also introduce the middle layer at this point (in which case, `dag-pb` here becomes even more of a misnomer)? Additionally, go-unixfsnode would need additional work to make it a writable ADL, which it currently is not. Although this work presumably will be done into the future as we replace more of the UnixFS functionality in go-ipfs with go-unixfsnode.

The additional layer of dishonesty here may leave us worse off with users as we pretend that dag-pb doesn't look like what it actually does in our internal data model. Currently named path resolution is a form of this dishonesty, but it exists to serve the important, though legacy, purpose of pathing the classic file and directory data that dag-pb was intended to provide.
