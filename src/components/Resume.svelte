<script lang="ts">
	type WorkItem = {
		start: number;
		end: string | number;
		org: string;
		orgLink: string;
		role: string;
		description: string;
	};

	const work: WorkItem[] = [
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
			role: "Developer, news applications",
			description:
				"My team — The Storytelling Studio — collaborated with newsrooms across the company to facilitate top-notch storytelling by developing tools, frameworks and custom experiences. We empowered our partners in more than 200 newsrooms across the country. We used an agile, human-centered approach as we iteratively tested our hypotheses and refined our goals. Journalists often approached us with their centerpiece work and a desire to maximize its impact. We built our tools from end to end to achieve a facility on our company's infrastructure and a alignment of technologies that wouldn't otherwise exist.",
		},
		{
			start: 2013,
			end: 2018,
			org: "Chicago Tribune",
			orgLink: "https://www.chicagotribune.com/",
			role: "Assistant Data Visualization Editor",
			description:
				"I helped coordinate the efforts of all graphic reporters and artists across long- and short-term projects while leading our transformation into a digital-focused team. I helped develop technology stacks, templates and best practices for everything from static graphics to fully composed articles and interactives. Though the graphics team was full of expert artists and journalists, our digital abilities were minimal. For our transformation to succeed, the plan needed to include everyone and, thus, a key responsibility for me was to serve as a coach/mentor to help us all contribute to our digital growth.",
		},
		{
			start: 2010,
			end: 2013,
			org: "Chicago Tribune",
			orgLink: "https://www.chicagotribune.com/",
			role: "Data visualization Coordinator",
			description:
				"I worked with business editors, reporters and columnists to identify and prioritize graphic opportunities for the daily business section and special projects. I participated in long- and short-term planning to devise digital experiences to enhance the daily and weekly coverage.",
		},
		// {
		// 	start: 2009,
		// 	end: 2010,
		// 	org: "The Times of Northwest Indiana",
		// 	orgLink: "https://www.nwi.com/",
		// 	role: "Graphics Editor",
		// 	description:
		// 		"I identified and executed visual storytelling opportunities for the news, sports, business and features sections in print and online. I also worked to expand the nwi.com scope and community with online-only content.",
		// },
		// {
		// 	start: 2005,
		// 	end: 2009,
		// 	org: "The Times of Northwest Indiana",
		// 	orgLink: "https://www.nwi.com/",
		// 	role: "Designer",
		// 	description:
		// 		"My primary responsibility was combining photos, typography and copy into sharp, tightly edited presentations representing sound news judgment. I worked with editors, photographers and reporters to facilitate not only a compelling presentation but also a smooth production process. I designed newspaper pages and graphics for all sections and contributed digital presentation and graphics (especially around election time). ",
		// },
		// {
		// 	start: 2002,
		// 	end: 2005,
		// 	orgLink: "https://www.thenewsenterprise.com/",
		// 	org: "The News-Enterprise",
		// 	role: "Copy editor, Presentation Editor",
		// 	description:
		// 		"I designed newspaper pages and graphics for all sections, edited copy and helped coordinate entertainment coverage and special projects. I also helped guide the overall look and feel of the paper while coaching teammates on visual matters.",
		// },
	];
</script>

<ul class="stack resume">
	{#each work as { start, end, orgLink, org, role, description }}
		<li class="">
			<h3 class="title">{role} — <a href={orgLink}>{org}</a></h3>
			<p class="dates">{start} – {end}</p>
			<p class="description">{@html description}</p>
		</li>
	{/each}
</ul>

<style>
	.resume {
		--timeline-dot: 0.75rem;
		--timeline-gap: 3rem;
		--timeline-color: light-dark(#8f979a, var(--color-apricot-light));
		overflow: hidden;
		position: relative;
		padding-left: var(--timeline-gap);

		&::after {
			content: "";
			display: block;
			width: 0px;
			height: 100%;
			position: absolute;
			left: calc(var(--timeline-dot) / 2);
			top: 1em;
			width: 1px;
			background-color: var(--timeline-color);
			/* border-left: 2px solid var(--timeline-color); */
			transform: translate(-50%, 0);
		}
	}

	.title {
		position: relative;

		&::before {
			/* The dot */
			content: "";
			display: block;
			height: var(--timeline-dot);
			width: var(--timeline-dot);
			background-color: var(--timeline-color);
			border-radius: 50%;

			position: absolute;
			right: calc(100% + var(--timeline-gap) - var(--timeline-dot));
			top: calc(var(--line-height-loose) / 2);
			transform: translate(0, -50%);
		}
		a {
			color: inherit;
		}
	}
	.dates {
		font-style: italic;
		font-size: var(--font-size-small);
	}

	.description {
		font-size: var(--font-size-small);
	}

	li {
		--gap: 0.25rem;
	}
</style>
