type HttpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE";

interface Options {
	method: HttpMethod,
	body: object
}

export async function apiCall<T>(uri: string, options?: Partial<Options>): Promise<T> {

	const result = await fetch(uri, {
		method: options?.method,
		body: options?.body && JSON.stringify(options.body),
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (result.ok) {
		return await result.json();
	} else {
		throw new Error(JSON.stringify(await result.json()));
	}
}
