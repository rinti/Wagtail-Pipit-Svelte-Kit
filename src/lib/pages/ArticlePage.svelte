<script>
	import Hero from '$lib/Hero.svelte';
	export let title
    export let richText
</script>

<Hero {title} />

<div>
	{@html richText}
</div>

<style>
</style>
