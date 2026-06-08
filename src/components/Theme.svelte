<script lang="ts">
	import { toggleMode, mode } from "mode-watcher";
	import { Moon, Sun } from "@lucide/svelte";
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
		position: absolute;
		bottom: var(--gap);
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

	@media all and (min-width: 48rem) {
		.theme {
			top: var(--gap);
			bottom: unset;
		}
	}
</style>
