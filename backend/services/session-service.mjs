export class SessionService {
  #tokens = new Map();

  setToken(token, expired) {
    this.#tokens.set(token, expired);
  }

  getExpired(token) {
    return this.#tokens.get(token);
  }
  deleteToken(token) {
    this.#tokens.delete(token);
  }

  isTokenValid(token) {
    return !this.#tokens.has(token) || this.getExpired(token) > new Date();
  }
}
