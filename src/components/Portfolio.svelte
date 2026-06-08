<script lang="ts">
	import PortfolioItem from "./PortfolioItem.svelte";
	import { portfolioItems } from "./items";
</script>

<ul class="items">
	{#each portfolioItems as item}
		<PortfolioItem {...item} />
	{/each}
</ul>

<style>
	.items {
		display: grid;
		gap: calc(2 * var(--gap));
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
</style>
