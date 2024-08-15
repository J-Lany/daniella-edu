import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";

const ELEMENTS_GAP = 3;
export class VirtualScroll extends HTMLElement {
  #list;
  #container;
  #nodeList = [];
  #buffer = 10;
  #observedEndIndex;
  #observeElement;
  #isDoubleChange = false

  #listeners = [[select.bind(this, "slot"), "slotchange", this.onSlotChange.bind(this)]];

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

  onSlotChange({ target }) {
    if(this.#isDoubleChange) {
      this.#isDoubleChange = false;
      return
    }

    const nodeFilter = (node) => node.nodeType === Node.ELEMENT_NODE;
    const assignedNodes = target.assignedNodes().filter(nodeFilter);

    this.#nodeList = assignedNodes;
    this.#isDoubleChange = true;

    this.clearSlots()

    this.renderList();
  }

  renderList() {
    this.insertElementsIntoDOM();

    this.#container.scrollTop = this.#list.getBoundingClientRect().height;

    if (this.#nodeList.length > this.#buffer) {
      this.observeIntersection();
    }
  }

  insertElementsIntoDOM() {
    let appendedNodes = 0;

    for (let i = this.#nodeList.length - 1; i >= 0; i--) {

      if (appendedNodes <= this.#buffer) {
        this.#list.prepend(this.#nodeList[i].cloneNode(true));
        appendedNodes++;
      } 
    }
  }

  observeIntersection() {
    const observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: this.#container,
      threshold: 0
    });

    this.#observedEndIndex = Math.max(
      Math.ceil((this.#nodeList.length - this.#list.childElementCount + ELEMENTS_GAP) / 10),
      0
    );
    this.#observeElement = this.shadowRoot.querySelectorAll("messages-by-user")[this.#observedEndIndex];

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
    const childCount = this.#list.childElementCount;
    const isRemainingElements = this.#nodeList.length - childCount - this.#observedEndIndex > this.#buffer;

    if (isRemainingElements) {
      for (let i = this.#observedEndIndex; i > this.#observedEndIndex - this.#buffer && i >= 0; i--) {
        this.#list.prepend(this.#nodeList[i].cloneNode(true));
      }
      this.#observedEndIndex = Math.max(this.#observedEndIndex - this.#buffer, 0);
    } else {
      this.dispatchEvent(new Event("load-more-items"));
    }
  }

  clearSlots(){
   const slotsElement = this.querySelectorAll("messages-by-user") 
   for(let i = 0; i < slotsElement.length; i++){
    this.removeChild(slotsElement[i])
   }
   console.log(slotsElement)
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
