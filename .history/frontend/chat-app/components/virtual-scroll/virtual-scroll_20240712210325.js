import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { debounce } from "../../utils/debounce.js";

const scrollAttribute = {
  PROPS: "props",
  COMPONENT: "component"
};

const ROW_SIZE = 111;
const DELAY = 200;
export class VirtualScroll extends HTMLElement {
  #messagesService = diContainer.resolve(SERVICES.messages);

  #visibleItemCount = 10;
  #props;
  #component;
  #startIndex;
  #viewportHeight;
  #rowHeight = ROW_SIZE;

  #listeners = [
    [select.bind(this, ".container"), "scroll", this.handleScroll.bind(this)],
    [select.bind(this,"slot"), "slotchange", this.#onSlotChange.bind(this)]
  ];


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



  disconnectedCallback() {}
 


  async handleScroll(scrollTop, lastScrollPosition) {
    console.log("scroll")
  }

  #onSlotChange({ target }) {
    console.log(target)
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
    }
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));

    this.renderItems();
  }
}
