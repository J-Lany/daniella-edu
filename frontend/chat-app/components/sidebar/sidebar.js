import { createSidebarTemplate } from "./sidebar.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export const viewTypes = {
  CHATS: "chats",
  USERS: "users",
};

export class Sidebar extends HTMLElement {
  #currentViewTupe = viewTypes.CHATS;
  #listeners = [
    [select.bind(this, "search-input"), "search", this.#onSearch.bind(this)],
  ];

  static get name() {
    return "sidebar-component";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  #onSearch() {
    this.#currentViewTupe = viewTypes.USERS;
    this.render();
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createSidebarTemplate(this.#currentViewTupe);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
