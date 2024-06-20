import { createMessagesBlockTemplate } from "./messages-block.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class MessagesBlock extends HTMLElement {
  #messagesService = diContainer.resolve(SERVICES.messages);
  #authService = diContainer.resolve(SERVICES.auth);
  #currentUser;

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

    this.unsubscribeFromCurrentUser = this.#authService.subscribeCurrentUser(
      this.setCurrentUser.bind(this)
    );

    this.render();
  }

  setCurrentUser(user) {
    this.#currentUser = user;
  }

  disconnectedCallback() {
    this.unSubscribeFromMessages();
    this.unsubscribeFromCurrentUser();
  }
  render(messages) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessagesBlockTemplate(
      messages,
      this.#currentUser
    );

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
