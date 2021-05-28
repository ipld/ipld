IPLD
====

Welcome!

This repository is the entrypoint to the IPLD project:
documentation, specifications, the website, and a great deal of the design work all live here.

**The website published from this repo is online at https://ipld.io/ ** --
you'll probably wish to read it there, rather than see the source form here, unless you're aiming to contribute patches.

IPLD stands for "**I**nter**P**lanetary **L**inked **D**ata,
and is a series of standards and formats for describing data in a content-addressing-emphatic way.
The people who work on IPLD do so because we want a world where it's easy to build decentralized, distributed, and inter-operable applications,
and we believe robust data formats and a clear story for content-addressing them is a key piece of leverage towards that goal.


Finding Us
----------

- For chats with the developers and the community: Join us in any of these (bridged) locations:
	- On Matrix: https://matrix.to/#/#ipld:ipfs.io
	- On Discord: join the larger IPFS community at https://discord.gg/FsBu3XdjKP, then find an `#ipld` channel within!
	- On IRC: (bridge coming soon) (note that we no longer use the freenode network!)
- On Github:
	- Check out all our repos in the https://github.com/ipld/ organization.
	- Github issues can be used for discussing designs, documenting user needs, and submitting bug reports.
	- Git patches and Github pull requests are welcome!  (Although discussing changes via issues or one of the chat venues above first is highly recommended.)

The IPLD project has a [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md) (which is shared with the IPFS project).
Collaborators, contributors, and any participants in community spaces are expected to be able to abide by this code.


Docs Development
----------------

With Node.js installed:

* Setup: `npm install`
* Build: `npm run build`
* Serve locally: `npm run serve`
* Test link integrity: `npm test`
* Cleanup: `npm run clean`
* Publish: Push to `master` and Fleek will do the rest


License
-------

SPDX-License-Identifier: Apache-2.0 OR MIT
