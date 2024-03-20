import { createRegistrationTemplate } from "./registration-component.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class RegistrationComponent extends HTMLElement {
  #authService = diContainer.resolve(SERVICES.auth);
  #listeners = [
    [
      select.bind(this, ".registration-form__btn"),
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
    const login = this.shadowRoot.querySelector("#login").value;
    const password = this.shadowRoot.querySelector("#password").value;
    const confirmPassword =
      this.shadowRoot.querySelector("#confirm-password").value;

    if (confirmPassword !== password) {
      const wrongPassword = document.createElement("div");
      wrongPassword.innerHTML = "Пароли не совпадают";
      this.shadowRoot
        .querySelector(".registration-form")
        .appendChild(wrongPassword);
      return;
    }

    this.#authService.registration(login, password).then((res) => {
      const loginComponent = document.createElement("login-component");
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.appendChild(loginComponent);
    });
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
