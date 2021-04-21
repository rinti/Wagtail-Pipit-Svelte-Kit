<script type="ts">
	import LazyPages from '$lib/pages/LazyPages';

    export let restrictionId: number;
    export let pageId: number;
    export let csrfToken: string;

	let password: string;
	let error: string;
	let pageData: object;
    let container;

	const handlePasswordChange = (e) => {
        password = e.target.value
	};

    const handleFormChange = async () => {
        const resp = await fetch('/wagtail?type=password_protected_page', {method: 'POST', body: JSON.stringify({restrictionId, pageId, password}), headers: {'X-CSRFToken': csrfToken}})
        const data = await resp.json()

        if (data.error) {
            error = data.error
        } else {
            pageData = data
            container = await LazyPages(pageData.componentName)
        }

    };
</script>

{#if pageData}
    <svelte:component this="{container}" {...pageData.componentProps} />
{:else}
<div>
	<h1>Password is required</h1>
	<p>You need a password to access this website</p>

	{#if error}
	<p>{error}</p>
	{/if}
	<p>
		<input
			type="password"
			name="password"
			on:keyup={handlePasswordChange}
			placeholder="Password"
		/>
	</p>
	<button on:click={handleFormChange}>Continue</button>
</div>
{/if}
