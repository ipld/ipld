module.exports = {
	eleventyNavigation: {
		key: data => {
			if (data.page.url == "/") { return undefined }
			return data.page.url
		},
		parent: data => {
			val = require('path').dirname(data.page.url)+"/"
			if (val == "//") { return undefined }
			return val
		},
		title: data => {
			if (data.navTitle) { return data.navTitle }
			if (data.title) { return data.title }
			return data.page.fileSlug
		}
	}
}
