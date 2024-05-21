export class ListenerService {
  #subscribers = new Set();

  addListeners(callback) {
    document.addEventListener("click", this.handleClick.bind(this));

    this.#subscribers.add(callback);
  }

  removeListeners(callback) {
    this.#subscribers.delete(callback);
  }

  handleClick(event) {
    this.#subscribers.forEach((callback) => callback(event));
  }
}
