import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

const ELEMENTS_GAP = 3;
export class VirtualScroll extends HTMLElement {
  #list;
  #container;
  #initialNodeList;
  #nodeList = [];
  #buffer = 10;
  #observedEndIndex;
  #observedStartIndex;
  #observeElement;
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



    this.#observedEndIndex = (this.#nodeList.length - this.#list.childElementCount + ELEMENTS_GAP) / 10;
    this.#observeElement = this.shadowRoot.querySelectorAll("messages-by-user")[this.#observedEndIndex ];
    this.#observedStartIndex = this.#nodeList.length - ELEMENTS_GAP;
  }

  observeIntersection() {
    const observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: this.#container,
      threshold: 0
    });

    observer.observe(this.#observeElement);
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target === this.#observeElement) {
        this.loadMoreItems();
      }
    });
  }

  loadMoreItems() {
    if (this.#observedEndIndex > this.#buffer) {
      for (let i = this.#observedEndIndex; i > this.#observedEndIndex - this.#buffer && i >= 0; i--) {
        this.#list.prepend(this.#nodeList[i].cloneNode(true));
      }
      this.#observedEndIndex = Math.max(this.#observedEndIndex - this.#buffer, 0);
    } else {
      this.dispatchEvent(new Event("load-more-items"));
    }
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