module.exports = function(eleventyConfig) {
	const markdownIt = require("markdown-it");
	const markdownItAnchor = require("markdown-it-anchor");
	let markdownLibrary = markdownIt({
		html: true,
	}).use(markdownItAnchor, {
		permalink: true, // Generate an anchor pointing back to self, for human ease in grabbing links to sections.
		permalinkSymbol: "", // Preferable to do this with empty string, and add a visual character in CSS, because the anchor tag is placed inside the hN tag.
		permalinkSpace: false, // Again, please don't add actual text to the inside of the hN tag.
		permalinkBefore: true,
		level: [2, 3, 4, 5, 6] // h1 tags are for page titles, and are generally not useful to jump to, so don't bother making anchors for those.
	});
	eleventyConfig.setLibrary("md", markdownLibrary);

	// This navigation plugin consumes frontmatter from each page,
	//  and gathers that info into a form that we use to build the nav menu.
	const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
	eleventyConfig.addPlugin(eleventyNavigationPlugin);

	// Make some functions available as filters.
	//  In particular, some of the path manipulation ones are used to create breadcrumbs and other navigation elements.
	eleventyConfig.addFilter("dirname", require('path').dirname)
	eleventyConfig.addFilter("basename", require('path').basename)
	//  And one that's a simple dummy to make sure assets like CSS aren't cached beyond reason.
	//   (This approach is a bit dumb, and will bust caches more than necessary, but is much simpler to implement than content hashing.)
	const buildtime = new Date().getTime()
	eleventyConfig.addFilter("cachebuster", () => { return buildtime })

	// Copy over static files (like css) please.
	//  (Note this is not affected by the 'input' config below; it's relative to this config file's dir.)
	eleventyConfig.addPassthroughCopy({"static": "static"})

	return {
		dir: {
			// The input directory is set to ".." so that we achieve these two file organization goals:
			//  1. all of the infrastructure for eleventy is in a single directory, keeping the project root tidy;
			//  2. all of the actual content is at the project repo root (meaning paths on github and in the web also "happen" to align).
			input:   "..",
			output:  "_output",
			// These reiterate ".site" because they're joined to the input path, which is "..".
			data:    ".site/_data",
			layouts: ".site/_layouts"
		},
		markdownTemplateEngine: "njk",
	}
}
