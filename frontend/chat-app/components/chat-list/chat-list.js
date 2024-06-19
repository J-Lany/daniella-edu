import { SERVICES } from "../../di/api.js";
import { diContainer } from "../../di/di.js";
import { createChatListTemplate } from "./chat-list.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export const CHAT_ID = "chat-id";
export const SELECTED = "selected";

export class ChatListComponent extends HTMLElement {
  #chatService = diContainer.resolve(SERVICES.chat);
  #messageService = diContainer.resolve(SERVICES.messages);
  #listeners = [
    [select.bind(this, ".chat-list"), "click", this.#onChatClick.bind(this)],
  ];

  static get name() {
    return "chat-list";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#listeners.forEach(addListeners.bind(this));
    this.unsubscribeFromChats = this.#chatService.subscribeChats(
      this.render.bind(this)
    );
  }

  #onChatClick(event) {
    const chatId = event.target.getAttribute(CHAT_ID);
    const chatItems = this.shadowRoot.querySelectorAll(".chat-list__item");

    chatItems.forEach((item) => {
      const isSelected = item.getAttribute(CHAT_ID) === chatId;

      if (isSelected) {
        item.classList.add(SELECTED);
      } else {
        item.classList.remove(SELECTED);
      }
    });

    this.#messageService.setCurrentChatId(chatId);
  }

  disconnectedCallback() {
    this.unsubscribeFromChats();
    this.#listeners.forEach(removeListeners.bind(this));
  }

  render(chatList, currentUserId) {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createChatListTemplate(chatList, currentUserId);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
