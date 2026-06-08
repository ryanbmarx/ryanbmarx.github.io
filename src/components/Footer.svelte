<script lang="ts">
</script>

<footer class="footer">
	<h2>Want to chat? I do.</h2>
	<p>Let's connect. I would love to hear from you.</p>

	<ul>
		<li></li>
	</ul>
</footer>

<style>
	.footer {
		--color-font: var(--color-apricot-light);
		padding: calc(2 * var(--gap)) var(--gap) calc(3 * var(--gap)) var(--gap);
		background-color: var(--color-purple);
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
</style>
