import { createMessageTemplate } from "./message.template";

const messageAttribute = {
  USER_ID: "user-id",
  MESSAGE_TIME: "time",
  MESSAGE: "message",
  DISPLAY_MODE: "display-mode",
  IS_CURRENT_USER: "is-current-user",
};

export class Message extends HTMLElement {
  #userId;
  #messageTime;
  #message;
  #displayMode;
  #isCurrentUser;

  #ATTRIBUTE_MAPPING = new Map([
    [messageAttribute.MESSAGE_TIME, this.setTime.bind(this)],
    [messageAttribute.USER_ID, this.setUserId.bind(this)],
    [messageAttribute.MESSAGE, this.setMessage.bind(this)],
    [messageAttribute.DISPLAY_MODE, this.setDisplayMode.bind(this)],
    [messageAttribute.IS_CURRENT_USER, this.setIsCurrentUser.bind(this)],
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

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (callback) {
        callback(newValue);
        this.render();
      }
    }
  }

  setIsCurrentUser(isCurrentUser) {
    this.#isCurrentUser = isCurrentUser;
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

  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessageTemplate(
      this.#message,
      this.#messageTime,
      this.#userId,
      this.#displayMode,
      this.#isCurrentUser
    );

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
