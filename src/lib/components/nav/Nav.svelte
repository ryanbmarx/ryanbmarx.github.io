<script lang="ts">
	import { page } from "$app/state";
	import { navLinks, networks } from "../../constants";
</script>

<nav class="nav frost">
	<div class="extra left">
		<a class="logo" href="/">Ryan Marx</a>
	</div>

	<ul class="links">
		{#each navLinks as { href, label } (href)}
			{@const isCurrent = page.url.pathname.includes(href)}
			<li>
				<a {href} class:active={isCurrent} aria-current={isCurrent}>{label}</a>
			</li>
		{/each}
	</ul>

	<div class="extra right content">
		<ul class="contact">
			{#each networks as { label, url, Icon } (url)}
				<li class="contact__link contact__link--{label}">
					<a href={url}>
						{label}
						{#if Icon}<Icon size={12}></Icon>{/if}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.contact {
		display: flex;
		list-style: none;
		gap: calc(var(--gap));
		padding: 0;
		margin: 0;
		font-size: var(--font-size-very-small);
	}
	a {
		text-decoration: none;
		display: flex;
		gap: 0.25em;
		align-items: center;
		&:hover {
			text-decoration: underline;
		}
		&.active {
			font-weight: bold;
			color: var(--color-font);
		}
	}
	.extra {
		position: absolute;
		top: 50%;
		translate: 0 -50%;
		/* delay matches duration so extras drop in only after backdrop has faded in */
		animation: nav-dropdown var(--speed-transition) var(--speed-transition) ease-in-out
			backwards;

		display: flex;
		gap: var(--gap);
		align-items: center;
		.logo {
			font-weight: bold;
			font-size: var(--font-size-large);
		}
	}

	.left {
		left: var(--gap);
	}
	.right {
		right: var(--gap);
	}

	.links {
		display: flex;
		justify-content: center;
		border: 1px solid transparent;
		transition: border-color var(--speed-transition) ease;

		li {
			padding: var(--gap);
		}
	}
	.nav {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		margin-bottom: var(--nav-margin);
		height: var(--nav-height);
		width: 100%;
		z-index: 2;
		transition:
			backdrop-filter var(--speed-transition) ease,
			-webkit-backdrop-filter var(--speed-transition) ease;

		&::before {
			content: "";
			position: absolute;
			inset: 0;
			background: var(--nav-color-bg-opaque);
			box-shadow: var(--nav-shadow);
			opacity: var(--nav-bg-opacity-stuck);
			transition: opacity var(--speed-transition) ease;
			pointer-events: none;
			z-index: -1;
		}
	}

	@keyframes nav-dropdown {
		from {
			opacity: 0;
			translate: 0 -200%;
		}
		to {
			opacity: 1;
			translate: 0 -50%;
		}
	}
</style>
