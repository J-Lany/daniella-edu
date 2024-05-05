import { LIST_TYPE } from "../sidebar/sidebar.js";
import { createSidebarBlockTemplate } from "./sidebar-block.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class SidebarBlock extends HTMLElement {
  #listType = LIST_TYPE.chats;
  #listeners = [
    [
      select.bind(this, ".close-button"),
      "click",
      this.#onCloseClick.bind(this),
    ],
  ];

  static get name() {
    return "sidebar-block";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  handleCustomEvent(event) {
    this.#listType = LIST_TYPE.users;
    this.render(event.detail);
  }

  #onCloseClick() {
    this.#listType = LIST_TYPE.chats;
    this.render();
  }

  render(list) {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createSidebarBlockTemplate(list, this.#listType);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
