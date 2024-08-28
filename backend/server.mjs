import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";
import cors from "cors";
import { createServer } from "http";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { diContainer } from "./di/di.mjs";
import { SERVICES } from "./di/api.mjs";
import { MessageService } from "./services/message-service.mjs";
import { UserService } from "./services/user-service.mjs";
import { AuthService } from "./services/auth-service.mjs";
import { configService } from "./services/config-service.mjs";
import { SessionService } from "./services/session-service.mjs";
import { StoreService } from "./data-store/store-service.mjs";
import { ChatService } from "./services/chat-service.mjs";
import { EmailService } from "./services/email-service.mjs";
import { RoleService } from "./services/role-service.mjs";
import { createRegistrationController } from "./controllers/registration-controller.mjs";
import { createAuthController } from "./controllers/auth-controller.mjs";
import { createUserController } from "./controllers/user-controller.mjs";
import { createMessageController } from "./controllers/message-controller.mjs";
import { createChatsController } from "./controllers/chats-controller.mjs";
import { messageWsSendingStrategy } from "./controllers/ws-message-controller.mjs";
import { chatWsSendingStrategy } from "./controllers/ws-chat-controller.mjs";
import { ChatsDao } from "./data-store/dao/chats-dao.mjs";
import { UsersDao } from "./data-store/dao/users-dao.mjs";
import { MessagessDao } from "./data-store/dao/messages-dao.mjs";
import { EmailsDao } from "./data-store/dao/emails-dao.mjs";
import { SessionDao } from "./data-store/dao/session-dao.mjs";
import { websocketAuthGuard } from "./utils/websocket-auth-guard.mjs";

const app = express();

// Использование CORS middleware для разрешения кросс-доменных запросов
app.use(cors());

app.use(express.json());

// Загрузка документации Swagger для REST API
const restApiOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "J-Lany`s messager API",
      version: "1.0.0",
      description: "Super puper продакшн от Даниэллы"
    }
  },
  apis: ["./controllers/*"] // Путь к файлам, содержащим документацию JSDoc для REST API
};

const restApiSpec = swaggerJSDoc(restApiOptions);
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/rest-docs", swaggerUi.serve, swaggerUi.setup(restApiSpec));
app.use("/websocket-docs", express.static(path.join(__dirname, "public")));

diContainer.register(SERVICES.config, configService());
diContainer.register(SERVICES.store, new StoreService());
diContainer.register(SERVICES.usersDao, new UsersDao());
diContainer.register(SERVICES.chatsDao, new ChatsDao());
diContainer.register(SERVICES.emailsDao, new EmailsDao());
diContainer.register(SERVICES.messagesDao, new MessagessDao());
diContainer.register(SERVICES.sessionDao, new SessionDao());

diContainer.register(SERVICES.role, new RoleService());
diContainer.register(SERVICES.messages, new MessageService());
diContainer.register(SERVICES.email, new EmailService());
diContainer.register(SERVICES.users, new UserService());
diContainer.register(SERVICES.session, new SessionService());
diContainer.register(SERVICES.auth, new AuthService());
diContainer.register(SERVICES.chat, new ChatService());

createChatsController(app);
createRegistrationController(app);
createAuthController(app);
createUserController(app);
createMessageController(app);

const server = createServer(app);

const wss = new WebSocketServer({ noServer: true });
const connections = new Map();

export const webSocketStrategies = {
  message: messageWsSendingStrategy,
  chat: chatWsSendingStrategy
};

server.on("upgrade", function (request, socket, head) {
  handleWebSocketUpgrade(request, socket, head, wss);
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

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
