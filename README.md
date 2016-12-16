# website

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-IPLD-blue.svg?style=flat-square)](http://github.com/ipld/ipld)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Official website for IPLD http://ipld.io

This repository contains the source code for the IPLD website available at http://ipld.io

## Install

```sh
git clone https://github.com/ipld/website
```

## Usage

The following commands are available:

### `make deps`

Makes sure you have the right dependencies installed, otherwise prints them out

### `make build`

Builds a full, static copy of the website and puts it in the `public/` directory

### `make dev`

Builds the website in memory and starts a development server listening on :1313

### `make publish`

Builds the websites, adds it to IPFS and updates DNS of ipld.io to point to the new hash

## Dependencies

* `hugo` to build website
* `ipfs` to deploy changes
* `dnslink-deploy` to deploy changes

## Maintainers

[@victorbjelkholm](https://github.com/victorbjelkholm)

## Contribute

Please do! Check out [the issues](https://github.com/ipld/website/issues), or open a PR!

Check out our [contributing document](https://github.com/ipld/ipld/blob/master/contributing.md) for more information on how we work, and about contributing in general. Please be aware that all interactions related to IPLD are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT](LICENSE) © 2016 Protocol Labs Inc.

