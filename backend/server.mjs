import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { diContainer } from "./di/di.mjs";
import { MessageService } from "./services/message-service.mjs";
import { UserService } from "./services/user-service.mjs";
import { SERVICES } from "./di/api.mjs";
import { chatController } from "./controllers/chat-controller.mjs";
import { createRegistrationController } from "./controllers/registration-controller.mjs";
import { createAuthController } from "./controllers/auth-controller.mjs";
import swaggerJSDoc from "swagger-jsdoc";
import { AuthService } from "./services/auth-service.mjs";
import { configService } from "./services/config-service.mjs";
import { SessionService } from "./services/session-service.mjs";
import { ChatService } from "./services/chat-service.mjs";
import { createChatsController } from "./controllers/chats-controller.mjs";
import { StoreService } from "./data-store/store-service.mjs";
import { ChatsDao } from "./data-store/dao/chats-dao.mjs";
import { UsersDao } from "./data-store/dao/users-dao.mjs";
import { MessagessDao } from "./data-store/dao/messages-dao.mjs";
import { createUserController } from "./controllers/user-controller.mjs";
import { EmailService } from "./services/email-service.mjs";
import { EmailsDao } from "./data-store/dao/emails-dao.mjs";
import { createMessageController } from "./controllers/message-controller.mjs";
import { SessionDao } from "./data-store/dao/session-dao.mjs";

const app = express();

// Использование CORS middleware для разрешения кросс-доменных запросов
app.use(cors());

app.use(express.json());

// Загрузка документации Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "J-Lany`s messager API",
      version: "1.0.0",
      description: "Super puper продакшн от Даниэллы",
    },
  },
  apis: ["./controllers/*"], // Путь к файлам, содержащим документацию JSDoc
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

diContainer.register(SERVICES.config, configService());
diContainer.register(SERVICES.store, new StoreService());
diContainer.register(SERVICES.usersDao, new UsersDao());
diContainer.register(SERVICES.chatsDao, new ChatsDao());
diContainer.register(SERVICES.emailsDao, new EmailsDao());
diContainer.register(SERVICES.messagesDao, new MessagessDao());
diContainer.register(SERVICES.sessionDao, new SessionDao());

diContainer.register(SERVICES.messages, new MessageService());
diContainer.register(SERVICES.email, new EmailService());
diContainer.register(SERVICES.users, new UserService());
diContainer.register(SERVICES.session, new SessionService());
diContainer.register(SERVICES.auth, new AuthService());
diContainer.register(SERVICES.chat, new ChatService());

// Метод GET возвращает массив случайных сообщений для chatId
app.get("/messages/:chatId", chatController);

createChatsController(app);
createRegistrationController(app);
createAuthController(app);
createUserController(app);
createMessageController(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
