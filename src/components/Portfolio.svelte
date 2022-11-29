<script>
	// UTILS
	import { marked } from "marked";
	import { getContext } from "svelte";

	// COMPONENTS
	import PortfolioItem from "./PortfolioItem.svelte";

	// TEXT BITS
	const label = "Selected work";
	const tagsLabel = "About the labels";
	const sublabel =
		"These are projects to which I made significant contributions. I've included links to code repositories where possible. Some of these links are older and, given the nature of the web and media businesses, are no longer available or fully functional in the current environment. I've included them anyways because I remain proud of that work, but they are labeled <span class=\"tag\">impaired</span>.";

	// DATA
	const { tagDefinitions, portfolioItems } = getContext("ryanbmarx");
</script>

<style>
	.header {
		margin: 0;
	}

	/* .subheader {
		margin-top: 0;
	} */

	.projects {
		--arrow-width: 1em;
		list-style: none;
		margin: 0;
		padding: 0;

		display: grid;
		gap: calc(2 * var(--gap));
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
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
		/* background-color: var(--color-purple); */
		/* color: var(--color-gray-light); */
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
		{#each portfolioItems.filter(p => p.label && p.description && p.image) as p}
			<PortfolioItem {...p} />
		{/each}
	</ul>
</section>
