#!/usr/bin/env node
require = require("esm")(module);
require("svelte/register");
const fs = require("fs/promises");
const path = require("path");
const App = require("../App.svelte").default;
const minify = require("html-minifier").minify;

// Default to prod
const { MODE = "production" } = process.env;

// One function to render all of the HTML we would want for an initial state.
// It's good for both SSR and preview rendering
async function renderHTML(content = {}) {
	console.log("RENDERING FOR", MODE);
	// Get our HTML rendered in the roadblocked state
	// If it is set to no CPS, then true, otherwise, not.
	const { html } = App.render(content);

	const sprite = await fs.readFile(path.resolve(__dirname, "./sprite.svg"), "utf-8");

	let HTML = minify(
		`<div style="display:none;">${sprite}</div>
		<main id="app" class="app">${html}</main>`,
		{
			minifyCSS: true,
			minifyJS: true,
			collapseWhitespace: true,
		}
	);

	if (MODE === "dev") HTML += `<script defer src="bundle.js"></script>`;
	return HTML;
}

async function preview() {
	const [template, content] = await Promise.all([
		fs.readFile(path.resolve(__dirname, "./index.template.html"), "utf-8"),
	]);

	const rendered = template.replace("{{HTML}}", await renderHTML());

	return fs.writeFile(
		path.resolve(__dirname, "../../public/index.html"),
		rendered,
		"utf-8"
	);
}

if (require.main === module) {
	preview().catch(console.error);
}
