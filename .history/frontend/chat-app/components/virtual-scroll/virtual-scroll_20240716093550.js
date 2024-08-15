import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class VirtualScroll extends HTMLElement {
  #list;
  #initialNodeList;
  #nodeList = [];
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

    const scrolledElements = Math.ceil(scrolledPX / (this.#currentListHeight / currentNumberOfElements));

    return scrolledElements;
  }

  scrollUp(scrolledElements) {
    for (let i = 1; i <= scrolledElements; i++) {
      const isIndexOutOfRange = this.#currentListEndIndex - i < 0

      if (isIndexOutOfRange) {
        return;
      }

      this.#list.prepend(this.#nodeList[this.#currentListEndIndex - i].cloneNode(true));
      this.#list.removeChild(this.#list.lastElementChild);
    }
    this.#lastScrollPosition = this.#list.scrollTop;
  }

  scrollDown(scrolledElements) {
    for (let i = 1; i <= scrolledElements; i++) {
      const isIndexOutOfRange = this.#currentListStartIndex + i > this.#nodeList.length

      if (isIndexOutOfRange) {
        return;
      }

      this.#list.appendChild(this.#nodeList[this.#currentListEndIndex + i].cloneNode(true));
      this.#list.removeChild(this.#list.firstElementChild);
    }
    this.#lastScrollPosition = this.#list.scrollTop;
  }

  onSlotChange({ target }) {
    const nodeFilter = (node) => node.nodeType === Node.ELEMENT_NODE;
    const assignedNodes = target.assignedNodes().filter(nodeFilter);
    this.#initialNodeList = assignedNodes;

    this.renderList();
  }

  renderList() {
    this.carriedPrependList();
  }

  carriedPrependList() {
    for (let i = this.#initialNodeList.length - 1; i >= 0; i--) {
      this.#nodeList[i] = this.#initialNodeList[i].cloneNode(true);

      if (this.#currentListHeight >= this.#containerHeight) {
        this.#currentListEndIndex = i;
        this.#initialNodeList[i].remove();
      } else {
        this.#list.prepend(this.#initialNodeList[i]);
        this.#currentListHeight = this.#list.getBoundingClientRect().height;
        this.#lastScrollPosition = this.#list.scrollTop;
      }
    }

    this.#currentListEndIndex = this.#nodeList.length - this.#list.childElementCount - 1;
    this.#currentListStartIndex = this.#nodeList.length;
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
    this.#listeners.forEach(addListeners.bind(this));

    this.#list = this.shadowRoot.querySelector(".sub-container");

    this.#containerHeight = this.shadowRoot.host.parentElement
      .querySelector("virtual-scroll")
      .getBoundingClientRect().height;
  }
}
