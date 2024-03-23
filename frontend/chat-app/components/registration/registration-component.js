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
    [select.bind(this, "#password"), "input", this.#onInput.bind(this)],
  ];
  static get name() {
    return "registration-component";
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  #onRegistrationClick() {
    const login = this.shadowRoot.querySelector("#login").value;
    const password = this.shadowRoot.querySelector("#password").value;
    const confirmPassword =
      this.shadowRoot.querySelector("#confirm-password").value;

    if (confirmPassword !== password) {
      this.render("Пароли не совпадают");
      return;
    }
    this.#authService.registration(login, password).then((res) => {
      this.dispatchEvent(new Event("login"));
    });
  }

  #onInput() {
    removeListeners([select.bind(this, "#password"), "input", this.#onInput]);
    const inputs = this.shadowRoot.querySelectorAll(".registration-form__input");
    inputs.forEach((input) => input.classList.remove("error"));
  }

  render(errorMessage) {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createRegistrationTemplate(errorMessage);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
