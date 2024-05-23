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
  }

  connectedCallback() {
    this.render();
    this.unSubscribeFromError = this.#authService.subscribeOnLoginError(
      this.render.bind(this)
    );
  }

  disconnectedCallback() {
    this.unSubscribeFromError();
    this.#listeners.forEach(removeListeners.bind(this));
  }

  #onLoginClick() {
    const email = this.shadowRoot.querySelector("#email").value;
    const password = this.shadowRoot.querySelector("#password").value;

    this.#authService.login(email, password);
  }

  #onRegistrationClick() {
    this.dispatchEvent(new Event("registration"));
  }

  render(errorMessage) {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createLoginTemplate(errorMessage);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
