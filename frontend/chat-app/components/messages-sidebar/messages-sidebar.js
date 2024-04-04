import { createMessagesSidebarTemplate } from "./messages-sidebar.template";
export class MessagesSidebar extends HTMLElement {
  static get name() {
    return "message-sidebar";
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
    templateElem.innerHTML = createMessagesSidebarTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
