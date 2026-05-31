<script lang="ts">
	import Background from "./Background.svelte";

	import Resume from "./Resume.svelte";

	import About from "./About.svelte";

	import Section from "./Section.svelte";

	import Nav from "./Nav.svelte";
</script>

<svelte:head>Ryan Marx | Communucating with data and code</svelte:head>

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
	<Nav></Nav>
</header>

<Section id="about">
	<About></About>
</Section>
<Section id="experience">
	<Resume></Resume>
</Section>
<Section id="projects">
	<h2>My projects</h2>
</Section>
<Section id="contact">
	<h2>Get in touch</h2>
</Section>

<Background></Background>

<style>
	:global(#app) {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--gap);
		min-height: 100vh;
	}
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column nowrap;
		gap: var(--gap);

		height: 100vh;

		h1 {
			font-size: var(--font-size-very-large);
			font-size: 2rem;
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
