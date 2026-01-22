import { mount, hydrate } from "svelte";
import App from "./App.svelte";
import portfolioItems from "./config/portfolioItems.json";
import tagDefinitions from "./config/tagDefinitions.json";

// Use hydrate if SSR content exists, otherwise mount fresh
const target = document.getElementById("app");
const hasSSRContent = target && target.innerHTML.trim().length > 0;

const app = hasSSRContent
	? hydrate(App, {
			target,
			props: { portfolioItems, tagDefinitions },
		})
	: mount(App, {
			target,
			props: { portfolioItems, tagDefinitions },
		});

export default app;
