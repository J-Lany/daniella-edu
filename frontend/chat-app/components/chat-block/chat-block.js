import { createChatBlockTemplate } from "./chat-block.template";

export class ChatBlock extends HTMLElement {
  static get name() {
    return "chat-block";
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
    templateElem.innerHTML = createChatBlockTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
