import { createLoginTemplate } from "./login-component.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { addListeners, select } from "../../utils/utils.js";

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
  }

  #onLoginClick(event) {
    event.preventDefault();
    const login = this.shadowRoot.querySelector(
      ".login-form__input[type='text']"
    ).value;
    const password = this.shadowRoot.querySelector(
      ".login-form__input[type='password']"
    ).value;
    this.#authService
      .login(login, password)
      .then((data) => {
        console.log("Вы авторизованы", data);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createLoginTemplate();
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
