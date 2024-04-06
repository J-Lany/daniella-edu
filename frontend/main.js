import "./chat-app/components/common.css";
import { diContainer } from "./chat-app/di/di.js";
import { SERVICES } from "./chat-app/di/api.js";
import { MessageService } from "./chat-app/services/messageService.js";
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
import { MessagesBlock } from "./chat-app/components/messages-block/messages-block.js";
import { AvatarComponent } from "./chat-app/components/avarar/avatar-component.js";
import { MessageInfoBlock } from "./chat-app/components/message-info-block/message-info-block.js";
import { Message } from "./chat-app/components/message/message.js";
import { ChatSidebar } from "./chat-app/components/chat-sidebar/chat-sidebar.js";

diContainer.register(SERVICES.http, httpService);
diContainer.register(SERVICES.messages, new MessageService());
diContainer.register(SERVICES.user, new UserService());
diContainer.register(SERVICES.auth, new AuthService());

[
  ChatComponent,
  UserInfoBlock,
  HeaderComponent,
  ChatSidebar,
  LoginComponent,
  RegistrationComponent,
  AppComponent,
  AuthComponent,
  MessagesBlock,
  AvatarComponent,
  MessageInfoBlock,
  Message,
].map((component) => customElements.define(component.name, component));

document.querySelector("#app").innerHTML = `<app-component></app-component>`;
