<div align="center">
<img align="center" src="static/img/ipld-logo.png" width="215">
<h1> IPLD Knowledge Hub <h1>
</div>

<!-- TOC -->
- [Overview](#overview)
- [Running locally](#running-locally)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration guide](#configuration-guide)
  - [Static site generator](#static-site-generator)
  - [Automated deployments](#automated-deployments)
  - [Translation](#translation)
- [Finding Us](#finding-us)
- [License](#license)
<!-- /TOC -->

---

## Overview

Welcome!

This repository is the entrypoint to the IPLD project: documentation, specifications, the website, and a great deal of the design work all live here.

**The website published from this repo is online at https://ipld.io/ ** -- you'll probably wish to read it there, rather than see the source form here, unless you're aiming to contribute patches.

IPLD stands for "InterPlanetary Linked Data, and is a series of standards and formats for describing data in a content-addressing-emphatic way. The people who work on IPLD do so because we want a world where it's easy to build decentralized, distributed, and inter-operable applications, and we believe robust data formats and a clear story for content-addressing them is a key piece of leverage towards that goal.

## Running locally

### Prerequisites

To run the IPLD documentation site locally, you must have
[NPM installed](https://www.npmjs.com/).
If you already have NPM installed, make sure you are running the latest version:

```shell
npm install npm@latest -g
```

### Installation

Follow these steps to run a copy of this site on your local machine.

1. Clone this repository:

    ```shell
    git clone https://github.com/ipld/ipld
    ```

1. Navigate into the new folder and download the dependencies by running:

    ```shell
    cd docs
    npm install
    ```

2. Build the project and serve the static files to Hugo with:

    ```shell
    npm run build
    ```

3. Start the local Hugo's development server with:

    ```shell
    npm start
    ```

4. Visit [localhost:1313](http://localhost:1313) to view the site.
5. Press `CTRL` + `c` in the terminal to stop the local server.

## Configuration guide

### Static site generator

The IPLD documentation site uses [Hugo](https://gohugo.io/) as a static site generator,
making it easy to serve and host the static files on IPFS. In particular, the site uses
the [Hugo Doks theme](https://github.com/h-enk/doks) to present the IPLD documentation
and reference material.

### Automated deployments

When opening a pull request, CI scripts will run against your feature branch to test your changes.

The CI/CD production workflow builds on the `master` branch and deploys the documentation site on [fleek](https://fleek.co/).
It reflects the latest commit on `master` and publishes at [https://ipld.io/docs/](https://ipld.io/docs/).

### Translation

Please stay tuned for the steps to translate the documentation.

## Finding Us

- For chats with the developers and the community: Join us in any of these (bridged) locations:
    - On Discord: join the [IPLD community on IPFS Discord](https://discord.gg/xkUC8bqSCP).
    - On Matrix: [#ipld:ipfs.io](https://matrix.to/#/#ipld:ipfs.io)
- On Github:
	- Check out all our repos in the https://github.com/ipld/ organization.
	- Github issues can be used for discussing designs, documenting user needs, and submitting bug reports.
	- Git patches and Github pull requests are welcome!  (Although discussing changes via issues or one of the chat venues above first is highly recommended.)

The IPLD project has a [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md) (which is shared with the IPFS project).
Collaborators, contributors, and any participants in community spaces are expected to be able to abide by this code.

## License

All software code is copyright (c) Protocol Labs, Inc. under the **MIT/Apache-2 dual license**.
Other written documentation and content are copyright (c) Protocol Labs, Inc. under the
[**Creative Commons Attribution-Share-Alike License**](https://creativecommons.org/licenses/by/4.0/).
