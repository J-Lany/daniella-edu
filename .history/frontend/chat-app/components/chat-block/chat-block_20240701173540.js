import { createChatBlockTemplate } from "./chat-block.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class ChatBlock extends HTMLElement {
  #messagesService = diContainer.resolve(SERVICES.messages);


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

  disconnectedCallback() {
     this.unSubscribeFromCurrentChatId();
  }



  render(messages) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createChatBlockTemplate(messages);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
