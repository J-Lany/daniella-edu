import { createMessagesBlockTemplate } from "./messages-block.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class MessagesBlock extends HTMLElement {
  #messagesService = diContainer.resolve(SERVICES.messages);
  #visibleMessages = [];
  #topIndex = 0;
  #messages

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

  onMessagesChange(messages) {
    this.messages = messages;
    this.render();
  }

  render(messages) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessagesBlockTemplate(messages);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
