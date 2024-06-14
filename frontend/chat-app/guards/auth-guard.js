import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";

const handler = {
  get(target, prop) {
    const authService = diContainer.resolve(SERVICES.auth);
    return async function proxiedRequest(url, body, retryCount = 1) {
      const headers = authService.createAutoruzarionHeader();
      const response = await target[prop](url, headers, body);

      if (response.status !== 405) {
        return { status: response.status, content: response.content };
      }

      const isTokenRefreshed = await authService.refreshToken();

      if (isTokenRefreshed && retryCount > 0) {
        return await proxiedRequest(url, body, retryCount - 1);
      } else {
        throw new Error("Failed to refresh token");
      }
    };
  },
};

export function authGuard(proxied) {
  const serviceProxy = new Proxy(proxied, handler);
  return serviceProxy;
}
