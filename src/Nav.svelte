<script lang="ts">
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

<nav class="nav" {@attach observeStuck}>
	<a href="#about">Get to know me</a>
	<a href="#experience">My experience</a>
	<a href="#projects">My projects</a>
	<a href="#contact">Let's talk</a>
</nav>

<style>
	.nav {
		display: flex;
		gap: var(--gap);
		position: sticky;
		top: 0;
		padding: var(--gap);

		@supports (container-type: scroll-state) {
			/* scroll-state queries require the sticky element to be a scroll-state container */
			container-type: scroll-state;

			@container scroll-state(stuck: top) {
				a {
					color: red;
				}
			}
		}

		@supports not (container-type: scroll-state) {
			/* JS fallback: toggled by IntersectionObserver in onMount */
			&:global(.is-stuck) a {
				color: red;
			}
		}
	}
</style>
