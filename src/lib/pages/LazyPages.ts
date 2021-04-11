export default async function (containerName: string) {
	return {
		HomePage: (await import('$lib/pages/HomePage.svelte')).default,
		ArticlePage: (await import('$lib/pages/ArticlePage.svelte')).default,
		/* PasswordProtectedPage: (await import('$lib/pages/PasswordProtectedPage.svelte')).default, */
		PureHtmlPage: (await import('$lib/pages/PureHtmlPage.svelte')).default
	}[containerName];
}
