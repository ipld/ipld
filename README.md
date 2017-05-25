# IPLD website

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-IPLD-blue.svg?style=flat-square)](http://github.com/ipld/ipld)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

![ipld logo animation](https://cloud.githubusercontent.com/assets/58871/26447582/074ed6cc-4141-11e7-9d4d-a28a58597772.gif)

> Official website for IPLD http://ipld.io

This repository contains the source code for the IPLD website available at http://ipld.io

This project builds out a static site to explain IPLD, ready for deployment on ipfs. It uses `hugo` to glue the html together. It provides an informative, public-facing website. The most important things are the words, concepts and links it presents.

The implementation aims to progressively enhance the content. The styling is done with [tachyons](http://tachyons.io/) to keep things light. The animations are done in SVG and CSS. There is very little JavaScript and the interactive elements that use JS should degrade gracefully on browsers without it.

## Install

```sh
git clone https://github.com/ipld/website
```

## Usage

The following commands are available:

### `npm start`

Start up the hugo dev server on http://localhost:1313 _(requires `hugo` on your `PATH`)_

### `npm run deploy`

Build the site in the `public` dir and add to `ipfs` _(requires `hugo` & `ipfs` on your `PATH`)_

## Dependencies

* `hugo` to build website
* `ipfs` to deploy changes
* `dnslink-deploy` to deploy changes

## Contribute

Please do! Check out [the issues](https://github.com/ipld/website/issues), or open a PR!

Check out our [contributing document](https://github.com/ipld/ipld/blob/master/contributing.md) for more information on how we work, and about contributing in general. Please be aware that all interactions related to IPLD are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT](LICENSE) © 2016 Protocol Labs Inc.
