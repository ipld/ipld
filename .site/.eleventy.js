const { dirname, basename } = require('path')
const eleventyNavigation = require('@11ty/eleventy-navigation')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const eleventyPluginSVG = require('eleventy-plugin-svg-contents')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItContainer = require('markdown-it-container')
const markdownItFootnote = require('markdown-it-footnote')
const markdownItMark = require('markdown-it-mark')
const markdownItTOC = require('markdown-it-table-of-contents')
const markdownItReplaceLink = require('markdown-it-replace-link')
const nunjucks = require('nunjucks')
const prismIpldsch = require('./prism-ipldsch')
const loadLanguages = require('prismjs/components/')

loadLanguages(['bash'])


module.exports = function (eleventyConfig) {
  const markdownItContainerCfg = (style) => {
    return {
      render: (tokens, idx, _options, env, slf) => {
        if (tokens[idx].nesting === 1) {
          tokens[idx].attrJoin('class', 'callout')
          tokens[idx].attrJoin('class', 'callout-' + style)
        }
        return slf.renderToken(tokens, idx, _options, env, slf)
      }
    }
  }

  const slugify = (s) => {
    // Slugs should not contain URI-encoded characters (which is the default); just get rid of them.
    return s
      .trim()
      .toLowerCase()
      .replace(/[\s+~/^]/g, '-')
      .replace(/[().`,%·'"!?¿:@*]/g, '')
  }

  // Inspired by https://github.com/11ty/eleventy/issues/1204
  const replaceLocalMdLinks = function(link, env) {
    const matcher = new RegExp('^(\./|\.\./|/)(.*?)(.md)(\#.*?)?$');
    if (matcher.test(link)) {
      // Pages with file name index.md are output at a different level in the
      // directory hierarchy than other pages so we need to fix up relative links
      // in those pages to their siblings so they connect.
      const indexPage = env.page.inputPath.endsWith("/index.md");
      const translatedLink = link.replace(matcher, "$1$2$4");
      return indexPage ? translatedLink : translatedLink.replace(/^\.\/(.*?)/, "../$1")
    } else {
      return link;
    }
  }

  const markdownLibrary = markdownIt({
    html: true,
    linkify: true,
    replaceLink: replaceLocalMdLinks
  })
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(), // See: https://github.com/valeriangalliat/markdown-it-anchor#header-link
      permalinkSymbol: '', // Preferable to do this with empty string, and add a visual character in CSS, because the anchor tag is placed inside the hN tag.
      permalinkSpace: false, // Again, please don't add actual text to the inside of the hN tag.
      permalinkBefore: true,
      level: [2, 3, 4, 5, 6], // h1 tags are for page titles, and are generally not useful to jump to, so don't bother making anchors for those.
      slugify
    })
    .use(markdownItReplaceLink)
    .use(markdownItFootnote)
    .use(markdownItMark)
    .use(markdownItTOC, {
      includeLevel: [2, 3],
      slugify,
      // remove backticks from markdown code
      transformLink: (link) => link.replace(/%60/g, '')
    })
    .use(markdownItContainer, 'warn', markdownItContainerCfg('warn'))
    .use(markdownItContainer, 'info', markdownItContainerCfg('info'))
    .use(markdownItContainer, 'tip', markdownItContainerCfg('tip'))
    .use(markdownItContainer, 'todo', markdownItContainerCfg('todo'))

  eleventyConfig.setLibrary('md', markdownLibrary)

  // Configure the njk processor a bit, to let us have a directory of includes.
  const nunjucksEnvironment = new nunjucks.Environment(
    new nunjucks.FileSystemLoader('_includes')
  )
  eleventyConfig.setLibrary('njk', nunjucksEnvironment)

  // This navigation plugin consumes frontmatter from each page,
  //  and gathers that info into a form that we use to build the nav menu.
  eleventyConfig.addPlugin(eleventyNavigation)

  // Inline svgs into html like `{{ 'path/to/file.svg' | svgContents }}`
  eleventyConfig.addPlugin(eleventyPluginSVG)

  // Syntax highlighting for code blocks
  eleventyConfig.addPlugin(syntaxHighlight, {
    init: ({ Prism }) => {
      Prism.languages.ipldsch = prismIpldsch
      Prism.languages.sh = Prism.languages.bash
    }
  })

  // Make some functions available as filters.
  //  In particular, some of the path manipulation ones are used to create breadcrumbs and other navigation elements.
  eleventyConfig.addFilter('dirname', dirname)
  eleventyConfig.addFilter('basename', basename)

  //  And one that's a simple dummy to make sure assets like CSS aren't cached beyond reason.
  //   (This approach is a bit dumb, and will bust caches more than necessary, but is much simpler to implement than content hashing.)
  const buildtime = new Date().getTime()
  eleventyConfig.addFilter('cachebuster', () => buildtime)

  // Copy over static files (like css) please.
  //  (Note this is not affected by the 'input' config below; it's relative to this config file's dir.)
  eleventyConfig.addPassthroughCopy('css')
  eleventyConfig.addPassthroughCopy('img')
  eleventyConfig.addPassthroughCopy('js')
  eleventyConfig.addPassthroughCopy('favicon.ico')
  //  And pngs.
  eleventyConfig.addPassthroughCopy('../!(_legacy|.site|node_modules)/**/*.png')
  //  And json and ipldsch and taf files, which appear in fixtures and specs as reference.
  eleventyConfig.addPassthroughCopy('../specs/**/*.json')
  eleventyConfig.addPassthroughCopy('../specs/**/*.taf')
  eleventyConfig.addPassthroughCopy('../specs/**/*.ipldsch')
  eleventyConfig.addPassthroughCopy('../specs/**/*.car')
  eleventyConfig.addPassthroughCopy('../specs/**/*.txt')

  // Introduce some shortcodes used for frequently recurrent stylistic elements.
  //  A "callout" is a box of highlighted, slightly in-set text.  Styles that cause distinct coloration include "info", "warn", "todo".
  //   Use them in nunjucks like this: `{% callout "info" %}foobar{% endcallout %}`.
  //   The same thing can be done much more tersely with `:::info\nfoobar\n:::\n`., which works via markdwon-it-container instead.
  eleventyConfig.addPairedShortcode('callout', (content, style = 'info', format = 'md') => {
    if (format === 'md') {
      content = markdownLibrary.render(content)
    }
    return `<div class="callout callout-${style}">${content}</div>`
  })

  eleventyConfig.addShortcode('youtube', ({ id, caption }) => {
    return `
      <figure class="w-100 pa0 ma0" id="active-video" data-youtube-id="${id}">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe class="dib embed-responsive-item bg-dark-gray" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>
        </div>
        <figcaption class="db f5 pt3 ma0 lh-copy" style="font-size:12px; height:59px;">
          ${caption}
        </figcaption>
      </figure>`
  })

  eleventyConfig.addShortcode('youtubePreview', ({ id, caption }) => {
    return `
      <a class="no-underline ipld-gray" target="_blank" href="https://www.youtube.com/watch?v=${id}" data-youtube-switcher data-youtube-id=${id}>
        <figure class="pa0 ma0">
          <img class="w-100" src="https://img.youtube.com/vi/${id}/mqdefault.jpg">
          <figcaption class="db f5 pt3 ma0 lh-copy" style="font-size:12px; height:59px;">
            ${caption}
          </figcaption>
        </figure>
      </a>`
  })

  return {
    dir: {
      // The input directory is set to ".." so that we achieve these two file organization goals:
      //  1. all of the infrastructure for eleventy is in a single directory, keeping the project root tidy;
      //  2. all of the actual content is at the project repo root (meaning paths on github and in the web also "happen" to align).
      input: '../',
      output: '_output',
      // These reiterate ".site" because they're joined to the input path, which is "..".
      data: '.site/_data',
      layouts: '.site/_layouts'
    },
    markdownTemplateEngine: 'njk'
  }
}
