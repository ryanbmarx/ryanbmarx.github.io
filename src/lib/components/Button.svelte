<script lang="ts">
	import type { Snippet } from "svelte";

	const {
		href,
		children,
		onclick,
	}: { href?: string; children: Snippet; onclick?: () => void } = $props();
</script>

{#if href}
	<a class="btn" {href}>{@render children()}</a>
{:else}
	<button class="btn" {onclick}>{@render children()}</button>
{/if}

<style>
	.btn {
		display: flex;
		justify-content: center;
		align-items: center;

		border: 1px solid var(--btn-color-font, var(--color-font));
		padding: var(--gap);
		text-align: center;
		cursor: pointer;
		transition: background-color var(--speed-transition-fast) ease-in-out;
		text-decoration: none;

		&:hover {
			background-color: var(--btn-border-color, #fff2);
		}
	}

	[href]:hover {
		text-decoration: underline;
	}
</style>
