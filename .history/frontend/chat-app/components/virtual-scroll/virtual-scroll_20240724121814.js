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
    // this.renderByBottom();
    this.attachScrollListener();
  }

  indexItems() {
    const children = Array.from(this.children);
    this.itemsMap = children.map((child) => child.cloneNode(true));
    this.itemHeights = new Array(children.length).fill(0);

    this.updatePlaceholderHeight();
  }

  updatePlaceholderHeight() {
    const totalHeight = this.itemHeights.reduce((sum, height) => sum + height, 0);
    this.shadowRoot.querySelector(".bottom-placeholder").style.height = `${totalHeight}px`;
  }

  // renderByBottom() {
  //   const visibleItemCount = Math.ceil(this.clientHeight / this.itemHeight);
  //   const endIndex = this.itemsMap.size;
  //   const startIndex = Math.max(0, endIndex - visibleItemCount - this.bufferSize);

  //   this.removeUnnecessaryItems(startIndex, endIndex);
  //   this.renderVisibleItems(startIndex, endIndex);
  // }

  updateVisibleItems() {
    const scrollTop = this.scrollTop;
    const clientHeight = this.clientHeight;
    const startIndex = this.getStartIndex(scrollTop);
    const endIndex = this.getEndIndex(scrollTop + clientHeight);

    // if (startIndex === 0) {
    //   this.dispatchEvent(new Event("load-more-items"));
    // }

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
        return i + Math.ceil(this.clientHeight / Math.min(...this.itemHeights.filter((h) => h > 0))) + this.bufferSize;
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

getItemHeight(index) {
  if (this.itemHeights[index] === 0) {
      const tempElement = this.itemsMap[index].cloneNode(true);
      tempElement.style.position = 'absolute';
      tempElement.style.visibility = 'hidden';
      document.body.appendChild(tempElement);
      const height = tempElement.offsetHeight;
      this.itemHeights[index] = height; 
      document.body.removeChild(tempElement);
  }
  return this.itemHeights[index];
}

  attachScrollListener() {
    this.scrollTop = this.scrollHeight;
    this.addEventListener("scroll", () => {
      this.updateVisibleItems();
    });
  }

  // loadMoreItems(items) {
  //   if (!items || items.length === 0) {
  //     return;
  //   }

  //   const itemsArray = [...this.itemsMap.values()];
  //   const unioItems = [...items, ...itemsArray];
  //   const visibleItemCount = Math.ceil(this.clientHeight / this.itemHeight);
  //   this.itemsMap = new Map();

  //   unioItems.forEach((item, index) => {
  //     this.itemsMap.set(index, item.cloneNode(true));
  //   });

  //   const startIndex = itemsArray.length - 1;
  //   const endIndex = Math.min(this.itemsMap.size, startIndex + visibleItemCount + 2 * this.bufferSize);

  //   this.removeUnnecessaryItems(startIndex, endIndex);
  //   this.renderVisibleItems(startIndex, endIndex);
  //   this.scrollTop = this.scrollHeight / 2;
  // }

  render() {
    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
  }
}