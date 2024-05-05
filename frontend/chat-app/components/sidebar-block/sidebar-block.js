import { createSidebarBlockTemplate } from "./sidebar-block.template.js";

export class SidebarBlock extends HTMLElement {
  static get name() {
    return "sidebar-block";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  handleCustomEvent(event) {
    this.render(event.detail);
  }

  render(list) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createSidebarBlockTemplate(list);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
