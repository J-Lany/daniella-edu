import { createChatTemplate } from "./chat-component.template";

export class ChatComponent extends HTMLElement {
  static get name() {
    return "chat-component";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }
  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createChatTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
