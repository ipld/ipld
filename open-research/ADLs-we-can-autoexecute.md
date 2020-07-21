Open Research Question: ADLs we can auto-execute?
=================================================

The use of [Adavanced Data Layouts (ADLs)](/components/advanced-data-layouts.md) currently requires explicit configuration in order to operate.

There are several reasons for this, ranging from the merely practical to the deeply principled.
To make ADLs which we could automatically load and run without explicit configuration and presumptively default to consent:

- A portable interpreter is necessary.
	- ... and all the language parsers, development environment, standard library, additional docs efforts, long-term maintenance commitments, etc, that this implies.
	- ... whether this is done by a "bytecode" or by interpretation of the source language itself, that format would need to be long-term supported.
	- ... and that interpreter needs to be written (and ideally, fast) in any IPLD library in any language (which raises cost-to-implement-IPLD-in-a-new-language significantly).
- A budgetable runtime is necessary.
	- There are several facets to this requirement:
		- The cost of the execution time must be practically limitable in implementations;
		- The cost of execution time must be *predictable* in advance (a hard stop from a gas limit is not a pleasant user experience);
		- Someone building an application that uses an IPLD library must have a reasonable way to describe budget limits.
