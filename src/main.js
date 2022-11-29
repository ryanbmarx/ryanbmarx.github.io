import App from "./App.svelte";
import portfolioItems from "./config/portfolio.json";
import tagDefinitions from "./config/tags.json";

console.log({ portfolio });
const app = new App({
	hydrate: true,
	target: document.getElementById("app"),
	props: { portfolioItems, tagDefinitions },
});

export default app;
