<script lang="ts">
	import { page } from "$app/state";
	import Footer from "$lib/components/Footer.svelte";
	import Nav from "$lib/components/nav/Nav.svelte";
	import NavMobile from "$lib/components/nav/NavMobile.svelte";
	import Section from "$lib/components/Section.svelte";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte";
	import sprite from "$lib/sprite.svg?raw";
	let { children } = $props();
	const isFullwidth = $derived(page.data.fullwidth);
	const isMobile = new IsMobile();
</script>

<svelte:head>
	<title>{page.data.title} | Ryan Marx</title>
</svelte:head>

<div style="display: none">
	{@html sprite}
</div>

{#if isMobile.current}
	<NavMobile></NavMobile>
{:else}
	<Nav></Nav>
{/if}

<Section wide={isFullwidth} tag="main" id="main-content">
	{@render children()}
</Section>
<Footer></Footer>

<style>
</style>
