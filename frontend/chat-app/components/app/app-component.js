import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { ChatComponent } from "../chat/chat-component";
import { HeaderComponent } from "../header/header-component";
import { LoginComponent } from "../login/login-component";

export class AppComponent extends HTMLElement {
  #authService = diContainer.resolve(SERVICES.auth);
  #isLoginned = false;

  static get name() {
    return "app-component";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unSubscribeFromAuth = this.#authService.getCurrentUser(
      this.hadnleAuhtChange.bind(this)
    );
    this.#render();
  }

  disconnectedCallback() {
    this.unSubscribeFromAuth(this.hadnleAuhtChange.bind(this));
  }

  hadnleAuhtChange() {
    this.#isLoginned = true;
    this.#render();
  }

  #render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = this.#isLoginned
      ? `<header-component></header-component>`
      : `<login-component></login-component>`;
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}

[ChatComponent, HeaderComponent, LoginComponent].map((component) =>
  customElements.define(component.name, component)
);
