import { createVSComponentTemplate } from "./virtual-scroll.template.js";

const virtualScrollAttribute = {
  CUSTOM_CSS: "custom-css"
};

export class VirtualScroll extends HTMLElement {
  itemsMap = [];
  visibleItems = new Set();
  itemHeights = [];
  bufferSize = 10;

  #ATTRIBUTE_MAPPING = new Map([[virtualScrollAttribute.CUSTOM_CSS, this.#setCustomCSS.bind(this)]]);

  static get observedAttributes() {
    return Object.values(virtualScrollAttribute);
  }

  static get name() {
    return "virtual-scroll";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (callback) {
        callback(newValue);
      }
    }
  }

  #setCustomCSS(customCSS) {
    const style = document.createElement("style");
    style.textContent = customCSS;
    this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    this.render();

    this.#indexItems();
    this.#updateVisibleItems();

    this.#attachScrollListener();
  }

  #indexItems() {
    const children = Array.from(this.children);
    this.itemsMap = children.map((child) => child.cloneNode(true));

    this.innerHTML = "";
    this.itemHeights = this.itemsMap.map((item) => this.#getItemHeight(item));

    this.#updatePlaceholderHeight();
  }

  #updatePlaceholderHeight() {
    const totalHeight = this.itemHeights.reduce((sum, height) => sum + height, 0);
    this.shadowRoot.querySelector(".bottom-placeholder").style.height = `${totalHeight}px`;
  }

  #updateVisibleItems() {
    const scrollTop = this.scrollTop;
    const startIndex = this.#getStartIndex(scrollTop);
    const endIndex = this.#getEndIndex(scrollTop);

    this.#removeInvisibleItems(startIndex, endIndex);
    this.#renderVisibleItems(startIndex, endIndex);
  }

  #getStartIndex(scrollTop) {
    const totalHeight = calculateTotalHeight(this.itemHeights, (acc) => acc.total >= scrollTop);

    if (totalHeight.index === 0) {
      this.dispatchEvent(new CustomEvent("top-reached"));
    }

    return Math.max(totalHeight.index, 0);
  }

  #getEndIndex(scrollTop) {
    const totalHeight = calculateTotalHeight(this.itemHeights, (acc) => acc.total >= scrollTop + this.clientHeight);

    if (totalHeight.index + this.bufferSize >= this.itemHeights.length) {
      this.dispatchEvent(new CustomEvent("bottom-reached"));
    }

    return Math.min(totalHeight.index + this.bufferSize, this.itemHeights.length - 1);
  }

  #removeInvisibleItems(startIndex, endIndex) {
    Array.from(this.visibleItems)
      .filter((i) => i < startIndex || i >= endIndex)
      .forEach(this.#removeItem, this);
  }

  #removeItem(i) {
    this.visibleItems.delete(i);
    const item = this.shadowRoot.querySelector(`[data-index="${i}"]`);
    if (item) {
      this.shadowRoot.querySelector(".content").removeChild(item);
    }
  }

  #renderVisibleItems(startIndex, endIndex) {
    const content = this.shadowRoot.querySelector(".content");

    const fragment = Array.from({ length: endIndex - startIndex + 1 }, (_, index) => startIndex + index)
      .filter((i) => !this.visibleItems.has(i))
      .reduce((acc, i) => {
        this.visibleItems.add(i);
        const item = this.itemsMap[i].cloneNode(true);

        item.style.position = "absolute";
        item.style.top = `${this.#getAccumulatedHeight(i)}px`;
        item.style.width = "100%";
        item.setAttribute("data-index", i);

        acc.appendChild(item);
        return acc;
      }, document.createDocumentFragment());

    content.appendChild(fragment);
  }

  #getAccumulatedHeight(index) {
    return this.itemHeights.slice(0, index).reduce((sum, height) => sum + height, 0);
  }

  #getItemHeight(item) {
    const tempElement = item.cloneNode(true);

    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";

    document.body.appendChild(tempElement);
    const height = tempElement.offsetHeight;
    document.body.removeChild(tempElement);

    return height;
  }

  #attachScrollListener() {
    this.scrollTop = this.scrollHeight;
    this.addEventListener("scroll", this.#updateVisibleItems.bind(this));
  }

  loadMoreItems(newItems) {
    if (newItems.length === 0) {
      return;
    }

    const indexednewItems = newItems.map((child) => child.cloneNode(true));

    this.itemsMap = [...indexednewItems, ...this.itemsMap];
    this.itemHeights = this.itemsMap.map((item) => this.#getItemHeight(item));

    this.#updateVisibleItems();

    this.scrollTop = this.scrollHeight;
  }

  render() {
    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
  }
}

function calculateTotalHeight(itemHeights, predicate) {
  return itemHeights.reduce(
    (acc, height, index) => {
      if (predicate(acc)) {
        return acc;
      }
      return { total: acc.total + height, index };
    },
    { total: 0, index: -1 }
  );
}
