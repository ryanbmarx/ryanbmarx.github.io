<script lang="ts">
	import NavButton from "./NavButton.svelte";
	import { navLinks, networks } from "../constants";

	let drawerOpen = $state(false);

	function setDrawerOpen(open: boolean) {
		drawerOpen = open;
		document.body.style.overflow = open ? "hidden" : "";
	}

	function onLinkClick() {
		setDrawerOpen(false);
	}
</script>

<div class="top frost">
	<span class="name">Ryan Marx</span>
	<NavButton onclick={() => setDrawerOpen(!drawerOpen)} open={drawerOpen}></NavButton>
</div>
<nav class="nav stack frost" class:open={drawerOpen}>
	<ul class="links stack">
		{#each navLinks as { href, label }}
			<li>
				<a {href} onclick={onLinkClick}>{label}</a>
			</li>
		{/each}
	</ul>
	<ul class="links links--small stack">
		{#each networks as { label, url }}
			<li class="contact__link contact__link--{label}">
				<a href={url} onclick={onLinkClick}>{label}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.top {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: var(--nav-height);
		background: var(--nav-color-bg-opaque);
		padding: 0 var(--gap);
		display: flex;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
		z-index: 3;
		box-shadow: var(--nav-shadow);
	}
	.nav {
		--padding: var(--gap);
		align-items: center;
		justify-content: center;
		padding: 2rem;
		position: fixed;
		top: calc(var(--padding) + var(--nav-height));
		left: var(--padding);

		width: calc(100vw - (var(--padding) * 2));
		z-index: 2;
		height: calc(100vh - var(--nav-height) - (2 * var(--padding)));
		background: #0008;
		border-radius: 1rem 1rem 0 0;
		border-radius: 1rem;
		box-shadow: 0 0 6px #0006;

		opacity: 0;
		transform: scale(1.1);
		visibility: hidden;
		transition:
			transform var(--speed-transition),
			opacity var(--speed-transition),
			visibility var(--speed-transition) allow-discrete;

		&.open {
			transform: scale(1);
			opacity: 1;
			visibility: visible;
		}
	}

	li a {
		text-decoration: none;
		font-size: var(--font-size-very-large);
		color: var(--color-white);
	}

	.name {
		font-weight: bold;
		font-size: var(--font-size-large);
	}

	.links {
		font-size: var(--font-size-large);
		text-align: center;
	}

	.links--small {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		border-top: 1px solid var(--color-border);
		margin-top: var(--gap);
		padding-top: var(--gap);
		width: fit-content;

		a {
			font-size: var(--font-size-medium);
		}
	}
</style>
