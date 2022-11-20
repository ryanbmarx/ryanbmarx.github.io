<script>
	let networks = [
		{ label: "Twitter", icon: "twitter", url: "https://www.twitter.com/ryanmarx" },
		{ label: "Github", icon: "github", url: "https://github.com/ryanbmarx" },
		{
			label: "Instagram",
			icon: "instagram",
			url: "https://www.instagram.com/ryanmarx/",
		},
		{
			label: "LinkedIn",
			icon: "linkedin",
			url: "https://www.linkedin.com/in/ryanbmarx/",
		},
	];
</script>

<style>
	.contact {
		--color-background: var(--color-slate);
		background: var(--color-background);
		padding: var(--gap) var(--gap);
	}
	.contact__text {
		font: 1rem/1.3em var(--sans-serif-fonts);
		font-weight: bold;
		text-align: center;
		margin: 0 0 calc(var(--gap) / 2) 0;
		color: var(--color-apricot-light);
	}

	.contact__social {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.contact__link {
		margin-right: 10px;
	}
	.contact__link:last-child {
		margin-right: 0;
	}

	a {
		background: var(--color-isabelline);
		color: var(--color-background);
		box-sizing: border-box;
		border: 1px solid transparent;

		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: 50%;
		height: 40px;
		width: 40px;

		font-size: 30px;
	}
	a:hover {
		background: var(--color-apricot-light);
	}

	.contact--email a {
		font-size: 25px;
	}

	@media all and (min-width: 768px) {
		.contact {
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
		}
		.contact__text {
			font-size: 23px;
			margin: 0 calc(var(--gap) / 2) 0 0;
		}
	}
</style>

<section class="contact" aria-labelledby="contact-header">
	<h2 id="contact-header" class="contact__text">
		Are you ready to get started? Let's talk:
	</h2>
	<ul class="contact__social">
		{#each networks as { label, icon, url }}
			<li class="contact__link contact__link--{label}">
				<a
					href={url}
					aria-label="Visit me on {label}"
					target="_blank"
					rel="noopener noreferrer">
					<span class="sr-only">Visit me on {label}</span>
					<i class="fab fa-{icon}" />
				</a>
			</li>
		{/each}
		<li class="contact__link contact__link--email">
			<a href="mailto:ryanbmarx@gmail.com" aria-label="Email me">
				<span class="sr-only">Email me</span>
				<i class="fal fa-envelope" />
			</a>
		</li>
	</ul>
</section>
