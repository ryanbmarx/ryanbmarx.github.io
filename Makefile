install:
	npm ci

build:
	npm run static
	npm run svg
	node ./src/functions/ssr.js
	npm run build