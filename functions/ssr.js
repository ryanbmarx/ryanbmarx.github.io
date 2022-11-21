#!/usr/bin/env node
require = require("esm")(module);
require("svelte/register");
const fs = require("fs/promises");
const path = require("path");
const App = require("../src/App.svelte").default;
const minify = require("html-minifier").minify;

/*
	Assumes these are provided by spreadsheet:
	- Title (and maybe headline)
	- share_image
	- share_description
	- updated (i.e. modified date)
	- published
	- content_protection_state
	- ssts

	Needs a canonical
	Needs a paywall CSS selector
	Needs a includesVideo
	Needs a site_code


	Writes to ./public/uw/{slug}.json

*/
// process.env.PROJECT_SLUG
// const ASSET_PATH = `https://www.gannett-cdn.com/usat-storytelling/storytelling-studio-apps/${TARGET}/${PROJECT_SLUG}/`;

// async function render() {
// 	console.log(`++ Rendering UW response for (${TARGET})`);

// 	const content = await fs.readFile(CONTENT).then(JSON.parse);

// 	// Set the canonical URL
// 	let url = "";
// 	if (content.canonical_url) {
// 		try {
// 			url = new URL(content.canonical_url).toString();
// 		} catch (e) {
// 			console.error("Problem parsing canonical URL", e);
// 		}
// 	}

// 	// CPS
// 	const contentProtectionState =
// 		CONTENT_PROTECTION_STATES[content.content_protection_state] || "free";

// 	const scripts = [
// 		{
// 			type: "module",
// 			src: new URL(`bundle.js?t=${Date.now()}`, ASSET_PATH),
// 			defer: "defer",
// 		},
// 	];
// 	let links = [
// 		{ rel: "stylesheet", href: new URL(`bundle.css?t=${Date.now()}`, ASSET_PATH).href },
// 		{ rel: "stylesheet", href: new URL(`global.css?t=${Date.now()}`, ASSET_PATH).href },
// 		...(await preloads()),
// 	];

// 	links.push({
// 		rel: "preconnect",
// 		href: "https://fonts.googleapis.com",
// 	});
// 	links.push({
// 		rel: "preconnect",
// 		href: "https://fonts.gstatic.com",
// 		crossorigin: true,
// 	});
// 	links.push({
// 		rel: "stylesheet",
// 		href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
// 		crossorigin: true,
// 	});

// 	// Set the canonical URL
// 	try {
// 		const url = new URL(content.canonical_url).href;
// 	} catch (e) {
// 		console.error("Problem parsing canonical URL");
// 	}
// 	const site_code = content.site_code || "usat";

// 	let share_image;
// 	try {
// 		// Start by using the configured image
// 		share_image = await justGetPhotoURL(content.share_image);
// 	} catch (e) {
// 		console.error("!! Problem getting share image: %s", e);
// 	}

// 	// HANDLE SSTS, ETC.
// 	let ssts = content.ssts || "";
// 	let cst = content.cst || content.ssts || "";

// 	const jsonld = json_ld({
// 		ssts: content.ssts,
// 		date_modified: new Date(content.updated).toISOString(),
// 		date_published: new Date(content.published).toISOString(),
// 		title: content.title,
// 		canonical_url: url,
// 		site_code,
// 		share_image,
// 		is_accessible_for_free: contentProtectionState === "free",
// 		paywalled_content_css_selector: [],
// 	});

// 	const metadata = {
// 		contentId: content.presto_id || null,
// 		scripts,
// 		links,
// 		headline: content.headline || content.title,
// 		title: content.title,
// 		description: content.description,
// 		share_text: content.share_text || "",
// 		share_image,
// 		ssts,
// 		cst,
// 		url,
// 		jsonld: {},
// 		date_published: new Date(content.published).toISOString(),
// 		includesVideo: content.includesVideo || false,
// 		contentProtectionState,
// 		basePageType: "interactives design-a-kit",
// 	};
// 	const response = UW({
// 		html: await renderHTML(content),
// 		...metadata,
// 	});

// 	return fs.writeFile(
// 		path.join(__dirname, "../public/uw", `${PROJECT_SLUG}.json`),
// 		JSON.stringify(response)
// 	);
// }

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

	return fs.writeFile(
		path.resolve(__dirname, "../public/index.html"),
		rendered,
		"utf-8"
	);
}

// const IMAGES = ["png", "jpg"];
// async function preloads() {
// 	const files = await fs.readdir(
// 		path.join(__dirname, "../src/static/models/soccerPlayer/"),
// 		{ withFileTypes: true }
// 	);
// 	const links = [];
// 	files.forEach(f => {
// 		if (!f.isDirectory() && f.name != ".DS_Store") {
// 			links.push({
// 				as: IMAGES.includes(f.extname) ? "image" : "fetch",
// 				rel: "preload",
// 				href: new URL(f.name, `${ASSET_PATH}models/soccerPlayer/`).href,
// 			});
// 		}
// 	});
// 	return links;
// }

if (require.main === module) {
	preview().catch(console.error);
}
