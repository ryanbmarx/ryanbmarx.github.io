<script lang="ts">
	interface Network {
		label: string;
		icon: string;
		url: string;
		rel?: string | null;
		target?: string | null;
	}

	const networks: Network[] = [
		{ label: "Github", icon: "github", url: "https://github.com/ryanbmarx" },
		{
			label: "LinkedIn",
			icon: "linkedin",
			url: "https://www.linkedin.com/in/ryanbmarx/",
		},
		{
			label: "Email",
			icon: "email",
			url: "mailto:ryanbmarx+homepage@gmail.com",
		},
	];
</script>

<ul class="contact__social">
	{#each networks as { label, icon, url, rel = null, target = null }}
		<li class="contact__link contact__link--{label}">
			<a href={url} {target} {rel}>
				{label}
			</a>
		</li>
	{/each}
</ul>

<!-- <img src="/img/mouth.jpg" /> -->
<!-- <img src="/img/mouth2.png" /> -->
<!-- <img src="/img/person.jpg" /> -->

<style>
	img {
		mix-blend-mode: multiply;
		max-width: 15rem;
		margin: 2rem auto 15rem auto;
	}

	.contact__social {
		display: flex;
		/* justify-content: center; */
		/* align-items: center; */
		list-style: none;
		gap: var(--gap);
		padding: 0;
		margin: 0;
	}

	/* a {
		background: var(--color-isabelline);
		color: var(--color-background);
		box-sizing: border-box;
		border: 1px solid transparent;

		display: flex;
		align-items: center;
		justify-content: center;
	} */
	/* a:hover {
		background: var(--color-apricot-light);
	} */

	.icon {
		fill: black;
		width: 2rem;
		height: 4rem;
	}

	a::before {
		content: none;
	}
	a:focus {
		outline: 2px solid var(--color-link);
	}

	@media all and (min-width: 768px) {
		.contact {
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
			gap: var(--gap);
		}
		.contact__text {
			font-size: 1.5rem;
			margin: 0;
		}
	}
</style>
