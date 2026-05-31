<script lang="ts">
	import Portfolio from "./Portfolio.svelte";

	import Header from "./Header.svelte";

	import Resume from "./Resume.svelte";

	import About from "./About.svelte";

	import Section from "./Section.svelte";

	import Nav from "./Nav.svelte";
</script>

<svelte:head>Ryan Marx | Communucating with data and code</svelte:head>

<Header></Header>
<Nav></Nav>

<Section id="about" header="About me">
	<About></About>
</Section>
<Section id="experience" header="My experience">
	<Resume></Resume>
</Section>
<Section id="projects" header="My projects" wide>
	<Portfolio></Portfolio>
</Section>

<div class="footer" role="presentation"></div>

<style>
	.footer {
		height: 2rem;
		background-color: var(--color-purple);
		opacity: 0.2;
		filter: blur(3px);
		width: 110%;
		margin-left: -5%;
	}
	:global(body) {
		/* https://grabient.com/IwOgDA7AzANCCsEBMcBswCcMC0YTDDBzyXiJCVS1wWFhtQmGJABYxnxG5gCWwAHGCA?angle=45 */

		background: linear-gradient(45deg, #fa61da33 0%, #ff889133 50%, #ffcd5a33 100%);
	}
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
