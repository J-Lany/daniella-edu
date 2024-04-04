import { createMessageTemplate } from "./message.template";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

const messageAttribute = {
  USER_ID: "user-id",
  MESSAGE_TIME: "time",
  MESSAGE: "message",
};
export class Message extends HTMLElement {
  #userId;
  #messageTime;
  #message;

  #ATTRIBUTE_MAPPING = new Map([
    [messageAttribute.MESSAGE_TIME, this.setTime],
    [messageAttribute.USER_ID, this.setUserId],
    [messageAttribute.MESSAGE, this.setMessage],
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
        callback(this, newValue);
      }
    }
  }
  setTime(_, newTime) {
    this.#messageTime = newTime;
  }
  setUserId(_, newId) {
    this.#userId = newId;
  }
  setMessage(_, newMessage) {
    this.#message = newMessage;
  }
  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessageTemplate(
      this.#message,
      this.#messageTime,
      this.#userId
    );

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
