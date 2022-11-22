<script>
	import WorkItem from "./WorkItem.svelte";

	const work = [
		{
			start: 2018,
			end: "present",
			org: "Gannett",
			orgLink: "https://www.usatoday.com/",
			role: "Storytelling developer",
			description:
				"The Gannett Storytelling Studio is a skunkworks-like team who work on narrative experiences that fall outside the tradition article or photograph. We collaborate with newsrooms across the country to do journalism with our own custom-built tools, frameworks and ad-hoc applications.",
		},
		{
			start: 2010,
			end: 2018,
			org: "Chicago Tribune",
			orgLink: "https://www.chicagotribune.com/",
			role: "Assistant DataViz Editor, Graphic reporter",
			description:
				"Developed digital online experiences, and even a few custom-built investigation articles, for news, sports, business, features and beyond. I was central to developing our team's digital strategy and technology stack.",
		},
		{
			start: 2005,
			end: 2010,
			org: "The Times of Northwest Indiana",
			orgLink: "https://www.nwi.com/",
			role: "Designer, Graphics Editor",
			description:
				"I designed newspaper pages and graphics for all sections and contributed digital presentation and graphics (expecially around election time). ",
		},
		{
			start: 2002,
			end: 2005,
			orgLink: "https://www.thenewsenterprise.com/",
			org: "The News-Enterprise",
			role: "Copy editor, Presentation Editor",
			description:
				"I designed newspaper pages and graphics for all sections, edited copy and helped coordinate entertainment coverage ",
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
			ux design, I find the important messages and express them in the best ways
			possible. Sometimes all it takes is a few carefully chosen words. More often,
			however, the effort involves distilling mountains of information into meaningful
			and enjoyable experiences. This makes repeat customers out of media consumers.
		</p>
		<p>
			It's important to know when to collaborate, delegate and run solo. Success
			requires juggling the needs of multiple audiences on multiple platforms, and being
			a quick study doesn't hurt either. (All while on deadline, of course.)
		</p>

		<h3 class="header">How I work</h3>
		<p>
			For starters, I work well with others. As a group, we need to discover our true
			goals, define them clearly, and consider our resources. A well-scoped project is
			important to success and I always try to do things the "right way" within that
			scope. This includes accessible design and construction of web experiences.
			Inclusivity is not an option.
		</p>
		<p>
			I speak fluent front-end: <strong>HTML</strong>, <strong>CSS</strong> and
			<strong>Javascript</strong>. I can get around with <strong>Python</strong> and
			<strong>Go</strong>. I'm a big fan of the SvelteJS framework. I also know others
			(including Wordpress). I like Github Actions and using Google as an ad-hoc CMS.
		</p>
		<p>
			I like to document things. It's important and future me needs a lot of help. I
			even write notes to myself, such as grocery lists, in markdown.
		</p>
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
