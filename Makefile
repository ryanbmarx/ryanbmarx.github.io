install:
	npm ci

build:
	npm run publish
	npm run svg
	node ./src/functions/ssr.js
	npm run build