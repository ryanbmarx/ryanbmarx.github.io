<script lang="ts">
	import { Moon, Sun } from "@lucide/svelte";
	import { mode, toggleMode } from "mode-watcher";
</script>

<button class="theme" onclick={toggleMode} aria-label="Toggle light/dark mode">
	<div class="icon" class:highlight={mode.current === "dark"}>
		<Moon />
	</div>
	<div class="icon" class:highlight={mode.current === "light"}>
		<Sun />
	</div>
</button>

<style>
	.theme {
		--speed-transition-quick: 5s;
		position: absolute;
		top: calc(var(--nav-height) + var(--gap));

		z-index: 3;

		right: var(--gap);
		width: fit-content;

		display: flex;
		gap: 0.25rem;
		background-color: transparent;
		border: none;

		:global(svg) {
			color: var(--color-font);
		}
	}

	.icon {
		transform: scale(0.65);
		opacity: 0.6;
		transition:
			transform var(--speed-transition-quick) ease-in-out,
			opacity var(--speed-transition-quick) ease-in-out;
		&.highlight {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
