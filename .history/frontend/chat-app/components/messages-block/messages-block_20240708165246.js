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
    const messages = await this.#messagesService.loadMoreMessages();

    messages.forEach((message) => {
      const messageStr = JSON.stringify(message);
      const messageElem = document.createElement("messages-by-user");

      messageElem.setAttribute("messages", messageStr);

      this.shadowRoot.prepend(messageElem);
    });
  }

  render(messages) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessagesBlockTemplate(messages);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    if (messages) {
      const messageBlock = this.shadowRoot.querySelector(".messages");
      messageBlock.scrollTop = messageBlock.scrollHeight;
    }
  }
}
