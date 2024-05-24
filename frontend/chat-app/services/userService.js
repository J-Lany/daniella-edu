import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";

export const USER = "user";
const USER_PER_PAGE = 10;
const PAGE_NUMBER = 1;

export class UserService {
  #httpServise = diContainer.resolve(SERVICES.http);
  #authService = diContainer.resolve(SERVICES.auth);
  #userSubscribers = new Map();
  #users = new Map();

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
    return this.#authService.getCurrentUser();
  }

  async getUserById(id) {
    const token = this.#authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    return await this.#httpServise.get(`users/${id}`, headers);
  }

  async searchUser(search, userId) {
    const token = this.#authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const params = {
      search,
      userId,
      userPerPage: USER_PER_PAGE,
      pageNumber: PAGE_NUMBER,
    };

    const searchParams = new URLSearchParams(params).toString();

    const result = await this.#httpServise.get(
      `users/search?${searchParams}`,
      headers
    );
    return result;
  }
}
