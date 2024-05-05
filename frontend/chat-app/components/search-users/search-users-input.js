import { createSearchInputTemplate } from "./search-users-input.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

const searchAttribute = {
  VALUE: "value",
};

export class SearchInput extends HTMLElement {
  #value;
  #listeners = [
    [select.bind(this, "#search"), "input", this.#onInputChange.bind(this)],
  ];
  #ATTRIBUTE_MAPPING = new Map([
    [searchAttribute.VALUE, this.setValue.bind(this)],
  ]);

  static get name() {
    return "search-input";
  }

  static get observedAttributes() {
    return Object.values(searchAttribute);
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

  setValue(newValue) {
    this.#value = newValue;
  }

  #onInputChange(e) {
    const value = e.target.value;

    const searchEvent = new CustomEvent("search", {
      detail: {
        value,
      },
    });

    this.dispatchEvent(searchEvent);
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement("template");
    templateElem.innerHTML = createSearchInputTemplate(this.#value);

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
