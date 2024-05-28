import { SERVICES } from "../../di/api.js";
import { diContainer } from "../../di/di.js";
import { LIST_TYPE } from "../sidebar/sidebar.js";
import { createChatListTemplate } from "./chat-list.template.js";

export class ChatListComponent extends HTMLElement {
  #listenerService = diContainer.resolve(SERVICES.listener);
  #chatService = diContainer.resolve(SERVICES.chat);
  #listType = LIST_TYPE.chats;

  static get name() {
    return "chat-list";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unsubscribeFromChats = this.#chatService.subscribeChats(
      this.render.bind(this)
    );
  }

  disconnectedCallback() {
    this.unsubscribeFromChats();

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

  render(chatList, currentUserId) {
    this.#listenerService.removeListeners(this.handleClickOutside.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createChatListTemplate(chatList, currentUserId);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    if (this.#listType === LIST_TYPE.users) {
      this.#listenerService.addListeners(this.handleClickOutside.bind(this));
    }
  }
}
