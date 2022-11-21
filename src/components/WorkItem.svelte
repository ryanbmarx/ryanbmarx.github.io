<script>
	export let org, start, end, role, description, orgLink;
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

	.item__role {
		margin: 0;
	}

	.item__meta {
		line-height: 2em;
		font-weight: bold;
		font-size: 0.85rem;
		font-style: normal;
		display: block;
	}
</style>

<li class="item">
	<h3 class="item__role">
		{role}
	</h3>
	<p class="item__meta">
		<a class="org" href={orgLink} target="_blank" rel="noopener noreferrer">{org}</a>:
		<span class="time">{start} to {end}</span>
	</p>
	{#if description}
		<p>{@html description}</p>
	{/if}
</li>
