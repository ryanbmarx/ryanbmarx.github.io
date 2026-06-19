<script lang="ts">
	import type { Snippet } from "svelte";

	const {
		id,
		children,
		class: addClass = "",
		wide = false,
		header,
		tag = "section",
	}: {
		header?: string;
		class?: string;
		id?: string;
		children: Snippet;
		wide?: boolean;
		tag?: string;
	} = $props();
</script>

<svelte:element this={tag} {id} class="section {addClass}" class:wide>
	{#if header}
		<div class="section__header">
			<h2>{header}</h2>
		</div>
	{/if}
	<div class="section__inner">
		{@render children()}
	</div>
</svelte:element>

<style>
	.section {
		--space-above: calc(5 * var(--gap));
		padding: var(--gap);
		gap: var(--gap);
		padding-top: 0;
		display: flex;
		justify-content: center;
		flex-flow: column nowrap;
		align-items: center;

		padding-top: var(--space-above);
		margin-top: calc(-1 * var(--space-above));

		h2 {
			color: light-dark(var(--color-font), var(--color-apricot-light));
		}
	}
	.section__header {
		max-width: 45rem;
		width: 100%;
	}
	.section__inner {
		max-width: 45rem;
		width: 100%;
	}
	.wide {
		padding-inline: calc(2 * var(--gap));
		.section__inner {
			max-width: 1500px;
		}
	}
</style>
