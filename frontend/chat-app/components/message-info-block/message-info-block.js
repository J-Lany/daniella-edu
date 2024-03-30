import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { createMessageInfoTemplate } from "./message-info-block.template";

export class MessageInfoBlock extends HTMLElement {
  static get name() {
    return "message-info";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  render(user) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessageInfoTemplate(user);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
