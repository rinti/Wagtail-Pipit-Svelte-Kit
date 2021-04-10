<script>
	import Counter from '$lib/Counter.svelte';
	export let title
    export let rich_text
</script>

<div>
	<h1>{title}</h1>
	{@html rich_text}
    <Counter />
</div>

<style>
	div {
		color: darkcyan;
	}
</style>
