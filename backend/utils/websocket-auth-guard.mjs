import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
import { TOKEN_PREFIX } from "./authorization.mjs";
import { TOKEN_PREFIX_LENGTH } from "./authorization.mjs";

export async function websocketAuthGuard(request, socket, head, wss) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith(TOKEN_PREFIX)) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  const token = authorizationHeader.substring(TOKEN_PREFIX_LENGTH);
  const isAuth = await checkToken(token);

  if (!isAuth) {
    socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    socket.destroy();
    return;
  }

  socket.userId = token;
  wss.handleUpgrade(request, socket, head, function (ws) {
    wss.emit("connection", ws, request);
  });
}

async function checkToken(token) {
  const authService = diContainer.resolve(SERVICES.auth);
  return await authService.isAuth(token);
}
