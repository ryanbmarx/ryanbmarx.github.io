<script lang="ts">
	const { onclick, open = false }: { onclick: () => void; open: boolean } = $props();
</script>

<button aria-label="Open the navigation menu" {onclick} class:open>
	<span class="first" role="presentation"></span>
	<span class="second" role="presentation"></span>
	<span class="third" role="presentation"></span>
</button>

<style>
	button {
		padding: 0.5rem;
		width: var(--tap-target);
		height: var(--tap-target);
		background: transparent;
		border: none;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-around;
		cursor: pointer;
		position: relative;
	}

	span {
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
