<script lang="ts">
	import PortfolioItem, { type PorfolioItemType } from "./PortfolioItem.svelte";
	const { items }: { items: PorfolioItemType[] } = $props();
</script>

<ul class="items">
	{#each items as item (item.label)}
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
