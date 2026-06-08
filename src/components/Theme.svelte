<script lang="ts">
	import { toggleMode } from "mode-watcher";
</script>

<button class="theme" onclick={toggleMode}>Theme</button>

<style>
	.theme {
		position: absolute;
		top: var(--gap);
		right: var(--gap);
		width: fit-content;
	}
</style>
