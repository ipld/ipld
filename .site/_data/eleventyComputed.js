const { dirname } = require('path')

module.exports = {
  eleventyNavigation: {
    key: ({ page }) => page.url === '/' ? undefined : page.url,
    parent: ({ page }) => {
      const val = `${dirname(page.url)}/`
      return val === '//' ? undefined : val
    },
    title: ({ navTitle, title, page }) => navTitle || title || page.fileSlig
  }
}
