export class SessionService {
  #tokens = new Map();

  setToken(token, expired) {
    this.#tokens.set(token, expired);
    setTimeout(() => {
      if (this.#tokens.get(token)) {
        this.deleteToken(token);
      }
    }, expired);
  }

  deleteToken(token) {
    this.#tokens.delete(token);
  }
}
