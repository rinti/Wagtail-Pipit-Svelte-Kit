export async function getSession({ context }) {
    return context
}
export async function getContext({ headers }) {

	return {
        cookie: headers.cookie
	};
}
