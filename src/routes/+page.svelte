<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import { IsMobile } from "$lib/hooks/is-mobile.svelte";
	const isMobile = new IsMobile();
</script>

<Header></Header>
<!-- {#if isMobile.current}
	<NavMobile></NavMobile>
{:else}
	<Nav></Nav>
{/if} -->
