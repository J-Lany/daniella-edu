export function httpService(baseUrl = "http://192.168.1.9:3000") {
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
