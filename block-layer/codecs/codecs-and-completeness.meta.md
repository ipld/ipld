Meta: Codecs and Completeness
=============================

This document is somewhat rough.
It's necessary that we have this discussion somewhere, but it could certainly be polished further.


### do not use wishful thinking here

Discussion about codecs and completeness must be grounded in **one-to-one correspondence** --
also known as [Bijection](https://en.wikipedia.org/wiki/Bijection).

Bijection is a double-edged sword:
inherently, a Codec with *more* features than the Data Model will *lose* data when transforming data to the Data Model;
and a Codec with *fewer* features than the Data Model will not be able to express all data that IPLD can describe.
One cannot wish this away; one can only document tradeoffs, domains, and limitations accurately.

### conflicts

This document conflicts with the some other claims currently in the specs repo
(such as "DAG-JSON supports the full IPLD Data Model" in https://github.com/ipld/specs/blob/master/block-layer/codecs/dag-json.md ).
This document supercedes those.  There is corrective work to be done.

### can we make tables

It would be neat if we continued to boil this down until we can get regularized tables with checkmarks.
We could then use those tables in the specs pages for each codec.

To do so is somewhat tricky.

### can we choose more words?  fewer words?  different words?

Sure.  Language is an art.

This document tries to choose terms for describing patterns of limitations that *tend* to exist in implementations,
and tradeoffs that designers and specifiers of codecs *often* weigh.
It does not try to describe every possible choice with a unique term;
it also names many more patterns than the purest of mathematical data modeling would consider distinctive.
The goal is to provide a happy medium of vocabulary that is useful in practical discussion.
