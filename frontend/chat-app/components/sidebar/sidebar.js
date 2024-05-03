import { createSidebarTemplate } from "./sidebar.template";

export class Sidebar extends HTMLElement {
  static get name() {
    return "sidebar-component";
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
    templateElem.innerHTML = createSidebarTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
