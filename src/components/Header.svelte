<script>
	import { onMount } from "svelte";
	import Switcher from "./Switcher.svelte";

	let modeSwitcher;

	let darkMode = false;
	$: modeLabel = `Dark mode ${darkMode ? "is" : "is not"} active. Press to toggle it ${
		darkMode ? "off" : "on."
	}`;

	onMount(() => {
		// Initially set our darkmode state based on user preference.
		// This will default to light mode, which is _my_ preference.
		darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

		// On load, switch to dark if needed.
		if (darkMode) document.body.classList.add("dark");
	});
	function handleModeSwitch(e) {
		document.body.classList.toggle("dark");
	}
</script>

<style>
	.header {
		background: black;
		background-size: cover;
		box-sizing: border-box;
		position: relative;
		text-align: center;
	}

	.header__image {
		border-radius: 50%;
		width: 20rem;
		height: 20rem;
		object-fit: cover;
		object-position: center;
		margin: 15px auto;
	}

	.header__text-container {
		margin: 0;
		padding: 0;
		width: 100%;
	}

	.header__text-wrapper {
		background: var(--color-black);
		box-sizing: border-box;
		padding: var(--gap);
		width: 100%;

		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-wrap: wrap;
		flex-flow: column;
	}

	.header__text {
		font-size: clamp(35px, 4.75vw, 100px);
		font-family: var(--display-fonts);
		line-height: 0.82em;
		color: white;
		text-transform: uppercase;
		text-shadow: 2px 2px 5px rgba(black, 0.7);

		display: block;
		padding: 0 0 0 10px;
		margin: 0 0 calc(var(--gap) / 2) 0;
	}
	.header__text.header__text--name {
		font-weight: normal;
		font-size: 0.9em;
		background: var(--color-black);
		color: white;
		padding: 0.2em;
		border: none;
		width: fit-content;
		margin: 0 auto 2rem auto;
	}
	.header__text--data {
		color: var(--color-apricot-light);
	}
	.header__text--stories {
		color: var(--color-isabelline);
	}
	.header__text--experiences {
		color: var(--color-blue-baby);
	}

	.header__photo-credit {
		font: bold 0.75rem/1.3em var(--sans-serif-fonts);
		color: var(--color-isabelline);
		margin: 0;
		position: absolute;
		top: 100%;
		right: 0;
		padding: 5px;
		opacity: 0.6;
	}

	@media all and (min-width: 768px) {
		.header {
			min-height: 30vw;
			height: 70vh;
			margin-bottom: 0;
			text-align: left;
		}
		.header__image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: unset;
			margin: 0;
		}
		.header__text {
			border-left: 5px solid currentColor;
		}

		.header__text.header__text--name {
			margin-left: 0;
		}

		.header__text-wrapper {
			background: rgba(0, 0, 0, 0.6);
			width: 40%;
			min-width: 550px;
			height: 100%;
			position: relative;
			z-index: 2;
		}
	}
</style>

<header id="header" class="header">
	<picture>
		<source srcset="/img/header-background--desktop.jpg" media="(min-width: 768px)" />
		<img
			class="header__image"
			src="/img/header-background--thumb.jpg"
			alt="An overhead view of Ryan Marx, smiling while he works, sitting at his desk. The walls of his cubicle are covered in small posters and family photos. Ryan is wearing one of his favofite fleece zip-up jackets." />
	</picture>
	<div class="header__text-wrapper">
		<h1
			class="header__text-container"
			aria-label="Ryan Marx: Telling stories, visualizing data, creating experiences">
			<span class="header__text header__text--name">Ryan Marx</span>
			<span class="header__text header__text--stories">Telling stories</span>
			<span class="header__text header__text--data">Visualizing data</span>
			<span class="header__text header__text--experiences">Creating experiences</span>
		</h1>
	</div>
	<p class="header__photo-credit">
		Photo by <a
			href="https://twitter.com/jkimpictures"
			target="_blank"
			rel="noopener noreferrer">John J. Kim</a>
	</p>
	<Switcher
		bind:this={modeSwitcher}
		bind:checked={darkMode}
		on:input={handleModeSwitch}
		id="mode"
		label={modeLabel}
		labelLeft="Light"
		labelRight="Dark" />
</header>
