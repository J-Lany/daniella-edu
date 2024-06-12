import packageJson from "../../package.json";
import { ACCESS_TOKEN, USER, REFRESH_TOKEN } from "./authService";

export function httpService(baseUrl = packageJson.baseUrl) {
  async function get(url, retryCount = 1) {
    const fullUrl = `${baseUrl}/${url}`;
    const headers = createAutoruzarionHeader();
    const response = await fetch(fullUrl, { headers });

    if (response.status !== 405) {
      return await response.json();
    }

    const isTokenRefreshed = await refreshToken();

    if (isTokenRefreshed && retryCount > 0) {
      return await post(url, payload, retryCount - 1);
    } else {
      throw new Error("Failed to refresh token");
    }
  }

  async function post(url, payload, retryCount = 1) {
    const autoruzarionHeader = createAutoruzarionHeader();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...autoruzarionHeader,
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(`${baseUrl}/${url}`, requestOptions);

    if (response.status !== 405) {
      return { status: response.status, content: await response.json() };
    }

    const isTokenRefreshed = await refreshToken();

    if (isTokenRefreshed && retryCount > 0) {
      return await post(url, payload, retryCount - 1);
    } else {
      throw new Error("Failed to refresh token");
    }
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

async function refreshToken(baseUrl = packageJson.baseUrl) {
  const token = sessionStorage.getItem(REFRESH_TOKEN);
  const user = sessionStorage.getItem(USER);

  const requestBody = {
    userId: user.userId,
    refreshToken: token,
  };

  const response = await fetch(`${baseUrl}/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (response.status === 200) {
    const content = await response.json();

    sessionStorage.setItem(REFRESH_TOKEN, content.refreshToken);
    sessionStorage.setItem(ACCESS_TOKEN, content.accessToken);

    return true;
  }

  return false;
}
