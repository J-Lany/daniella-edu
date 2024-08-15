import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class VirtualScroll extends HTMLElement {
  #slot;
  #list;
  #nodeList;
  #containerHeight;
  #currentListEndIndex;
  #currentListHeight;
  #lastScrollPosition

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
    console.log("scroll");
  }

  countVisibleList(lastScrollPosition, newScrollPosition) {
    const scrolledPX = newScrollPosition - lastScrollPosition;  
    const scrolledElements = Math.floor(scrolledPX / this.#currentListHeight);

  }

  scrollUp (){

  }

  scrollDown(){

  }

  updateList() {}

  onSlotChange({ target }) {
    const nodeFilter = (node) => node.nodeType === Node.ELEMENT_NODE;
    const assignedNodes = target.assignedNodes().filter(nodeFilter);
    this.#nodeList = assignedNodes;

    this.renderList();
  }

  renderList() {
    this.carriedPrependList();
  }

 


  carriedPrependList() {
    for (let i = this.#nodeList.length - 1; i >= 0; i--) {
      if (this.#currentListHeight >= this.#containerHeight) {
        this.#currentListEndIndex = i;
        this.#nodeList[i].remove();
      } else {
        this.#list.prepend(this.#nodeList[i]);
        this.#currentListHeight = this.#list.getBoundingClientRect().height;
        this.#lastScrollPosition = this.#list.scrollTop
      }
    }
  }

  renderItems() {
    console.log("render");
  }

  clearSlot() {}

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));
    this.#listeners.forEach(addListeners.bind(this));

    this.#list = this.shadowRoot.querySelector(".sub-container");
    this.#slot = this.shadowRoot.querySelector("slot");

    this.#containerHeight = this.shadowRoot.host.parentElement
      .querySelector("virtual-scroll")
      .getBoundingClientRect().height;

    this.clearSlot(this.#slot);
  }
}
