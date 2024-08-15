import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

export class VirtualScroll extends HTMLElement {
  #list;
  #container;
  #initialNodeList;
  #nodeList = [];
  #buffer = 10;
  #observedEndIndex 
  #currentListEndIndex;
  #currentListStartIndex;

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
  }

  loadMoreItems() {
    console.log("MORE");
    // this.dispatchEvent(new Event("load-more-items"));
  }

  onSlotChange({ target }) {
    const nodeFilter = (node) => node.nodeType === Node.ELEMENT_NODE;
    const assignedNodes = target.assignedNodes().filter(nodeFilter);
    this.#initialNodeList = assignedNodes;

    this.renderList();
  }

  renderList() {
    this.carriedPrependList();

   
    this.#container.scrollTop = this.#list.getBoundingClientRect().height;

    this.observeIntersection();
  }

  observeIntersection() {
    const observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: this.#container,
      threshold: 0
    });

    observer.observe(this.#observedEndIndex );
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target === this.#observedEndIndex ) {
        this.loadMoreItems();
      }
    });
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

    this.#observedEndIndex = this.#nodeList.length - this.#list.childElementCount - 1;
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
