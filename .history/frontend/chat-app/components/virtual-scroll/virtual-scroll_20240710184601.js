import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class VirtualScroll extends HTMLElement {
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
    const content = this.shadowRoot.getElementById("content");
    content.innerHTML = "";

    const slotContent = this.shadowRoot.querySelector("slot").assignedNodes();
    let visibleItemCount = 5;

    for (let i = 0; i < Math.min(visibleItemCount, slotContent.length); i++) {
        const item = slotContent[i];
        content.appendChild(item);
    }
}

  render() {
    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
  }
}
