import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";
import { authGuard } from "../guards/auth-guard";

const USER_PER_PAGE = 10;
const PAGE_NUMBER = 1;

export class UserService {
  #httpService = authGuard(diContainer.resolve(SERVICES.http));
  #authService = diContainer.resolve(SERVICES.auth);
  #userSubscribers = new Map();
  #users = new Map();
  #usersRequest = new Map();

  subscribeUserById(userId, subscription) {
    if (this.#userSubscribers.has(userId)) {
      this.#userSubscribers.get(userId).add(subscription);
    } else {
      this.#userSubscribers.set(userId, new Set([subscription]));
      this.#usersRequest.set(userId, this.getUserById(userId));
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
      const user = await this.#usersRequest.get(userId);

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
    if (this.#users.has(id)) {
      return this.#users.get(id);
    }

    const result = await this.#httpService.get(`users/${id}`);
    const user = result.content;
    this.#users.set(id, user);
    return this.#users.get(id);
  }

  async searchUser(search, userId) {
    const params = {
      search,
      userId,
      userPerPage: USER_PER_PAGE,
      pageNumber: PAGE_NUMBER,
    };

    const searchParams = new URLSearchParams(params).toString();

    const result = await this.#httpService.get(`users/search?${searchParams}`);
    return result.content;
  }
}
