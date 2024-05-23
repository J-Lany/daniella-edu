export class ListenerService {
  #subscribers = new Set();

  constructor() {
    document.addEventListener("click", this.handleClick.bind(this));
  }

  addListeners(callback) {
    this.#subscribers.add(callback);
  }

  removeListeners(callback) {
    this.#subscribers.delete(callback);
  }

  handleClick(event) {
    this.#subscribers.forEach((callback) => callback(event));
  }
}
