<script lang="ts">
	import type { Snippet } from "svelte";

	const {
		id,
		children,
		class: addClass = "",
	}: { class?: string; id?: string; children: Snippet } = $props();
</script>

<section {id} class="section {addClass}">
	<div class="section__inner">
		{@render children()}
	</div>
</section>

<style>
	.section {
		--space-above: calc(5 * var(--gap));
		padding: var(--gap);
		padding-top: 0;
		display: flex;
		justify-content: center;

		padding-top: var(--space-above);
		margin-top: calc(-1 * var(--space-above));
	}
	.section__inner {
		max-width: 45rem;
		width: 100%;
	}
</style>
