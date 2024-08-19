import { createVSComponentTemplate } from "./virtual-scroll.template.js";
import { addListeners, removeListeners, select } from "../../utils/utils.js";
import { diContainer } from "../../di/di";
import { SERVICES } from "../../di/api";
import { debounce } from "../../utils/debounce.js";

const scrollAttribute = {
  PROPS: "props",
  COMPONENT: "component"
};

const ROW_SIZE = 111;
const DELAY = 200;
export class VirtualScroll extends HTMLElement {
  #messagesService = diContainer.resolve(SERVICES.messages);
  #debauncedScroll = debounce(this.handleScroll.bind(this), DELAY);
  #visibleItemCount = 10;
  #props;
  #component;
  #startIndex;
  #viewportHeight;
  #rowHeight = ROW_SIZE;

  #listeners = [[select.bind(this, ".container"), "scroll", this.#debauncedScroll.bind(this)]];

  #ATTRIBUTE_MAPPING = new Map([
    [scrollAttribute.PROPS, this.setProps.bind(this)],
    [scrollAttribute.COMPONENT, this.setComponent.bind(this)]
  ]);

  static get name() {
    return "virtual-scroll";
  }

  static get observedAttributes() {
    return Object.values(scrollAttribute);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      const callback = this.#ATTRIBUTE_MAPPING.get(name);
      if (callback) {
        callback(newValue);
        this.render();
      }
    }
  }

  disconnectedCallback() {}

  setProps(newProps) {
    this.#props = JSON.parse(newProps);
    this.#startIndex = this.#props.length - 1;
  }

  setComponent(newComponent) {
    this.#component = newComponent;
  }
  async loadMoreMessages() {
    const chatId = this.#messagesService.getCurrentChatId();
    const startIndex = this.#messagesService.getStartIndex();
    const messages = await this.#messagesService.loadMoreMessages(chatId, startIndex);

    if (!messages) {
      return;
    }
    this.#props = [...this.#props, ...messages];
    this.#startIndex = messages.length; // Увеличиваем индекс на количество загруженных сообщений

    requestAnimationFrame(this.renderItems.bind(this));
  }
  async handleScroll() {
    const container = this.shadowRoot.querySelector('.container');
    const visibleHeight = container.clientHeight;
    const totalHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
  
    if (scrollTop === 0) {
      this.#startIndex = Math.max(this.#startIndex - this.#visibleItemCount, 0);
      this.renderItems();
      return;
    }
  
    if (visibleHeight + scrollTop >= totalHeight) {
      await this.loadMoreMessages();
      return;
    }
  
    requestAnimationFrame(() => this.renderItems());
  }
  renderItems() {
    if (this.#component && this.#props) {
      const content = this.shadowRoot.querySelector(".container");
      const children = this.#props;

      content.innerHTML = "";

      for (let i = this.#startIndex; i > Math.max(0, this.#startIndex - this.#visibleItemCount); i--) {
        const payload = children[i];
        const childElm = document.createElement(this.#component);
        childElm.setAttribute("payload", JSON.stringify(payload));

        content.prepend(childElm);
      }
      this.#viewportHeight = content.getBoundingClientRect().height;
    }
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElm = document.createElement("template");
    templateElm.innerHTML = createVSComponentTemplate();

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(templateElm.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));

    this.renderItems();
  }
}