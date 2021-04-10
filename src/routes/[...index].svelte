<script context="module">
	export async function load({ page, fetch, session, context }) {
		const baseUrl = 'http://localhost:8081/wt/api/nextjs';
		const url = `${baseUrl}/v1/page_by_path/?html_path=${page.path}`;

		const headers = {
			'Content-Type': 'application/json',
			cookie: session.cookie
		};

		const response = await fetch(url, { headers });
		const payload = await response.json();
		const containerName = payload.component_name;
		let container;

		if (containerName !== 'HomePage') {
			container = (await import('$lib/pages/HomePage.svelte')).default;
		} else {
			container = (await import('$lib/pages/ArticlePage.svelte')).default;
		}

		const props = payload.component_props;

		return { props: { container, props } };
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	export let container;
	export let props;

	import '../app.css';
</script>

<svelte:component this="{container}" {...props} />
