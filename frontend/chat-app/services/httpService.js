import packageJson from "../../package.json";

export function httpService(baseUrl = packageJson.baseUrl) {
  async function get(url, headers) {
    const fullUrl = `${baseUrl}/${url}`;
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
