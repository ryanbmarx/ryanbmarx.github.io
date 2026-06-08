<script lang="ts">
	import { toggleMode } from "mode-watcher";
</script>

<button class="theme" onclick={toggleMode}>Theme</button>

<style>
	.theme {
		position: absolute;
		bottom: var(--gap);
		right: var(--gap);
		width: fit-content;
	}
	@media all and (min-width: 48rem) {
		.theme {
			top: var(--gap);
			bottom: unset;
		}
	}
</style>
