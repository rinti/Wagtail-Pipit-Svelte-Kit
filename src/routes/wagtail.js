import fetch from 'node-fetch';
import {
    keysToCamelFromSnake,
} from '$lib/utils/CaseConvert';

export function get(req, res) {
    const htmlPath = req.query.get('html_path')
	const baseUrl = 'http://localhost:8081/wt/api/nextjs';
	const url = `${baseUrl}/v1/page_by_path/?html_path=${htmlPath}`;

	const headers = {
		'Content-Type': 'application/json',
		cookie: req.headers.cookie
	};

	return fetch(url, {headers})
		.then((r) => r.json())
		.then((payload) => {
			return {
                body: keysToCamelFromSnake(payload)
			};
		});
}
