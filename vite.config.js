import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
	plugins: [svelte()],
	// Output to dist folder (Vite default), then copy to root for GitHub Pages
	build: {
		outDir: "dist",
		assetsDir: "assets",
	},
	// Serve static files from src/static during dev
	publicDir: "src/static",
});
