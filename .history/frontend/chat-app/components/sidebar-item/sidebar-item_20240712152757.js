import { createSidebarItemTemplate } from "./sidebar-item.template";

const sidebarItemAttribute = {
  USER_ID: "user-id",
  MESSAGE_TIME: "time",
  MESSAGE: "message",
};

export class SidebarItem extends HTMLElement {
  #userId;
  #messageTime;
  #message;

  #ATTRIBUTE_MAPPING = new Map([
    [sidebarItemAttribute.MESSAGE_TIME, this.setTime.bind(this)],
    [sidebarItemAttribute.USER_ID, this.setUserId.bind(this)],
    [sidebarItemAttribute.MESSAGE, this.setMessage.bind(this)],
  ]);

  static get name() {
    return "sidebar-item";
  }
  static get observedAttributes() {
    return Object.values(sidebarItemAttribute);
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
        const allAttributesSet = this.#message && this.#messageTime && this.#userId;

        if (allAttributesSet) {
          this.render();
        }
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

  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createSidebarItemTemplate(
      this.#message,
      this.#messageTime,
      this.#userId
    );

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
