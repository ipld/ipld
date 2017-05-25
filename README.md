![ipld logo animation](https://cloud.githubusercontent.com/assets/58871/26447582/074ed6cc-4141-11e7-9d4d-a28a58597772.gif)

> IPLD is the data model of the content-addressable web.

This project builds out a static site to explain IPLD, ready for deployment on ipfs. It uses `hugo` to glue the html together.

It provides an informative, public-facing website. The most important things are the words, concepts and links it presents.

The implementation is an exercise in progressive-enhancement. The animations are done in SVG and CSS, there is very little JavaScript and the interactive elements that use JS should degrade gracefully on browsers without it.

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
