import { createUsersSidebarTemplate } from "./sidebar-users.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class UsersSidebar extends HTMLElement {
  #listeners = [
    [select.bind(this, "search-input"), "search", this.#onSearch.bind(this)],
  ];

  static get name() {
    return "users-sidebar";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {}

  #onSearch(event) {
    this.render(event.detail.result);
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  render(users) {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createUsersSidebarTemplate(users);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
