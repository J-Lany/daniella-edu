import { createChatSidebarTemplate } from "./chat-sidebar.template";
export class ChatSidebar extends HTMLElement {
  static get name() {
    return "chat-sidebar";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {}

  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createChatSidebarTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
