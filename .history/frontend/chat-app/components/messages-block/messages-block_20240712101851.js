import { createMessagesBlockTemplate } from "./messages-block.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class MessagesBlock extends HTMLElement {
  #messagesService = diContainer.resolve(SERVICES.messages);

  #listeners = [[select.bind(this, "virtual-scroll"), "click", this.onLoad.bind(this)]];

  static get name() {
    return "messages-block";
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#listeners.forEach(addListeners.bind(this));

    this.unSubscribeFromMessages = this.#messagesService.subscribeMessagesByCurrentChat(this.render.bind(this));
  }

  disconnectedCallback() {
    this.unSubscribeFromMessages();
  }

  onLoad() {
    this.dispatchEvent(new Event("messsages-loaded"));
  }

  async loadMoreMessages(scrollTop, lastScrollPosition) {
    const virtualScroll = this.shadowRoot.querySelector("virtual-scroll");
    virtualScroll.handleScroll(scrollTop, lastScrollPosition);

    // const chatId = this.#messagesService.getCurrentChatId();
    // const startIndex = this.#messagesService.getStartIndex();
    // const messages = await this.#messagesService.loadMoreMessages(
    //   chatId,
    //   startIndex
    // );

    // if (!messages) {
    //   return;
    // }

    // for (let i = messages.length - 1; i >= 0; i--) {
    //   const messageBlock = this.shadowRoot.children[1];

    //   const message = messages[i];
    //   const messageStr = JSON.stringify(message);

    //   const messageElem = document.createElement("messages-by-user");
    //   messageElem.setAttribute("messages", messageStr);

    //   messageBlock.prepend(messageElem);
    // }
  }

  render(messages) {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessagesBlockTemplate(messages);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));

    this.onLoad()
    console.log(this.shadowRoot)
    this.shadowRoot.querySelector("virtual-scroll").scrollTo({top: "200px", behavior:"instant" })  
  }
}
