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

	// Get our list of external files
	let config = await fs.readdir(path.join(__dirname, "../config/")).catch(e => {
		console.error(e);
		process.exit(1);
	});
	// Filter out all but JSON files
	config = config.filter(c => c.includes(".json"));

	// Read all the JSON files
	const files = await Promise.all(
		config.map(c => {
			return fs
				.readFile(path.join(__dirname, "../config/", c), "utf-8")
				.catch(e => {
					console.error(e);
					process.exit(1);
				})
				.then(JSON.parse);
		})
	);

	// Create a data object with `filename: data`
	const props = config.reduce((acc, curr, index) => {
		acc[curr.replace(".json", "")] = files[index];
		return acc;
	}, {});

	// Render out the HTML
	const { html } = App.render({ ...props });

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
