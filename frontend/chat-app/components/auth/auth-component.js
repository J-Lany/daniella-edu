import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { createAuthComponent } from "./auth-component.template";

export const viewTypes = {
  REGISTRATION: "registration",
  LOGIN: "login",
};

export class AuthComponent extends HTMLElement {
  #currentViewTupe = viewTypes.LOGIN;
  #listeners = [
    [
      select.bind(this, "login-component"),
      "registration",
      this.#onRegistrationClick.bind(this),
    ],
    [
      select.bind(this, "registration-component"),
      "login",
      this.#onSucsessRegistratiom.bind(this),
    ],
  ];

  static get name() {
    return "auth-component";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  #onRegistrationClick() {
    this.#currentViewTupe = viewTypes.REGISTRATION;
    this.render();
  }
  #onSucsessRegistratiom() {
    this.#currentViewTupe = viewTypes.LOGIN;
    this.render();
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createAuthComponent(this.#currentViewTupe);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
