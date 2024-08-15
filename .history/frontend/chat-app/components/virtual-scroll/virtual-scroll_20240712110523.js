import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

const scrollAttribute = {
  PROPS: "props",
  COMPONENT: "component"
};
export class VirtualScroll extends HTMLElement {
  #visibleItemCount = 5;
  #props;
  #component;
  #startIndex;
  #viewportHeight;
  #rowHeight;

  #listeners = [[select.bind(this, ".container"), "scroll", this.handleScroll.bind(this)]];

  #ATTRIBUTE_MAPPING = new Map([
    [scrollAttribute.PROPS, this.setProps.bind(this)],
    [scrollAttribute.COMPONENT, this.setComponent.bind(this)]
  ]);

  static get name() {
    return "virtual-scroll";
  }

  static get observedAttributes() {
    return Object.values(scrollAttribute);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.renderItems();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (callback) {
        callback(newValue);
        this.render();
        this.renderItems();
      }
    }
  }

  disconnectedCallback() {}

  setProps(newProps) {
    this.#props = JSON.parse(newProps);
    this.#startIndex = this.#props.length - 1;
  }

  setComponent(newComponent) {
    this.#component = newComponent;
  }

  handleScroll(scrollTop, lastScrollPosition) {
    const changeTo = Math.ceil(scrollTop / this.#rowHeight);
    this.#startIndex += changeTo;

    if (this.#startIndex < this.#visibleItemCount || this.#startIndex > this.#props.length) {
      return;
    }

    this.renderItems();
  }

  renderItems() {
    if (this.#component && this.#props) {
      const content = this.shadowRoot.querySelector(".container");
      const children = this.#props;

      content.innerHTML = "";

      for (let i = this.#startIndex; i > Math.max(0, this.#startIndex - this.#visibleItemCount); i--) {
        const payload = children[i];
        const childElm = document.createElement(this.#component);
        childElm.setAttribute("payload", JSON.stringify(payload));

        content.prepend(childElm);
      }

      this.#viewportHeight = content.getBoundingClientRect().height;
      this.#rowHeight = Math.ceil(this.#viewportHeight / this.#visibleItemCount);
    }
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
