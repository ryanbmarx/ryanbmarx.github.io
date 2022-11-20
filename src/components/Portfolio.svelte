<script>
	const sublabel = "Projects to which I made significant contributions";
	const portfolio = [
		{
			image: "design-a-kit.png",
			label: "World Cup: Design your own uniform",
			links: [
				{
					headline: "Design a World Cup 2022 kit",
					link: "https://www.usatoday.com/storytelling/world-cup-jersey-design-your-own/",
				},
			],
			description:
				"I designed the initial wireframes and, eventually, developed this web app, with a focus on scaffolding and UX. I worked with two other developers to incorporate the 3D modeling. Optimizing the mobile performance was a challenge, given the sheer volume of patterns/textures and other related files needed to make this a fun experience.",
		},
		{
			image: "quiz.png",
			label: "The USA TODAY News Quiz",
			links: [
				{
					headline: "Test your knowledge with the USA TODAY news quiz",
					link: "https://www.usatoday.com/storytelling/weekly-news-quiz/",
				},
				{
					headline:
						"Quiz: How well do you know the Sibley's building in downtown Rochester?",
					link: "https://www.democratandchronicle.com/storytelling/sibley-building-downtown-rochester-ny-quiz/",
				},
			],
			description:
				"Sometimes the news can and should be fun. Part of our ongoing 'news play' experiments, this quiz framework has been used to create topical and evergreen quizzes for 6 different news properties, and has been published weekly  by USA TODAY for more than two years. The primary business goals of this project was to drive reader registrations (not subscriptions). Thousands of quiztakers visited Gannett sign-up pages. To encourage habitual quiztaking, this frameworks supports the possibility of two different leaderboards — weekly and all-time — as well as syndication across Gannett properties.",
		},
		{
			label: "Cast of Characters",
			image: "cast.png",
			links: [
				{
					headline: "Meet the Teams: USA, Mexico and Canada",
					link: "https://www.usatoday.com/storytelling/grid/world-cup-2022-mens-roster-usa-mexico-canada/",
				},
				{
					headline:
						"Dozens of election-denying candidates are running for office in seven swing states. Here's what they've said or done.",
					link: "https://www.usatoday.com/storytelling/grid/election-deniers-running-for-office-2022/",
				},
				{
					headline:
						"Ohio Statehouse Corruption: Who you need to know in the federal bribery case",
					link: "https://www.cincinnati.com/storytelling/news/ohio-corruption-project/",
				},
			],
			description:
				"A developer friend-of-the-team asked us for help with the persistent need to make a \"Who's who\" dictionary of people for large investigative projects. We designed this page and built out a framework that pulls data from a Google spreadsheet and enriches it with some organizational tools and filtering/searching. We've tracked Capitol rioters, corrupt ohio officials and colleges that cheat. It's been used to display violence databases and sports rankings and has more configurable features than anything else I've made. There are about 30 published instances.",
		},

		{
			label: "In-Depth (toppers, layouts)",
			image: "fpo.png",
			links: [{ link: "https://google.com" }, { link: "https://google.com" }],
			description:
				"My team at Gannett is responsible for designing, engineering and maintaining the In-Depth article framework. This collection of tools enables more than 100 web producers across the company to craft visually stunning, reader-focused multimedia presentations using the everyday CMS and our own story editor.\n\nIt's been used to create more than 7,500 (as of December 2022) articles often representing the strongest, most impactful journalism the Gannett has to offer. It has generated hundreds of thousands of pageviews, a 2x increase in engaged time over standard templates and frequently leads to subscriber conversions.",
		},
		{
			label: "In-depth: Audiograms",
			image: "fpo.png",
			links: [{ link: "https://google.com" }, { link: "https://google.com" }],
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			label: "In-depth: SMS emulator",
			links: [{ link: "https://google.com" }, { link: "https://google.com" }],
			image: "fpo.png",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			label: "In-depth: Sliders",
			image: "fpo.png",
			links: [{ link: "https://google.com" }, { link: "https://google.com" }],
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
		{
			label: "FAQs but better: The Big Page of Help",
			image: "bpoh.png",
			links: [
				{
					headline: "Your guide to coronavirus and COVID-19",
					link: "https://www.usatoday.com/storytelling/covid19-coronavirus-resource-guide/",
				},
				{
					headline: "How to get help in Milwaukee",
					link: "https://www.jsonline.com/storytelling/milwaukee-resources-guide-housing-mental-health-education-public-safety-voting-employment-recycling/",
				},
				{
					headline:
						"The ultimate Palm Beach County voter guide to the November 2022 election",
					link: "https://www.palmbeachpost.com/storytelling/palm-beach-florida-election-voters-guide-2022/",
				},
			],
			description:
				"This concept was born in the early days of the Covid-19 pandemic. Our readers had lots of questions and needed easy access to the answers. Gannett was covering the heck out of the ordeal, but organizing that content in ways satisfy these specific, informational needs was difficult. Enter the big page of help.\n\nConstructed with SEO as a top priority, these experiences are intuitive and transactional. Individual questions are grouped by topic, and each question, by design, has an answer with more information available if desired.\n\nThe concept has been adapted for civic resources, hurricane preparedness and voting.",
		},
		{
			label: "Wildfire lookup",
			image: "wildfire.png",
			links: [
				{
					headline: "Wildfire risks: Look up every Western community",
					link: "https://www.azcentral.com/storytelling/wildfires-risks-map-california-arizona-oregon/",
				},
				{
					headline:
						"Where will the West's next deadly wildfire strike? The risks are everywhere",
					link: "https://www.azcentral.com/in-depth/news/local/arizona-wildfires/2019/07/22/wildfire-risks-more-than-500-spots-have-greater-hazard-than-paradise/1434502001/",
				},
			],
			description:
				"This collaboration with the Arizona Republic and the USA TODAY graphics team is a custom-build interface for a custom-built database of wildfire potential in the U.S. west. Each town is measured by a series of metrics calculating the probability that it could be consumed by wildfire. The application had a standalone instance with it's own URL, but it also was embedded into a handful of articles (built using the In-Depth framework) and pre-configured to display specific towns.",
		},
		{
			label: "Covituaries",
			image: "covituaries.png",
			links: [
				{
					headline: "Detroit Free Press: We will remember",
					link: "https://www.freep.com/storytelling/coronavirus-obituaries-michigan/",
				},
				{
					headline:
						"Loved and Lost: Remembering our NJ family, friends and neighbors taken by coronavirus",
					link: "https://www.usatoday.com/storytelling/nj-coronavirus-deaths/",
				},
				{
					headline:
						"Telling the stories of those who died in the Champlain Towers collapse in Surfside, Florida",
					link: "https://www.palmbeachpost.com/storytelling/news/surfside-miami-florida-building-collapse-victims-who-died-obituaries/",
				},
			],
			description:
				"The Covid-19 pandemic claimed at least 1.1 million Americans, and at least 6.6 million worldwide. This presentation was developed in conjunction with a newsroom in New Jersey as an artful, elegant and respectful way  to display the names of people who had died in the pandemic. It was adapted for use in Detroit and south Florida  for similar purposes.",
		},
		{
			label: "Cincy neighborhoods",
			image: "fpo.png",
			links: [
				{
					headline: "A statistical tour of Cincinnati: Breaking down the neighborhoods",
					link: "https://www.cincinnati.com/storytelling/cincinnati-neighborhoods/",
				},
				{
					headline: "A neighborhood report on Mount Adams",
					link: "https://www.cincinnati.com/storytelling/cincinnati-neighborhoods/neighborhoods/mount-adams/",
				},
				{
					headline: "A neighborhood comparison: Age, population older than 18",
					link: "https://www.cincinnati.com/storytelling/cincinnati-neighborhoods/metrics/over-age-18/",
				},
			],
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
	];
	const otherStuff = [
		{
			label: "The always popular year in photos",
			image: "fpo.png",
			links: [{ link: "https://google.com" }],
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		},
	];
</script>

<style>
	.projects {
		--arrow-width: 1em;
		list-style: none;
		margin: 0;
		padding: 0;

		display: grid;
		gap: calc(2 * var(--gap));
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	}

	.project {
	}

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

	.links {
		list-style: none;
		margin: 0;
		padding: 0;
		/* display: flex; */
		/* flex-wrap: wrap; */
	}

	.links li {
		padding: 0 0 0 calc(var(--arrow-width) + 0.5em);
		position: relative;
	}
	.links li::before {
		content: "\2192";
		display: block;
		width: var(--arrow-width);
		height: var(--arrow-width);
		position: absolute;
		left: 0;
	}

	/* .links li:not(:last-child)::after {
		content: ",";
	} */

	.link {
		font-family: var(--display-fonts);
		font-weight: bold;
	}
</style>

<section id="portfolio" class="container" aria-labelledby="portfolio-header">
	<h2 id="portfolio-header" class="header">Selected work</h2>
	<p class="sublabel">{sublabel}</p>
	<ul class="projects">
		{#each portfolio as { label, description, image, links = [] }}
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
				<p>{@html description}</p>
				{#if links.length > 1}
					<h4 class="label">Examples:</h4>
				{/if}
				<ul class="links">
					{#each links as { headline, link }}
						<li>
							<a
								class="link sans-serif"
								target="_blank"
								rel="noopener noreferrer"
								href={link}>{headline || link}</a>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</section>
