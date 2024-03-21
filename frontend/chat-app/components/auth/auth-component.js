import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { createAuthComponent } from "./auth-component.template";

export class AuthComponent extends HTMLElement {
  LOGIN_STATE = {
    REGISTRATION: "registration",
    LOGIN: "login",
  };

  #listeners = [
    [
      select.bind(this, "login-component"),
      "registration",
      this.#onRegistrationClick.bind(this),
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

  #onRegistrationClick(event) {
    event.preventDefault();
    this.render(this.LOGIN_STATE.REGISTRATION);
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  render(state = this.LOGIN_STATE.LOGIN) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createAuthComponent(state);
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
    this.#listeners.forEach(addListeners.bind(this));
  }
}
