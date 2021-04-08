<script>
	export let title;
	export let links;
</script>

<div>
    123
	<h1>{title}</h1>
	<ul>
		{#each links as link}
		<li><a href="{link.link}">{link.title}</a></li>
		{/each}
	</ul>
</div>

<style>
	div {
		background-color: 000;
	}
</style>
