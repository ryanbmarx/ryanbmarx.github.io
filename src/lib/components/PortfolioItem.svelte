<script lang="ts">
	import { marked } from "marked";

	import { type PorfolioItemType } from "../../routes/(interior)/projects/items";
	import ButtonGithub from "./ButtonGithub.svelte";

	const {
		label,
		date,
		description,
		image,
		links: rawLinks = [],
		repo = null,
	}: PorfolioItemType = $props();

	const links = $derived(rawLinks.filter(l => !l.archived));
</script>

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
	{#if date}<span class="project__date">Published: {date}</span>{/if}
	{@html marked.parse(description)}
	<ButtonGithub {repo} />
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
					href={link}>
					{headline || link}</a>
			</li>
		{/each}
	</ul>
</li>

<style>
	.project__image {
		overflow: hidden;
		border: 1px solid light-dark(var(--color-gray-light), var(--color-slate));

		.project__image__img {
			display: block;
			width: 100%;
			height: auto;
			transition: transform 150ms ease-in-out;

			&:hover {
				transform: scale(1.1) rotate(3deg);
			}
		}
	}

	.project__date {
		font: bold var(--font-size-very-small) / var(--line-height) var(--sans-serif-fonts);
		color: light-dark(var(--color-purple), var(--color-blue));
		margin-top: calc(-1 * var(--gap));
	}

	.links {
		--arrow-width: 1em;
		list-style: none;
		margin: 0;
		padding: 0;

		li {
			padding-left: calc(var(--arrow-width) + 0.5em);
			margin-bottom: 0.5rem;
			position: relative;

			&::before {
				content: "\2192";
				display: block;
				width: var(--arrow-width);
				position: absolute;
				left: 0;
			}
		}
	}

	.link {
		display: inline-block;
		min-height: var(--tap-target);
		font-weight: bold;
	}
</style>
