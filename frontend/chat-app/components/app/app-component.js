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
    this.#render();
    this.unSubscribeFromAuth = this.#authService.subscribeToken(
      this.#render.bind(this)
    );
  }

  disconnectedCallback() {
    this.unSubscribeFromAuth();
  }

  #render(token) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createAppTemplate(token);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
