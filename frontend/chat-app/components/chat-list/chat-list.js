import { SERVICES } from "../../di/api.js";
import { diContainer } from "../../di/di.js";
import { LIST_TYPE } from "../sidebar/sidebar.js";
import { createChatListTemplate } from "./chat-list.template.js";

export class ChatListComponent extends HTMLElement {
  #chatService = diContainer.resolve(SERVICES.chat);

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
  }

  render(chatList, currentUserId) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createChatListTemplate(chatList, currentUserId);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
