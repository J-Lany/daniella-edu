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

  #ATTRIBUTE_MAPPING = new Map([[scrollAttribute.PROPS, this.setProps.bind(this)]]);

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
  }

  setComponent(newComponent) {
    this.#component = newComponent;
  }

  renderItems() {
    const content = this.shadowRoot.querySelector(".container");
    content.innerHTML = "";
    const children = this.#props;
    const childrenCount = children.length;

    for (let i = childrenCount - 1; i > Math.max(0, childrenCount - this.#visibleItemCount); i--) {
      console.log(children[i]);
     const payload = children[i];

      const child = `<${this.#component} payload='${JSON.stringify(payload)}'></${this.#component}>`;
      content.prepend(child);
    }
  }

  render() {
    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));

  }
}