import { createChatBlockTemplate } from "./chat-block.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class ChatBlock extends HTMLElement {
  #messagesService = diContainer.resolve(SERVICES.messages);
  #listeners = [
    [select.bind(this, ".messages-block"), "scroll", this.#onScroll.bind(this)]
  ];

  static get name() {
    return "chat-block";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unSubscribeFromCurrentChatId =
      this.#messagesService.subscribeCurrentChatId(this.render.bind(this));
    this.render();
  }

  #onScroll(e) {
    const messagesBlock = this.shadowRoot.querySelector(".messages-block");

    if (messagesBlock.scrollTop === 0) {
      this.#messagesService.getMessagesOnScroll();
      console.log("load more");
    }
  }

  disconnectedCallback() {
    this.unSubscribeFromCurrentChatId();
  }

  render(messages) {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createChatBlockTemplate(messages);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}