import { createToastComponentTemplate } from "./toast-component.template";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export const TOAST_TYPE = {
  sucsess: "sucsess",
  error: "error",
};

const toastAttribute = {
  TYPE: "type",
  MESSAGE: "message",
};

export class ToastComponent extends HTMLElement {
  #type;
  #message;

  #listeners = [
    [
      select.bind(this, "toast__button"),
      "click",
      this.#onCloseClick.bind(this),
    ],
  ];

  #ATTRIBUTE_MAPPING = new Map([
    [toastAttribute.TYPE, this.setType.bind(this)],
    [toastAttribute.MESSAGE, this.setMessage.bind(this)],
  ]);

  static get name() {
    return "toast-component";
  }

  static get observedAttributes() {
    return Object.values(toastAttribute);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (callback) {
        callback(newValue);
        this.#render();
      }
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  #onCloseClick() {
    this.remove();
  }

  setType(newType) {
    this.#type = newType;
  }

  setMessage(newMessage) {
    this.#message = newMessage;
  }

  connectedCallback() {
    this.#render();
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  #render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createToastComponentTemplate(
      this.#type,
      this.#message
    );

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
