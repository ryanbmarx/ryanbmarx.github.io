<script lang="ts">
	import Contact from "./Contact.svelte";

	const networks: {
		label: string;
		icon: string;
		url: string;
		rel?: string | null;
		target?: string | null;
	}[] = [
		{ label: "Github", icon: "github", url: "https://github.com/ryanbmarx" },
		{
			label: "LinkedIn",
			icon: "linkedin",
			url: "https://www.linkedin.com/in/ryanbmarx/",
		},
		{
			label: "Email",
			icon: "email",
			url: "mailto:ryanbmarx+homepage@gmail.com",
		},
	];

	let activeSection = $state("");

	function trackActive(_nav: HTMLElement) {
		const ids = ["about", "experience", "projects", "contact"];
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
		<li>
			<a
				href="#about"
				class:active={activeSection === "#about"}
				aria-current={activeSection === "#about" ? "location" : undefined}
				>Get to know me</a>
		</li>
		<li>
			<a
				href="#experience"
				class:active={activeSection === "#experience"}
				aria-current={activeSection === "#experience" ? "location" : undefined}
				>My experience</a>
		</li>
		<li>
			<a
				href="#projects"
				class:active={activeSection === "#projects"}
				aria-current={activeSection === "#projects" ? "location" : undefined}
				>My projects</a>
		</li>
	</ul>

	<div class="extra right">
		<ul class="contact__social">
			{#each networks as { label, icon, url, rel = null, target = null }}
				<li class="contact__link contact__link--{label}">
					<a href={url} {target} {rel}>
						{label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
	.contact__social {
		display: flex;
		/* justify-content: center; */
		/* align-items: center; */
		list-style: none;
		gap: calc(var(--gap) / 2);
		padding: 0;
		margin: 0;
		font-size: var(--font-size-very-small);
	}
	a {
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
	a.active {
		font-weight: bold;
		color: var(--color-black);
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
		margin-left: calc(var(--gap) * -1);
		width: calc((var(--gap) * 2) + 100%);
		overflow: hidden;
		margin-bottom: var(--nav-margin);
		height: var(--nav-height);

		/* bg lives on ::before so opacity can be transitioned (gradients can't animate directly) */
		&::before {
			content: "";
			position: absolute;
			inset: 0;
			background: var(--color-apricot-light);
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
