import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { diContainer } from "./di/di.mjs";
import { messageService } from "./services/message-service.mjs";
import { UserService } from "./services/user-service.mjs";
import { SERVICES } from "./di/api.mjs";
import { chatController } from "./controllers/chat-controller.mjs";
import { registrationController } from "./controllers/registration-controller.mjs";
import { loginController } from "./controllers/login-controller.mjs";
import swaggerJSDoc from "swagger-jsdoc";
import { AuthService } from "./services/auth-service.mjs";
import { configService } from "./services/config-service.mjs";
import { SessionService } from "./services/session-service.mjs";

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

diContainer.register(SERVICES.messages, messageService);
diContainer.register(SERVICES.users, new UserService());
diContainer.register(SERVICES.session, new SessionService());
diContainer.register(SERVICES.auth, new AuthService());

// Метод GET возвращает массив случайных сообщений для chatId
app.get("/messages/:chatId", chatController);
app.post("/registration", registrationController);
app.post("/login", loginController);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
