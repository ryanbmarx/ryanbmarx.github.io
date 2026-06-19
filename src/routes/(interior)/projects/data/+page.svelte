<script lang="ts">
	import Portfolio from "$lib/components/portfolio/Portfolio.svelte";
	import { marked } from "marked";
	import { portfolioItems } from "../items";
	import intro from "./intro.md?raw";
	const items = portfolioItems.filter(
		i => i.tags.includes("trib") && i.tags.includes("data")
	);
</script>

{@html marked.parse(intro)}
<Portfolio {items}></Portfolio>

<style>
</style>
