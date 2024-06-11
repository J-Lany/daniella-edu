import packageJson from "../../package.json";
import { ACCESS_TOKEN } from "./authService";
import { REFRESH_TOKEN } from "./authService";

export function httpService(baseUrl = packageJson.baseUrl) {
  async function get(url) {
    const fullUrl = `${baseUrl}/${url}`;
    const headers = createAutoruzarionHeader();
    const response = await fetch(fullUrl, { headers });

    return await response.json();
  }

  async function post(url, payload) {
    const autoruzarionHeader = createAutoruzarionHeader();
    const response = await fetch(`${baseUrl}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...autoruzarionHeader,
      },
      body: JSON.stringify(payload),
    });

    return { status: response.status, content: await response.json() };
  }

  function createAutoruzarionHeader() {
    const token = sessionStorage.getItem(ACCESS_TOKEN);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  return {
    get,
    post,
  };
}
