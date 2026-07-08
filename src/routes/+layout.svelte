<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

{@render children()}
<svelte:head>
	<link rel="stylesheet" href="/styles.css" />
	<link rel="icon" href={favicon} />

</svelte:head>


