all: prepare build test

prepare:
	@echo ">>> $@ >>>"
	npm install

build:
	@echo ">>> $@ >>>"
	npm run build

schema-schema:
	@echo ">>> $@ >>>"
	npm run build:schema-schema

dev:
	@echo ">>> $@ >>>"
	npm run dev

test:
	@echo ">>> $@ >>>"
	npm test

clean:
	@echo ">>> $@ >>>"
	npm run clean

publish: build
	@echo ">>> $@ >>>"
	npm run publish
