import { createUserInfoBlockTemplate } from "./user-info-block.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class UserInfoBlock extends HTMLElement {
  #authService = diContainer.resolve(SERVICES.auth);
  #currentUser;

  static get name() {
    return "user-info-block";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unSubscribeFromAuth = this.#authService.getCurrentUser(
      this.hadndleUserChange.bind(this)
    );
  }

  hadndleUserChange(currentUser) {
    Promise.resolve(currentUser).then((user) => {
      console.log(user);
      this.#currentUser = user;
      this.#render(this.#currentUser);
    });
  }

  disconnectedCallback() {
    this.unSubscribeFromAuth(this.hadnleAuhtChange.bind(this));
  }

  #render() {
    const templateElm = document.createElement("template");
    templateElm.innerHTML = createUserInfoBlockTemplate(this.#currentUser);
    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
  }
}
