import { createHeaderTemplate } from "./header-component.template";
import { SERVICES } from "../../di/api";
import { diContainer } from "../../di/di";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class HeaderComponent extends HTMLElement {
  #authService = diContainer.resolve(SERVICES.auth);
  #listeners = [
    [select.bind(this, ".logout"), "click", this.#onLogoutClick.bind(this)],
  ];

  static get name() {
    return "header-component";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#listeners.forEach(addListeners.bind(this));
    this.render();
  }

  #onLogoutClick() {
    this.#authService.logout();
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createHeaderTemplate();

    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
