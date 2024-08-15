import { createVSComponentTemplate } from "./virtual-scroll.template.js";

const virtualScrollAttribute = {
  CUSTOM_CSS: "custom-css",
  BUFFER_SIZE: "buffer-size"
};

export class VirtualScroll extends HTMLElement {
  itemsMap = [];
  visibleItems = new Set();
  itemHeights = [];
  bufferSize;
  customComponent;
  basiсCSS = "";
  customCSS = "";

  #ATTRIBUTE_MAPPING = new Map([
    [virtualScrollAttribute.CUSTOM_CSS, this.#setCustomCSS.bind(this)],
    [virtualScrollAttribute.BUFFER_SIZE, this.#setBufferSize.bind(this)]
  ]);

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
    this.customCSS = customCSS;

    const styleElement = document.querySelector("style");
    styleElement.innerHTML = `${this.basicStyle} ${customCSS}`;
  }

  #setBufferSize(bufferSize) {
    const bufferSizeNumber = Number(bufferSize);

    try {
      if (isNaN(bufferSizeNumber)) {
        throw new Error("Недопустимое значение для bufferSize");
      }

      this.bufferSize = bufferSizeNumber;
    } catch (error) {
      console.warn("Внимание:", error.message);
    }
  }

  connectedCallback() {
    this.#updateInterface();
  }

  #updateInterface() {
    this.#render();
    this.indexItems();
    this.updateVisibleItems();

    this.scrollTop = this.scrollHeight;
  }

  indexItems() {
    const children = Array.from(this.children);
    this.itemsMap = children.map((child) => child.cloneNode(true));

    this.innerHTML = "";
    this.itemHeights = this.itemsMap.map((item) => this.#getItemHeight(item));

    this.updatePlaceholderHeight();
  }

  updatePlaceholderHeight() {
    const totalHeight = this.itemHeights.reduce((sum, height) => sum + height, 0);
    this.shadowRoot.querySelector(".bottom-placeholder").style.height = `${totalHeight}px`;
  }

  updateVisibleItems() {
    const scrollTop = this.scrollTop;
    const startIndex = this.#getStartIndex(scrollTop);
    const endIndex = this.#getEndIndex(scrollTop);

    this.#removeInvisibleItems(startIndex, endIndex);
    this.#renderVisibleItems(startIndex, endIndex);

    const isStartOfScroll = this.visibleItems.has(0);

    if (isStartOfScroll && scrollTop === 1) {
      this.dispatchEvent(new CustomEvent("top-reached"));
    }

    if (endIndex >= this.itemHeights.length - 1) {
      this.dispatchEvent(new CustomEvent("bottom-reached"));
    }
  }

  #getStartIndex(scrollTop) {
    const totalHeight = calculateTotalHeight(this.itemHeights, (acc) => acc.total >= scrollTop);

    return Math.max(totalHeight.index, 0);
  }

  #getEndIndex(scrollTop) {
    const totalHeight = calculateTotalHeight(this.itemHeights, (acc) => acc.total >= scrollTop + this.clientHeight);

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
        const accumulatedHeight = accumulateHeight(this.itemHeights);

        item.style.position = "absolute";
        item.style.top = `${accumulatedHeight(i)}px`;
        item.style.width = "100%";
        item.setAttribute("data-index", i);

        acc.appendChild(item);
        return acc;
      }, document.createDocumentFragment());

    content.appendChild(fragment);
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
    this.addEventListener("scroll", this.updateVisibleItems.bind(this));
  }

  #detachScrollListener() {
    this.removeEventListener("scroll", this.updateVisibleItems.bind(this));
  }

  scrollToTop() {
    this.scrollTop = 0;
    this.updateVisibleItems();
    this.dispatchEvent(new CustomEvent("top-reached"));
  }

  scrollToBottom() {
    this.scrollTop = this.scrollHeight;
    this.updateVisibleItems();
    this.dispatchEvent(new CustomEvent("bottom-reached"));
  }

  loadMoreItems(newItems) {
    if (newItems.length === 0) {
      return;
    }

    const indexednewItems = newItems.map((child) => child.cloneNode(true));

    this.itemsMap = [...indexednewItems, ...this.itemsMap];
    this.itemHeights = this.itemsMap.map((item) => this.#getItemHeight(item));

    this.updateVisibleItems();

    this.scrollTop = this.scrollHeight;
  }

  clean() {
    this.itemsMap = [];
    this.visibleItems.clear();
    this.innerHTML = "";
  }

  #render() {
    this.#detachScrollListener();

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));

    this.#attachScrollListener();

    const styleElement = document.querySelector("style");
    this.basiсCSS = styleElement.innerHTML;
    styleElement.innerHTML = `${this.basicStyle} ${this.customCSS}`;
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

function accumulateHeight(itemHeights) {
  return function (index) {
    return itemHeights.slice(0, index).reduce((sum, height) => sum + height, 0);
  };
}
