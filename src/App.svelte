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
	import { IsMobile } from "./hooks/is-mobile.svelte";
	import NavMobile from "./components/NavMobile.svelte";
	const isMobile = new IsMobile();
</script>

<svelte:head>Ryan Marx | Communicating with data and code</svelte:head>
<ModeWatcher></ModeWatcher>
<Theme></Theme>
<Header></Header>
{#if isMobile.current}
	<NavMobile></NavMobile>
{:else}
	<Nav></Nav>
{/if}
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
	:global(#app) {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--gap);
		min-height: 100vh;
	}
</style>
