<script lang="ts">
	import WorkItem, { type WorkItem as WorkItemType } from "./WorkItem.svelte";

	const work: WorkItemType[] = [
		{
			start: 2023,
			end: "present",
			org: "Pulsar Informatics",
			orgLink: "https://www.pulsarinformatics.com/",
			role: "UX software engineer",
			description:
				"I am a key developer on a web-based application offering workforce fatigue management solutions. We use GraphQL, TypeScript, and SvelteKit to deliver actionable insights in real time. I collaborate cross-functionally with other engineering teams, product leadership, and customers to refine the end-user experience and contribute to roadmap planning.",
		},
		{
			start: 2018,
			end: 2023,
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

<section aria-labelledby="about-header" class="about container">
	<div class="bio stack">
		<h2 id="about-header" class="header header--intro">
			Hello. My name is Ryan. <br /> It's nice to meet you.
		</h2>
		<p>
			I'm a designer, developer, and problem solver based in the Chicago area. I use
			visualization, development, UX design, writing, and editing to dig past
			surface-level asks and quickly deliver what's actually needed.
		</p>
		<p>
			Each step of my career has been spent working in cross-functional capacities,
			helping disparate teams communicate and collaborate on shared goals. Whether I'm
			designing, developing, or just managing a project, I bring a vigorous
			human-focused approach, keeping everyone's eyes on the final product. This
			requires speaking technology with content creators and content creation with
			technologists, cutting through friction so work moves forward without bottlenecks.
		</p>
		<p>
			Knowing when to collaborate, delegate, and run solo is an important skill. Success
			requires juggling the needs of multiple audiences on multiple platforms on
			deadline, and being a quick study who can ramp up and ship without a lengthy
			runway.
		</p>
		<p>
			Throughout the years, I've made it all: featured interactives, standalone
			presentations, and dashboard user interfaces. Each format has its place, and
			choosing the right one for the job is a delicate, practical art. Whether the
			solution is a few carefully chosen words or something more, the goal always is to
			distill mountains of information into meaningful and empowering
			experiences—efficiently, without unnecessary complexity.
		</p>

		<h3 class="header">How I work</h3>
		<p>
			I work well with others. As a group, we need to discover our true goals, define
			them clearly, and consider our resources. A well-scoped project is important to
			success and, when it comes to data management, app architecture and inclusive
			design, I always try to do things the "right way" within that scope—building lean
			solutions that don't sacrifice quality for speed or speed for quality.
		</p>
		<p>
			I speak fluent front-end: <strong>HTML</strong>, <strong>CSS</strong> and
			<strong>JavaScript</strong>. I know my way around Node and can get things done
			with <strong>Python</strong> and <strong>Go</strong>. I'm a big fan of the
			<strong>SvelteKit</strong> framework for its ability to move quickly from
			prototype to production. I also know others (including <strong>Vue.js</strong> and
			<strong>WordPress</strong>). I like <strong>GitHub Actions</strong> and using
			<strong>Google Spreadsheets</strong> as an ad-hoc CMS—whatever gets the job done well
			without overengineering.
		</p>
		<p>Let's talk. I look forward to hearing from you.</p>
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
