import { createUserInfoBlockTemplate } from "./user-info-block.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class UserInfoBlock extends HTMLElement {
  #authService = diContainer.resolve(SERVICES.auth);

  static get name() {
    return "user-info-block";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unSubscribeFromAuth = this.#authService.subscribeCurrentUser(
      this.#render.bind(this)
    );
  }

  disconnectedCallback() {
    this.unSubscribeFromAuth();
  }

  #render(user) {
    const templateElm = document.createElement("template");
    templateElm.innerHTML = createUserInfoBlockTemplate(user);
    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
  }
}
