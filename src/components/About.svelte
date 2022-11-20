<script>
	import WorkItem from "./WorkItem.svelte";

	const work = [
		{
			start: 2017,
			end: "present",
			org: "Gannett",
			role: "Storytelling developer",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			start: 2010,
			end: 2017,
			org: "Chicago Tribune",
			role: "Graphics, Assistant DataViz Editor",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			start: 2005,
			end: 2010,
			org: "The Times of Northwest Indiana (Munster, Ind.)",
			role: "Designer, Graphics Editor",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			start: 2002,
			end: 2005,
			org: "The News-Enterprise (Elizabethtown, Ky.)",
			role: "Copy editor, designer, Presentation Editor",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
	];
</script>

<style>
	.about {
		background: var(--color-isabelline);
		display: flex;
		align-items: start;
		gap: var(--gap);
		flex-wrap: wrap;
	}
	.bio {
		flex: 4 4 25rem;
	}
	.header--intro {
		font-size: 3rem;
	}

	.work {
		flex: 1 1 15rem;
		padding: var(--gap);
		background: var(--color-apricot-light);
	}

	.work ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>

<section aria-labelledby="about-header" class="about container">
	<div class="bio stack">
		<h2 id="about-header" class="header header--intro">Hi. I'm Ryan.</h2>
		<p>
			I've spent my career in communications — specifically, the information
			communications business. Through information visualization, writing, editing and
			design, I find the important messages and express them in the best ways possible.
			Sometimes I reach this goal with a few carefully chosen words. More often,
			however, the effort involves distilling mountains of information into meaningful
			and enjoyable experiences. This makes repeat customers out of consumers of media.
		</p>
		<p>
			Having a leadership role in a high-pressure, results-oriented newsroom presents a
			mountain of challenges. It's important to know when to collaborate, delegate and
			run solo. Success requires juggling the needs of multiple audiences on multiple
			platforms, and being a quick study doesn't hurt either. (All while on deadline, of
			course.)
		</p>

		<h3 class="header">How I work</h3>
		<p>
			For starters, I work well with others. As a group, we need to discover our true
			goals, express them clearly, and consider our resrouces.
		</p>
		<p>
			I speak fluent <strong>HTML</strong>, <strong>CSS</strong> and
			<strong>Javascript</strong>. I can get around with <strong>Python</strong> and
			<strong>Go</strong>. I'm a big fan of the SvelteJS framework. I also know others
			(including Wordpress). I like Github Actions using Google as an ad-hoc CMS.
		</p>
		<p>I collaborate and try to always do things the _right_ way.</p>
		<p>I like to document things. It's important and future me needs a lot of help.</p>
	</div>
	<div class="work">
		<h2 class="header">Experience</h2>
		<ul class="work__list stack">
			{#each work as w}
				<WorkItem {...w} />
			{/each}
		</ul>
	</div>
</section>
