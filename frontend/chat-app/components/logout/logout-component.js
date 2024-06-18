import { createLogoutTemplate } from "./logout-component.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class LogoutButton extends HTMLElement {
  #authService = diContainer.resolve(SERVICES.auth);

  #listeners = [
    [select.bind(this, ".logout"), "click", this.#onLogoutClick.bind(this)],
  ];

  static get name() {
    return "logout-button";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  #onLogoutClick() {
    this.#authService.logout();
  }

  connectedCallback() {
    this.#listeners.forEach(addListeners.bind(this));
    this.render();
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createLogoutTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
