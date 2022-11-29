import App from "./App.svelte";
import portfolio from "./config/portfolio.json";

const app = new App({
	hydrate: true,
	target: document.getElementById("app"),
	props: { portfolio },
});

export default app;
