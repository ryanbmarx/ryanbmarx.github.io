<script lang="ts">
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

	let activeSection = $state("");

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
		// Only activate the JS fallback when scroll-state queries aren't supported
		if (CSS.supports("container-type", "scroll-state")) return;

		// Sentinel sits just above the nav; when it scrolls out of view the nav is stuck
		const sentinel = document.createElement("div");
		sentinel.setAttribute("role", "presentation");
		nav.parentElement?.insertBefore(sentinel, nav);

		const observer = new IntersectionObserver(([entry]) => {
			nav.classList.toggle("is-stuck", !entry.isIntersecting);
		});
		observer.observe(sentinel);

		return () => {
			observer.disconnect();
			sentinel.remove();
		};
	}
</script>

<nav class="nav" {@attach observeStuck} {@attach trackActive}>
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
		transform: translate(0, -200%);
		opacity: 0;

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
		border: 1px solid var(--color-border-light);
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
		overflow: hidden;
		margin-bottom: var(--nav-margin);
		height: var(--nav-height);
		z-index: 2;

		/* bg lives on ::before so opacity can be transitioned (gradients can't animate directly) */
		&::before {
			content: "";
			position: absolute;
			inset: 0;
			background: var(--nav-color-bg);
			backdrop-filter: blur(12px);
			-webkit-backdrop-filter: blur(12px);
			box-shadow: var(--nav-shadow);
			opacity: 0;
			transition: opacity var(--speed-transition) ease;
			pointer-events: none;
			z-index: -1;
		}

		@supports (container-type: scroll-state) {
			/* scroll-state queries require the sticky element to be a scroll-state container */
			container-type: scroll-state;
			box-shadow: var(--nav-shadow);
			@container scroll-state(stuck: top) {
				&::before {
					opacity: 1;
				}

				.links {
					border-color: transparent;
				}

				.extra {
					opacity: 1;
					transform: translate(0, 0);
					transition:
						opacity var(--speed-transition) var(--speed-transition) ease-in-out,
						box-shadow var(--speed-transition) var(--speed-transition) ease-in-out,
						transform var(--speed-transition) var(--speed-transition) ease-in-out;
				}
			}
		}

		@supports not (container-type: scroll-state) {
			/* JS fallback: toggled by IntersectionObserver */
			&:global(.is-stuck)::before {
				opacity: 1;
			}

			&:global(.is-stuck) {
				box-shadow: var(--nav-shadow);

				.links {
					border-color: transparent;
				}
				.extra {
					opacity: 1;
					transform: translate(0, 0);
					transition:
						opacity var(--speed-transition) var(--speed-transition) ease-in-out,
						box-shadow var(--speed-transition) var(--speed-transition) ease-in-out,
						transform var(--speed-transition) var(--speed-transition) ease-in-out;
				}
			}
		}
	}
</style>
