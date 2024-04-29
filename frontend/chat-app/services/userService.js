import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";

export class UserService {
  #httpServise = diContainer.resolve(SERVICES.http);
  #userSubscribers = new Map();
  #users = new Map();
  #currentUser;

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

  async notifySubscribers(userId) {
    if (this.#users.has(userId)) {
      this.#userSubscribers
        .get(userId)
        .forEach((subs) => subs(this.#users.get(userId)));
    } else {
      const user = await this.getUserById(userId);
      this.#users.set(userId, user);

      this.#userSubscribers.forEach((subs) => subs(this.#users.get(userId)));
    }
  }

  getCurrentUser() {
    return this.#currentUser;
  }

  async getUserById(id) {
    return await this.#httpServise.post(`users/${id}`);
  }
}
