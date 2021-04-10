import fetch from 'node-fetch';

export function get(req, res) {
    const htmlPath = req.query.get('html_path')
	const baseUrl = 'http://localhost:8081/wt/api/nextjs';
	const url = `${baseUrl}/v1/page_by_path/?html_path=${htmlPath}`;

	const headers = {
		'Content-Type': 'application/json',
		cookie: req.headers.cookie
	};

	/* const response = await fetch(url, { headers }); */
	/* const payload = await response.json(); */
	/* const containerName = payload.component_name; */

	return fetch(url)
		.then((r) => r.json())
		.then((payload) => {
			return {
				body: payload
			};
		});
}
