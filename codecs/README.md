Codecs in IPLD
==============

Codecs are the functions in IPLD libraries that transform raw serialized data (usually read from a [Block](/blocks/))
into [Data Model](/data-model/), which is what most of the feature of IPLD libraries work on.

- Codec Rules
	- [Codecs and Completeness](codecs-and-completeness.md)
- Codec Formats
	- [DAG-CBOR](./impl/dag-cbor.md)
	- [DAG-JSON](./impl/dag-json.md)
