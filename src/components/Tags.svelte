<script lang="ts">
	interface Props {
		tags?: string[];
		tagDefinitions?: Record<string, { label: string }>;
	}

	const { tags = [], tagDefinitions = {} }: Props = $props();
</script>

{#if tags.length}
	<ul class="tags">
		{#each tags.filter(t => t in tagDefinitions) as tag}
			<li class="tag">{tagDefinitions[tag].label}</li>
		{/each}
	</ul>
{/if}

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
