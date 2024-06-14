import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";
import { authGuard } from "../guards/auth-guard";

const USER_PER_PAGE = 10;
const PAGE_NUMBER = 1;

export class UserService {
  #httpServise = authGuard(diContainer.resolve(SERVICES.http));
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
    const result = await this.#httpServise.get(`users/${id}`);
    return result.content;
  }

  async searchUser(search, userId) {
    const params = {
      search,
      userId,
      userPerPage: USER_PER_PAGE,
      pageNumber: PAGE_NUMBER,
    };

    const searchParams = new URLSearchParams(params).toString();

    const result = await this.#httpServise.get(`users/search?${searchParams}`);
    return result.content;
  }
}
