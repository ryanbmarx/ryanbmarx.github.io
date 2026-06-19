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
