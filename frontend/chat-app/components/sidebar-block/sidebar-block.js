import { createSidebarBlockTemplate } from "./sidebar-block.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export const viewTypes = {
  CHATS: "chats",
  USERS: "users",
};

export class SidebarBlock extends HTMLElement {
  #currentViewTupe = viewTypes.CHATS;
  #listeners = [
    [
      select.bind(this, "search-input"),
      "search-focus",
      this.#onSearch.bind(this),
    ],
  ];

  static get name() {
    return "sidebar-block";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render(this.#currentViewTupe);
  }

  #onSearch() {
    console.log("Проверка отлова события (не работает)");
    this.#currentViewTupe = viewTypes.USERS;
    this.render(this.#currentViewTupe);
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  render(currentViewTupe) {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createSidebarBlockTemplate(currentViewTupe);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
