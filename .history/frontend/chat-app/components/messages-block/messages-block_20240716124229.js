import { createMessagesBlockTemplate, createSlots } from "./messages-block.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class MessagesBlock extends HTMLElement {
  #messagesService = diContainer.resolve(SERVICES.messages);
  #listeners = [[select.bind(this, "virtual-scroll"), "load-more-items", this.loadMoreMessages.bind(this)]];

  static get name() {
    return "messages-block";
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unSubscribeFromMessages = this.#messagesService.subscribeMessagesByCurrentChat(this.render.bind(this));
  }

  disconnectedCallback() {
    this.unSubscribeFromMessages();
  }

  loadMoreMessages(scrollTop, lastScrollPosition) {
    const chatId = this.#messagesService.getCurrentChatId();
    const startIndex = this.#messagesService.getStartIndex();
    const historyMessagrs = this.#messagesService.loadMoreMessages(scrollTop, lastScrollPosition);
  }

  prependHistory(messages) {
    const virtualScroll = this.shadowRoot.querySelector(".virtual-scroll");
    const newMessagesSlots = createSlots(messages);

    virtualScroll.prepend(newMessagesSlots);
  }

  render(messages) {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessagesBlockTemplate(messages);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
