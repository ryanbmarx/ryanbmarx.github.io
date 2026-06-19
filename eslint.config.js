import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import ts from "typescript-eslint";
import prettier from "eslint-config-prettier";
import svelteConfig from "./svelte.config.js";

export default ts.config(
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		rules: {
			// TypeScript already catches undefined references; avoid false
			// positives on ambient/global types.
			"no-undef": "off",
			// This site's links are plain anchors (hash links, mailto:, external
			// URLs) with no dynamic routes that need resolve().
			"svelte/no-navigation-without-resolve": "off",
			// {@html} is used throughout for trusted, local content (markdown,
			// SVG sprite), not user input.
			"svelte/no-at-html-tags": "off",
		},
	},
	{
		files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: [".svelte"],
				parser: ts.parser,
				svelteConfig,
			},
		},
	},
	{
		ignores: ["build/", ".svelte-kit/", "static/", "package-lock.json"],
	}
);
