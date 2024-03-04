import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class AppComponent extends HTMLElement {
  static get name() {
    return "app-component";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }
  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = true
      ? `<header-component></header-component>`
      : `<login-component></login-component>`;
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
