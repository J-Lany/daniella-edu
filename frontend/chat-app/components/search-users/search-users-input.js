import { createSearchInputTemplate } from "./search-users-input.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di.js";
import { SERVICES } from "../../di/api.js";

export class SearchInput extends HTMLElement {
  #userService = diContainer.resolve(SERVICES.user);
  #listeners = [
    [select.bind(this, "#search"), "input", this.#onInputChange.bind(this)],
    [select.bind(this, "#search"), "focus", this.#onInputFocus.bind(this)],
  ];
  #timeOutId;

  static get name() {
    return "search-input";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  #onInputFocus() {
    console.log("onInputFocus");
    this.dispatchEvent(new Event("search-focus"));
  }

  #onInputChange(e) {
    const value = e.target.value;
    clearTimeout(this.#timeOutId);
    this.#timeOutId = setTimeout(async () => {
      const result = await this.#userService.searchUser(value);
      const searchEvent = new CustomEvent("search", {
        detail: {
          result,
        },
      });
      this.dispatchEvent(searchEvent);
    }, 500);
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createSearchInputTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
