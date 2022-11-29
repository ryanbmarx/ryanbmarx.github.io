<script>
	// UTILS
	import { setContext } from "svelte";

	// COMPONENTS
	import Header from "./components/Header.svelte";
	import Contact from "./components/Contact.svelte";
	import About from "./components/About.svelte";
	import Portfolio from "./components/Portfolio.svelte";

	export let portfolio = [];
	export let tagDefinitions = [];

	setContext("ryanbmarx", {
		portfolio,
		tagDefinitions,
	});
</script>

<Header />
<Contact label="Find me here:" />
<About />
<Portfolio {portfolio} />
<Contact />
