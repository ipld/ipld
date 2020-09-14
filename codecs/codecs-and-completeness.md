Codecs and Completeness
=======================

IPLD has a very all-embracing approach to compatibility: many systems have some sort of bridge to IPLD.
As a result, it's very important to understand which of those bridges are "complete", and which contain limitations;
and for those that have limitations, what those limitations are.
Most of this appears in the Codec layer: because Codecs are responsible for how data is serialized,
they encompass almost all of the compatibility efforts in bridging IPLD systems to each other and to other systems.

We define "completeness" in terms of the [[Data Model]] (and split it into two concepts):

1. A "complete" codec is one that can represent **all** of the IPLD Data Model;
2. A "fitted" codec is one for any data in the IPLD Data Model, can represent it only precisely **one** way.

A "complete" AND "fitted" codec is [[bidirectional]].

What about codecs that aren't?

- complete/incomplete:
	- **complete**: contains all of IPLD Data Model
	- **incomplete** (aka "lossy"): cannot represent some Data Model data...
		- **disordered**: does not preserve map entry order on either encode or decode
			- n.b., sorting codecs are disordered and therefore lossy!  this isn't purely a bad thing (it means those codecs have a greater tendency towards [[(uncoordinated) convergence]], which can be useful), but it is a thing that's important to note about a codec.
		- **underkinded**: does not have ways to clearly disambiguate IPLD Data Model kinds
			- e.g. if it's impossible to tell apart the number `1` and the string `"1"`, that's an underkinded codec.
			- e.g. if a format doesn't have a way to encode IPLD Links, that's underkinded.
		- **loose-stringed**: does not reliably preserve all strings or byte sequences
			- e.g. if something does character "normalization" on strings rather than respecting and round-tripping all 8-bit sequences, that's loose-stringed.
		- **plane-mangling**: does not reliably preserve all strings or byte sequences... because some of them are reserved sentinels for "control" sequences.
			- "plane-mangling" is sometimes also known as "confusing the control plane and the data plane" (and has many other names as well; it's an important and frequently-rediscovered concept).
			- e.g. if it's illegal for a map to have a key that is the string `"/"`, that's plane-mangling.
			- "plane-mangling" and "loose-stringed" are different only by intent, yes -- but we find that identifying the source and approximate impact radius of the issue by naming them separately is useful.
		- **skeletoid**: can only accept some very specific structures of data.
			- **skeletoid+parameterized**: some parameters (e.g., more than the multicodec identifier) are needed to be able to morph the data to and from the IPLD Data Model.
			- (it may be interesting to compare and contrast this to IPLD Schemas!  IPLD Schemas can describe data structurally, but do it in a way that composes _over_ codecs, rather than being entangled _in_ codecs and thus limiting their completeness.)
			- TODO: naming?  alts: "finitestructured"?  other?

- fitted/illfitted:
	- **fitted**: has exactly one way to encode any IPLD Data Model content that it encodes; and, does not have a way to encode things that the IPLD Data Model doesn't describe.
	- **illfitted**: has more than one that some IPLD Data Model content could arguably be encoded; or, can encode *more* things things than the IPLD Data Model considers to be distinctive.
		- **baroque**: supports variations in the encoded format which are non-semantic and not preserved in the IPLD Data Model.
		- **topowild**: supports topologically different structures than the IPLD Data Model (in other words, forms of recursion that are neither maps nor lists).
			- n.b. in many cases a codec can be made non-topowild by simply defining a morphism from these exotic structures onto the IPLD Data Model... but this usually makes them "incomplete(skeletoid)" (and possibly "skeletoid+parameterized") instead... and typically also implies other usability frictions which may or may not be acceptable (think: the depth of tree becomes roughly doubled, because a metadata map wraps around every actual data element.)

N.b. a codec that has _normalization_ modes during encoding, but is _lenient_ during decoding: this is still considered **illfitted**.
(TODO: maybe we want another term to flag this, because lenient modes are common enough to be worth special discussion; but we also need to cover what a worry that is when adjacent to hashing.)


Examples of Codecs and their Completeness and Fittedness
--------------------------------------------------------

(It may be worth reading the [Incompleteness is Valid] section before proceeding,
or this might look pretty bleak!  Very few things are Complete AND Fitted.)

- CBOR: is a complete but *illfitted* codec!
	- Complete: The entire data model fits!
	- Illfitted(baroque): maps and lists have multiple variations: they can be length-prefixed or indeterminate-length encoding.
	- Illfitted(baroque): maps can contain non-string keys, and indeed even mixed key kinds.
	- Illfitted(baroque): floats and integers can be encoded in various binary sizes; there's no strict requirement that they use the smallest possible encoding.
	- Illfitted(topowild): "tags" can be associated with every piece of data (including tags-on-tags); this information does not readily map to the IPLD Data Model.

- DAG-CBOR: is an *incomplete* but fitted codec!
	- Incomplete(disordered): because DAG-CBOR specifies a strict sorting order for map entries, it necessarily discards map entry order information!
	- More fitted than CBOR alone: DAG-CBOR specifies that maps and lists must use the length-prefixed encoding.
	- More fitted than CBOR alone: DAG-CBOR specifies that maps must only contain string keys.
	- More fitted than CBOR alone: DAG-CBOR specifies that floats and integers must be encoded using the smallest possible encoding.
	- More fitted than CBOR alone: DAG-CBOR specifies that tag 42 (which we use for links) is the only allowed tag.

- JSON: is an *incomplete* and *illfitted* codec!
	- Incomplete(underkinded): binary cannot be encoded unambiguously in JSON.  (Base64 is often used when encoding; but one can't tell the difference string and binary to decide whether to b64decode later when decoding.)
	- Incomplete(underkinded): floats and integers cannot be reliably distinguished in JSON.
	- Incomplete(underkinded): how to encode IPLD Links in JSON is not defined (although see DAG-JSON).
	- Illfitted(baroque): non-semantic whitespace can be used freely in JSON.
	- Illfitted(baroque): strings in JSON can be escaped (or not) in various ways, and parsers will accept variations.  These variations are not roundtripped by most JSON libraries.

- DAG-JSON: is an *incomplete* but fitted codec:
	- Incomplete(disordered): because DAG-JSON specifies a strict sorting order for map entries, it necessarily discards map entry order information!
	- More complete than JSON alone: DAG-JSON specifies how to encode IPLD Links!  However... see next line:
	- Incomplete(plane-mangling): because DAG-JSON reserves maps with a single key that is the string `"/"` as a sentinel to indicate an IPLD Link, it is _lossy_: user data which _happens_ to contain a single map that just happened to have the `"/"` character as a key _cannot be encoded_ in DAG-JSON.
	- More complete than JSON alone: DAG-JSON specifies how to encode raw binary bytes, and how to detect them unambiguously during decoding.  However... see next line:
	- Incomplete(plane-mangling): a similar pattern to that for Links is also reserved to indicate binary bytes; this effectively blocks user data from using the same space.
	- More fitted than JSON alone: DAG-JSON specifies that any non-semantic whitespace must not be used.

- git: is an *incomplete* but fitted codec!
	- Incomplete(skeletoid): Git objects only contain very specific structures: we mostly treat them as if they're maps in the Data Model (e.g. a git commit object is treated as a map with a key called "author_name").  It is not possible to encode arbitrary maps into arbitrary git objects, nor put links in arbitrary places, etc.
	- Fitted: there is _one way_ to serialize (and hash) any git object.  This is the definition of "fitted".  (All structures have known orders; all maps (such as directories) are defined as sorted order.)

- DAG-PB: is an *incomplete* and dubiously fitted codec!
	- Incomplete(skeletoid): DAG-PB only stores very specific structures of data.
		- Note: (perhaps surprisingly) DAG-PB is *not* "skeletoid+parameterized": it's *just* skeletoid.  DAG-PB doesn't actually support arbitrary protobufs!  It just supports one very *specific* protobuf schema: https://github.com/ipld/specs/blob/master/block-layer/codecs/dag-pb.md#serial-format.
		- The IPLD Schema describing how we see this data in the IPLD Data Model can be found here: https://github.com/ipld/specs/blob/master/block-layer/codecs/dag-pb.md#logical-format
	- Dubiously fitted: although the DAG-PB spec defines a specific ordering for the serialized ordering of protobuf fields, and mandates that no unknown fields may be included, and this should be sufficient to qualify as fitted... Be aware that most protobuf tools in the wild may not support this strictness, and it may be difficult in practice to produce code which honors these rules.
	- Other significant issues exist with DAG-PB codecs in practice: some widely used libraries have definitions of pathing (and thus implicitly how the DAG-PB data morphism to the Data Model is defined) which don't match the schema at all.  This document you are reading doesn't even have vocabulary to describe this kind of problem, because we hope that going forward the development of new codecs will be sufficiently standardized that this kind of issue will not emerge again.

Note that it's _possible_ to implement codecs which regard some of these formats different, and they could have different properties:
for example, could could imagine writing a CBOR codec which actually represents every occurrence of a CBOR tag
as if it was a map in the IPLD Data Model with a single key and value, and encode the tag into a string to use as the key;
and this would make it less illfitted than the CBOR codec described above during decoding...
yet at the same time, also make it more incomplete, since it would be unclear how to disambiguate this from *regular* maps with single keys,
and would require inventing some form of escaping, etc...
In general, this spirals into "yes, indeed, anything is possible!" Turing-tarpit territory; we will say no more about it.


Using the Incompleteness Ontology
---------------------------------

- [Incompleteness is Valid]
- [Incompleteness categories are not directly comparable]
- [Completeness and fittedness are a tug-of-war]
- [Yes, you can work around incompleteness]

### Incompleteness is Valid

Incomplete codecs are perfectly valid!  We have lots of them.  They can accomplish useful work.

Illfitted codecs are perfectly valid!  We have lots of them.  They can accomplish useful work.

The whole world is full of various formats that are either incomplete or illfitted *even when paired with themselves* -- for example, YAML is incredible at this:
a staggering number of YAML libraries and parsers regularly forget huge amounts of information about their own AST in normal operation, and thus fail to round-trip documents;
or, have shocking-to-the-user ambiguities like the infamous "port mappings are sometimes confused with times and parsed in base-60" issue.
These formats still persist and are widely used, and _that's okay_.

It's just important to be aware of it.

Incomplete and illfitted codecs often can even safely round-trip data, _when using the same codec for decode and encode_.
It's only when mix-and-matching them, or transforming or generating new data, that one needs to really watch out.

All of our efforts in documenting incompleteness, illfittedness, and categorizing specific kinds of it is in the interest of improving IPLD documentation,
and making sure our community can use systems while understanding what they promise (and what they don't).
It's not meant to cast shade on systems that have these markers.

### Incompleteness categories are not directly comparable

Incompleteness categories are not directly comparable;
it's necessary to examine the details of a case to know if data from one codec can be transcoded into another codec without fear of loss or domain range errors.

By example: if two codecs are both plane-mangling, but
one of them has special behaviors that make map keys starting with `"__"` illegal for user data,
while the other says map keys containing the `"/"` character are illegal...
then their incompleteness doesn't balance each other out!
You will still have the possibility of data which is encodable in one codec,
but which cannot be transcoded to the other!

On the other hand: two codecs can both be incomplete in different ways, but compose just fine together:
for example, data produced by a git codec decoding some serial data can be easily transcoded into a dag-cbor codec, and this is definitely safe.
(That data in a dag-cbor encoding can also be understood to be transcodeable back to a git codec,
if we know that the domain of the data hasn't changed to include some data outside of the domain that the git codec handles.)
The converse of this example, starting with any arbitrary dag-cbor data, is back to untrue:
the dag-cbor codec, though incomplete, still has wider domain of encodable values than the git codec does.

### Completeness and fittedness are a tug-of-war

Almost *every* codec will be either incomplete or illfitted,
unless it was designed from scratch specifically to be isomorphic to the IPLD Data Model.

Formats that are more expressive than the Data Model are naturally illfitted.

Formats that are less expressive than the Data Model are naturally incomplete.

Moving in *any* direction other than staying exactly isomorphic to the IPLD Data Model means becoming one or the other.

It's not a strictly one-dimensional tug-of-war either:
a codec can readily be *neither* complete *nor* fitted.

This is _okay_ -- see [Incompleteness is Valid] -- it's just important to be aware of the limitations of the codecs you use.

### Yes, you can work around incompleteness

Many applications in practice use tactics like the base64-for-raw-bytes approach for JSON.
Obviously, this "works"... so why can't we just use that in IPLD?

Well, because it only "works" when presuming some conditions that we *don't* accept presumption of in IPLD.
When other applications do this, they're relying on some *application level knowledge* about where the raw-bytes data is in a structure.
This additional understanding of the structure of the data floats around out-of-band, implicitly:
it's knowledge like "the 'foobar' key in the map inside the top level list?  Yeah, that field should be b64decode'd".

_We don't have implicit knowledge like that_ in IPLD.
Because we have a clear layering model -- Codecs must transform raw serialized data into recognizable IPLD Data Model --
the Codec has to decide _what [[Kind]]_ the data is, and they have to do this _at the Codec level_ -- which means *without* application-level logic.

(Unless they're a parameterized+skeletoid codec which has more-than-multicodec levels of configuration.
Then those codecs can have that kind of knowledge, of course.
But we still call those "illfitted", specifically because requiring that kind of configuration breaks the layer models in ways that are important to notice and advisable to avoid.)
