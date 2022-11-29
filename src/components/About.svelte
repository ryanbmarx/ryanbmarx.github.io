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
				"My team — The Storytelling Studio — collaborates with newsrooms across the company to facilitate top-notch storytelling by developing tools, frameworks and custom experiences to empower our partners in more than 200 newsrooms across the country. We use an agile, human-centered approach as we iteratively test our hypotheses and refine our goals. Journalists often approach us with their centerpiece work and a desire to maximize its impact. We build our tools from end to end to achieve a facility on our company's infrastructure and a alignment of technologies that wouldn't otherwise exist.",
		},
		{
			start: 2013,
			end: 2018,
			org: "Chicago Tribune",
			orgLink: "https://www.chicagotribune.com/",
			role: "Assistant DataViz Editor",
			description:
				"I helped coordinate the efforts of all graphic reporters and artists across long- and short-term projects while leading our transformation into a digital-focused team. I helped develop technology stacks, templates and best practices for everything from static graphics to fully composed articles and interactives. Though the graphics team was full of expert artists and journalists, our digital abilities were minimal. For our transformation to succeed, the plan needed to include everyone and, thus, a key responsibility for me was to serve as a coach/mentor to help us all contribute to our digital growth.",
		},
		{
			start: 2010,
			end: 2013,
			org: "Chicago Tribune",
			orgLink: "https://www.chicagotribune.com/",
			role: "Graphics Coordinator, Business",
			description:
				"I worked with business editors, reporters and columnists to identify and prioritize graphic opportunities for the daily business section and special projects. I participated in long- and short-term planning to devise digital experiences to enhance the daily and weekly coverage.",
		},
		{
			start: 2009,
			end: 2010,
			org: "The Times of Northwest Indiana",
			orgLink: "https://www.nwi.com/",
			role: "Graphics Editor",
			description:
				"I identified and executed visual storytelling opportunities for the news, sports, business and features sections in print and online. I also worked to expand the nwi.com scope and community with online-only content.",
		},
		{
			start: 2005,
			end: 2009,
			org: "The Times of Northwest Indiana",
			orgLink: "https://www.nwi.com/",
			role: "Designer",
			description:
				"My primary responsibility was combining photos, typography and copy into sharp, tightly edited presentations representing sound news judgment. I worked with editors, photographers and reporters to facilitate not only a compelling presentation but also a smooth production process. I designed newspaper pages and graphics for all sections and contributed digital presentation and graphics (especially around election time). ",
		},
		{
			start: 2002,
			end: 2005,
			orgLink: "https://www.thenewsenterprise.com/",
			org: "The News-Enterprise",
			role: "Copy editor, Presentation Editor",
			description:
				"I designed newspaper pages and graphics for all sections, edited copy and helped coordinate entertainment coverage and special projects. I also helped guide the overall look and feel of the paper while coaching teammates on visual matters.",
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
		flex: 1 1 20rem;
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
			I am a journalist, designer and developer based in Chicago, and I've spent my
			career in the information communications business. Through visualization, writing,
			editing and ux design, I find the important messages and express them in the best
			ways possible.
		</p>
		<p>
			Throughout the years, I've made it all: small static charts, large featured
			interactives, standalone presentations and dashboard user interfaces. Each format
			has its place, and choosing the right one for the job is a delicate, practical
			art.
		</p>
		<p>
			Whether the solution is a few carefully chosen words or something more, the goal
			always is to distill mountains of information into meaningful and empowering
			experiences. This makes repeat customers out of media consumers.
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
			important to success and, when it comes to data management, app architecture and
			inclusive design, I always try to do things the "right way" within that scope.
		</p>
		<p>
			I speak fluent front-end: <strong>HTML</strong>, <strong>CSS</strong> and
			<strong>Javascript</strong>. I know my way around Node and can get things done
			with <strong>Python</strong> and <strong>Go</strong>. I'm a big fan of the
			Svelte.js framework. I also know others (including <strong>Wordpress</strong>). I
			like <strong>Github Actions</strong> and using
			<strong>Google Spreadsheets</strong> as an ad-hoc CMS.
		</p>
		<p>
			I appreciate good, useful documentation. From others, for the tools I'm using.
			Also to me from my previous self. Future me needs a lot of help.
		</p>
	</div>
	<div class="work">
		<h2 class="header">Experience</h2>
		<ul class="work__list stack">
			{#each work as w, index}
				<WorkItem {...w} open={index === 0} />
			{/each}
		</ul>
	</div>
</section>
