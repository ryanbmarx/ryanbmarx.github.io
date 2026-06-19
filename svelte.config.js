import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		// Pre-existing broken links/missing assets in content (e.g. missing favicon.png,
		// a portfolio item pointing at a nonexistent internal path) shouldn't fail the
		// whole static build; warn instead, matching the old SPA's behavior.
		prerender: {
			handleHttpError: "warn",
			handleMissingId: "warn",
		},
	},
};
