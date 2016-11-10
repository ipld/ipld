help:
	@echo "Makefile for ipld.io website"
	@echo ""
	@echo "Usage:"
	@echo "  make deps             Makes sure you have dependencies installed"
	@echo "  make build            Builds a one-time build of the website"
	@echo "  make dev              Starts development server on port 1313"
	@echo "  make publish          Builds and publishes the website to ipld.io"
deps:
	which hughgo > /dev/null
build: deps
	@echo "Doing a one-time build of the website"
dev:
	@echo "Starts development server"
publish: deps build
	@echo "Building & publishing website"

.PHONY: help deps build dev publish
