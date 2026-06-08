<script lang="ts">
	import { ChevronDown } from "@lucide/svelte";

	const { onclick }: { onclick: () => void } = $props();
</script>

<button {onclick} aria-label="Close the nav drawer">
	<ChevronDown />
</button>

<style>
	button {
		width: 100%;
		padding: 0;
		height: var(--tap-target);
		border: none;
		background-color: transparent;
		display: flex;
		color: #fff8;

		position: relative;

		:global(svg) {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
