import { createUsersSidebarTemplate } from "./sidebar-users.template";

export class UsersSidebar extends HTMLElement {
  static get name() {
    return "users-sidebar";
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
    templateElem.innerHTML = createUsersSidebarTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
