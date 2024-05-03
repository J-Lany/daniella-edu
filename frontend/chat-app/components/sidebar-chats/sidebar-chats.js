import { createChatSidebarTemplate } from "./sidebar-chats.template";

export class ChatSidebar extends HTMLElement {
  static get name() {
    return "chats-sidebar";
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
    templateElem.innerHTML = createChatSidebarTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
