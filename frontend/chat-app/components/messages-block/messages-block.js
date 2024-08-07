import { createMessagesBlockTemplate, createSlots } from "./messages-block.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class MessagesBlock extends HTMLElement {
  #messagesService = diContainer.resolve(SERVICES.messages);
  #listeners = [[select.bind(this, "virtual-scroll"), "top-reached", this.loadMoreMessages.bind(this)]];

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

  async loadMoreMessages() {
    const chatId = this.#messagesService.getCurrentChatId();

    const historyMessagrs = await this.#messagesService.loadMoreMessages(chatId);

    if (!historyMessagrs || historyMessagrs.length === 0) {
      return;
    }

    const historyMessagesElements = historyMessagrs.reduce((acc, messageBlock) => {
      const messageByUserElement = document.createElement("messages-by-user");
      messageByUserElement.setAttribute("messages", JSON.stringify(messageBlock));
      acc.push(messageByUserElement);
      return acc;
    }, []);

    const virtualScroll = this.shadowRoot.querySelector(".virtual-scroll");

    virtualScroll.loadMoreItems(historyMessagesElements);
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
