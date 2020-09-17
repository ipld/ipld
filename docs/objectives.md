Objectives and Scope of IPLD
============================

We want to see more decentralized designs appearing in technology.

We believe specifications for data structures are a key part of enabling that.
(See [[Theory of Change]] for the even bigger picture,
and more on our concept of enablement.)

Things IPLD is concerned with
-----------------------------

## Databases

We want IPLD to provide many of the useful attributes of an SQL-style database for purely local/offline applications:
IPLD Schemas and IPLD Selectors provide features comparable to DDLs and SQL,
and set the stage for building migration systems.

At the same time, IPLD works on a concept of "blocks" which are much more comparable to messages:
they're easy to send and receive over the network, and critically, can be regarded individually
(there's no supposition of monolithicity, as SQL-style databases have).

Our aim is that IPLD should straddle this divide and operate on either side of it gracefully.
The same libraries and concepts and tooling should work well regardless of if you're building an offline app
or a massively distributed system with remote actors coming and going and sending messages all the time.

## Additional concerns

In order to make building on decentralized data structures be excellent, we see the following major goals:

- Some minimal legibility of data is required.
	- (This is what our work on the Data Model focuses around.)
- It is awesome if our concept of data can be used across various encoding systems with a minimum of effort.
	- (This is why most IPLD libraries have a concept of various codecs; and we do a lot of work to specify codecs in terms of the Data Model.)
- Whenever data is serialized, some standard indications of what codecs are necessary to use to transform that serial data back into a minimally legible form must be available,
  and these indicators should always be found very tightly bound to any stored data.
	- (This is what multicodecs are about, and why multicodec indicators are in CIDs.)
- For data to be usable in decentralized/distributed systems, it's important for small pieces of data to link to other pieces of data;
  and this must be based on immutable references, because a user must be able to freely choose between fetching data either immediately or deferred at some later time:
  it must be possible to choose this without changing the correctness and coherency of their data by making their fetch actions at a later date.
  The most effective way to do this is content-addressing with the use of cryptographic hashes.
	- (This is what IPLD Linking and CIDs are all about.)
- Given that we have identified that hashing data is a useful thing to do in the pursuit of building decentralized data structures,
  it would be excellent to standardize the process of feeding data to hashes, so that this can become a simple thing that happens without great special effort;
  and since there are various hashing systems in the world, it is important to identify which hashing algorithm was used to compute any hash we might store or reference.
	- (This is what multihashes are about, and why multihash indicators are in CIDs; and why IPLD libraries connect dots all the way through from Data Model to Codec to hashing.)
- It's important to be able to traverse our minimally legible data, programmatically.
  We should be able to understand how to do this even without understanding any semantic details of this particular data,
  and we need this so that data remains usefully legible even in "deep time".
	- (This is again what the Data Model, and IPLD Linking, focuses on.  IPLD Selectors then go further, providing a declarative way to describe traversals.)
- It's useful to be able to define some topological expectations of the structure of data in a declarative way.
	- (This is what IPLD Schemas focus on.)
- It's important that these topological expectations about the structure of data should be able to apply to any data --
  even data that predates (or was otherwise causally independent of) the writing of the topological declarations.
  This is important because this kind of causal independence is frequent in decentralized and distributed development,
  and thus to be true to our vision and theory of change, we should support this kind of relationship.
	- (This figures deeply in the design of IPLD Schemas.)
- It's desirable that these topological expectations about the structure of data should be something we can use to describe "version" detection and feature detection.
  Most concepts of "version" are brittle in decentralized systems (and especially, in decentralized development practices);
  we need ways to reason about data that continue to work when there's no central authority on version numbering,
  and mechanisms for describing data without resorting to explicit inbuilt versioning at all, so that it is possible to evolve the way we handle data separately from the data itself.
	- (This figures deeply in the design of IPLD Schemas.)
- It is important to be able to collect large amounts of data, and make it accessible
  and navigable even if we split it up ("shard" it).
	- (We introduce an idea called Advanced Data Layouts as a way to describe such collections, and as part of this, describe how to make the sharded content directly legible as the IPLD Data Model.)


Things IPLD is not concerned with
----------------------------------

- Encryption.  It's important, but it's not our battle.
  We hope that IPLD will be useful for structuring data, both in cleartext and ciphertext.
  We hope the the Advanced Data Layout extension system might be applicable to making systems simultaneously use encryption and are traversable as IPLD!
  But essentially, we're looking to _enable_ these developments -- it's not on our roadmap to drive them.
- Identity systems.  It's important, but it's not our battle.
  Decentralized identity is a very expansive topic; it's exceeding unlikely that there will even be "one" answer to the questions in this field:
  it blurs between cryptosystem design, reputation systems, statistical properties of graphs... there's truly a whole field here, if not _several_, and no one-size-fits-all answers.
  We will try to provide guidance on how IPLD relates to, and might be usefully composed with, other decentralized identity systems;
  but ultimately, how to do this will depend on the choices of application developers and the needs of their applications.
- Networking.  How to get data from one place to another is important, but IPLD should work with any mechanism you choose.
  IPLD should even work fine and provide value with *no* networking, or work fantastically with "sneakernet".
  (The libp2p project is also pursuing useful work in networking and focused on decentralized systems;
  it's not directly related to IPLD, but they should work well together, and you might want to check it out.)



