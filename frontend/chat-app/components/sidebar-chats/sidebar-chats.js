import { createChatSidebarTemplate } from "./sidebar-chats.template";

const chatsAttribute = {
  CHATS: "chats",
};

export class ChatSidebar extends HTMLElement {
  #chats;
  #ATTRIBUTE_MAPPING = new Map([
    [chatsAttribute.CHATS, this.setChats.bind(this)],
  ]);

  static get name() {
    return "chats-sidebar";
  }

  static get observedAttributes() {
    return Object.values(chatsAttribute);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (callback) {
        callback(newValue);
        this.render();
      }
    }
  }

  setChats(newChats) {
    this.#chats = newChats;
  }

  render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = createChatSidebarTemplate(this.#chats);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
  }
}
