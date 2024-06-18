import { SERVICES } from "../../di/api.js";
import { diContainer } from "../../di/di.js";
import {
  createTemplate,
  createUserListTemplate,
} from "./user-list.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class UserListComponent extends HTMLElement {
  #listenerService = diContainer.resolve(SERVICES.listener);
  #chatService = diContainer.resolve(SERVICES.chat);
  #listeners = [
    [select.bind(this, ".create"), "click", this.#onUserClick.bind(this)],
    [select.bind(this, ".select"), "click", this.#onChatClick.bind(this)],
  ];
  #isFirstRender = true;

  static get name() {
    return "user-list";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.#listenerService.removeListeners(this.handleClickOutside.bind(this));
    this.#listeners.forEach(removeListeners.bind(this));
  }

  handleCustomEvent(event) {
    if (this.#isFirstRender) {
      this.#isFirstRender = false;
      this.render(event.detail);
      const modalElement = this.shadowRoot.querySelector(".user-list");
      setTimeout(() => {
        modalElement.classList.add("open");
      }, 100);
    } else {
      this.updateList(event.detail);
    }
  }

  updateList(list) {
    const modalElement = this.shadowRoot.querySelector(".user-list");

    modalElement.innerHTML = "";

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createTemplate(list);

    modalElement.appendChild(templateElem.content.cloneNode(true));
  }

  handleClickOutside(event) {
    const modalElement = this.shadowRoot.querySelector(".user-list");
    const eventPath = event.composedPath();

    const isClickOutsideModal = !eventPath.includes(this);

    if (isClickOutsideModal) {
      modalElement.classList.remove("open");
      this.#isFirstRender = true;
      
      setTimeout(() => {
        this.updateList();
      }, 500);
    }
  }

  async #onUserClick(event) {
    const userId = event.target.getAttribute("user-id");

    if (!userId) {
      return;
    }

    await this.#chatService.createChat([userId]);

    const modalElement = this.shadowRoot.querySelector(".user-list");
    modalElement.classList.remove("open");
  }

  #onChatClick() {
    const modalElement = this.shadowRoot.querySelector(".user-list");
    modalElement.classList.remove("open");
  }

  render(userList) {
    this.#listenerService.removeListeners(this.handleClickOutside.bind(this));
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createUserListTemplate(userList);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listenerService.addListeners(this.handleClickOutside.bind(this));
    this.#listeners.forEach(addListeners.bind(this));
  }
}
