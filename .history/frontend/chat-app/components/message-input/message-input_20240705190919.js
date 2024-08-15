import { createMessageInputTemplate } from './message-input.template';
import { addListeners, removeListeners, select } from '../../utils/utils.js';
import { diContainer } from '../../di/di.js';
import { SERVICES } from '../../di/api.js';

const KEYS = {
  ENTER: 'Enter',
  CLICK: 'click'
};

export class MessageInput extends HTMLElement {
  #messageService = diContainer.resolve(SERVICES.messages);
  #listeners = [
    [select.bind(this, '#message'), 'keyup', this.#onInputChange.bind(this)],
    [
      select.bind(this, '.message-input__button'),
      'click',
      this.#onSubmit.bind(this)
    ]
  ];

  static get name() {
    return 'message-input';
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  #onInputChange(e) {
    const isMessageEmpty = e.target.value === '';

    if (e.key === KEYS.ENTER && !isMessageEmpty) {
      this.#messageService.sendMessage(e.target.value);
      e.target.value = '';
    }
  }

  #onSubmit(e) {
    const messageInput = this.shadowRoot.querySelector('#message');
    const inputValue = messageInput.value;

    if (inputValue) {
      this.#messageService.sendMessage(inputValue);
      messageInput.value = '';
    }
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners.bind(this));
  }

  render() {
    this.#listeners.forEach(removeListeners.bind(this));

    const templateElem = document.createElement('template');
    templateElem.innerHTML = createMessageInputTemplate();

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));

    this.#listeners.forEach(addListeners.bind(this));
  }
}
