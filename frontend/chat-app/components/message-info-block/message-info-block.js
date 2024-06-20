import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { createMessageInfoTemplate } from "./message-info-block.template";

const messagesAttribute = {
  USER_ID: "user-id",
  MESSAGE_TIME: "time",
  POSITION: "position",
};

export class MessageInfoBlock extends HTMLElement {
  #userService = diContainer.resolve(SERVICES.user);
  #messageTime;
  #userID;
  #position;
  #ATTRIBUTE_MAPPING = new Map([
    [messagesAttribute.MESSAGE_TIME, this.setTime.bind(this)],
    [messagesAttribute.USER_ID, this.setUserId.bind(this)],
    [messagesAttribute.POSITION, this.setPosition.bind(this)],
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
        callback(newValue);
      }
    }
  }

  setTime(newTime) {
    this.#messageTime = newTime;
  }

  setUserId(newId) {
    this.#userID = newId;
  }

  setPosition(newPosition) {
    this.#position = newPosition;
  }

  render(user) {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessageInfoTemplate(
      user,
      this.#messageTime,
      this.#position
    );

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
