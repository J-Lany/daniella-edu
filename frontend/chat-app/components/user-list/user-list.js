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
  }

  handleClickOutside(event) {
    const sidebarBlock = this;
    const target = event.target;
    const isClickOutsideSidebar =
      sidebarBlock !== target || !sidebarBlock.contains(target);

    if (isClickOutsideSidebar) {
      this.remove();
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
