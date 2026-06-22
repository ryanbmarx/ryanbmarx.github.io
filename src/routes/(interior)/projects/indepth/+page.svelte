<script lang="ts">
	import BrokenMessage from "$lib/components/portfolio/BrokenMessage.svelte";
	type Link = {
		headline: string;
		link: string;
		archived: boolean;
	};

	const exampleLinks: Link[] = [
		{
			headline:
				"Hallowed Sound, Vol. 2: Stories of perseverance and preservation from the American South",
			link: "https://www.tennessean.com/in-depth/entertainment/music/2021/09/23/hallowed-sound-stories-perseverance-preservation-american-south-music/5617513001/",
			archived: true,
		},
		{
			headline:
				"A look at the stadiums where teams will compete in the 2022 FIFA World Cup in Qatar",
			link: "https://www.usatoday.com/in-depth/graphics/2022/11/18/how-many-stadiums-does-qatar-2022-have-mapping-out-world-cup/8305335001/",
			archived: true,
		},
		{
			headline: "Meet the Black dancer who broke the Rockettes' color barrier",
			link: "https://www.lohud.com/in-depth/news/2022/11/17/jennifer-jones-rockette-radio-city-music-hall/69616543007/",
			archived: true,
		},
	];

	const projects = [
		{
			title: "Audiograms",
			image: "audiogram.png",
			alt: "",
			links: [
				{
					headline:
						"Opinion — Black lives matter: We must live up to Declaration of Independence’s promise",
					link: "https://www.northjersey.com/in-depth/opinion/2020/07/02/black-lives-matter-trump-declaration-of-independence-2020/3256925001/",
					archived: true,
				},
				{
					headline:
						"'El Paso gave me the values I have': Black leaders emerge from a Hispanic majority border city.",
					link: "https://www.elpasotimes.com/in-depth/news/2021/03/30/meet-black-leaders-emerged-el-paso-texas-hispanic-majority-city/4578132001/",
					archived: true,
				},
				{
					headline:
						"'They are not alone': Hispanic domestic abuse survivors speak out to help other victims",
					link: "https://www.oklahoman.com/in-depth/news/2021/08/31/hispanic-domestic-abuse-survivors-speak-out-help-other-victims/7497178002/",
					archived: true,
				},
			],
			description:
				"This component for the In-Depth toolbox was our second-pass at audio clips. I designed and developed this from scratch as an attempt to grow the poor interaction rates observed with the first version. It's bigger and bolder — more pixels on the page — and has a strong visual presence.",
		},
		{
			title: "An SMS emulator",
			links: [
				{
					headline:
						"The Girl Collector: The story of Cody Jackson and the 16 girls who were his quarry (Archive.org)",
					link: "https://web.archive.org/web/20190228145154/https://www.cincinnati.com/in-depth/news/2018/10/21/girl-collector-cincinnati-cody-jackson/1409756002/",
					archived: false,
				},
				{
					headline:
						"He murdered three women and was hunting a fourth. These women outsmarted a serial killer",
					link: "https://www.northjersey.com/in-depth/news/crime/2020/02/03/how-group-women-stopped-nj-serial-killer/2661900001/",
					archived: true,
				},
				{
					headline:
						"A fiery crash shattered four lives. 20 years later, their connection yields serenity.",
					link: "https://www.desmoinesregister.com/in-depth/news/local/columnists/courtney-crowder/2019/11/26/abbie-kampman-iowa-strangers-find-peace-20-years-after-wrong-way-crash-kills-5-mother-sisters/2570864001/",
					archived: true,
				},
			],
			image: "sms.png",
			alt: "",
			description:
				"This component from the In-Depth toolbox is a top-to-bottom refactor of an existing app. Originally written in Angular (with the data hard-coded into the application), I rewrote it in our preferred Svelte, and abstracted the input data so that it could be used in any project. Visually, it uses the same CSS styling variables as the broader article stylesheets, so it adapts to existing ",
		},
		{
			title: "Photo sliders",
			image: "slider.jpg",
			links: [
				{
					headline: "Modernizing images of long-ago Billerica",
					link: "https://www.wickedlocal.com/in-depth/billerica-minuteman/2021/12/27/bilerica-ma-kevin-murphy-photo-restoration-colorization-historical-pictures/6416979001/",
					archived: true,
				},
				{
					headline:
						"Lane County relies on same alert tools used during Holiday Farm Fire, but when emergency strikes, residents always will have to help each other.",
					link: "https://www.registerguard.com/in-depth/news/2021/08/26/holiday-farm-fire-emergency-warning-system-residents-help-crucial/8102205002/",
					archived: true,
				},
				{
					headline:
						"Picture this: Eye-opening images of what climate change has done and could do to our world",
					link: "https://www.usatoday.com/in-depth/graphics/2021/07/07/climate-change-images-offer-present-and-future-views-our-world/5173622001/",
					archived: true,
				},
			],
			alt: "",
			description:
				"This component for In-Depth takes two images, lines them up and toggles between them. We had originally decided to let the myriad 3rd-party versions of this tool serve In-Depth, but this one provides us useful analytics.",
		},
	];

	function getLinks(links: Link[]): Link[] {
		return links.filter(l => !l.archived);
	}
</script>

<h1>The Storytelling Studio's crown jewel</h1>

<p>
	My team at Gannett was responsible for designing, engineering and maintaining the
	In-Depth article framework. This collection of tools enables more than 100 web
	producers across the company to craft visually stunning, reader-focused multimedia
	presentations using the everyday CMS and our own story editor.
</p>

<p>
	We started the project because the existing story template at the time was plain,
	restrictive, and the only option. This meant that a gameday recap carried the same
	perceptual importance as a Pulitzer Prize contender. To rectify this, we built a
	full-featured story editor, replacing the conventional story rendering layer.
</p>
<p>
	It was used to create more than 7,500 articles (as of December 2022) and was the tool
	of choice to present the strongest, most impactful journalism Gannett has to offer. It
	generated hundreds of thousands of pageviews, a 2x increase in engaged time over
	standard templates, and had a high subscriber conversion rate.
</p>
<BrokenMessage></BrokenMessage>
<aside class="float" aria-labelledby="indepth-examples">
	<h2 id="indepth-examples" class="header">Examples</h2>
	<ul class="links">
		{#each exampleLinks as { headline, link: href } (headline)}
			<li><a class="link" {href}>{headline}</a></li>
		{/each}
	</ul>
</aside>

<h2>Building a community with an ecosystem</h2>
<p>
	Our primary goal was to empower digital designers to have complete control over an
	article's presentation: the image layouts, videos, color palette, and nearly every
	other facet of the look-and-feel. We built a community around the tool by working
	directly with the digital producers using our product and staying open and responsive
	to their needs.
</p>
<p>
	We built more than a dozen interactive tools for this framework and even added ways to
	include custom interactives. Here are a few I added to the toolkit:
</p>

<ul class="projects stack">
	{#each projects as { title, description, links, image, alt } (title)}
		<li class="project">
			<div class="image">
				<img src="/thumbs/{image}" {alt} />
			</div>
			<div class="text">
				<h3>{title}</h3>
				<p>{description}</p>
				<ul class="links">
					{#each getLinks(links) as { headline, link: href } (headline)}
						<li><a class="link" {href}>{headline}</a></li>
					{/each}
				</ul>
			</div>
		</li>
	{/each}
</ul>

<style>
	.project {
		display: grid;
		gap: 0 var(--gap);
		margin-bottom: var(--gap);
		grid-template-columns: minmax(1px, 2fr) minmax(1px, 2fr);

		&:not(:last-child) {
			border-bottom: 1px solid var(--color-border);
			padding-bottom: var(--gap);
		}

		& > * {
			grid-column: 2;
		}
		.image {
			grid-row: 1/-1;
			grid-column: 1;
		}
	}

	.links {
		list-style: disc;
		padding-left: 1em;
		display: flex;
		flex-flow: column nowrap;
		gap: 0.5rem;

		.link {
			font-size: var(--font-size-small);
			font-weight: bold;
			text-wrap: balance;
		}
	}
	.float {
		padding: var(--gap);
		background-color: #0003;
		/* max-width: 15rem; */

		/* position: absolute; */
		left: 100%;

		.header {
			font-size: var(--font-size);
		}
	}
</style>
