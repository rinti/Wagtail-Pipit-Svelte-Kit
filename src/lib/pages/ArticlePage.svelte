<script>
	import Counter from '$lib/Counter.svelte';
	export let title
    export let richText
</script>

<div>
	<h1>{title}</h1>
	{@html richText}
    <Counter />
</div>

<style>
</style>
