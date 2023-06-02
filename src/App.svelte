<script>
	// COMPONENTS
	import Header from "./components/Header.svelte";
	import Contact from "./components/Contact.svelte";
	import About from "./components/About.svelte";
	import Portfolio from "./components/Portfolio.svelte";

	export let portfolioItems = [];
	export let tagDefinitions = {};
</script>

<Header />
<Contact label="Find me here:" />
<About />
<Portfolio {portfolioItems} {tagDefinitions} />
<Contact />
