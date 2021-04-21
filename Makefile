all: prepare build test

prepare:
	@echo ">>> $@ >>>"
	cd .site && npm install --save-dev @11ty/eleventy markdown-it-anchor @11ty/eleventy-navigation

build:
	@echo ">>> $@ >>>"
	cd .site && npx @11ty/eleventy

dev:
	@echo ">>> $@ >>>"
	cd .site && npx @11ty/eleventy --serve

test:
	@echo ">>> $@ >>>"
	hyperlink .site/_output --check-anchors --sources=.

clean:
	@echo ">>> $@ >>>"
	rm -rf .site/_output

publish: build
	@echo ">>> $@ >>>"
	echo "todo"
