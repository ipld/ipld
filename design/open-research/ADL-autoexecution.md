---
title: "ADL autoexecution"
---

Open Research Challenge: ADLs we can auto-execute
=================================================

The use of [Advanced Data Layouts (ADLs)](/docs/advanced-data-layouts/)
currently requires explicit configuration in order to operate.

There are several reasons for this, ranging from the merely practical to the deeply principled.
To make ADLs which we could automatically load and run without explicit configuration requires addressing many challenges.
Some of these include:

- A portable interpreter is necessary.
	- ... and all the language parsers, development environment, standard library, additional docs efforts, long-term maintenance commitments, etc, that this implies.
	- ... whether this is done by a "bytecode" or by interpretation of the source language itself, that format would need to be long-term supported.
	- ... and that interpreter needs to be written (and ideally, fast) in any IPLD library in any language (which raises cost-to-implement-IPLD-in-a-new-language significantly).
- A budgetable runtime is necessary.
	- There are several facets to this requirement:
		- The cost of the execution time must be practically limitable in implementations;
		- The cost of execution time must be *predictable* in advance (a hard stop from a gas limit is not a pleasant user experience);
		- Someone building an application that uses an IPLD library must have a reasonable way to describe budget limits.
- Understanding the consent user story is necessary.
	- The way user consent may interact with resource budgets may vary based on user story.
	- Presumptive consent may not be valid in all scenarios.

TODO connect this to some of the relevant exploration reports in the area; also to the (somewhat simpler) Signalling Problem.
