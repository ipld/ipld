help:
	@echo "Makefile for ipld.io website"
	@echo ""
	@echo "Usage:"
	@echo "  make deps             Makes sure you have dependencies installed"
	@echo "  make build            Builds a one-time build of the website"
	@echo "  make dev              Starts development server on port 1313"
	@echo "  make publish          Builds and publishes the website to ipld.io"
build-dep:
	@which websiter > /dev/null || (echo "You need to install ipfs/websiter to build this website. See https://github.com/ipfs/websiter" && exit 1)
	@websiter build-dep
publish-dep:
	@which websiter > /dev/null || (echo "You need to install ipfs/websiter to build this website. See https://github.com/ipfs/websiter" && exit 1)
	@websiter publish-dep
build: build-dep
	@websiter build
dev: build-dep
	@websiter dev
publish: build-dep publish-dep build
	@websiter publish

.PHONY: help deps build dev publish
