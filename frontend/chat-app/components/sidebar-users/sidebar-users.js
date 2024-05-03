import { createUsersSidebarTemplate } from "./sidebar-users.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class UsersSidebar extends HTMLElement {
  #users;
  #listeners = [
    [
      select.bind(this, "sidebar-component"),
      "gotUsers",
      this.#onSearch.bind(this),
    ],
  ];

  static get name() {
    return "users-sidebar";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    console.log("UsersSideBar");
    this.render(this.#users);
  }

  #onSearch(event) {
    this.#users = event.detail.result;
    console.log("event");
    this.render(this.#users);
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