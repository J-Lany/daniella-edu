import "./chat-app/components/common.css";
import { diContainer } from "./chat-app/di/di.js";
import { SERVICES } from "./chat-app/di/api.js";
import { messageService } from "./chat-app/services/messageService.js";
import { authService } from "./chat-app/services/authService.js";
import { httpService } from "./chat-app/services/httpService.js";
import { AppComponent } from "./chat-app/components/app/app-component.js";

diContainer.register(SERVICES.messages, messageService);
diContainer.register(SERVICES.http, httpService);
diContainer.register(SERVICES.auth, authService);

[AppComponent].map((component) =>
  customElements.define(component.name, component)
);

document.querySelector("#app").innerHTML = `<app-component></app-component>`;
