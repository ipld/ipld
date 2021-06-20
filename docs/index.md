---
title: "Docs"
eleventyNavigation:
  order: 10
---

IPLD
====

Welcome to the internet of data structures!

IPLD stands for **I**nter**P**lanetary **L**inked **D**ata.

IPLD is an ecosystem of formats and data structures for building applications
that can be fully decentralized.

The goal of IPLD is to enable decentralized data structures that are universally addressable and linkable,
which in turn will enable more decentralized applications.
These addressable and linkable data structures will allow us to do for data what URLs and links did for HTML web pages.

We say IPLD is an ecosystem, rather than a project or a library,
because this ecosystem is held together by a few concepts and
standards that ensure compatibility between formats and programming languages.

You'll find numerous libraries for working with IPLD.
You may even create a few of your own.
That library is part of the IPLD ecosystem and you're now a part of its community.
You don't need to be a committer in a repository in the IPLD GitHub org to be a part of this community;
you're already almost there just by reading this far.


Navigating this Site
---------------------

We've broken down the information into several major categories:


| | | |
|-------------------------:|---|--|
| [Docs](/docs/)           | - | human readable stuff.  Guides, tutorials, and practical information.
| [Specs](/specs/)         | - | the nitty-gritty.  Detailed mechanical information, test fixtures, etc.
| [Libraries](/libraries/) | - | information about IPLD libraries (that we know about!), and tips on design patterns for making more.
| [Design](/design/)       | - | information on _why_ IPLD is the way it is -- the goals, the vision, and how we got here.
| [Tools](/tools/)         | - | an index of tools for working productively with IPLD.

And a couple more short pages which provide connections:

- [Glossary](/glossary/)
- [Media](/media/)
- [FAQ](/FAQ/)


The following chapters in the Docs section provide human-readable guides to IPLD technology.

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}


The Source
----------

This site and its content is developed in the open.
The source repository can be found on github, at
[github.com/ipld/ipld/](https://github.com/ipld/ipld/tree/2021).
