import { createMessagesBlockTemplate } from "./messages-block.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class MessagesBlock extends HTMLElement {
  #messagesService = diContainer.resolve(SERVICES.messages);

  static get name() {
    return "messages-block";
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unSubscribeFromMessages =
      this.#messagesService.subscribeMessagesByCurrentChat(
        this.render.bind(this)
      );
  }

  disconnectedCallback() {
    this.unSubscribeFromMessages();
  }

  async loadMoreMessages() {
    const chatId = this.#messagesService.getCurrentChatId();
    const startIndex = this.#messagesService.getStartIndex();
    const messages = await this.#messagesService.loadMoreMessages(
      chatId,
      startIndex
    );

    if (!messages) {
      return;
    }

    for (let i = messages.length - 1; i >= 0; i--) {
      const messageBlock = this.shadowRoot.children[1];

      const message = messages[i];
      const messageStr = JSON.stringify(message);

      const messageElem = document.createElement("messages-by-user");
      messageElem.setAttribute("messages", messageStr);

      messageBlock.prepend(messageElem);
    }
 
  }

  render(messages) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessagesBlockTemplate(messages);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));


  }
}
