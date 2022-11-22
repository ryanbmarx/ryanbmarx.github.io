#!/usr/bin/env node
require = require("esm")(module);
require("svelte/register");
const fs = require("fs/promises");
const path = require("path");
const App = require("../App.svelte").default;
const minify = require("html-minifier").minify;

// One function to render all of the HTML we would want for an initial state.
// It's good for both SSR and preview rendering
async function renderHTML(content = {}) {
	// Get our HTML rendered in the roadblocked state
	// If it is set to no CPS, then true, otherwise, not.
	const { html } = App.render(content);

	const sprite = await fs.readFile(path.resolve(__dirname, "./sprite.svg"), "utf-8");

	return minify(
		`<div style="display:none;">${sprite}</div><div id="app" class="app">${html}</div>`,
		{
			minifyCSS: true,
			minifyJS: true,
			collapseWhitespace: true,
		}
	);
}

async function preview() {
	const [template, content] = await Promise.all([
		fs.readFile(path.resolve(__dirname, "./index.template.html"), "utf-8"),
	]);

	const rendered = template.replace("{{HTML}}", await renderHTML());

	return fs.writeFile(path.resolve(__dirname, "../../index.html"), rendered, "utf-8");
}

if (require.main === module) {
	preview().catch(console.error);
}