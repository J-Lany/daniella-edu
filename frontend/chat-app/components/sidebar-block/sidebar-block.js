import { SERVICES } from "../../di/api.js";
import { diContainer } from "../../di/di.js";
import { LIST_TYPE } from "../sidebar/sidebar.js";
import { createSidebarBlockTemplate } from "./sidebar-block.template.js";

export class SidebarBlock extends HTMLElement {
  #listenerService = diContainer.resolve(SERVICES.listener);
  #authService = diContainer.resolve(SERVICES.auth);
  #chatService = diContainer.resolve(SERVICES.chat);
  #listType = LIST_TYPE.chats;
  #currentUser;
  #chats;

  static get name() {
    return "sidebar-block";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.getChats();
  }

  getChats() {
    this.#currentUser = this.#authService.getCurrentUser();
    this.#chatService
      .getChatsByCurrnetUser(this.#currentUser.userId)
      .then((res) => {
        this.#chats = res;
        this.render();
      });
  }

  disconnectedCallback() {
    if (this.#listType === LIST_TYPE.users) {
      this.#listenerService.removeListeners(this.handleClickOutside.bind(this));
    }
  }

  handleCustomEvent(event) {
    this.#listType = LIST_TYPE.users;
    this.render(event.detail);
  }

  handleClickOutside(event) {
    const sidebarBlock = this;
    const target = event.target;
    const isClickOutsideSidebar =
      sidebarBlock !== target || !sidebarBlock.contains(target);

    if (isClickOutsideSidebar) {
      this.#listType = LIST_TYPE.chats;
      this.render();
    }
  }

  render() {
    this.#listenerService.removeListeners(this.handleClickOutside.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createSidebarBlockTemplate(
      this.#chats,
      this.#currentUser.userId
    );

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    if (this.#listType === LIST_TYPE.users) {
      this.#listenerService.addListeners(this.handleClickOutside.bind(this));
    }
  }
}
