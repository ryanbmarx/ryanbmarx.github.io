<script>
	export let id;
	export let label;
	export let labelLeft, labelRight;
	export let checked = false;
</script>

<style>
	.switcher {
		--switcher-height-default: 2rem;
		--switcher-color-background-default: #eeb6a2;
		--switcher-color-accent-default: #fe4502;
		--switcher-color-accent-text-default: #000;

		position: absolute;
		top: var(--gap);
		right: var(--gap);
		list-style: none;
		margin: 0;
		padding: 0.5rem;
		background: rgba(0, 0, 0, 0.35);
	}

	.visually-hidden {
		appearance: none;
		display: none;
	}

	.switcher__wrapper {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		cursor: pointer;
	}
	.switcher__label {
		font: bold var(--font-size-very-small) / 1em var(--sans-serif-fonts);
		color: var(--color-gray);
		text-transform: uppercase;
		margin: 0;
		padding: 0 0 0.15rem 0;
		color: white;
		transform: color var(--speed-transition) ease-in-out;
		position: relative;
	}

	.switcher__label::after {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 100%;
		background-color: currentColor;
		width: 100%;
		height: 2px;
		transition: transform var(--speed-transition) ease-in-out;
	}

	.switcher__label--muted {
		color: var(--color-gray);
		border-color: transparent;
	}
	.switcher__label--muted::after {
		transform: scaleX(0);
	}

	.switcher__toggle {
		display: block;
		height: var(--switcher-height, var(--switcher-height-default));
		width: calc(2 * var(--switcher-height, var(--switcher-height-default)));
		background-color: var(
			--switcher-color-background,
			var(--switcher-color-background-default)
		);
		border-radius: 3rem;
		position: relative;
		transition: background-color var(--speed-transition) ease-in-out;
	}

	.switcher__toggle__dot {
		position: absolute;
		top: 50%;
		left: 0;
		background-color: var(
			--switcher-color-accent,
			var(--switcher-color-accent-default)
		);
		border: 2px solid
			var(--switcher-color-accent-text, var(--switcher-color-accent-text-default));

		display: flex;
		justify-content: center;
		align-items: center;
		height: var(--switcher-height, var(--switcher-height-default));
		width: var(--switcher-height, var(--switcher-height-default));
		border-radius: 50%;
		transform: translate(0, -50%);

		transition: transform var(--speed-transition) ease-in-out,
			left var(--speed-transition) ease-in-out,
			background-color var(--speed-transition) ease-in-out;
	}
	.switcher__toggle__icon {
		width: 75%;
		height: 75%;
		fill: var(--switcher-color-accent-text, var(--switcher-color-accent-text-default));
	}
	.switcher__toggle__icon--dark {
		width: 50%;
		height: 50%;
		transform: rotate(180deg);
		fill: var(--switcher-color-accent-text, var(--switcher-color-accent-text-default));
	}
	.switcher__toggle__icon--dark {
		display: none;
	}
	input:checked + .switcher__wrapper .switcher__toggle__dot {
		left: 100%;
		transform: translate(-100%, -50%) rotate(180deg);
	}
	input:checked + .switcher__wrapper {
		--switcher-color-background-default: lightblue;
		--switcher-color-accent-default: navy;
		--switcher-color-accent-text-default: white;
	}
	input:checked + .switcher__wrapper .switcher__toggle__icon--light {
		display: none;
	}
	input:checked + .switcher__wrapper .switcher__toggle__icon--dark {
		display: block;
	}
</style>

<div class="switcher">
	<input
		on:input
		id="{id}-switcher"
		type="checkbox"
		name="{id}-switcher"
		bind:checked
		class="visually-hidden" />
	<label class="switcher__wrapper" for="{id}-switcher" aria-label={label}>
		{#if labelLeft}
			<span
				class="switcher__label switcher__label--left"
				class:switcher__label--muted={checked}>{labelLeft}</span>
		{/if}
		<span class="switcher__toggle">
			<span class="switcher__toggle__dot">
				<svg
					class="switcher__toggle__icon switcher__toggle__icon--dark"
					role="img"
					viewbox="0 0 1200 1200">
					<use href="#moon" />
				</svg>
				<svg
					class="switcher__toggle__icon switcher__toggle__icon--light"
					role="img"
					viewbox="0 0 1200 1200">
					<use href="#sun" />
				</svg>
			</span>
		</span>
		{#if labelRight}
			<span
				class="switcher__label switcher__label--right"
				class:switcher__label--muted={!checked}>{labelRight}</span>
		{/if}
	</label>
</div>
