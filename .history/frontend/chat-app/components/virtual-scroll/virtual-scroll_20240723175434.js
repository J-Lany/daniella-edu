import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class VirtualScroll extends HTMLElement {
  itemsMap = new Map();
  visibleItems = new Set();
  itemHeight = 110;
  bufferSize = 5;

  // #listeners = [[select.bind(this, ".content"), "scroll", this.updateVisibleItems.bind(this)]];

  static get name() {
    return "virtual-scroll";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();

    const content = this.shadowRoot.querySelector(".content");
    content.style.position = "relative";

    this.indexItems();
    this.renderByBottom();
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
  }

  renderByBottom() {
    const visibleItemCount = Math.ceil(this.clientHeight / this.itemHeight);
    const endIndex = this.itemsMap.size;
    const startIndex = Math.max(0, endIndex - visibleItemCount - this.bufferSize);

    this.removeUnnecessaryItems(startIndex, endIndex);
    this.renderVisibleItems(startIndex, endIndex);
  }

  updateVisibleItems() {
    const scrollTop = this.scrollTop;
    const visibleItemCount = Math.ceil(this.clientHeight / this.itemHeight);
    const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.bufferSize);
    const endIndex = Math.min(this.itemsMap.size, startIndex + visibleItemCount + 2 * this.bufferSize);

    if (startIndex === 0) {
      this.dispatchEvent(new Event("load-more-items"));
    }

    this.removeUnnecessaryItems(startIndex, endIndex);
    this.renderVisibleItems(startIndex, endIndex);
  }

  removeUnnecessaryItems(startIndex, endIndex) {
    for (let i of Array.from(this.visibleItems)) {
      if (i < startIndex || i >= endIndex) {
        this.visibleItems.delete(i);
        const item = this.shadowRoot.querySelector(`[data-index="${i}"]`);
        if (item) {
          this.shadowRoot.querySelector(".content").removeChild(item);
        }
      }
    }
  }

  renderVisibleItems(startIndex, endIndex) {
    for (let i = endIndex - 1; i > startIndex; i--) {
      if (!this.visibleItems.has(i)) {
        this.visibleItems.add(i);
        const item = this.itemsMap.get(i).cloneNode(true);
        item.style.position = "absolute";
        item.style.top = `${i * this.itemHeight}px`;
        item.style.width = "100%";
        item.setAttribute("data-index", i);
        this.shadowRoot.querySelector(".content").prepend(item);
      }
    }
  }

  attachScrollListener() {
    this.scrollTop = this.scrollHeight;
    this.addEventListener("scroll", () => {
      this.updateVisibleItems();
    });
  }

  loadMoreItems(items) {
    if (!items || items.length === 0) {
      return;
    }

    const itemsArray =[...this.itemsMap.values()];
    const unioItems = [...items, ...itemsArray];
    this.itemsMap = new Map();
    unioItems.forEach((item, index) => {
      this.itemsMap.set(index, item.cloneNode(true));
    });

    const startIndex = itemsArray.length - 1;
    const endIndex = Math.min(this.itemsMap.size, startIndex + visibleItemCount + 2 * this.bufferSize);
    this.renderVisibleItems(startIndex, endIndex);
  }

  disconnectedCallback() {
    // this.#listeners.forEach(removeListeners.bind(this));
  }

  render() {
    // this.#listeners.forEach(removeListeners.bind(this));

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
    // this.#listeners.forEach(addListeners.bind(this));
  }
}
