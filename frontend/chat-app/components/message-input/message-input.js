import { createMessageInputTemplate } from "./message-input.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class MessageInput extends HTMLElement {
  #listeners = [[select.bind(this, "#message"), "keyup", this.#onInputChange]];

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
    if (e.key === "Enter") {
      console.log(e.target);
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
