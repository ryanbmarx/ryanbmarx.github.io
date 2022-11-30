<script>
	import { marked } from "marked";

	import Tags from "./Tags.svelte";
	import ButtonGithub from "./ButtonGithub.svelte";

	// export let tagDefinitions = {};
	export let label;
	export let date;
	export let description;
	export let image;
	export let links = [];
	export let repo = null;
	export let tags = [];
	export let tagDefinitions = {};
</script>

<style>
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

	.project__date {
		font: bold var(--font-size-very-small) / var(--line-height) var(--sans-serif-fonts);
		color: var(--color-purple);
		margin-top: calc(-1 * var(--gap));
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
</style>

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
	<Tags {tags} {tagDefinitions} />
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
