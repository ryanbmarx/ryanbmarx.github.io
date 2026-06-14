<script lang="ts">
	import { navLinks, networks } from "../constants";
	let activeSection = $state("");
	let isStuck = $state(true); // default true so CSS no-JS fallback shows stuck state

	function trackActive(_nav: HTMLElement) {
		const ids = navLinks.map(({ href }) => href.slice(1));
		const targets = ids
			.map(id => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		let hasScrolled = false;
		window.addEventListener(
			"scroll",
			() => {
				hasScrolled = true;
			},
			{ once: true, passive: true }
		);

		const observer = new IntersectionObserver(
			entries => {
				if (!hasScrolled) return;
				for (const entry of entries) {
					if (entry.isIntersecting) activeSection = `#${entry.target.id}`;
				}
			},
			// trigger band: ~10% window centered at the middle of the viewport
			{ rootMargin: "-45% 0px -45% 0px", threshold: 0 }
		);

		targets.forEach(t => observer.observe(t));
		return () => observer.disconnect();
	}

	function observeStuck(nav: HTMLElement) {
		const sentinel = document.createElement("div");
		sentinel.setAttribute("role", "presentation");
		nav.parentElement?.insertBefore(sentinel, nav);

		// Synchronous check so the initial render is correct with no flash
		isStuck = sentinel.getBoundingClientRect().bottom <= 0;

		const observer = new IntersectionObserver(([entry]) => {
			isStuck = !entry.isIntersecting;
		});
		observer.observe(sentinel);

		return () => {
			observer.disconnect();
			sentinel.remove();
		};
	}
</script>

<nav
	class="nav"
	{@attach observeStuck}
	{@attach trackActive}
	class:is-unstuck={!isStuck}>
	<div class="extra left">
		<span>Ryan Marx</span>
	</div>

	<ul class="links">
		{#each navLinks as { href, label }}
			<li>
				<a
					{href}
					class:active={activeSection === href}
					aria-current={activeSection === href ? "location" : undefined}>{label}</a>
			</li>
		{/each}
	</ul>

	<div class="extra right content">
		<ul class="contact__social">
			{#each networks as { label, url }}
				<li class="contact__link contact__link--{label}">
					<a href={url}>{label}</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.contact__social {
		display: flex;
		list-style: none;
		gap: calc(var(--gap) / 2);
		padding: 0;
		margin: 0;
		font-size: var(--font-size-very-small);
	}
	a {
		text-decoration: none;
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
		/* delay matches duration so extras slide in only after backdrop has faded in */
		transition:
			opacity var(--speed-transition) var(--speed-transition) ease-in-out,
			transform var(--speed-transition) var(--speed-transition) ease-in-out;

		display: flex;
		gap: var(--gap);
		align-items: center;
		span {
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
		position: sticky;
		top: 0;
		justify-content: center;
		margin-bottom: var(--nav-margin);
		height: var(--nav-height);
		z-index: 2;
		/* Stuck by default */
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
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

		/* JS adds this class when scrolled to the top (not stuck) */
		&.is-unstuck {
			backdrop-filter: blur(0px);
			-webkit-backdrop-filter: blur(0px);

			&::before {
				opacity: 0;
			}

			.links {
				border-color: var(--color-border-light);
			}

			/* No delay when sliding out */
			.extra {
				opacity: 0;
				transform: translate(0, -200%);
				transition:
					opacity var(--speed-transition) ease-in-out,
					transform var(--speed-transition) ease-in-out;
			}
		}
	}
</style>
