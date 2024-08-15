import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";


const ROW_SIZE = 111;
const DELAY = 200;
export class VirtualScroll extends HTMLElement {


 

  #listeners = [
    [select.bind(this, ".container"), "scroll", this.handleScroll.bind(this)],
    [select.bind(this, "slot", this), "slotchange", this.onSlotChange.bind(this)]
  ];


  static get name() {
    return "virtual-scroll";
  }

 

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render()
  }



  disconnectedCallback() {}
 


  async handleScroll(scrollTop, lastScrollPosition) {
    console.log("scroll")
  }

  onSlotChange({ target }) {
    console.log(target)
  }

  renderItems() {
    console.log("render")
  }

  clearSlot(){

  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
