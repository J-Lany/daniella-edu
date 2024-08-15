import { createMessagesBlockTemplate, createSlots } from "./messages-block.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class MessagesBlock extends HTMLElement {
  #messagesService = diContainer.resolve(SERVICES.messages);
  #listeners = [
    [select.bind(this, "virtual-scroll"), "load-more", this.loadMoreMessages.bind(this)]
  ];

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
    console.log("Load")
  }

  prependHistory(messages) {
    const virtualScroll = this.shadowRoot.querySelector(".virtual-scroll");
    const newMessagesSlots = createSlots(messages);

    virtualScroll.prepend(newMessagesSlots);
  }

  render(messages) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessagesBlockTemplate(messages);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.onLoad();
  }
}
