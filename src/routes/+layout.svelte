<script lang="ts">
	import Theme from "$lib/components/Theme.svelte";
	import sprite from "$lib/sprite.svg?raw";
	import { ModeWatcher } from "mode-watcher";
	let { children } = $props();
</script>

<svelte:head>
	<title>Ryan Marx | Communicating with data and code</title>
</svelte:head>

<a class="skip-link" href="#main-content">Skip to main content</a>

<ModeWatcher></ModeWatcher>
<Theme></Theme>

{@render children()}

<div style="display: none" hidden>
	{@html sprite}
</div>

<style>
	.skip-link {
		position: absolute;
		top: -13rem;
		left: 0;
		z-index: 100;
		padding: var(--gap);
		background: light-dark(white, black);
		color: light-dark(black, white);

		&:focus {
			top: 0;
		}
	}
</style>
