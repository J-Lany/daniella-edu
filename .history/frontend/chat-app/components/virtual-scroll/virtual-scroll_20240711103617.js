import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class VirtualScroll extends HTMLElement {
  #buffer = 10;
  #visibleItemCount = 5;

  static get name() {
    return "virtual-scroll";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.renderItems();
  }

  disconnectedCallback() {}

  renderItems() {
    const content = this.shadowRoot.querySelector(".container");
    content.innerHTML = "";
    console.log(this.children);
    const children = this.children;
    const childrenCount = children.length;

    for (
      let i = childrenCount;
      i < Math.max(0, childrenCount - this.#visibleItemCount);
      i--
    ) {
      const child = children[i].cloneNode(true);
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
