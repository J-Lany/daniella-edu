import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

const ELEMENTS_GAP = 3;
export class VirtualScroll extends HTMLElement {
itemsMap = new Map();
visibleItems = new Set();
itemHeight = 50; // Assuming each item is 50px height
 bufferSize = 5; 

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

    this.indexItems();
    this.updateVisibleItems();
    this.attachScrollListener();

  }

  indexItems() {
    const children = Array.from(this.children);
    children.forEach((child, index) => {
        this.itemsMap.set(index, child.cloneNode(true));
    });

    this.innerHTML = ''; // Clear the initial content
    const placeholderHeight = this.itemsMap.size * this.itemHeight;
    this.shadowRoot.querySelector('.bottom-placeholder').style.top = `${placeholderHeight}px`;
    this.updateVisibleItems(); // Initial render
}


  loadMoreItems() {
    this.dispatchEvent(new Event("load-more-items"));
  }

  disconnectedCallback() {}

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
    this.#listeners.forEach(addListeners.bind(this));


  }
}
