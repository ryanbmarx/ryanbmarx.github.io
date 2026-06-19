<script lang="ts">
	// 	### What I do

	// I thrive in collaborative and cross-functional capacities, helping disparate teams
	// communicate and collaborate on shared goals. Whether I'm designing, developing, or
	// participating in some other way, I bring a human-focused approach, keeping
	// everyone's eyes on the final product. This requires speaking technology with content
	// creators and content creation with technologists, cutting through friction so work
	// moves forward without bottlenecks.

	// Throughout the years I've made it all: featured interactives, standalone
	// presentations, and dashboard user interfaces. Each format has its place, and
	// choosing the right one for the job is a delicate, practical art. The goal is always
	// to build lean solutions that don't sacrifice quality for speed — or speed for
	// quality.

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
			title: "Indepth",
			subtitle: "dfdsfdsfsd",
			href: "/projects/indepth",
			img: "indepth.jpg",
		},
		{
			title: "Storytelling tools and games",
			subtitle: "djslkfjsdklf",
			href: "/projects/tools-and-games",
			img: "cast.png",
		},
		{
			title: "Data visualizations",
			subtitle: "djslkfjsdklf",
			href: "/projects/data",
			img: "chart.jpg",
		},
		{
			title: "Other things",
			subtitle: "djslkfjsdklf",
			href: "/projects/tribune",
			img: "graphic.jpg",
		},
	] as const;
</script>

<div class="projects">
	{#each items as { title, href, img } (href)}
		<a class="project" {href} style:--bg-image={`url(/thumbs/large/${img})`}>{title}</a>
	{/each}
</div>

<!-- <Portfolio></Portfolio> -->
<style>
	.projects {
		--columns: 1;
		display: grid;
		grid-template-columns: repeat(var(--columns), minmax(1px, 1fr));
		grid-auto-flow: row;
	}
	.project {
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: end;
		justify-content: flex-end;
		padding: var(--gap);
		outline: 1px solid black;
		min-height: 40vh;

		&::before {
			content: "";
			position: absolute;
			inset: 0;
			background-image: var(--bg-image);
			background-size: cover;
			background-position: center;
			transform: rotate(5deg) scale(1.2);
			z-index: -1;
		}
	}

	@media all and (min-width: 48rem) {
		.projects {
			--columns: 2;
		}
	}
</style>
