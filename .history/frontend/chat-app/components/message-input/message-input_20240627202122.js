import { createMessageInputTemplate } from "./message-input.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di.js";
import { SERVICES } from "../../di/api.js";

const KEYS = {
  ENTER: "Enter",
  CLICK: "click",
};

export class MessageInput extends HTMLElement {
  #messageService = diContainer.resolve(SERVICES.messages);
  #listeners = [
    [select.bind(this, "#message"), "keyup", this.#onInputChange.bind(this)],
    [
      select.bind(this, ".message-input__img"),
      "click",
      this.#onInputChange.bind(this),
    ],
  ];

  static get name() {
    return "message-input";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  #onInputChange(e) {
    if (e.key === KEYS.ENTER || e.type === KEYS.CLICK) {
      this.#messageService.sendMessage(e.target.value);
      e.target.value = "";
    }
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createMessageInputTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}