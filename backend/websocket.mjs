import WebSocketServer from "ws";
import { websocketAuthGuard } from "./utils/websocket-auth-guard.mjs";
import { messageWsSendingStrategy } from "./controllers/ws-message-controller.mjs";
import { chatWsSendingStrategy } from "./controllers/ws-chat-controller.mjs";

export const webSocketStrategies = {
  message: messageWsSendingStrategy,
  chat: chatWsSendingStrategy
};

export function initWebsocketServer(server) {
  

  return wss;
}


