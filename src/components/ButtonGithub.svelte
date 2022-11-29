<script>
	export let repo;
</script>

<style>
	.repo {
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
	.repo::before {
		content: none;
	}
	.repo:hover {
		background-color: var(--color-gray-dark);
	}

	.repo:hover svg {
		fill: var(--color-link);
	}
	.repo:focus {
		outline: 2px solid var(--color-link);
	}

	.repo__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 1.5rem;
		width: 1.5rem;
		background-color: white;
		border-radius: 50%;
	}
	.repo__icon svg {
		width: 65%;
		height: 65%;
	}
</style>

{#if repo}
	<a class="repo sans-serif" href={repo}>
		<span class="repo__icon">
			<svg>
				<title>Github logo</title>
				<use href="#github" />
			</svg>
		</span>
		See the code
	</a>
{/if}
