import { createLoginTemplate } from "./login-component.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class LoginComponent extends HTMLElement {
  #authService = diContainer.resolve(SERVICES.auth);
  #listeners = [
    [
      select.bind(this, ".login-form__btn"),
      "click",
      this.#onLoginClick.bind(this),
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
    this.#listeners.forEach(addListeners.bind(this));
    this.unSubscribeFromError = this.#authService.subscribeOnLoginError(
      this.render.bind(this)
    );
  }

  disconnectedCallback() {
    this.unSubscribeFromError();
    this.#listeners.forEach(removeListeners.bind(this));
  }

  #onLoginClick(event) {
    event.preventDefault();
    const login = this.shadowRoot.querySelector("#login").value;
    const password = this.shadowRoot.querySelector("#password").value;

    this.#authService.login(login, password);
  }

  render(err) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createLoginTemplate(err);
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
