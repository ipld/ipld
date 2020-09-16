require('./highlight')

function linkfix (md) {
  const defaultRender = md.renderer.rules.link_open

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const hrefIndex = tokens[idx].attrIndex('href');
    if (hrefIndex > -1) {
      const href = tokens[idx].attrs[hrefIndex][1]
      if (/\.(ipldsch|json)$/.test(href)) {
        tokens[idx].attrs[hrefIndex][1] = `${href}.md`
      }
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}


module.exports = {
  title: 'IPLD Documentation',
  description: 'Documentation for the Inter-planetary Linked Data project',
  plugins: [ 'code-switcher' ],
  themeConfig: {
    repo: 'ipld/docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    nav: [
      { text: 'Home', link: '/' }
    ],
    sidebar: [
      '/',
      '/tutorial',
      '/docs/schemas'
    ]
  },
  extendMarkdown: md => {
    // use more markdown-it plugins!
    md.use(linkfix)
  }
}
