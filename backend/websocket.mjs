import { websocketAuthGuard } from "./utils/websocket-auth-guard.mjs";
import { messageWsSendingStrategy } from "./controllers/ws-message-controller.mjs";
import { chatWsSendingStrategy } from "./controllers/ws-chat-controller.mjs";

export const webSocketStrategies = {
  message: messageWsSendingStrategy,
  chat: chatWsSendingStrategy
};

export function initWebsocketServer(wss, connections, server) {
  const carriedUpgrade = curriedWebsocketUpgrade(wss);
  server.on("upgrade", carriedUpgrade);

  wss.on("connection", function (ws, request) {
    const userId = request.userId;
    connections.set(userId, ws);

    ws.on("error", console.error);

    ws.on("message", curriedWebsocketMessage(ws, connections));

    ws.on("close", curriedWebsocketClose(userId));
  });
  return wss;
}

function curriedWebsocketUpgrade(wss) {
  return (request, socket, head) => websocketAuthGuard(request, socket, head, wss);
}

function curriedWebsocketMessage(ws, connections) {
  return async function (dataJSON) {
    const data = JSON.parse(dataJSON);
    const strategy = webSocketStrategies[data.type];

    if (!strategy) {
      console.error("Unknown message type: " + data.type);
      return;
    }

    await strategy(data.content, ws, connections);
  };
}

function curriedWebsocketClose(userId) {
  return function () {
    connections.delete(userId);
  };
}
