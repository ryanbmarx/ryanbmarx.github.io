<script lang="ts">
	import Footer from "$lib/components/Footer.svelte";
	import Portfolio from "$lib/components/Portfolio.svelte";
	import Header from "$lib/components/Header.svelte";
	import Resume from "$lib/components/Resume.svelte";
	import About from "$lib/components/About.svelte";
	import Section from "$lib/components/Section.svelte";
	import Nav from "$lib/components/Nav.svelte";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte";
	import NavMobile from "$lib/components/NavMobile.svelte";
	const isMobile = new IsMobile();
</script>

<Header></Header>
{#if isMobile.current}
	<NavMobile></NavMobile>
{:else}
	<Nav></Nav>
{/if}
<!-- <Section id="about" header="About me">
</Section>
<Section id="experience" header="My experience">
	<Resume></Resume>
</Section>
<Section id="projects" header="My projects" wide>
	<Portfolio></Portfolio>
</Section>
<Footer></Footer> -->
