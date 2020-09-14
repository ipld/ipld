

We want IPLD to provide many of the useful attributes of an SQL-style database for purely local/offline applications:
IPLD Schemas and IPLD Selectors provide features comparable to DDLs and SQL,
and set the stage for building migration systems.

At the same time, IPLD works on a concept of "blocks" which are much more comparable to messages:
they're easy to send and receive over the network, and critically, can be regarded individually
(there's no supposition of monolithicity, as SQL-style databases have).

Our aim is that IPLD should straddle this divide and operate on either side of it gracefully.
The same libraries and concepts and tooling should work well regardless of if you're building an offline app
or a massively distributed system with remote actors coming and going and sending messages all the time.
