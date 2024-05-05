import { createSidebarTemplate } from "./sidebar.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di.js";
import { SERVICES } from "../../di/api.js";

export class Sidebar extends HTMLElement {
  #userService = diContainer.resolve(SERVICES.user);
  #listeners = [
    [select.bind(this, "search-input"), "search", this.#onSearch.bind(this)],
  ];
  #timerId;

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
    const sidebarBlock = this.shadowRoot.querySelector("sidebar-block");

    this.#userService.debouncedSearch(inputValue).then((res) => {
      sidebarBlock.handleCustomEvent({
        detail: res.result,
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
