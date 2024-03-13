import { createHeaderTemplate } from "./header-component.template";

export class HeaderComponent extends HTMLElement {
  static get name() {
    return "header-component";
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createHeaderTemplate();
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
