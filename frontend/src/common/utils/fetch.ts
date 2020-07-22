type HttpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE";

interface Options {
	method: HttpMethod,
	body: object
}

export async function apiCall<T = void>(uri: string, options?: Partial<Options>): Promise<T | undefined> {

	const result = await fetch(uri, {
		method: options?.method,
		body: options?.body && JSON.stringify(options.body),
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem("access_token")}`
		}
	});

	if (result.ok) {
		// If status code is NO_CONTENT, return void
		if (result.status !== 204) {
			return await result.json();
		}
	} else {
		throw new Error(JSON.stringify(await result.json()));
	}
}
