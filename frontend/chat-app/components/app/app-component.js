import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { createAppTemplate } from "./app-component.template";

export class AppComponent extends HTMLElement {
  #authService = diContainer.resolve(SERVICES.auth);

  static get name() {
    return "app-component";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unSubscribeFromAuth = this.#authService.subscribeCurrentUser(
      this.#render.bind(this)
    );
    this.unSubscribeFromError = this.#authService.subscribeOnLoginError(
      this.#render.bind(this)
    );
    this.#render();
  }

  disconnectedCallback() {
    this.unSubscribeFromAuth();
    this.unSubscribeFromError();
  }

  #render(user) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createAppTemplate(user);
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
