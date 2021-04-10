<script context="module">
    export const prerender = true;
	export async function load({ page, fetch, session, context }) {
		const response = await fetch(`/wagtail?html_path=${page.path}`);
		const payload = await response.json();

		const containerName = payload.component_name;
		const props = payload.component_props;
		let container;

		if (containerName === 'HomePage') {
			container = (await import('$lib/pages/HomePage.svelte')).default;
		} else {
			container = (await import('$lib/pages/ArticlePage.svelte')).default;
		}

		return { props: { container, props } };
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';

	export let props;
	export let container;

	import '../app.css';
</script>

<svelte:component this="{container}" {...props} />
