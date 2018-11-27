DOMAIN="ipld.io"

IPFSLOCAL="http://localhost:8080/ipfs/"
IPFSGATEWAY="https://ipfs.io/ipfs/"
NPM=npm
NPMBIN=./node_modules/.bin
OUTPUTDIR=public

ifeq ($(DEBUG), true)
	PREPEND=
	APPEND=
else
	PREPEND=@
	APPEND=1>/dev/null
endif

build: clean install lint css js minify
	$(PREPEND)$(NPMBIN)/hugo && \
	echo "" && \
	echo "Site built out to ./public dir"

help:
	@echo 'Makefile for ipld.io, a hugo built static site.                                                          '
	@echo '                                                                                                          '
	@echo 'Usage:                                                                                                    '
	@echo '   make                                Build the optimised site to ./$(OUTPUTDIR)                         '
	@echo '   make serve                          Preview the production ready site at http://localhost:1313         '
	@echo '   make lint                           Check your JS and CSS are ok                                       '
	@echo '   make js                             Copy the *.js to ./static/js                                 '
	@echo '   make css                            Compile the *.css to ./static/css                                 '
	@echo '   make minify                         Optimise all the things!                                           '
	@echo '   make dev                            Start a hot-reloding dev server on http://localhost:1313           '
	@echo '   make deploy                         Add the website to your local IPFS node                            '
	@echo '   make publish-to-domain              Update $(DOMAIN) DNS record to the ipfs hash from the last deploy  '
	@echo '   make clean                          remove the generated files                                         '
	@echo '                                                                                                          '
	@echo '   DEBUG=true make [command] for increased verbosity                                                      '

serve: install lint js css minify
	$(PREPEND)$(NPMBIN)/hugo server

node_modules:
	$(PREPEND)$(NPM) i $(APPEND)

install: node_modules
	$(PREPEND)[ -d static/css ] || mkdir -p static/css && \
	[ -d static/js ] || mkdir -p static/js

lint: install
	$(PREPEND)$(NPMBIN)/standard layouts && $(NPMBIN)/lessc --lint less/*

css: install
	$(PREPEND)$(NPMBIN)/lessc --clean-css --autoprefix less/main.less static/css/main.css $(APPEND)

js: install
	$(PREPEND)cp -a js/ static/js $(APPEND)

minify: install minify-js minify-img

minify-js: install
	$(PREPEND)find static/js -name '*.js' -exec $(NPMBIN)/uglifyjs {} --compress --output {} $(APPEND) \;

minify-img: install
	$(PREPEND)find static/img -type d -exec $(NPMBIN)/imagemin {}/* --out-dir={} $(APPEND) \;

dev: install css js
	$(PREPEND)( \
		$(NPMBIN)/nodemon --watch css --exec "$(NPMBIN)/lessc --clean-css --autoprefix less/main.less static/css/main.css" & \
		$(NPMBIN)/hugo server -w \
	)

deploy:
	$(PREPEND)ipfs swarm peers >/dev/null || (echo "ipfs daemon must be online to publish" && exit 1)
	ipfs add -r -q $(OUTPUTDIR) | tail -n1 >versions/current
	cat versions/current >>versions/history
	@export hash=`cat versions/current`; \
		echo ""; \
		echo "published website:"; \
		echo "- $(IPFSLOCAL)$$hash"; \
		echo "- $(IPFSGATEWAY)$$hash"; \
		echo ""; \
		echo "next steps:"; \
		echo "- ipfs pin add -r /ipfs/$$hash"; \
		echo "- make publish-to-domain"; \

publish-to-domain: versions/current
	DNSSIMPLE_TOKEN="$(shell if [ -f auth.token ]; then cat auth.token; else cat $$HOME/.protocol/dnsimple.token; fi)"; \
	./dnslink.sh $(DOMAIN) $(shell cat versions/current)

clean:
	$(PREPEND)[ ! -d $(OUTPUTDIR) ] || rm -rf $(OUTPUTDIR) && \
	[ ! -d static/css ] || rm -rf static/css/*.css && \
	[ ! -d static/js ] || rm -rf static/js/*.js

.PHONY: build help install lint css js minify minify-js minify-img  dev stopdev deploy publish-to-domain clean
