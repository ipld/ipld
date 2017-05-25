# The ipld.io website

> the data model of the content-addressable web.

A static site to show you that IPLD is a thing, and a good one at that.

![https://cloud.githubusercontent.com/assets/58871/26447582/074ed6cc-4141-11e7-9d4d-a28a58597772.gif]

This project builds out a static site ready for deployment on ipfs. It uses `hugo` to glue the html together.

This is an exercise in progressive enhancement. The most important thing is the words and links contained in it. The content is available to browsers without JS availble, and the animations are all done in CSS.

## Getting started

- Install `hugo`. (`brew install hugo` on OSX)
- From the root of the project run the hot-reloading dev-server

```sh
hugo server -ws .
```

Open http://localhost:1313 in your browser & `content/index.html` in your editor.

For convinence, the following npm scripts are available:

- `npm start` - fire up the hugo dev server _(requires `hugo` on your `PATH`)_
- `npm run deploy` - build the site in the `public` dir and add to `ipfs` _(requires `hugo` & `ipfs` on your `PATH`)_
