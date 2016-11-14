# IPLD - Website


[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)


> The ipld.io website

This repository contains the source code for the IPLD website available at http://ipld.io

## Install

## Commands

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

## Contribute

Please do! Check out the issues, or open a PR!

Note that this README follows the Standard-Readme protocol.

## License

MIT © Protocol Labs Inc.

