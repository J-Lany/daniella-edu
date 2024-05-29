import { createMessageTemplate } from "./message.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

const messageAttribute = {
  USER_ID: "user-id",
  MESSAGE_TIME: "time",
  MESSAGE: "message",
  DISPLAY_MODE: "display-mode",
  CHAT_ID: "chat-id",
};
export class Message extends HTMLElement {
  #userId;
  #messageTime;
  #message;
  #displayMode;
  #chatId;

  #ATTRIBUTE_MAPPING = new Map([
    [messageAttribute.MESSAGE_TIME, this.setTime.bind(this)],
    [messageAttribute.USER_ID, this.setUserId.bind(this)],
    [messageAttribute.MESSAGE, this.setMessage.bind(this)],
    [messageAttribute.DISPLAY_MODE, this.setDisplayMode.bind(this)],
    [messageAttribute.CHAT_ID, this.setChatId.bind(this)],
  ]);

  static get name() {
    return "message-component";
  }
  static get observedAttributes() {
    return Object.values(messageAttribute);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }
  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (callback) {
        callback(newValue);
        this.render();
      }
    }
  }

  setTime(newTime) {
    this.#messageTime = newTime;
  }

  setUserId(newId) {
    this.#userId = newId;
  }

  setMessage(newMessage) {
    this.#message = newMessage;
  }

  setDisplayMode(newMode) {
    this.#displayMode = newMode;
  }

  setChatId(newChatId) {
    this.#chatId = newChatId;
  }

  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessageTemplate(
      this.#message,
      this.#messageTime,
      this.#userId,
      this.#displayMode
    );

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
