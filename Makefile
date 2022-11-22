install:
	npm ci

build:
	rm -rf public
	mkdir -p public
	npm run static
	npm run svg
	node ./src/functions/ssr.js
	npm run build