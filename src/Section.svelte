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
		padding: var(--gap);
		padding-top: 0;
		display: flex;
		justify-content: center;
	}
	.section__inner {
		max-width: 45rem;
		width: 100%;
	}
</style>
