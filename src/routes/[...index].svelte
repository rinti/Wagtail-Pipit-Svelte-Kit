<script context="module">
	import LazyPages from '$lib/pages/LazyPages';

	export async function load({ page, fetch, session, context }) {
		const response = await fetch(`/wagtail?html_path=${page.path}`);
		const payload = await response.json();
		const props = payload.component_props;

		const container = await LazyPages(payload.component_name);

		return { props: { container, props } };
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/env';

	export let props;
	export let container;

	import '../app.css';
</script>

<svelte:component this="{container}" {...props} />
