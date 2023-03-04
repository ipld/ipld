// Set a global layout by using the current file's name to set the `layout` property.
// This is a workaround from https://github.com/11ty/eleventy/issues/380#issuecomment-568033456 ;
// it's likely that a future version of eleventy might let us do this in a somewhat less kludgey way.
//
// The preference for njk (rather than, say, liquid) is fairly strong here,
// because njk templates support macros, and liquid's developers appear to be resolutely opposed to any kind of recursion.
// A small dose of recursion is used in our nav menu creation, so, a templating engine without it is nonviable.
module.exports = 'main.njk'
