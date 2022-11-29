<script>
	export let tags = [];
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
		{#each tags as tag}
			<li class="tag" role="listitem">{tag}</li>
		{/each}
	</ul>
{/if}
