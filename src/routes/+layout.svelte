<script lang="ts">
	import { page } from "$app/state";
	import { ModeWatcher } from "mode-watcher";
	import Theme from "$lib/components/Theme.svelte";
	import sprite from "$lib/sprite.svg?raw";
	import Section from "$lib/components/Section.svelte";
	import Nav from "$lib/components/Nav.svelte";
	let { children } = $props();
	const isFullwidth = page.props;
</script>

<svelte:head>
	<title>Ryan Marx | Communicating with data and code</title>
</svelte:head>

<div style="display: none">
	{@html sprite}
</div>

<ModeWatcher></ModeWatcher>
<Theme></Theme>

<Nav></Nav>
<Section>
	{@render children()}
</Section>

<style>
</style>
