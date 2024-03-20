export class SessionService {
  #tokens = new Map();

  setToken(token, expired) {
    this.#tokens.set(token, expired);
  }

  getExpired(token) {
    const expired = this.#tokens.get(token);
    console.log(expired);
    return expired;
  }
  deleteToken(token) {
    this.#tokens.delete(token);
  }

  isTokenValid(token) {
    return !this.#tokens.has(token) || this.getExpired(token) > new Date();
  }
}
