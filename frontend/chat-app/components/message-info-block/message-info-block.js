import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { createMessageInfoTemplate } from "./message-info-block.template";

const messagesAttribute = {
  USER_ID: "user-id",
  MESSAGE_TIME: "time",
};
export class MessageInfoBlock extends HTMLElement {
  #userService = diContainer.resolve(SERVICES.user);
  #messageTime;
  #userID;
  #ATTRIBUTE_MAPPING = new Map([
    [messagesAttribute.MESSAGE_TIME, this.setTime],
    [messagesAttribute.USER_ID, this.setUserId],
  ]);

  static get name() {
    return "message-info";
  }

  static get observedAttributes() {
    return Object.values(messagesAttribute);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.unsubscribeFromUser = this.#userService.subscribeUserById(
      this.#userID,
      this.render.bind(this)
    );
  }

  disconnectedCallback() {
    this.unsubscribeFromUser();
  }

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
    this.#userID = newId;
  }

  render(user) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessageInfoTemplate(user, this.#messageTime);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
