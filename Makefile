help:
	@echo "Makefile for ipld.io website"
	@echo ""
	@echo "Usage:"
	@echo "  make deps             Makes sure you have dependencies installed"
	@echo "  make build            Builds a one-time build of the website"
	@echo "  make dev              Starts development server on port 1313"
	@echo "  make publish          Builds and publishes the website to ipld.io"
build-dep:
	@which hugo > /dev/null || (echo "You need to install hugo to build this website. See https://gohugo.io/" && exit 1)
publish-dep:
	@which ipfs > /dev/null || (echo "You need to install ipfs to publish this website. See https://ipfs.io/" && exit 1)
	@which dnslink-deploy > /dev/null || (echo "You need to install dnslink-deploy to publish this website. See https://github.com/ipfs/dnslink-deploy" && exit 1)
build: build-dep
	@echo "## Doing a one-time build of the website"
	@hugo
dev:
	@echo "## Starts development server on port :1313"
	@hugo server
publish: build-dep publish-dep build
	@echo "## Building & publishing website"
	@ipfs add -rq public | tail -n 1 > published-version

.PHONY: help deps build dev publish
