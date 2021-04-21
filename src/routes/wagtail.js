import fetch from 'node-fetch';
import { keysToCamelFromSnake, keysToSnakeFromCamel } from '$lib/utils/case-convert';

const baseUrl = 'http://localhost:8081/wt/api/nextjs';

export async function get(req, res) {
	const htmlPath = req.query.get('html_path');
	const previewToken = req.query.get('previewToken');
	const contentType = req.query.get('contentType');
	let url;

	if (htmlPath) {
		url = `${baseUrl}/v1/page_by_path/?html_path=${htmlPath}`;
	}

	if (previewToken) {
		url = `${baseUrl}/v1/page_preview/?token=${previewToken}&content_type=${contentType}`;
	}

	const headers = {
		'Content-Type': 'application/json',
		cookie: req.headers.cookie
	};

	const resp = await fetch(url, { headers });
	const payload = await resp.json();

	if (resp.status === 404) {
		return {
			body: { componentName: 'NotFoundPage', componentProps: {} }
		};
	}

	return {
		body: keysToCamelFromSnake(payload)
	};
}

export async function post(req, res) {
	const data = JSON.parse(req.body);
	let responseData;

	if (req.query.get('type') === 'password_protected_page') {
		responseData = await getPasswordProtectedPage(data, req.headers['x-csrftoken']);
		return { body: responseData };
	}
}

export async function getPasswordProtectedPage(data, csrfToken) {
	const url = `${baseUrl}/v1/password_protected_page/${data.restrictionId}/${data.pageId}/`;
	const response = await fetch(url, {
		body: JSON.stringify({ password: data.password }),
		method: 'POST',
		headers: { 'X-CSRFToken': csrfToken, 'Content-Type': 'application/json' }
	});
	if (response.status === 200) {
		return keysToCamelFromSnake(await response.json());
	}
	return { error: 'Invalid password' };
}
