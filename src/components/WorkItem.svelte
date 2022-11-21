<script>
	export let org, start, end, role, description;
</script>

<style>
	.item {
		font: var(--font-size-small) / 1.3em var(--sans-serif-fonts);
	}
	.item > * {
		margin: 0 0 calc(var(--gap) / 2);
	}
	.item > *:last-child {
		margin: 0;
	}

	.role {
		margin: 0;
	}

	.time {
		line-height: 2em;
		font-weight: bold;
		font-size: 0.85rem;
		font-style: normal;
		display: block;
	}
</style>

<li class="item">
	<h3 class="role">
		{role},
		<span class="org">{org}</span>
	</h3>
	<span class="time">{start} to {end}</span>
	{#if description}
		<p>{@html description}</p>
	{/if}
</li>
