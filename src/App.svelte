<script>
	// COMPONENTS
	import Header from "./components/Header.svelte";
	import Contact from "./components/Contact.svelte";
	import About from "./components/About.svelte";
	import Portfolio from "./components/Portfolio.svelte";

	const { portfolioItems = [], tagDefinitions = {} } = $props();
</script>

<Header />
<Contact label="Find me here:" />
<About />
<Portfolio {portfolioItems} {tagDefinitions} />
<Contact />
