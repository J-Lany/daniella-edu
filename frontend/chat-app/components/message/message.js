import { createMessageTemplate } from "./message.template";

const messageAttribute = {
  USER_ID: "user-id",
  MESSAGE_TIME: "time",
  MESSAGE: "message",
  IS_CURRENT_USER: "is-current-user",
  WIHT_AVATAR: "with-avatar",
};

export class Message extends HTMLElement {
  #userId;
  #messageTime;
  #message;
  #isCurrentUser;
  #withAvatar;

  #ATTRIBUTE_MAPPING = new Map([
    [messageAttribute.MESSAGE_TIME, this.setTime.bind(this)],
    [messageAttribute.USER_ID, this.setUserId.bind(this)],
    [messageAttribute.MESSAGE, this.setMessage.bind(this)],
    [messageAttribute.IS_CURRENT_USER, this.setIsCurrentUser.bind(this)],
    [messageAttribute.WIHT_AVATAR, this.setWithAvatar.bind(this)],
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

  setWithAvatar(newValue) {
    this.#withAvatar = newValue;
  }

  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessageTemplate(
      this.#message,
      this.#messageTime,
      this.#userId,
      this.#isCurrentUser,
      this.#withAvatar
    );

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
