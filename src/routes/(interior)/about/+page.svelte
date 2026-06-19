<script lang="ts">
	import { marked } from "marked";
	import Resume from "./_components/Resume.svelte";
	import aboutMeMarkdown from "./aboutMe.md?raw";

	const aboutMeHtml = marked.parse(aboutMeMarkdown, { async: false });
</script>

<div class="stack">
	{@html aboutMeHtml}
</div>
<Resume></Resume>

<figure class="portrait">
	<img
		width="250"
		height="250"
		class="portrait"
		src="/img/ryanmarx2.jpg"
		alt="a headshot portrait of Ryan Marx, who is wearing mirrored sunglassess and grinning somewhat deviously." />
</figure>

<style>
	.portrait {
		display: none;
		position: absolute;
		top: calc(var(--nav-height)+ var(--gap));
		left: var(--gap);
		width: calc(var(--gutter-width) - (2 * var(--gap)));
		overflow: hidden;
		border-radius: 50%;
		aspect-ratio: 1/1;

		img {
			width: 100%;
			height: 100%;
		}
	}
</style>
