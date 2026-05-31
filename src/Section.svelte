<script lang="ts">
	import type { Snippet } from "svelte";

	const {
		id,
		children,
		class: addClass = "",
		wide = false,
		header,
	}: {
		header: string;
		class?: string;
		id?: string;
		children: Snippet;
		wide?: boolean;
	} = $props();
</script>

<section {id} class="section {addClass}">
	<div class="section__header">
		<h2>{header}</h2>
	</div>
	<div class="section__inner" class:wide>
		{@render children()}
	</div>
</section>

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
	}
	.section__header {
		max-width: 45rem;
		width: 100%;
	}
	.section__inner {
		max-width: 45rem;
		width: 100%;

		&.wide {
			max-width: 1500px;
		}
	}
</style>
