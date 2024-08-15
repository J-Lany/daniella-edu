import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

const ELEMENTS_GAP = 3;
export class VirtualScroll extends HTMLElement {
  itemsMap = new Map();
  visibleItems = new Set();
  itemHeight = 50;
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

    this.style.height = this.getAttribute("height") || "500px";

    const content = this.shadowRoot.querySelector(".content");
    content.style.position = "relative";

    this.indexItems();
    this.updateVisibleItems();
    this.attachScrollListener();
  }

  indexItems() {
    const children = Array.from(this.children);
    children.forEach((child, index) => {
      this.itemsMap.set(index, child.cloneNode(true));
    });

    this.innerHTML = "";
    const placeholderHeight = this.itemsMap.size * this.itemHeight;
    this.shadowRoot.querySelector(".bottom-placeholder").style.top = `${placeholderHeight}px`;
    this.updateVisibleItems();
  }

  loadMoreItems() {
    this.dispatchEvent(new Event("load-more-items"));
  }

  updateVisibleItems() {
    const scrollTop = this.scrollTop;
    const visibleItemCount = Math.ceil(this.clientHeight / this.itemHeight);
    const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.bufferSize);
    const endIndex = Math.min(this.itemsMap.size, startIndex + visibleItemCount + 2 * this.bufferSize);

    // Remove items that are no longer visible
    for (let i of Array.from(this.visibleItems)) {
      if (i < startIndex || i >= endIndex) {
        this.visibleItems.delete(i);
        const item = this.shadowRoot.querySelector(`[data-index="${i}"]`);
        if (item) {
          this.shadowRoot.querySelector(".content").removeChild(item);
        }
      }
    }

    // Add items that should now be visible
    for (let i = startIndex; i < endIndex; i++) {
      if (!this.visibleItems.has(i)) {
        this.visibleItems.add(i);
        const item = this.itemsMap.get(i).cloneNode(true);
        item.style.position = "absolute";
        item.style.top = `${i * this.itemHeight}px`;
        item.style.width = "100%";
        item.setAttribute("data-index", i);
        this.shadowRoot.querySelector(".content").appendChild(item);
      }
    }
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
