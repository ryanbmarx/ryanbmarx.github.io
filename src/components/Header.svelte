<script></script>

<style>
	.header {
		background: black;
		background-size: cover;
		box-sizing: border-box;
		position: relative;
		text-align: center;
	}

	.header__thumb {
		border-radius: 50%;
		max-width: 200px;
		margin: 15px auto;
	}
	.header__name {
		font: 18px/1.2em var(--display-fonts);
		font-weight: bold;
		color: white;
		margin: 0 0 calc(var(--gap) / 2) 0;
		padding: 0;
		text-transform: uppercase;
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
		border-left: 3px solid white;
		border-right: 3px solid white;
		margin: 0 0 calc(var(--gap) / 2) 0;
		border-color: currentColor;
	}
	.header__text--name {
		font-weight: normal;
		font-size: 0.9em;
		background: var(--color-black);
		color: white;
		padding: 0.2em;
		border: none;
		width: fit-content;
		margin: 0 0 2rem 0;
	}
	.header__text--data {
		color: var(--color-apricot-light);
		/* border-color: var(--color-apricot-light); */
	}
	.header__text--stories {
		color: var(--color-isabelline);
		/* border-color: var(--color-isabelline); */
	}
	.header__text--experiences {
		color: var(--color-blue-baby);
		/* border-color: $blue-baby; */
	}

	.header__photo-credit {
		font: 14px/1.3em var(--sans-serif-fonts);
		color: black;
		margin: 0;
		position: absolute;
		top: 100%;
		right: 0;
		padding: 5px;
	}
	.header__photo-credit a {
		color: black;
	}

	@media all and (min-width: 768px) {
		.header {
			background: #eee url(/img/header-background--desktop.jpg) center center no-repeat;
			background-size: cover;
			height: 70vh;
			margin-bottom: 0;
			text-align: left;
		}
		.header__thumb {
			display: none;
		}

		.header__text {
			border-right: none;
		}

		.header__text-wrapper {
			background: rgba(0, 0, 0, 0.6);
			width: 40%;
			height: 100%;
			position: static;
		}
	}
</style>

<header id="header" class="header">
	<img class="header__thumb" src="img/header-background--thumb.jpg" alt="Ryan Marx" />
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
</header>
