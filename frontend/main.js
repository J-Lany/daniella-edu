import "./chat-app/components/common.css";
import { diContainer } from "./chat-app/di/di.js";
import { SERVICES } from "./chat-app/di/api.js";
import { messageService } from "./chat-app/services/messageService.js";
import { AuthService } from "./chat-app/services/authService.js";
import { httpService } from "./chat-app/services/httpService.js";
import { AppComponent } from "./chat-app/components/app/app-component.js";
import { ChatComponent } from "./chat-app/components/chat/chat-component.js";
import { HeaderComponent } from "./chat-app/components/header/header-component.js";
import { LoginComponent } from "./chat-app/components/login/login-component.js";
import { UserInfoBlock } from "./chat-app/components/user-info-block/user-info-block.js";
import { RegistrationComponent } from "./chat-app/components/registration/registration-component.js";
import { AuthComponent } from "./chat-app/components/auth/auth-component.js";
import { UserService } from "./chat-app/services/userService.js";

diContainer.register(SERVICES.messages, messageService);
diContainer.register(SERVICES.http, httpService);
diContainer.register(SERVICES.user, new UserService());
diContainer.register(SERVICES.auth, new AuthService());

[
  ChatComponent,
  UserInfoBlock,
  HeaderComponent,
  LoginComponent,
  RegistrationComponent,
  AppComponent,
  AuthComponent,
].map((component) => customElements.define(component.name, component));

document.querySelector("#app").innerHTML = `<app-component></app-component>`;
