import { createVSComponentTemplate } from "./virtual-scroll.template.js";

export class VirtualScroll extends HTMLElement {
  itemsMap = [];
  visibleItems = new Set();
  itemHeights = [];
  bufferSize = 10;

  static get name() {
    return "virtual-scroll";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.indexItems();
    this.updateVisibleItems();

    this.attachScrollListener();
  }

  indexItems() {
    const children = Array.from(this.children);
    this.itemsMap = children.map((child) => child.cloneNode(true));

    this.innerHTML = "";
    this.itemHeights = this.itemsMap.map((item) => this.getItemHeight(item));

    this.updatePlaceholderHeight();
  }

  updatePlaceholderHeight() {
    const totalHeight = this.itemHeights.reduce((sum, height) => sum + height, 0);
    this.shadowRoot.querySelector(".bottom-placeholder").style.height = `${totalHeight}px`;
  }

  updateVisibleItems() {
    const scrollTop = this.scrollTop;
    const startIndex = this.getStartIndex(scrollTop);
    const endIndex = this.getEndIndex(scrollTop);

    this.removeInvisibleItems(startIndex, endIndex);
    this.renderVisibleItems(startIndex, endIndex);
  }

  getStartIndex(scrollTop) {
    const totalHeight = this.itemHeights.reduce(
      (acc, height, index) => {
        if (acc.total >= scrollTop) {
          return acc;
        }
        return { total: acc.total + height, index };
      },
      { total: 0, index: -1 }
    );

    if(totalHeight.index < 1) {
      this.dispatchEvent(new CustomEvent("load-more-items"));
    }

    return Math.max(totalHeight.index, 0);
  }

  getEndIndex(scrollTop) {
    const totalHeight = this.itemHeights.reduce(
      (acc, height, index) => {
        if (acc.total >= scrollTop + this.clientHeight) {
          return acc;
        }
        return { total: acc.total + height, index };
      },
      { total: 0, index: -1 }
    );

    return Math.min(totalHeight.index + this.bufferSize, this.itemHeights.length - 1);
  }

  removeInvisibleItems(startIndex, endIndex) {
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
    const content = this.shadowRoot.querySelector(".content");
    const fragment = document.createDocumentFragment();

    for (let i = startIndex; i <= endIndex; i++) {
      if (!this.visibleItems.has(i)) {
        this.visibleItems.add(i);
        const item = this.itemsMap[i].cloneNode(true);

        item.style.position = "absolute";
        item.style.top = `${this.getAccumulatedHeight(i)}px`;
        item.style.width = "100%";
        item.setAttribute("data-index", i);

        fragment.appendChild(item);
      }
    }

    content.appendChild(fragment);
  }

  getAccumulatedHeight(index) {
    return this.itemHeights.slice(0, index).reduce((sum, height) => sum + height, 0);
  }

  getItemHeight(item) {
    const tempElement = item.cloneNode(true);

    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";

    document.body.appendChild(tempElement);
    const height = tempElement.offsetHeight;
    document.body.removeChild(tempElement);

    return height;
  }

  attachScrollListener() {
    this.scrollTop = this.scrollHeight;
    this.addEventListener("scroll", () => {
      this.updateVisibleItems();
    });
  }

  loadMoreItems(historyMessagesElements) {
    if (historyMessagesElements.length === 0 ) {
      return
    }

    const indexedHistoryMessagesElements = historyMessagesElements.map((child) => child.cloneNode(true));


   


    this.itemsMap = [...indexedHistoryMessagesElements, ...this.itemsMap,];

    this.itemHeights = this.itemsMap.map((item) => this.getItemHeight(item));

    this.updateVisibleItems();

    this.scrollTop = this.scrollHeight;

  }

  render() {
    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
  }
}
