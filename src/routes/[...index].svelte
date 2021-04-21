<script context="module">
	import LazyPages from '$lib/pages/LazyPages';

	export async function load({ page, fetch, session, context }) {
        let response

        if(page.path === '/api/preview') {
            response = await fetch(`/wagtail?previewToken=${page.query.get('token')}&contentType=${page.query.get('content_type')}`);
        } else {
            response = await fetch(`/wagtail?html_path=${page.path}`);
        }

		const payload = await response.json();

		const props = payload.componentProps;

		const container = await LazyPages(payload.componentName);

        if(!container) {
            throw Error(`${payload.componentName} could not be found`)
        }

		return { props: { container, props } };
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/env';

	export let props;
	export let container;

    const {
        seoHtmlTitle,
        seoMetaDescription,
        seoOgTitle,
        seoOgDescription,
        seoOgUrl,
        seoOgImage,
        seoOgType,
        seoTwitterTitle,
        seoTwitterDescription,
        seoTwitterUrl,
        seoTwitterImage,
        seoMetaRobots,
        canonicalLink,
    } = props.seo || {};

    let WagtailUserbar;

    onMount(async () => {
        if(props?.wagtailUserbar?.html) {
            WagtailUserbar = (await import('$lib/WagtailUserbar.svelte')).default
        }
    })

	import '../app.css';
</script>

<svelte:head>
	<title>Title: {seoHtmlTitle}</title>

    {#if seoMetaDescription}
        <meta name="description" content={seoMetaDescription}>
    {/if}
    {#if seoOgTitle}
        <meta property="og:title" content={seoOgTitle}>
    {/if}
    {#if seoOgDescription}
        <meta property="og:description" content={seoOgDescription}>
    {/if}
    {#if seoOgUrl}
        <meta property="og:url" content={seoOgUrl}>
    {/if}
    {#if seoOgImage}
        <meta property="og:image" content={seoOgImage}>
    {/if}
    {#if seoOgType}
        <meta property="og:type" content={seoOgType}>
    {/if}
    {#if seoTwitterTitle}
        <meta property="twitter:title" content={seoTwitterTitle}>
    {/if}
    {#if seoTwitterDescription}
        <meta property="twitter:description" content={seoTwitterDescription}>
    {/if}
    {#if seoTwitterUrl}
        <meta property="twitter:url" content={seoTwitterUrl}>
    {/if}
    {#if seoTwitterImage}
        <meta property="twitter:image" content={seoTwitterImage}>
    {/if}
    {#if seoMetaRobots}
        <meta name="robots" content={seoMetaRobots}>
    {/if}
    {#if canonicalLink}
        <link rel="canonical" href={canonicalLink}>
    {/if}

</svelte:head>

<svelte:component this="{container}" {...props} />

{#if WagtailUserbar}
    <WagtailUserbar {...props.wagtailUserbar} />
{/if}
