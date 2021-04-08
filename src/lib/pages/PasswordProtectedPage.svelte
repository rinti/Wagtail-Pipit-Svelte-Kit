<script type="ts">
    export let restrictionId: number;
    export let pageId: number;
    export let csrfToken: string;

	let values: string = '';
	let error: string;
	let pageData: object;

	const handlePasswordChange = (e) => {
		const { name, value } = e.target;
		values = { ...values, [name]: value };
	};

    const handleFormChange = async (e) => {
        e.preventDefault();

        /* try { */
        /*     const resp = await getPasswordProtectedPage( */
        /*         restrictionId, */
        /*         pageId, */
        /*         { */
        /*             ...values, */
        /*         }, */
        /*         { */
        /*             headers: { */
        /*                 'X-CSRFToken': csrfToken, */
        /*             }, */
        /*         } */
        /*     ); */

        /*     pageData = resp; */
        /* } catch (e) { */
        /*     error = 'Invalid password'; */
        /* } */
    };
</script>

<div>
	<h1>Password is required</h1>
	<p>You need a password to access this website</p>

	{!!error &&
	<p>{error}</p>
	}
	<p>
		<input
			type="password"
			name="password"
			on:change={handlePasswordChange}
			placeholder="Password"
		/>
	</p>
	<button on:click={handleFormChange}>Continue</button>
</div>
