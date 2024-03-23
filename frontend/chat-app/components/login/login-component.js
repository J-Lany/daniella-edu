import { createLoginTemplate } from "./login-component.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class LoginComponent extends HTMLElement {
  #authService = diContainer.resolve(SERVICES.auth);
  #listeners = [
    [select.bind(this, ".login-btn"), "click", this.#onLoginClick.bind(this)],
    [
      select.bind(this, ".registration-btn"),
      "click",
      this.#onRegistrationClick.bind(this),
    ],
  ];

  static get name() {
    return "login-component";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    this.unSubscribeFromError = this.#authService.subscribeOnLoginError(
      this.render.bind(this)
    );
  }

  disconnectedCallback() {
    this.unSubscribeFromError();
  }

  #onLoginClick(event) {
    event.preventDefault();
    const login = this.shadowRoot.querySelector("#login").value;
    const password = this.shadowRoot.querySelector("#password").value;

    this.#authService.login(login, password);
  }
  #onRegistrationClick(event) {
    event.preventDefault();
    const registrationClickEvent = new Event("registration");
    this.dispatchEvent(registrationClickEvent);
  }

  render(err) {
    this.#listeners.forEach(removeListeners.bind(this));
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createLoginTemplate(err);
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
    this.#listeners.forEach(addListeners.bind(this));
  }
}
