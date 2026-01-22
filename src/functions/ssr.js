#!/usr/bin/env node
/**
 * Prepares the index.html with SVG sprite injection.
 *
 * Note: Full SSR with Svelte 5 requires Vite's SSR mode or SvelteKit.
 * For this portfolio site, we inject the SVG sprite and let the app
 * hydrate on the client side.
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prepareHTML() {
	console.log("Preparing index.html with SVG sprite...");

	const [template, sprite] = await Promise.all([
		fs.readFile(path.resolve(__dirname, "../../index.html"), "utf-8"),
		fs.readFile(path.resolve(__dirname, "./sprite.svg"), "utf-8"),
	]);

	// Inject SVG sprite (hidden) before the app div
	const spriteMarkup = `<div style="display:none;">${sprite}</div>`;
	const output = template.replace(
		'<div id="app" class="app"></div>',
		`${spriteMarkup}\n\t\t<div id="app" class="app"></div>`
	);

	await fs.writeFile(path.resolve(__dirname, "../../index.html"), output, "utf-8");
	console.log("Done!");
}

prepareHTML().catch(console.error);
