<script lang="ts">
	import NavCloseButton from "./NavCloseButton.svelte";

	import NavButton from "./NavButton.svelte";

	const networks = [
		{ label: "Github", url: "https://github.com/ryanbmarx" },
		{ label: "LinkedIn", url: "https://www.linkedin.com/in/ryanbmarx/" },
		{ label: "Email", url: "mailto:ryanbmarx+homepage@gmail.com" },
	];

	const navLinks = [
		{ href: "#about", label: "Get to know me" },
		{ href: "#experience", label: "My experience" },
		{ href: "#projects", label: "My projects" },
	];

	let drawerOpen = $state(false);

	function setDrawerOpen(open: boolean) {
		drawerOpen = open;
		document.body.style.overflow = open ? "hidden" : "";
	}

	function onLinkClick() {
		setDrawerOpen(false);
	}
</script>

<div class="top">
	<span class="name">Ryan Marx</span>
	<NavButton onclick={() => setDrawerOpen(!drawerOpen)} open={drawerOpen}></NavButton>
</div>
<nav class="nav stack" class:open={drawerOpen}>
	<NavCloseButton onclick={() => setDrawerOpen(false)}></NavCloseButton>
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

		padding: 0 var(--gap);

		display: flex;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;

		z-index: 3;

		background: var(--nav-color-bg);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		box-shadow: var(--nav-shadow);
	}
	.nav {
		position: fixed;
		bottom: 0;
		left: 50%;
		translate: -50% 0;

		width: 95vw;
		z-index: 2;
		height: calc(100vh - var(--nav-height));
		padding: 2rem;
		padding-top: 0;
		background: var(--nav-color-bg-opaque);
		height: 75%;
		max-height: calc(100% - var(--nav-height));
		border-radius: 1rem 1rem 0 0;
		box-shadow: 0 0 6px #0006;

		transform: translate(0, 125%);
		transition: transform var(--speed-transition-quick);

		&.open {
			transform: translate(0, 0);
		}
	}

	.name {
		font-weight: bold;
		font-size: var(--font-size-large);
	}

	.links {
		font-size: var(--font-size-large);
		text-align: left;
	}

	.links--small {
		font-size: var(--font-size-medium);
		text-align: right;
		margin-bottom: auto;
	}
</style>
