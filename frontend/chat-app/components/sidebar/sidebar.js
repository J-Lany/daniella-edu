import { createSidebarTemplate } from "./sidebar.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di.js";
import { SERVICES } from "../../di/api.js";
import { debounce } from "../../utils/debounce.js";

export const LIST_TYPE = {
  users: "users",
  chats: "chats",
};

const DELAY = 500;

export class Sidebar extends HTMLElement {
  #userService = diContainer.resolve(SERVICES.user);
  #debauncedSearch = debounce(this.#onSearch.bind(this), DELAY);
  #listeners = [
    [
      select.bind(this, "search-input"),
      "search",
      this.#debauncedSearch.bind(this),
    ],
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

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  async #onSearch(event) {
    const inputValue = event.detail.value;
    const userList = this.shadowRoot.querySelector("user-list");

    if (inputValue === "") {
      userList.handleCustomEvent({
        detail: null,
      });
      return;
    }

    const userId = event.detail.userId;
    const res = await this.#userService.searchUser(inputValue, userId);

    userList.handleCustomEvent({
      detail: res.result,
    });
  }

  render(inputValue) {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createSidebarTemplate(inputValue);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
