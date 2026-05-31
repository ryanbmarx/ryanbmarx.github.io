<script lang="ts">
	import Header from "./Header.svelte";

	import Background from "./Background.svelte";

	import Resume from "./Resume.svelte";

	import About from "./About.svelte";

	import Section from "./Section.svelte";

	import Nav from "./Nav.svelte";
</script>

<svelte:head>Ryan Marx | Communucating with data and code</svelte:head>

<Header></Header>
<Nav></Nav>

<Section id="about">
	<About></About>
</Section>
<Section id="experience">
	<Resume></Resume>
</Section>
<Section id="projects">
	<h2>My projects</h2>
	<div class="fpo"></div>
</Section>
<Section id="contact">
	<h2>Get in touch</h2>
	<div class="fpo"></div>
</Section>

<Background></Background>

<style>
	:global(#app) {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--gap);
		min-height: 100vh;
	}

	.fpo {
		height: 150vh;
		background: #888;
	}
</style>
