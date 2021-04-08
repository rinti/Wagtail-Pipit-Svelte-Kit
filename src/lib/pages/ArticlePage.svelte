<script>
	import Counter from '$lib/Counter.svelte';
	export let title
    export let rich_text
</script>

<div>
	<h1>{title}</h1>
	<p>{@html rich_text}</p>
    <Counter />
</div>

<style>
	div {
		color: darkcyan;
	}
</style>
