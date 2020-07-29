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
  base: '/docs',
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
      { title: 'Thinking in Data Structures',
        path: '/tutorials/thinking'
      },
      { title: 'Getting Started',
        path: '/',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          ['getting-started/js', 'JavaScript' ],
          ['getting-started/go', 'Go' ],
          ['getting-started/rust', 'Rust' ]
        ]
      },
      { title: 'IPLD Schemas',
        collapsable: false,
        path: '/schemas/',
        sidebarDepth: 2,
        children: [
          ['schemas/goals', 'Goals'],
          ['schemas/feature-summary', 'Feature Summary'],
          ['schemas/introduction', 'Introduction'],
          ['schemas/authoring-guide', 'Authoring Guide'],
          'schemas/links',
          'schemas/schema-kinds',
          ['schemas/representations', 'Representations'],
          ['schemas/advanced-layouts', 'Advanced Layouts']
        ]
      }
    ]
  },
  extendMarkdown: md => {
    // use more markdown-it plugins!
    md.use(linkfix)
  }
}
