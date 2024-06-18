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
import { MessageInput } from "./chat-app/components/message-input/message-input.js";
import { ChatBlock } from "./chat-app/components/chat-block/chat-block.js";
import { ToastComponent } from "./chat-app/components/toast/toast-component.js";
import { SearchInput } from "./chat-app/components/search-users/search-users-input.js";
import { Sidebar } from "./chat-app/components/sidebar/sidebar.js";
import { ListenerService } from "./chat-app/services/listenerService.js";
import { ChatService } from "./chat-app/services/chatService.js";
import { ChatListComponent } from "./chat-app/components/chat-list/chat-list.js";
import { UserListComponent } from "./chat-app/components/user-list/user-list.js";
import { LogoutButton } from "./chat-app/components/logout/logout-component.js";

diContainer.register(SERVICES.http, httpService);
diContainer.register(SERVICES.auth, new AuthService());
diContainer.register(SERVICES.messages, new MessageService());
diContainer.register(SERVICES.user, new UserService());
diContainer.register(SERVICES.listener, new ListenerService());
diContainer.register(SERVICES.chat, new ChatService());

[
  ChatComponent,
  UserInfoBlock,
  HeaderComponent,
  ChatBlock,
  Sidebar,
  LoginComponent,
  RegistrationComponent,
  AppComponent,
  AuthComponent,
  MessagesBlock,
  AvatarComponent,
  MessageInfoBlock,
  Message,
  MessageInput,
  ToastComponent,
  SearchInput,
  ChatListComponent,
  UserListComponent,
  LogoutButton
].map((component) => customElements.define(component.name, component));

document.querySelector("#app").innerHTML = `<app-component></app-component>`;
