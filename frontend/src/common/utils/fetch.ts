type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface Options {
  method: HttpMethod;
  body: object;
  params: Record<string, string>;
}

export async function apiCall<T = void>(
  uri: string,
  options?: Partial<Options>
): Promise<T | undefined> {
  const queryParams = options?.params
    ? Object.entries(options.params).reduce((qp, [name, value], index) => {
        const query = qp.concat(`${name}=${value}`);
        if (index !== Object.keys(options.params!).length - 1) {
          query.concat("&");
        }
        return query;
      }, "?")
    : "";

  const result = await fetch(uri + queryParams, {
    method: options?.method,
    body: options?.body && JSON.stringify(options.body),

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
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
