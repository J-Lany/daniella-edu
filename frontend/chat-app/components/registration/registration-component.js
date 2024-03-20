import { createRegistrationTemplate } from "./registration-component.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class RegistrationComponent extends HTMLElement {
  #authService = diContainer.resolve(SERVICES.auth);
  #listeners = [
    [
      select.bind(this, ".registration-btn"),
      "click",
      this.#onRegistrationClick.bind(this),
    ],
  ];
  static get name() {
    return "registration-component";
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    this.#listeners.forEach(addListeners.bind(this));
  }
  #onRegistrationClick() {
    console.log("Зарегаться");
  }
  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }
  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createRegistrationTemplate();
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
