import packageJson from "../../package.json";
import { ACCESS_TOKEN, USER, REFRESH_TOKEN } from "./authService";

export function httpService(baseUrl = packageJson.baseUrl) {
  async function get(url, autoruzarionHeader = {}) {
    const fullUrl = `${baseUrl}/${url}`;
    const response = await fetch(fullUrl, { headers: autoruzarionHeader });
    const content = await response.json();

    return { status: response.status, content };
  }

  async function post(url, autoruzarionHeader, payload) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...autoruzarionHeader,
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(`${baseUrl}/${url}`, requestOptions);

    return { status: response.status, content: await response.json() };
  }

  return {
    get,
    post,
  };
}
