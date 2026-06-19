<script lang="ts">
	import Button from "./Button.svelte";

	import { navLinks } from "$lib/constants";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte";
	const isMobile = new IsMobile();
</script>

<nav class="frost">
	{#each navLinks as { href, label } (href)}
		<Button {href}>{label}</Button>
	{/each}
</nav>

<style>
	nav {
		width: 100%;
		display: grid;
		gap: var(--gap);
		grid-template: auto / repeat(auto-fit, minmax(10rem, 1fr));
		padding: var(--gap);
		background: #fff1;
		max-width: 50vw;
		margin-top: 2rem;
	}
	.link {
		border: 1px solid var(--color-font);
		padding: var(--gap);
		text-align: center;
	}
	@media all and (min-width: 48rem) {
	}
</style>
