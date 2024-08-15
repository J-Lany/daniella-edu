import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

const scrollAttribute = {
  props: props,
}
export class VirtualScroll extends HTMLElement {
  #visibleItemCount = 5;
  #props

  #ATTRIBUTE_MAPPING = new Map([
    [avatarAttribute.USER_ID, this.setUserId.bind(this)],
    [avatarAttribute.DISPLAY_MODE, this.setDisplayMode.bind(this)],
  ]);

  static get name() {
    return "virtual-scroll";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {}

  renderItems() {
    const content = this.shadowRoot.querySelector(".container");
    content.innerHTML = "";
    console.log(this.children);
    const children = this.children;
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
