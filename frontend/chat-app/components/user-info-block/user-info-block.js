import { createUserInfoBlockTemplate } from "./user-info-block.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class UserInfoBlock extends HTMLElement {
  #authService = diContainer.resolve(SERVICES.auth);
  #userService = diContainer.resolve(SERVICES.user);
  static get name() {
    return "user-info-block";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const token = this.#authService.getToken();
    if (token) {
      this.#render(token);
    } else {
      this.unSubscribeFromAuth = this.#authService.subscribeToken(
        this.#render.bind(this)
      );
      this.#render();
    }
  }

  disconnectedCallback() {
    this.unSubscribeFromAuth();
  }

  #render(token) {
    const user = token ? this.#userService.getCurrentUser() : null;

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createUserInfoBlockTemplate(user);

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
  }
}
