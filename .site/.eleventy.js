module.exports = function(eleventyConfig) {
	const markdownIt = require("markdown-it");
	const markdownItAnchor = require("markdown-it-anchor");
	const markdownItContainer = require('markdown-it-container');
	const markdownItContainerCfg = function(style) {
		return {
			render: function (tokens, idx, _options, env, slf) {
				if (tokens[idx].nesting === 1) {
					tokens[idx].attrJoin('class', 'callout');
					tokens[idx].attrJoin('class', 'callout-'+style);
				}
				return slf.renderToken(tokens, idx, _options, env, slf);
			}
		}
	}
	let slugify = (s) => s // Slugs should not contain URI-encoded characters (which is the default); just get rid of them.
		.trim()
		.toLowerCase()
		.replace(/[\s+~\/\^]/g, "-")
		.replace(/[().`,%·'"!?¿:@*]/g, "")
	let markdownLibrary = markdownIt({
		html: true,
		linkify: true,
	})
	.use(markdownItAnchor, {
		permalink: true, // Generate an anchor pointing back to self, for human ease in grabbing links to sections.
		permalinkSymbol: "", // Preferable to do this with empty string, and add a visual character in CSS, because the anchor tag is placed inside the hN tag.
		permalinkSpace: false, // Again, please don't add actual text to the inside of the hN tag.
		permalinkBefore: true,
		level: [2, 3, 4, 5, 6], // h1 tags are for page titles, and are generally not useful to jump to, so don't bother making anchors for those.
		slugify: slugify,
	})
	.use(require('markdown-it-footnote'))
	.use(require('markdown-it-mark'))
	.use(require('markdown-it-table-of-contents'), {
		includeLevel: [2, 3],
		slugify: slugify,
		format: function(heading) {
			return removeExtraText(heading);
		},
		transformLink: function(link) {
			// remove backticks from markdown code
			return link.replace(/\%60/g, "");
		}
	})
	.use(markdownItContainer, 'warn', markdownItContainerCfg('warn'))
	.use(markdownItContainer, 'info', markdownItContainerCfg('info'))
	.use(markdownItContainer, 'todo', markdownItContainerCfg('todo'));
	eleventyConfig.setLibrary("md", markdownLibrary);

	// Configure the njk processor a bit, to let us have a directory of includes.
	let nunjucks = require("nunjucks");
	let nunjucksEnvironment = new nunjucks.Environment(
		new nunjucks.FileSystemLoader("_includes")
	);
	eleventyConfig.setLibrary("njk", nunjucksEnvironment);

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
	//  And pngs.
	eleventyConfig.addPassthroughCopy("../**/*.png")
	//  And json and ipldsch and taf files, which appear in fixtures and specs as reference.
	eleventyConfig.addPassthroughCopy("../specs/**/*.json")
	eleventyConfig.addPassthroughCopy("../specs/**/*.taf")
	eleventyConfig.addPassthroughCopy("../specs/**/*.ipldsch")

	// Introduce some shortcodes used for frequently recurrent stylistic elements.
	//  A "callout" is a box of highlighted, slightly in-set text.  Styles that cause distinct coloration include "info", "warn", "todo".
	//   Use them in nunjucks like this: `{% callout "info" %}foobar{% endcallout %}`.
	//   The same thing can be done much more tersely with `:::info\nfoobar\n:::\n`., which works via markdwon-it-container instead.
	eleventyConfig.addPairedShortcode("callout", function(content, style = "info", format = "md") {
		if (format === "md") {
			content = markdownLibrary.render(content);
		}
		return `<div class="callout callout-${style}">${content}</div>`;
	});

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
