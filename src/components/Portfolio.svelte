<script>
	const sublabel = "Projects to which I made significant contributions";
	const portfolio = [
		{
			image: "design-a-kit.png",
			label: "World Cup: Design your own uniform",
			repo: "https://github.com/ryanbmarx/design-a-world-cup-kit",
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
			image: "decider.png",
			label: "The decider: A polar decision matrix",
			description:
				'In the run-up to the 2022 midterm elections, we were approached by multiple newsrooms looking to help undecided voters choose their candidates. I designed and developed this application which presents a series of prompts from user-selected topics. Responses to the prompts are categorized, and "agreement" is calculated.',
			links: [
				{
					headline:
						"Raphael Warnock or Herschel Walker? See which candidate is your closest match ",
					link: "https://www.savannahnow.com/storytelling/herschel-walker-raphael-warnock-georgia-senate-candidate-how-choose/",
				},
				{
					headline: "How conservative are you?",
					link: "https://www.usatoday.com/storytelling/find-out-how-conservative-you-really-are/",
				},
			],
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
			label: "In-Depth",
			image: "indepth.jpg",
			links: [
				{
					headline:
						"Hallowed Sound, Vol. 2: Stories of perseverance and preservation from the American South",
					link: "https://www.tennessean.com/in-depth/entertainment/music/2021/09/23/hallowed-sound-stories-perseverance-preservation-american-south-music/5617513001/",
				},
				{
					headline:
						"A look at the stadiums where teams will compete in the 2022 FIFA World Cup in Qatar",
					link: "https://www.usatoday.com/in-depth/graphics/2022/11/18/how-many-stadiums-does-qatar-2022-have-mapping-out-world-cup/8305335001/",
				},
				{
					headline: "Meet the Black dancer who broke the Rockettes' color barrier",
					link: "https://www.lohud.com/in-depth/news/2022/11/17/jennifer-jones-rockette-radio-city-music-hall/69616543007/",
				},
			],
			description:
				"My team at Gannett is responsible for designing, engineering and maintaining the In-Depth article framework. This collection of tools enables more than 100 web producers across the company to craft visually stunning, reader-focused multimedia presentations using the everyday CMS and our own story editor.\n\nIt's been used to create more than 7,500 (as of December 2022) articles often representing the strongest, most impactful journalism the Gannett has to offer. It has generated hundreds of thousands of pageviews, a 2x increase in engaged time over standard templates and frequently leads to subscriber conversions.",
		},
		{
			label: "In-depth: Audiograms",
			image: "audiogram.png",
			links: [
				{
					headline:
						"Opinion — Black lives matter: We must live up to Declaration of Independence’s promise",
					link: "https://www.northjersey.com/in-depth/opinion/2020/07/02/black-lives-matter-trump-declaration-of-independence-2020/3256925001/",
				},
				{
					headline:
						"'El Paso gave me the values I have': Black leaders emerge from a Hispanic majority border city.",
					link: "https://www.elpasotimes.com/in-depth/news/2021/03/30/meet-black-leaders-emerged-el-paso-texas-hispanic-majority-city/4578132001/",
				},
				{
					headline:
						"'They are not alone': Hispanic domestic abuse survivors speak out to help other victims",
					link: "https://www.oklahoman.com/in-depth/news/2021/08/31/hispanic-domestic-abuse-survivors-speak-out-help-other-victims/7497178002/",
				},
			],
			description:
				"This component for the In-Depth toolbox was our second-pass at audio clips. I designed and developed this from scratch as an attempt to grow the poor interaction rates observed with the first version. It's bigger and bolder — more pixels on the page — and has a strong visual presence.",
		},
		{
			label: "In-depth: SMS emulator",
			links: [
				{
					headline:
						"The Girl Collector: The story of Cody Jackson and the 16 girls who were his quarry",
					link: "https://www.cincinnati.com/in-depth/news/2018/10/21/girl-collector-cincinnati-cody-jackson/1409756002/",
				},
				{
					headline:
						"He murdered three women and was hunting a fourth. These women outsmarted a serial killer",
					link: "https://www.northjersey.com/in-depth/news/crime/2020/02/03/how-group-women-stopped-nj-serial-killer/2661900001/",
				},
				{
					headline:
						"A fiery crash shattered four lives. 20 years later, their connection yields serenity.",
					link: "https://www.desmoinesregister.com/in-depth/news/local/columnists/courtney-crowder/2019/11/26/abbie-kampman-iowa-strangers-find-peace-20-years-after-wrong-way-crash-kills-5-mother-sisters/2570864001/",
				},
			],
			image: "sms.png",
			description:
				"This component from the In-Depth toolbox is a top-to-bottom refactor of an existing app. Originally written in Angular (with the data hard-coded into the application), I rewrote it in our preferred Svelte, and abstracted the input data so that it could be used in any project. Visually, it uses the same CSS styling variables as the broader article stylesheets, so it adapts to existing ",
		},
		{
			label: "In-depth: Sliders",
			image: "slider.jpg",
			links: [
				{
					headline: "Modernizing images of long-ago Billerica",
					link: "https://www.wickedlocal.com/in-depth/billerica-minuteman/2021/12/27/bilerica-ma-kevin-murphy-photo-restoration-colorization-historical-pictures/6416979001/",
				},
				{
					headline:
						"Lane County relies on same alert tools used during Holiday Farm Fire, but when emergency strikes, residents always will have to help each other.",
					link: "https://www.registerguard.com/in-depth/news/2021/08/26/holiday-farm-fire-emergency-warning-system-residents-help-crucial/8102205002/",
				},
				{
					headline:
						"Picture this: Eye-opening images of what climate change has done and could do to our world",
					link: "https://www.usatoday.com/in-depth/graphics/2021/07/07/climate-change-images-offer-present-and-future-views-our-world/5173622001/",
				},
			],
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
			image: "cincy.png",
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
				'A new census brings new data, and we developed this data-explorer microsite with the journalists in Cincinatti who were intent on unpacking claims made by politicians about "the Cincinatti Comeback." This site presents a mountain of the most recent demographic data in two ways: by statistic and by neighborhood. I worked with the journalists to design each of the different views and shared development duties with the entire team. It\'s proven to be a success as it consistently generates traffic/engagement which spikes when new investigative articles publish. ',
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

	.project__repo {
		border: none;
		width: fit-content;
		padding: 0.5rem;
		margin: 0;
		text-decoration: none;
		background-color: var(--color-slate);
		color: white;

		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.project__repo__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 1.5rem;
		width: 1.5rem;
		background-color: white;
		border-radius: 50%;
	}
	.project__repo__icon svg {
		width: 65%;
		height: 65%;
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
		font-weight: bold;
	}
</style>

<section id="portfolio" class="container" aria-labelledby="portfolio-header">
	<h2 id="portfolio-header" class="header">Selected work</h2>
	<p class="sublabel">{sublabel}</p>
	<ul class="projects">
		{#each portfolio as { label, description, image, links = [], repo = null }}
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
				{#if repo}
					<a class="project__repo sans-serif" href={repo}>
						<span class="project__repo__icon">
							<svg>
								<title>Github logo</title>
								<use href="#github" />
							</svg>
						</span>
						See the code
					</a>
				{/if}
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
								href={link}>{headline || link}</a>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</section>
