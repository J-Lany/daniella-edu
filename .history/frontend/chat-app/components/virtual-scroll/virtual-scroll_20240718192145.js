import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

const ELEMENTS_GAP = 3;
export class VirtualScroll extends HTMLElement {
  #list;
  #container;
  #nodeList = [];
  #buffer = 10;
  #observedEndIndex;
  #observeElement;
  #isDoubleChange = false;

  #listeners = [[select.bind(this, "slot"), "slotchange", this.onSlotChange.bind(this)]];

  static get name() {
    return "virtual-scroll";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    this.style.height = this.getAttribute('height') || '500px';

    const content = this.shadowRoot.querySelector('.content');
    content.style.position = 'relative';

  }

  disconnectedCallback() {}


  loadMoreItems() {
    this.dispatchEvent(new Event("load-more-items"));
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
    this.#listeners.forEach(addListeners.bind(this));


  }
}
