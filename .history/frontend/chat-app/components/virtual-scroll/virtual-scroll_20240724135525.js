import { createVSComponentTemplate } from "./virtual-scroll.template.js";

export class VirtualScroll extends HTMLElement {
  itemsMap = [];
  visibleItems = new Set();
  itemHeights = [];
  bufferSize = 5;

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
    this.itemHeights = new Array(children.length).fill(0);

    this.updatePlaceholderHeight();
  }

  updatePlaceholderHeight() {
    const totalHeight = this.itemHeights.reduce((sum, height) => sum + height, 0);
    this.shadowRoot.querySelector(".bottom-placeholder").style.height = `${totalHeight}px`;
  }

  updateVisibleItems() {
    const scrollTop = this.scrollTop;
    const clientHeight = this.clientHeight;
    const startIndex = this.getStartIndex(scrollTop);
    const endIndex = this.getEndIndex(scrollTop + clientHeight);

    this.removeInvisibleItems(startIndex, endIndex);
    this.renderVisibleItems(startIndex, endIndex);
  }

  getStartIndex(scrollTop) {
    let totalHeight = 0;
    for (let i = 0; i < this.itemHeights.length; i++) {
      totalHeight += this.getItemHeight(i);
      if (totalHeight > scrollTop) {
        return i;
      }
    }
    return this.itemHeights.length - 1;
  }

  getEndIndex(scrollTop) {
    let totalHeight = 0;
    for (let i = 0; i < this.itemHeights.length; i++) {
      totalHeight += this.getItemHeight(i);
      if (totalHeight > scrollTop) {
        const finalScore =
          i + Math.ceil(this.clientHeight / Math.min(...this.itemHeights.filter((h) => h > 0))) + this.bufferSize;
        return finalScore < this.itemHeights.length - 1 ? finalScore : this.itemHeights.length - 1;
      }
    }
    return this.itemHeights.length - 1;
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
    for (let i = startIndex; i < endIndex; i++) {
      if (!this.visibleItems.has(i)) {
        this.visibleItems.add(i);
        const item = this.itemsMap[i].cloneNode(true);

        item.style.position = "absolute";
        const test = this.getAccumulatedHeight(startIndex, i);
        item.style.top = `${this.getAccumulatedHeight(startIndex, i)}px`;
        item.style.width = "80%";
        item.setAttribute("data-index", i);

        fragment.appendChild(item);
      }
    }
    content.appendChild(fragment);
  }

  getAccumulatedHeight(startIndex, index) {
    return this.itemHeights.slice(startIndex, index).reduce((sum, height) => {
      return sum + this.getItemHeight(index);
    }, 0);;
  }

  getItemHeight(index) {
    if (this.itemHeights[index] === 0) {
      const content = this.shadowRoot.querySelector(".content");
      const tempElement = this.itemsMap[index].cloneNode(true);

      tempElement.style.position = "absolute";
      tempElement.style.visibility = "hidden";

      content.appendChild(tempElement);
      const height = tempElement.offsetHeight;
      this.itemHeights[index] = height;

      content.removeChild(tempElement);

      return height;
    }
    return this.itemHeights[index];
  }

  attachScrollListener() {
    this.addEventListener("scroll", () => {
      this.updateVisibleItems();
    });
  }

  render() {
    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
  }
}
