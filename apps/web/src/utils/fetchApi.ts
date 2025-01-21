interface FetchOptions<B> extends Omit<RequestInit, "method" | "body"> {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: B;
}

export async function fetchApi<T, B = undefined>(
  endpoint: string,
  options: FetchOptions<B extends undefined ? T : B> = {}
): Promise<T> {
  let url = endpoint;

  /** Check if is server to add BASE_URL */
  const isServer = typeof window === "undefined";
  if (isServer) {
    const { default: serverConfig } = await import("rc/config/server.config");
    const BASE_URL = serverConfig.NEXTAUTH_URL;
    url = `${BASE_URL}${url}`;
  }

  const { method = "GET", body } = options;
  const response = await fetch(url, {
    ...options,
    body: body ? JSON.stringify(body) : undefined,
    method,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}
