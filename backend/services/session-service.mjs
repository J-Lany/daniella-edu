export class SessionService {
  #tokens = new Map();

  setToken(token, expired) {
    this.#tokens.set(token, expired);
  }

  getToken(token) {
    return this.#tokens.get(token);
  }
  deleteToken(token) {
    this.#tokens.delete(token);
  }
}
