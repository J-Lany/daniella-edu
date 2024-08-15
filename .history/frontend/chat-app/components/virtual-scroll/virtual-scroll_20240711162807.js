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
  #startIndex 

  #listeners = [
    [select.bind(this, ".messages-block"), "scroll", this.handleScroll.bind(this)]
  ];

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
    this.#startIndex = this.#props.length
  }

  setComponent(newComponent) {
    this.#component = newComponent;
  }

  handleScroll(e) {
    console.log(e.target.scrollTop)
  }

  renderItems() {
    if (this.#component && this.#props) {
      const content = this.shadowRoot.querySelector(".container");
      content.innerHTML = "";
      const children = this.#props;

      for (let i = this.#startIndex - 1; i >= Math.max(0, this.#startIndex  - this.#visibleItemCount); i--) {
        
        const payload = children[i];
        const childElm= document.createElement(this.#component);
        childElm.setAttribute("payload", JSON.stringify(payload));
 
        content.prepend(childElm);
      }
    }
  }

  render() {
    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
  }
}
