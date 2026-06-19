<script lang="ts">
	import { networks } from "../constants";
	import Button from "./Button.svelte";
</script>

<footer id="contact" class="footer">
	<div>
		<h2>Want to chat? I do.</h2>
		<p>Let's connect. I would love to hear from you.</p>
	</div>

	<ul class="">
		{#each networks as { label, url } (url)}
			<li class="contact__link contact__link--{label}">
				<Button href={url}>{label}</Button>
			</li>
		{/each}
	</ul>
</footer>

<style>
	.footer {
		--color-font: var(--color-apricot-light);
		--btn-color-border: currentColor;
		padding: calc(2 * var(--gap)) var(--gap) calc(3 * var(--gap)) var(--gap);
		padding: 2rem 4rem;
		background-color: #151221;
		position: relative;
		margin-top: calc(var(--gap) * 4);

		&::before {
			content: "";
			background-color: red;
			display: block;
			height: 1rem;

			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			transform: translate(0, -100%);
			clip-path: polygon(100% 0, 0 100%, 100% 100%);
			background-color: inherit;
		}
	}

	p {
		color: var(--color-isabelline);
	}
	ul {
		display: flex;
		gap: 1em;
		margin: var(--gap) 0;
		li {
			flex: 1 1;
			text-align: center;
			margin: 0;
			padding: 0;
		}
	}

	@media all and (min-width: 48rem) {
		.footer {
			display: grid;
			grid-template-columns: max-content minmax(1px, 1fr);
			grid-template-rows: repeat(2, auto);
			gap: 0 calc(var(--gap) * 2);
			align-items: center;
		}

		ul {
			justify-self: end;
			margin: 0;
		}
	}
</style>
