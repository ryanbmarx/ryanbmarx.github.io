import App from "./App.svelte";
import portfolio from "./config/portfolio.json";
import tagDefinitions from "./config/tags.json";

const app = new App({
	hydrate: true,
	target: document.getElementById("app"),
	props: { portfolio, tagDefinitions },
});

export default app;
