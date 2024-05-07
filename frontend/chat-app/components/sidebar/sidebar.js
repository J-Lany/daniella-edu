import { createSidebarTemplate } from "./sidebar.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di.js";
import { SERVICES } from "../../di/api.js";

export const LIST_TYPE = {
  users: "users",
  chats: "chats",
};

export class Sidebar extends HTMLElement {
  #userService = diContainer.resolve(SERVICES.user);
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

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  #onSearch(event) {
    const inputValue = event.detail.value;
    const userId = event.detail.userId;
    const sidebarBlock = this.shadowRoot.querySelector("sidebar-block");

    this.#userService.debouncedSearch(inputValue, userId).then((res) => {
      sidebarBlock.handleCustomEvent({
        detail: res.result,
        listType: LIST_TYPE.users,
      });
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
