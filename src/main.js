import App from "./App.svelte";

const app = new App({
  hydrate: true,
  target: document.getElementById("app"),
  props: {},
});

export default app;
