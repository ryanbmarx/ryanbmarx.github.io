<script>
	import { getContext } from "svelte";
	export let tags = [];

	export let tagDefinitions = {};
</script>

<style>
	.tags {
		list-style: none;
		padding: 0;
		margin: 0;

		display: flex;
		gap: 0.5rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.tag {
		flex: 0 0 fit-content;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font: bold var(--font-size-very-small) / var(--line-height) var(--sans-serif-fonts);
		text-transform: uppercase;

		color: var(--color-purple);
		border: 1px solid currentColor;
		background-color: transparent;
		transition: background-color var(--speed-transition) ease-in-out,
			border-color var(--speed-transition) ease-in-out;
	}

	/* ---- DARK MODE ------------ */
	:global(.dark) .tag {
		color: var(--color-font-muted);
	}

	@media screen and (prefers-color-scheme: dark) {
		.tag {
			color: var(--color-font-muted);
		}
	}
</style>

{#if tags.length}
	<ul class="tags" role="list">
		{#each tags.filter(t => t in tagDefinitions) as tag}
			<li class="tag" role="listitem">{tagDefinitions[tag].label}</li>
		{/each}
	</ul>
{/if}
