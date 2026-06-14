<script lang="ts">
	const { onclick, open = false }: { onclick: () => void; open: boolean } = $props();
	const label = $derived(open ? "Close" : "Menu");
</script>

<button aria-label="Open the navigation menu" {onclick} class:open>
	<span class="label">{label}</span>
	<div class="container" role="presentation">
		<span class="bar first"></span>
		<span class="bar second"></span>
		<span class="bar third"></span>
	</div>
</button>

<style>
	.label {
		font-size: var(--font-size-very-small);
		opacity: 0.7;
	}
	button {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		height: var(--tap-target);
		background: transparent;
		border: none;
		cursor: pointer;
	}
	.container {
		height: 100%;
		width: var(--tap-target);
		position: relative;
	}

	.bar {
		position: absolute;
		left: 50%;
		top: 50%;

		width: 90%;
		height: 2px;
		background-color: var(--color-font);
		transform: translate(-50%, -50%) rotate(0);
		transform-origin: center;
		transition:
			opacity var(--speed-transition) ease-in-out,
			top var(--speed-transition) ease-in-out,
			transform var(--speed-transition) ease-in-out;
	}

	.first {
		top: 25%;
	}
	.second {
		transform: translate(-50%, -50%) rotate(0);
	}
	.third {
		top: 75%;
	}

	.open {
		.first {
			top: 50%;
			transform: translate(-50%, -50%) rotate(45deg);
		}
		.second {
			opacity: 0;
		}
		.third {
			top: 50%;
			transform: translate(-50%, -50%) rotate(-45deg);
		}
	}
</style>
