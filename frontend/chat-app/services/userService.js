import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";
import { debounce } from "../utils/debounce";

const USER_PER_PAGE = 10;
const PAGE_NUMBER = 1;
const DELAY = 500;

export class UserService {
  #httpServise = diContainer.resolve(SERVICES.http);
  #userSubscribers = new Map();
  #users = new Map();
  #currentUser;
  #token;

  subscribeUserById(userId, subscription) {
    if (this.#userSubscribers.has(userId)) {
      this.#userSubscribers.get(userId).add(subscription);
    } else {
      this.#userSubscribers.set(userId, new Set([subscription]));
    }
    this.notifySubscribers(userId);
    return () => this.unSubscribe(userId, subscription);
  }

  unSubscribe(userId, subscription) {
    if (this.#userSubscribers.has(userId)) {
      this.#userSubscribers.get(userId).delete(subscription);
    }
  }

  setCurrentUser(user) {
    this.#currentUser = user;
  }
  setToken(token) {
    this.#token = token;
  }

  getToken() {
    return this.#token;
  }

  async notifySubscribers(userId) {
    if (this.#users.has(userId)) {
      this.#userSubscribers
        .get(userId)
        .forEach((subs) => subs(this.#users.get(userId)));
    } else {
      const user = await this.getUserById(userId);

      this.#users.set(userId, user);
      this.#userSubscribers.get(userId).forEach((subs) => {
        subs(this.#users.get(userId));
      });
    }
  }

  getCurrentUser() {
    return this.#currentUser;
  }

  async getUserById(id) {
    const headers = this.#token
      ? { Authorization: `Bearer ${this.#token}` }
      : {};

    return await this.#httpServise.get(`users/${id}`, headers);
  }

  async searchUser(search) {
    const headers = this.getToken()
      ? { Authorization: `Bearer ${this.getToken()}` }
      : {};

    const params = {
      search,
      userPerPage: USER_PER_PAGE,
      pageNumber: PAGE_NUMBER,
    };

    const result = await this.#httpServise.get(`users/search`, headers, params);
    return result;
  }

  debouncedSearch = debounce(this.searchUser.bind(this), DELAY);
}
