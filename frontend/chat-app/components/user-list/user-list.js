import { SERVICES } from "../../di/api.js";
import { diContainer } from "../../di/di.js";
import { createUserListTemplate } from "./user-list.template.js";

export class UserListComponent extends HTMLElement {
  #listenerService = diContainer.resolve(SERVICES.listener);

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
  }

  handleCustomEvent(event) {
    this.render(event.detail);
    const modalElement = this.shadowRoot.querySelector(".user-list");
    modalElement.classList.add("open");
  }

  handleClickOutside(event) {
    const modalElement = this.shadowRoot.querySelector(".user-list");
    const eventPath = event.composedPath();

    const isClickOutsideModal = !eventPath.includes(this);

    if (isClickOutsideModal) {
      modalElement.classList.remove("open");
    }
  }

  render(userList) {
    this.#listenerService.removeListeners(this.handleClickOutside.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createUserListTemplate(userList);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listenerService.addListeners(this.handleClickOutside.bind(this));
  }
}
