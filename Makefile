install:
	npm ci

build:
	rm -rf public
	mkdir -p public
	npm run static
	npm run svg
	MODE="production" node ./src/functions/ssr.js
	npm run build

preview:
	rm -rf public
	mkdir -p public
	npm run static
	npm run svg
	MODE="dev" node ./src/functions/ssr.js
	npm run build