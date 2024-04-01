import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { createMessageInfoTemplate } from "./message-info-block.template";

export class MessageInfoBlock extends HTMLElement {
  #userService = diContainer.resolve(SERVICES.user);
  time;
  static get name() {
    return "message-info";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const userId = this.getAttribute("user-id");
    this.time = this.getAttribute("time");
    this.unsubscribeFromUser = this.#userService.subscribeCompanion(
      this.render.bind(this)
    );
    this.#userService.getUserById(userId);
  }

  disconnectedCallback() {
    this.unsubscribeFromUser();
  }

  render(user) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessageInfoTemplate(user, this.time);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
