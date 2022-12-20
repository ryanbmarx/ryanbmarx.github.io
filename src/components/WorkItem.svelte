<script>
	import { marked } from "marked";
	export let org, start, end, role, description, orgLink;
	export let open = null;
	const rand = Math.random();
</script>

<style>
	.item {
		--icon-width: 1.2rem;
		--toggle-plus: polygon(
			33.3% 0%,
			66.6% 0%,
			66.6% 33.3%,
			100% 33.3%,
			100% 66.6%,
			66.6% 66.6%,
			66.6% 100%,
			33.3% 100%,
			33.3% 66.6%,
			0% 66.6%,
			0% 33.3%,
			33.3% 33.3%
		);
		--toggle-minus: polygon(
			33.3% 33.3%,
			66.6% 33.3%,
			66.6% 33.3%,
			100% 33.3%,
			100% 66.6%,
			66.6% 66.6%,
			66.6% 66.6%,
			33.3% 66.6%,
			33.3% 66.6%,
			0% 66.6%,
			0% 33.3%,
			33.3% 33.3%
		);

		font: var(--font-size-small) / 1.3em var(--sans-serif-fonts);
		position: relative;
	}
	.item > * {
		margin: 0 0 calc(var(--gap) / 2);
	}
	.item > *:last-child {
		margin: 0;
	}

	.item__role {
		font: bold var(--font-size) / var(--line-height) var(--sans-serif-fonts);
		color: var(--color-font);
		margin: 0;
		cursor: pointer;
	}

	.item__role::before,
	.item__role::after {
		/* Custom look marker */
		width: var(--icon-width);
		height: var(--icon-width);
		content: "";
		display: block;
		position: absolute;
		top: 3px;
		left: 0;
	}

	.item__role::before {
		background-color: var(--color-blue);
		border-radius: 50%;
		z-index: 2;
	}

	.item__role::after {
		/* Custom look marker */
		background-color: var(--color-isabelline);
		z-index: 3;
		clip-path: var(--toggle-plus);
		transform: scale(0.6) rotate(90deg);
		transition: transform var(--speed-transition) ease-in-out,
			clip-path var(--speed-transition) ease-in-out;
	}

	[open] .item__role::after {
		clip-path: var(--toggle-minus);
		transform: scale(0.6) rotate(0);
	}

	.item__role__meta {
		line-height: var(--line-height);
		font-weight: bold;
		font-size: var(--font-size-small);
		font-style: normal;
		display: block;
	}
	.item__role__org::after {
		content: ":";
	}

	.item__detail {
		padding: 0 0 0 calc(var(--icon-width) + var(--gap));
	}

	.item__description :global(p) {
		font: var(--font-size-small) / var(--line-height) var(--sans-serif-fonts);
	}
	.item__description :global(p:last-child) {
		margin-bottom: 0;
	}

	details summary::-webkit-details-marker,
	details summary::marker {
		color: transparent;
		appearance: none;
		content: "";
	}
</style>

<li class="item" aria-labelledby="role-{rand}">
	<details class="item__detail" {open}>
		<summary id="role-{rand}" class="item__role">
			<span class="item__role__name">{role}</span>
			<span class="item__role__meta">
				<a
					class="item__role__org"
					href={orgLink}
					target="_blank"
					rel="noopener noreferrer">
					{org}
				</a>
				<span class="item__role__time">{start} to {end}</span>
			</span>
		</summary>
		<div class="item__description">
			{#if description}
				{@html marked.parse(description)}
			{/if}
		</div>
	</details>
</li>
