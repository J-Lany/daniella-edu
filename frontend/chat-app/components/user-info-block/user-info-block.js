import { createUserInfoBlockTemplate } from "./user-info-block.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class UserInfoBlock extends HTMLElement {
  #userService = diContainer.resolve(SERVICES.user);

  static get name() {
    return "user-info-block";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unsubscribeFromCurrentUser = this.#userService.subscribeCurrentUser(
      this.#render.bind(this)
    );
  }

  disconnectedCallback() {
    this.unsubscribeFromCurrentUser();
  }

  #render(user) {
    const templateElm = document.createElement("template");
    templateElm.innerHTML = createUserInfoBlockTemplate(user);

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
  }
}
