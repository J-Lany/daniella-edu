import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

const scrollAttribute = {
  props: props
};
export class VirtualScroll extends HTMLElement {
  #visibleItemCount = 5;
  #props;

  #ATTRIBUTE_MAPPING = new Map([[scrollAttribute.USER_ID, this.setProps.bind(this)]]);

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

  disconnectedCallback() {}

  setProps(newProps) {
    this.#props = JSON.parse(newProps);
  }

  renderItems() {
    const content = this.shadowRoot.querySelector(".container");
    content.innerHTML = "";
    const children = this.#props;
    console.log(children);
    const childrenCount = children.length;

    for (let i = childrenCount; i < Math.max(0, childrenCount - this.#visibleItemCount); i--) {
      const child = children[i].cloneNode(true);
      content.prepend(child);
    }
  }

  render() {
    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));

    this.renderItems();
  }
}
