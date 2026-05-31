<script lang="ts">
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
	<div>
		<span>Ryan Marx</span>
		<img
			class="portrait"
			height="250"
			width="250"
			loading="eager"
			src="/img/ryanmarx.jpg"
			alt="A closeup head shot of Ryan Marx. He's smiling softly and wearing a Milwaukee Brewers ballcap." />
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
		<li>
			<a
				href="#contact"
				class:active={activeSection === "#contact"}
				aria-current={activeSection === "#contact" ? "location" : undefined}
				>Let's talk</a>
		</li>
	</ul>
</nav>

<style>
	a.active {
		font-weight: bold;
		color: var(--color-black);
	}
	div {
		position: absolute;
		top: 50%;
		left: var(--gap);
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

		img {
			width: 6rem;
			height: 6rem;
			border-radius: 50%;
			border: 8px solid #fff4;
		}
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

			@container scroll-state(stuck: top) {
				&::before {
					opacity: 1;
				}

				.links {
					border-color: transparent;
				}

				div {
					opacity: 1;
					transform: translate(0, 0);
					transition:
						opacity 150ms 150ms ease-in-out,
						transform 150ms 150ms ease-in-out;
				}
			}
		}

		@supports not (container-type: scroll-state) {
			/* JS fallback: toggled by IntersectionObserver */
			&:global(.is-stuck)::before {
				opacity: 1;
			}

			&:global(.is-stuck) {
				.links {
					border-color: transparent;
				}
				div {
					opacity: 1;
					transform: translate(0, 0);
					transition:
						opacity 150ms 150ms ease-in-out,
						transform 150ms 150ms ease-in-out;
				}
			}
		}
	}
</style>
