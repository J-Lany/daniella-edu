import { LIST_TYPE } from "../sidebar/sidebar.js";
import { createSidebarBlockTemplate } from "./sidebar-block.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class SidebarBlock extends HTMLElement {
  #listType = LIST_TYPE.chats;

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
    document.removeEventListener("click", this.#handleClickOutside.bind(this));
  }

  handleCustomEvent(event) {
    this.#listType = LIST_TYPE.users;
    this.render(event.detail);
  }

  addClickOutsideListener() {
    if (this.#listType === LIST_TYPE.users) {
      document.addEventListener("click", this.#handleClickOutside.bind(this));
    }
  }

  #handleClickOutside(event) {
    const sidebarBlock = this;
    const target = event.target;
  
    if (sidebarBlock !== target || !sidebarBlock.contains(target)) {
      this.#listType = LIST_TYPE.chats;
      this.render();
    }
  }

  render(list) {
    document.removeEventListener("click", this.#handleClickOutside.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createSidebarBlockTemplate(list, this.#listType);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.addClickOutsideListener();
  }
}
