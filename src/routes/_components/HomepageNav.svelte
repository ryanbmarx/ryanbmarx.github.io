<script lang="ts">
	import { navLinks } from "$lib/constants";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte";
	const isMobile = new IsMobile();
</script>

<nav class="frost">
	<ul class="links">
		{#each navLinks as { href, label } (href)}
			<li>
				<a {href}>{label}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.links {
		display: flex;
		gap: var(--gap);
	}
	@media all and (min-width: 48rem) {
	}
</style>
