import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";

export class VirtualScroll extends HTMLElement {
  #slot;
  #list;
  #nodeList;
  #containerHeight;

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

  async handleScroll(scrollTop, lastScrollPosition) {
    console.log("scroll");
  }

  updateList() {}

  onSlotChange({ target }) {
    const appendList = this.carriedAppendList(this.#list);
    const nodeFilter = (node) => node.nodeType === Node.ELEMENT_NODE;
    const assignedNodes = target.assignedNodes().filter(nodeFilter);
    this.#nodeList = assignedNodes;
    this.renderList();
  }

  renderList() {
    this.clearSlot(this.#slot);
    
    //Если высота саб контейнера = или больше дальше не отрисовываем
  }

  countVisibleList() {}

  clearSlot(slot) {
    slot.innerHTML = "";
  }

  carriedAppendList(root) {
   const startIndex = this.#nodeList.length - 1;

   for(let i = startIndex; ; i--) {

     this.#list.prepend(this.#nodeList[i])
    const currentListHeight = this.#list.getBoundingClientRect().height;
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

    this.#slot = this.shadowRoot.querySelector("slot");
    this.#list = this.shadowRoot.querySelector(".sub-container");
    this.#containerHeight = this.shadowRoot.host.parentElement
      .querySelector("virtual-scroll")
      .getBoundingClientRect().height;
  }
}