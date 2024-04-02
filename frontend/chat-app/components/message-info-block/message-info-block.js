import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { createMessageInfoTemplate } from "./message-info-block.template";

export class MessageInfoBlock extends HTMLElement {
  static observedAttributes = ["user-id", "time"];

  #userService = diContainer.resolve(SERVICES.user);
  time = this.getAttribute("time");
  static get name() {
    return "message-info";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unsubscribeFromUser = this.#userService.subscribeUserById(
      this.render.bind(this)
    );
  }

  disconnectedCallback() {
    this.unsubscribeFromUser();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "user-id":
        if(this.unsubscribeFromUser) {
          this.unsubscribeFromUser();
        }
        this.unsubscribeFromUser = this.#userService.subscribeUserById(
          this.render.bind(this)
        );
        break;
      case "time":
        this.time = newValue;
        this.render();
        break;
    }
  }

  render(user) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessageInfoTemplate(user, this.time);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
