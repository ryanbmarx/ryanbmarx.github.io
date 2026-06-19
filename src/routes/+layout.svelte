<script lang="ts">
	import Theme from "$lib/components/Theme.svelte";
	import sprite from "$lib/sprite.svg?raw";
	import { ModeWatcher } from "mode-watcher";
	let { children } = $props();
</script>

<svelte:head>
	<title>Ryan Marx | Communicating with data and code</title>
</svelte:head>

<ModeWatcher></ModeWatcher>
<Theme></Theme>

{@render children()}

<div style="display: none" hidden>
	{@html sprite}
</div>

<style>
</style>
