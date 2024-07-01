import { createMessagesByUserTemplate } from "./messages-by-user.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

const messagesAttribute = {
  MESSAGES: "messages",
};

export class MessagesByUser extends HTMLElement {
  #messagesService = diContainer.resolve(SERVICES.messages);
  #authService = diContainer.resolve(SERVICES.auth);
  #currentUser;
  #messages;

  #ATTRIBUTE_MAPPING = new Map([
    [messagesAttribute.MESSAGES, this.setMessages.bind(this)],
  ]);

  static get name() {
    return "messages-by-user";
  }

  static get observedAttributes() {
    return Object.values(messagesAttribute);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {


    this.unsubscribeFromCurrentUser = this.#authService.subscribeCurrentUser(
      this.setCurrentUser.bind(this)
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (callback) {
        callback(newValue);
        this.render();
      }
    }
  }

  setMessages(messages) {
    this.#messages = JSON.parse(messages);
  }

  setCurrentUser(user) {
    this.#currentUser = user;
  }

  disconnectedCallback() {
  
    this.unsubscribeFromCurrentUser();
  }
  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessagesByUserTemplate(
      this.#messages,
      this.#currentUser
    );

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
