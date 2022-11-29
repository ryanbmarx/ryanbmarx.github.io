<script>
	// UTILS
	import { marked } from "marked";

	// COMPONENTS
	import Tags from "./Tags.svelte";

	// DATA
	export let portfolio = [];
	export let tagDefinitions = {};

	const label = "Selected work";
	const tagsLabel = "About the labels";
	const sublabel =
		"These are projects to which I made significant contributions. I've included links to code repositories where possible. Some of these links are older and, given the nature of the web and media businesses, are no longer available or fully functional in the current environment. I've included them anyways because I remain proud of that work, but they are labeled <span class=\"tag\">impaired</span>.";
</script>

<style>
	.header {
		margin: 0;
	}

	.subheader {
		margin-top: 0;
	}

	.projects {
		--arrow-width: 1em;
		list-style: none;
		margin: 0;
		padding: 0;

		display: grid;
		gap: calc(2 * var(--gap));
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	}

	.project__image {
		overflow: hidden;
		border: 1px solid var(--color-gray-light);
	}
	.project__image__img {
		display: block;
		width: 100%;
		height: auto;
		transition: transform 150ms ease-in-out;
	}
	.project__image__img:hover {
		transform: scale(1.1) rotate(3deg);
	}

	.project__repo {
		border: none;
		width: fit-content;
		padding: 0.5rem;
		margin: 0;
		text-decoration: none;
		background-color: var(--color-slate);
		color: white;

		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.project__repo__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 1.5rem;
		width: 1.5rem;
		background-color: white;
		border-radius: 50%;
	}
	.project__repo__icon svg {
		width: 65%;
		height: 65%;
	}
	.links {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.links li {
		padding: 0 0 0 calc(var(--arrow-width) + 0.5em);
		position: relative;
		margin: 0 0 0.5rem 0;
	}
	.links li::before {
		content: "\2192";
		display: block;
		width: var(--arrow-width);
		height: var(--arrow-width);
		position: absolute;
		left: 0;
	}

	.link {
		display: inline-block;
		min-height: var(--tap-target);
		font-weight: bold;
	}

	.portfolio__definitions {
		margin: var(--gap) 0;
	}
	.portfolio__definitions__list {
		display: grid;
		gap: calc(0.5 * var(--gap)) var(--gap);
		grid-template-rows: auto;
		grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
		padding: var(--gap);
		background-color: var(--color-purple-light);
		margin-bottom: calc(2 * var(--gap));
	}
	.portfolio__definitions__label {
		cursor: pointer;
		font: bold var(--font-size-small) / var(--line-height) var(--sans-serif-fonts);
		/* Extra padding to boost tap target */
		padding: var(--gap) 0;
	}
	.portfolio__definitions__name.tag {
		font: bold var(--font-size-small) / var(--line-height) var(--sans-serif-fonts);
		margin: 0 0 0.5rem 0;
		border-width: 2px;
	}

	.portfolio__definitions__text {
		padding: 0;
		margin: 0;
	}

	:global(.tag) {
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		background-color: var(--color-purple);
		color: var(--color-gray-light);
		font: bold var(--font-size-very-small) / var(--line-height) var(--sans-serif-fonts);
		text-transform: uppercase;

		border: 1px solid var(--color-purple);
		color: var(--color-purple);
		background-color: transparent;
		transition: background-color var(--speed-transition) ease-in-out;
	}
</style>

<section id="portfolio" class="container" aria-labelledby="portfolio-header">
	<h2 id="portfolio-header" class="header">{label}</h2>
	<p>{@html marked.parseInline(sublabel)}</p>
	<details class="portfolio__definitions">
		<summary class="portfolio__definitions__label">{tagsLabel}</summary>
		<dl class="portfolio__definitions__list">
			{#each Object.entries(tagDefinitions) as [id, { label, description }]}
				<div class="portfolio__definitions__tag">
					<dt class="portfolio__definitions__name tag">{label}</dt>
					<dd class="portfolio__definitions__text sans-serif">
						{@html marked.parseInline(description)}
					</dd>
				</div>
			{/each}
		</dl>
	</details>
	<ul class="projects">
		{#each portfolio as { label, description, image, links = [], repo = null, tags = [] }}
			<li class="project stack">
				<div class="project__image">
					<img
						class="project__image__img"
						src="thumbs/{image}"
						alt=""
						loading="lazy"
						height="9"
						width="16" />
				</div>
				<h3 class="label">{label}</h3>
				<Tags {tags} />
				{@html marked.parse(description)}
				{#if repo}
					<a class="project__repo sans-serif" href={repo}>
						<span class="project__repo__icon">
							<svg>
								<title>Github logo</title>
								<use href="#github" />
							</svg>
						</span>
						See the code
					</a>
				{/if}
				{#if links.length > 1}
					<h4 class="sublabel">Examples:</h4>
				{/if}
				<ul class="links">
					{#each links as { headline, link }}
						<li>
							<a
								class="link sans-serif"
								target="_blank"
								rel="noopener noreferrer"
								href={link}>{headline || link}</a>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</section>
