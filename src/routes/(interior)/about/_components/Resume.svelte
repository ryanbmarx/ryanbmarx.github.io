<script lang="ts">
	import { marked } from "marked";

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
			description: [
				"- I develop a refined, intuitive interface for a web-based application offering workforce fatigue management solutions. We use GraphQL, TypeScript, and SvelteKit to deliver actionable insights in real time.",
				"- I work with other engineers, product leadership, and customers to refine the end-user experience and contribute to roadmap planning.",
				"- I am developing the company's first end-to-end testing strategy using Playwright.",
			].join("\n"),
		},
		{
			start: 2018,
			end: 2023,
			org: "Gannett",
			orgLink: "https://www.usatoday.com/",
			role: "Developer, news applications",
			description: [
				"- As part of Gannett's experimental Storytelling Studio, I helped craft top-notch storytelling by developing tools, frameworks and custom experiences. I often wore multiple hats in any given project, including designer, developer, project manager as I worked with news teams across the company",
				"- We used an agile, human-centered approach as we iteratively tested our hypotheses and refined our goals. Journalists often approached us with their centerpiece work and a desire to maximize its impact.",
				"- We built our tools from end to end, to use our company's infrastructure in new and creative ways while emnpowering our collabotors to supercharge their best work.",
			].join("\n"),
		},
		{
			start: 2013,
			end: 2018,
			org: "Chicago Tribune",
			orgLink: "https://www.chicagotribune.com/",
			role: "Assistant Data Visualization Editor",
			description: [
				"- I worked with the team editor to coordinate the efforts of all graphic reporters and artists across long- and short-term projects.",
				"- I led our teams conversion from a print-focused group to a digital-first team. I helped develop our technology stacks, templates and best practices for everything from static graphics to fully composed articles and interactives.",
			].join("\n"),
		},
		{
			start: 2010,
			end: 2013,
			org: "Chicago Tribune",
			orgLink: "https://www.chicagotribune.com/",
			role: "Data visualization Coordinator",
			description: [
				"- I worked with business editors, reporters and columnists to identify and prioritize graphic opportunities for the daily business section and special projects.",
				"- I participated in long- and short-term planning to devise digital experiences to enhance the daily and weekly coverage.",
			].join("\n"),
		},
		{
			start: 2009,
			end: 2010,
			org: "The Times of Northwest Indiana",
			orgLink: "https://www.nwi.com/",
			role: "Graphics Editor",
			description: [
				"- I identified and executed visual storytelling opportunities for the news, sports, business, and features sections in print and online.",
				"- I also worked to expand the nwi.com scope and community with online-only content.",
			].join("\n"),
		},
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
	{#each work as { start, end, orgLink, org, role, description } (start)}
		<li class="">
			<h3 class="title">{role} — <a href={orgLink}>{org}</a></h3>
			<p class="dates">{start} – {end}</p>
			<div class="description">{@html marked.parse(description)}</div>
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

		:global {
			ul {
				--gap: 1rem;
				list-style: disc;
				padding-left: var(--gap);
				margin-top: var(--gap);

				li {
					margin-bottom: calc(var(--gap) / 2);
				}
			}
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
