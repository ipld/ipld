all: prepare build test

prepare:
	@echo ">>> $@ >>>"
	cd .site && npm install --save-dev @11ty/eleventy markdown-it-anchor

build:
	@echo ">>> $@ >>>"
	cd .site && npx @11ty/eleventy --input=.. --output=_output

dev:
	@echo ">>> $@ >>>"
	cd .site && npx @11ty/eleventy --input=.. --output=_output --serve

test:
	@echo ">>> $@ >>>"
	hyperlink .site/_output --check-anchors --sources=.

clean:
	@echo ">>> $@ >>>"
	rm -rf .site/_output

publish: build
	@echo ">>> $@ >>>"
	echo "todo"
