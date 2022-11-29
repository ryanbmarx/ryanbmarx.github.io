<script>
	import { getContext } from "svelte";
	export let tags = [];

	const { tagDefinitions } = getContext("ryanbmarx");
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
	}
</style>

{#if tags.length}
	<ul class="tags" role="list">
		{#each tags.filter(t => t in tagDefinitions) as tag}
			<li class="tag" role="listitem">{tagDefinitions[tag].label}</li>
		{/each}
	</ul>
{/if}
