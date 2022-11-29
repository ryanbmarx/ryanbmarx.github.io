import App from "./App.svelte";
import portfolioItems from "./config/portfolioItems.json";
import tagDefinitions from "./config/tagDefinitions.json";

const app = new App({
	hydrate: true,
	target: document.getElementById("app"),
	props: { portfolioItems, tagDefinitions },
});

export default app;
