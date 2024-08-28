import { websocketAuthGuard } from "./utils/websocket-auth-guard.mjs";
import { messageWsSendingStrategy } from "./controllers/ws-message-controller.mjs";
import { chatWsSendingStrategy } from "./controllers/ws-chat-controller.mjs";

export const webSocketStrategies = {
  message: messageWsSendingStrategy,
  chat: chatWsSendingStrategy
};

export function initWebsocketServer(wss, connections, server) {
  server.on("upgrade", function (request, socket, head) {
    websocketAuthGuard(request, socket, head, wss);
  });

  wss.on("connection", function (ws, request) {
    const userId = request.userId;
    connections.set(userId, ws);

    ws.on("error", console.error);

    ws.on("message", async function (dataJSON) {
      const data = JSON.parse(dataJSON);
      const strategy = webSocketStrategies[data.type];

      if (!strategy) {
        console.error("Unknown message type: " + data.type);
        return;
      }

      await strategy(data.content, ws, connections);
    });

    ws.on("close", function () {
      connections.delete(userId);
    });
  });
  return wss;
}
