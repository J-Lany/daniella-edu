import { createRegistrationTemplate } from "./registration-component.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class RegistrationComponent extends HTMLElement {
  #authService = diContainer.resolve(SERVICES.auth);
  #login = "";
  #password = "";
  #confirmPassword = "";
  #email = "";
  #listeners = [
    [
      select.bind(this, ".registration-form__btn"),
      "click",
      this.#onRegistrationClick.bind(this),
    ],
    [select.bind(this, "#password"), "input", this.#onInput.bind(this)],
    [select.bind(this, ".login-btn"), "click", this.#onLoginClick.bind(this)],
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
    this.#login = this.shadowRoot.querySelector("#login").value;
    this.#email = this.shadowRoot.querySelector("#email").value;
    this.#password = this.shadowRoot.querySelector("#password").value;
    this.#confirmPassword =
      this.shadowRoot.querySelector("#confirm-password").value;

    if (this.#confirmPassword !== this.#password) {
      this.render("Пароли не совпадают");
      return;
    }

    this.#authService
      .registration(this.#login, this.#email, this.#password)
      .then((res) => {
        if (res.status !== 200) {
          this.render(res.content.message);
          return;
        }

        const registrationEvent = new CustomEvent("sucsess-reg", {
          detail: {
            status: res.status,
            registration: res.content.message,
          },
        });

        this.dispatchEvent(registrationEvent);
      });
  }

  #onLoginClick() {
    this.dispatchEvent(new Event("login"));
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  #onInput() {
    const password = this.shadowRoot.querySelector("#password");

    if (password.classList.contains("error")) {
      this.shadowRoot
        .querySelectorAll(".registration-form__input")
        .forEach((input) => input.classList.remove("error"));
    }

    return;
  }

  render(errorMessage) {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createRegistrationTemplate(
      errorMessage,
      this.#login,
      this.#email,
      this.#password,
      this.#confirmPassword
    );

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
