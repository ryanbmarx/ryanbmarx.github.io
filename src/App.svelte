<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import Footer from "./components/Footer.svelte";
	import Portfolio from "./components/Portfolio.svelte";
	import Header from "./components/Header.svelte";
	import Resume from "./components/Resume.svelte";
	import About from "./components/About.svelte";
	import Section from "./components/Section.svelte";
	import Nav from "./components/Nav.svelte";
	import Theme from "./components/Theme.svelte";
</script>

<svelte:head>Ryan Marx | Communucating with data and code</svelte:head>
<ModeWatcher></ModeWatcher>
<Theme></Theme>
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
<Footer></Footer>

<style>
	:global(body) {
		/* https://grabient.com/IwOgDA7AzANCCsEBMcBswCcMC0YTDDBzyXiJCVS1wWFhtQmGJABYxnxG5gCWwAHGCA?angle=45 */

		background: light-dark(
			linear-gradient(45deg, #fa61da33 0%, #ff889133 50%, #ffcd5a33 100%),
			linear-gradient(
				230deg,
				rgba(16, 54, 82, 1) 0%,
				rgba(31, 38, 115, 1) 52%,
				rgba(57, 57, 153, 1) 100%
			)
		);
	}
	:global(#app) {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--gap);
		min-height: 100vh;
	}
</style>
