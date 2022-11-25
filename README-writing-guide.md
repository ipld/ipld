# Writing Guide

This document is a brief writing guide for contributing to the IPLD project's docs, specs, and website.
Please give it a quick skim when considering proposing new content.

## Which Major Group?

This repo has a couple major directories at the top level:

- **docs**
- **specs**
- **libraries**
- **tools**
- **design**
- **notebook**

These have slightly different audiences, and slightly different editing policies:

- **docs** -- end-user documentation goes here; these documents generally emphasize readability over detail.
  Things in the docs folders should link to the specs folders when more detail is needed.
  The docs folders are rendered to the website.
- **specs** -- high-detail specifications go here.  These are more for library and tool implementers than end-users of IPLD systems.
  The writing style should be drier (it need not be convincing or friendly; that's for the docs folder).
  The specs folders are rendered to the website.
- **libraries** -- these pages gather *brief* references to IPLD libraries.  They should mostly refer to other repositories; it's just a discovery index.
  Some of these pages will refer to libraries not directly maintained by the IPLD core team!
  The libraries index pages are rendered to the website.
- **tools** -- these pages gather *brief references to IPLD tools.  They should mostly refer to other repositories; it's just a discovery index.
  Some of these pages will refer to tools not directly maintained by the IPLD core team!
  The tools index pages are rendered to the website.
- **design** -- these pages contain some recommendations for building IPLD libraries and data structures.
  They're general notes about how things "should" be done.
  Some of these notes also cover the foundational reasoning we used in making key choices in IPLD's core definitions.
- **notebook** -- this folder is for notes like design documents, architecture decision records, and similar point-in-time content.
  Sometimes the IPLD core team writes documents here, but it's equally encouraged to write "lab notebook"-style documents in other mediums and link to them from here.
  Things here are non-definitive references.
  Note that the design notebook pages are *not* rendered to the website.
  We consider them more like draft and historical interest content, and so give them correspondingly much less spotlight.

If writing new content, consider which group to aim for.

- If you're working on a third-party IPLD tool or library, we're happy to list it under the tools and libraries pages!
- If you'd like to log a link to an experience report, writing somewhere else and then making a PR to the notebook pages with a link might be the right thing to do.
- For any major content: first drafts should very likely go through some sort of notebook process.
  (Please don't make PRs to the specs folders directly; anything bigger than a typo fix is very unlikely to be able to land directly.  Use the notebook instead!)
- If it's for end-user information, a PR to docs might be appropriate.
- If you're thinking of a specs proposal: goto two bullet points above :)

## File Organization

### READMEs are for github

We use `README.md` files in some directories to provide information about editing this area.

We don't render `README.md` files to the website,
so they're a reasonable place to put editing guideline information,
or other content that's appropriate to a git/github audience but not relevant folks reading the website.

### how files render to web

Files named `index.*` (in particular, `index.md`) are rendered to the website.
So, content in the path `foo/bar/index.md` will render on the website at `foo/bar/`.

Other files also render to the website, but have their filename turn into a bare directory (because extensions on URLs is so not-this-year):
so, content in the path `foo/bar.md` would also render on the website at `foo/bar/`.

Therefore, if you have a "large" page, with lots of content and images related to it, consider putting it in its own directory
and putting most of the content in an `index.md` file.

`index.md` that have other pages underneath them (either sibling `*.md` files, or whole directories of content)
should probably aim to have minimal amounts of content themselves, and just provide a quick overview and table of links to the child content.
