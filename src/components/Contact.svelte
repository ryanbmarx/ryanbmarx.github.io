<script>
	export let label = "Are you ready to get started? Let's talk:";
	let networks = [
		{
			label: "Mastodon",
			icon: "mastodon",
			rel: "me",
			url: "https://home.social/@ryanbmarx",
		},
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
		{ label: "Twitter", icon: "twitter", url: "https://www.twitter.com/ryanmarx" },
	];

	// So we can have unique IDs even with multiple component instances
	const rand = Math.random();
</script>

<style>
	.contact {
		--color-background: var(--color-slate);
		background: var(--color-background);
		padding: var(--gap) var(--gap);
	}
	.contact__text {
		text-align: center;
		margin: 0 0 var(--gap) 0;
		color: var(--color-apricot-light);
	}

	.contact__social {
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		gap: 0.5rem;
		padding: 0;
		margin: 0;
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
		height: 3rem;
		width: 3rem;

		font-size: 30px;
	}
	a:hover {
		background: var(--color-apricot-light);
	}

	.icon {
		fill: black;
		width: 65%;
		height: 65%;
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

<section class="contact" aria-labelledby="contact-header-{rand}">
	<h2 id="contact-header-{rand}" class="header contact__text">
		{label}
	</h2>
	<ul class="contact__social">
		{#each networks as { label, icon, url, rel = null, target = null }}
			<li class="contact__link contact__link--{label}">
				<a href={url} {target} {rel} tabindex="0">
					<span class="visually-hidden">Visit me on {label}</span>
					<svg class="icon">
						<title>{label} icon</title>
						<use href="#{icon}" />
					</svg>
				</a>
			</li>
		{/each}
	</ul>
</section>
