Getting Things Done with IPLD
=============================

There are lots of ways to get things done in IPLD.

When designing a new system and trying to decide what parts of IPLD
you should use to accomplish your goals, try going down this chart --
in order: if you can get something done with the things at the top of this file,
do that; if you can't, only then should you keep reading down the list to
the more invasive and high-effort options that are available.

Use the Data Model
------------------

You can get lots done with just the [Data Model](/doc/glossary#data-model) and core APIs.

Whenever you want to get something done with IPLD,
we suggest you start by just sketching out what you want to do by using the Data Model.
This is similar to saying "just sketch examples of your desired API in JSON";
maybe you'll want more formality to your structure later,
and maybe you'll want to write more auto-validation rules, etc;
but those can come later.

Use Schemas
-----------

[Schemas](/schemas/) are for when you want to formalize structures.
They can be useful for documentation;
they do validation of data structures so you know what you're handling;
they can be used for version detection and feature detection;
and with some libraries they can even be used for code generation.

We find that using Schemas is often a good idea.  But you don't have to!
If what you want to do is easy enough to accomplish at the Data Model level alone,
then go for it.

Schemas are totally compatible with the Data Model approaches to handling data.
They just decorate more behaviors onto it.
Any code that's written to traverse over the regular Data Model-specified interfaces
will also be able to traverse over data that's been processed with Schemas.

Schemas can be used to do some very basic transformations of data --
like transforming long-form names for fields in data into shorter names
before passing them into or out of serialization -- but that's the extent
of their powers; they can't do any more dynamic restructuring than that.

Use ADLs
--------

[ADLs](/advanced-layouts/) -- Advanced Data Layouts -- are for when you want to present data
*as if* it is IPLD Data Model (so that all the rest of our tools can work over it),
but the serialized structure of the data is significantly (topologically) different.

Examples of things people have wanted to do in the ecosystem which have been
done as ADLs include:

- large collections, sharded across multiple blocks, but still presenting as a single map or list
- large bytes, sharded across multiple blocks, but still presenting as one coherent bytes object
- encrypted data, where there's a ciphertext format, and also (conditionally) a cleartext format

ADLs are an abstraction layer where extremely powerful transformations like
those listed above can be implemented... while still reusing existing
serialization codecs, and while still presenting things as Data Model interfaces
so that all the same traversal logic that works on either plain Data Model or
on Schema-processed data *also* still works on data processed by an ADL.

ADLs are also noteworthy in that (like Schemas), one can always choose to handle
data _without them_, and just handle the raw Data Model contents directly.
Often this will be less useful... but it can be a good debugging tool,
and useful for comprehensible and reusable data structure design.

Write a new Codec
-----------------

This should be your absolute last resort.

Writing a new [Codec](/doc/glossary#codecs) poses future portability questions.
Every IPLD library in every programming language will need to implement it;
many, practically speaking, won't -- unless you give them a very good reason.
Therefore, it's best to stick to one of the already widely supported codecs.

There should also simply be very little reason that you would need to create
a new wire format and a new codec for it.  IPLD Schemas and their mechanisms
for customizing representations already make it possible to choose any position
you like on the gradient between schemaless (redundant but easy to read)
and schema-required (densely packed, but impossible to understand without a schema)
data... and most new serialization formats are invented because someone wants
to stake out a new position on that gradient.  Now, you shouldn't have to.

The most typical reason to introduce new codecs is to bridge the IPLD system
with some other, existing serialization formats.  That's great, and we
welcome (and absolutely designed for) this kind of bridging.
But if you're designing a new system that's IPLD from the start,
we really recommend using existing codecs.
It's just easier to hit the ground running, and there's little value
and lots of costs to trying to forge your own way through a new codec.

But Why?
--------

Why are there so many different layers?

Because for standards to be useful and allow people to build an ecosystem of reusable systems together, they have to unify on some things;
and for standards to be flexible enough to allow people to build things suitable to them and their specific tasks, they have to be extensible.

We have different degrees of unification versus flexibility in each of these layers.
That means you can *choose* how close of an orbit you want to keep with the rest of the ecosystem.
