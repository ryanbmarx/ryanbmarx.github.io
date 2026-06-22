<script lang="ts">
	// 	### What I do

	// I thrive in collaborative and cross-functional capacities, helping disparate teams
	// communicate and collaborate on shared goals. Whether I'm designing, developing, or
	// participating in some other way, I bring a human-focused approach, keeping
	// everyone's eyes on the final product. This requires speaking technology with content
	// creators and content creation with technologists, cutting through friction so work
	// moves forward without bottlenecks.

	// HTML, CSS, and TypeScript are my bread and butter. I love to ship with Svelte, Vue,
	// or even plain vanilla. I've worked with D3, Node, and mapping tools (Leaflet,
	// MapBox, etc.).

	// ### Also ...

	// When I'm not telling stories, you'll find me entertaining one of my many inner
	// nerds: science fiction, theater, cooking, and youth softball (as a proud softball
	// dad). And, finally (perhaps most importantly), I believe there isn't anything that
	// can't be made better with a cup of hot coffee. Or two.

	// "- I led our teams conversion from a print-focused group to a digital-first team. I helped develop technology stacks, templates and best practices for everything from static graphics to fully composed articles and interactives. Though the graphics team was full of expert artists and journalists, our digital abilities were minimal. For our transformation to succeed, the plan needed to include everyone and, thus, a key responsibility for me was to serve as a coach/mentor to help us all contribute to our digital growth.",

	const items = [
		{
			title: "In-depth",
			subtitle: "The crown jewel of the Storytelling Studio",
			href: "/projects/indepth",
			img: "indepth.jpg",
		},
		{
			title: "Tools and games",
			subtitle: "Building habits and engagement by making the news fun.",
			href: "/projects/tools-and-games",
			img: "cast.png",
		},
		{
			title: "Data visualizations",
			subtitle: "Finding the message from inside a mountain of information",
			href: "/projects/data",
			img: "chart.jpg",
		},
		{
			title: "Other things",
			subtitle: "A 3D soccer player, composed articles, and  graphic novels.",
			href: "/projects/tribune",
			img: "graphic.jpg",
		},
	] as const;
</script>

<h1>I make things.</h1>
<p>
	Throughout the years I've made it all: featured interactives, standalone
	presentations, and dashboard user interfaces. Each format has its place, and choosing
	the right one for the job is a delicate, practical art. The goal is always to build
	lean solutions that don't sacrifice quality for speed — or speed for quality.
</p>
<ul class="projects stack">
	{#each items as { title, href, img, subtitle } (href)}
		<li class="project">
			<div class="image">
				<img class="image" src="/thumbs/large/{img}" alt="" />
			</div>
			<h2 class="header">
				<a class="link" {href}>
					<span class="title">{title}</span>
					<span class="subtitle">{subtitle}</span>
				</a>
			</h2>
		</li>
	{/each}
</ul>

<style>
	.project {
		display: flex;
		align-items: center;
		gap: var(--gap);
		border: 1px solid var(--color-border);
	}
	.image {
		flex: 0 0 15rem;

		/* min-width: 15rem; */
		aspect-ratio: 16x9;
		object-fit: cover;
		height: 10rem;
		background-color: red;
		overflow: hidden;

		img {
			object-fit: cover;
			width: 100%;
			height: 100%;
			transform: rotate(-5deg) scale(1.2);
		}
	}

	.header {
		padding: var(--gap);
	}
	.link {
		flex: 1 1;
		text-decoration: none;
		line-height: var(--line-height-tight);
	}

	.title {
		color: var(--color-font-muted);
		display: block;
	}

	.subtitle {
		font-size: 0.8em;
		text-decoration: underline;
		text-wrap: balance;
	}
</style>
