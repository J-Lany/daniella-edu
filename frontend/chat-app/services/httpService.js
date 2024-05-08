import packageJson from "../../package.json";

export function httpService(baseUrl = packageJson.scripts.baseUrl) {
  async function get(url, headers, params = {}) {
    let fullUrl = `${baseUrl}/${url}`;

    if (Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams(params).toString();
      fullUrl += `?${searchParams}`;
    }

    const response = await fetch(fullUrl, { headers });

    return await response.json();
  }

  async function post(url, payload, headers = {}) {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(payload),
    });

    return { status: response.status, content: await response.json() };
  }

  return {
    get,
    post,
  };
}
