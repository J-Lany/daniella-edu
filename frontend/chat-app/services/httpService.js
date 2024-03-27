export function httpService(baseUrl = "http://localhost:3000") {
  async function get(url) {
    const response = await fetch(`${baseUrl}/${url}`);
    return await response.json();
  }
  async function post(url, payload) {
    const response = await fetch(`${baseUrl}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
