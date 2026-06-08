<script lang="ts">
	import { networks } from "../constants";
</script>

<footer class="footer">
	<div>
		<h2>Want to chat? I do.</h2>
		<p>Let's connect. I would love to hear from you.</p>
	</div>

	<ul class="">
		{#each networks as { label, url }}
			<li class="contact__link contact__link--{label}">
				<a href={url}>{label}</a>
			</li>
		{/each}
	</ul>
</footer>

<style>
	.footer {
		--color-font: var(--color-apricot-light);
		padding: calc(2 * var(--gap)) var(--gap) calc(3 * var(--gap)) var(--gap);
		background-color: #151221;
		position: relative;

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

		a {
			display: block;
			padding: 1em;
			border: 1px solid currentColor;
		}
	}

	@media all and (min-width: 48rem) {
		.footer {
			display: grid;
			grid-template-columns: max-content minmax(1px, 1fr);
			grid-template-rows: repeat(2, auto);
			gap: 0 calc(var(--gap) * 2);
		}

		ul {
			max-width: 25rem;
			justify-self: end;
			margin: 0;
		}
	}
</style>
