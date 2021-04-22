<script>
	import Hero from '$lib/Hero.svelte';
	export let title;
	export let links;
</script>

<div>
    <Hero {title} />

	<ul>
		{#each links as link}
		<li><a href="{link.link}">{link.title}</a></li>
		{/each}
	</ul>
</div>

<style>
    a {
        font-weight: bold;
    }
</style>
