<script lang="ts">
	import Background from "./Background.svelte";

	import Resume from "./Resume.svelte";

	import About from "./About.svelte";

	import Section from "./Section.svelte";

	import Nav from "./Nav.svelte";
</script>

<header>
	<img
		class="portrait"
		height="250"
		width="250"
		loading="eager"
		src="/img/ryanmarx.jpg"
		alt="A closeup head shot of Ryan Marx. He's smiling softly and wearing a Milwaukee Brewers ballcap." />
	<h1>Hi. I'm Ryan.</h1>
	<p>I communicate with code and data.</p>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column nowrap;
		gap: var(--gap);

		height: 100vh;

		h1 {
			font-size: 5rem;
			line-height: 1em;
		}
	}

	.portrait {
		border-radius: 50%;
		width: 8rem;
		height: 8rem;
		aspect-ratio: 1 / 1;
		border: 6px solid var(--color-border);
	}
</style>
