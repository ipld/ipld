---
title: "About the Specifications"
weight: 1
description: "A quick overview of specs vs docs, how we approach specs, what to expect here, how to improve it, etc."
---

## Specs vs Docs

This part of the IPLD website is focused on _specifications_ -- the nitty-gritty details of things --
rather than documentation -- which deals more with high-level introductions about how things fit together and what they're meant for.

There's a separate part of the site for [documentation](/docs/).

Many pages in the specs chapters have a link back to a corresponding docs chapter
which gives a less formal introduction to the same material,
and many docs chapters have a link which points to these specs pages for details and fixture data.

## Fixtures

The IPLD specifications lean heavily towards fixtures.

Fixture data shows what concrete examples of what data a system works on,
and can show how the system should see and process that data.
Good fixtures are both documentation,
as well as literal test cases that an implementation can use to verify its correctness -- and compatibility.

Look for a directory called "fixtures" within almost any of the specs for any of the IPLD subsystems.
You should find plenty of useful data there!

### Fixture formats

Fixture data will generally be found in one of two forms:

- For really large fixtures: whole files (often, CAR files) may be used.
- For everything else: [testmark](https://github.com/warpfork/go-testmark#what-is-the-testmark-format).

Both of these formats are intended to be easy to machine-read,
so that you can [use the specifications in tests](#using-the-specifications-in-tests)!

## Using the Specifications in Tests

Because of our emphasis on fixtures, and [fixture formats](#fixture-formats) that are easy to parse mechanically,
it's a great idea to use the specs directly in the test suites of your IPLD implementation.

You can do this however you want.
One option is to just copy the relevant information into your implementation repo.

However, we do suggest something a little more friendly to automatic updating
and ensuring your system stays in sync with any developments to the specification.
One option is to write some sort of script that can re-copy the latest files
from this website (or its [source repo](#source)).
Another option is to use git submodules
(you can see an example of [how we did this in go-ipld-prime](https://github.com/ipld/go-ipld-prime/blob/master/.gitmodules)).

## Improving the Specifications

Contributions are welcome!
We do our best to make the specs and documentation as accessible as possible,
and contain as much information as we can.
In order to make things the best they can be, we'd love your help if you see ways to improve.

### Source

The source repository for this content is https://github.com/ipld/ipld/ .

We do use both Github Issues and accept Pull Requests!

You can also find the maintainers, other contributors, and community online
in the places detailed in the [Finding Community](/docs/intro/community/) page.

### Contribute Fixtures

Please, contribute [fixtures](#fixtures)!

Additional fixture data for existing specs is always welcome.

If you found a corner case of a system, and you weren't sure how it should work?
Please, suggest a fixture!

If working on new specifications and developing new systems:
include as much fixture data as you can, right from the start!

New specifications, or updates to existing specification to add new features,
are not likely to be accepted if they don't include fixture data.
Fixtures are how we ensure compatibility between all IPLD implementations
(and as a bonus, they're often nicer to review than the implementation code),
so -- just like software projects often reject contributions that don't come with tests,
similarly, specs contributions that are missing fixtures may also be rejected, for the same reasons!
