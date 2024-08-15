import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class VirtualScroll extends HTMLElement {
  #list;
  #container;
  #initialNodeList;
  #nodeList = [];
  #buffer = 50;
  #containerHeight;
  #currentListEndIndex;
  #currentListStartIndex;
  #currentListHeight;
  #lastScrollPosition;

  #listeners = [
    [select.bind(this, ".container"), "scroll", this.handleScroll.bind(this)],
    [select.bind(this, "slot"), "slotchange", this.onSlotChange.bind(this)]
  ];

  static get name() {
    return "virtual-scroll";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("my-target-element")) {
          loadMoreItems();
        }
      }
    });
  };

  disconnectedCallback() {}

  handleScroll(event) {
    const { scrollTop } = event.target;
    this.updateList(scrollTop, this.#lastScrollPosition);
  }

  updateList(newScrollPosition, lastScrollPosition) {
    const scrolledElements = this.countScrolledElements(newScrollPosition, lastScrollPosition);

    if (scrolledElements === 0) {
      return;
    }
    if (newScrollPosition < lastScrollPosition) {
      this.scrollUp(scrolledElements);
      return;
    }
    if (newScrollPosition > lastScrollPosition) {
      this.scrollDown(scrolledElements);
      return;
    }
  }

  countScrolledElements(newScrollPosition, lastScrollPosition) {
    const scrolledPX = newScrollPosition - lastScrollPosition;
    const currentNumberOfElements = this.#list.childElementCount;

    const scrolledElements = Math.ceil(Math.abs(scrolledPX) / (this.#currentListHeight / currentNumberOfElements));

    return scrolledElements;
  }

  scrollUp(scrolledElements) {
    for (let i = 1; i <= scrolledElements; i++) {
      const isIndexOutOfRange = this.#currentListEndIndex - i < 0;

      if (isIndexOutOfRange) {
        this.#lastScrollPosition = this.#container.scrollTop;
        this.loadMoreItems();
        return;
      }

      this.#list.prepend(this.#nodeList[this.#currentListEndIndex - i].cloneNode(true));
      this.#list.removeChild(this.#list.lastElementChild);
    }

    this.#currentListHeight = this.#list.getBoundingClientRect().height;

    this.#currentListEndIndex -= scrolledElements;
    this.#currentListStartIndex -= scrolledElements;
    this.#lastScrollPosition = this.#container.scrollTop;
  }

  scrollDown(scrolledElements) {
    for (let i = 1; i <= scrolledElements; i++) {
      const isIndexOutOfRange = this.#currentListStartIndex + i > this.#nodeList.length - 1;

      if (isIndexOutOfRange) {
        this.#lastScrollPosition = this.#container.scrollTop;
        return;
      }

      this.#list.appendChild(this.#nodeList[this.#currentListStartIndex + i].cloneNode(true));
      this.#list.removeChild(this.#list.firstElementChild);
    }
    this.#currentListEndIndex += scrolledElements;
    this.#currentListStartIndex += scrolledElements;
    this.#lastScrollPosition = this.#container.scrollTop;
  }

  loadMoreItems() {
    this.dispatchEvent(new Event("load-more-items"));
  }

  onSlotChange({ target }) {
    const nodeFilter = (node) => node.nodeType === Node.ELEMENT_NODE;
    const assignedNodes = target.assignedNodes().filter(nodeFilter);
    this.#initialNodeList = assignedNodes;

    this.renderList();
  }

  renderList() {

    this.carriedPrependList();

    const observer = new IntersectionObserver(handleIntersection, {
      root: this.#container,
      threshold: 0
    });

    observer.observe(this.shadowRoot.querySelectorAll('.my-target-element'));

  }

  carriedPrependList() {
    let appendedNodes = 0;

    for (let i = this.#initialNodeList.length - 1; i >= 0; i--) {
      this.#nodeList.unshift(this.#initialNodeList[i].cloneNode(true));

      if (appendedNodes > this.#buffer) {
        this.#currentListEndIndex = i;
        this.#initialNodeList[i].remove();
      } else {
        this.#list.prepend(this.#initialNodeList[i]);

        appendedNodes++;
      }
    }

    this.#currentListEndIndex = this.#nodeList.length - this.#list.childElementCount - 1;
    this.#currentListStartIndex = this.#nodeList.length - 1;
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
    this.#listeners.forEach(addListeners.bind(this));

    this.#list = this.shadowRoot.querySelector(".sub-container");
    this.#container = this.shadowRoot.querySelector(".container");

  
  }
}
