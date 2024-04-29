export function httpService(baseUrl = "http://localhost:3000") {
  async function get(url, headers) {
    const response = await fetch(`${baseUrl}/${url}`, {
      headers: {
        ...headers,
      },
    });

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
    return await response.json();
  }

  return {
    get,
    post,
  };
}
