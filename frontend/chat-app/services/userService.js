const MOC_USER = {
  id: 1,
  lastName: "Dzheylani",
  firstName: "Daniella",
  status: 1,
  login: "ProffesorQ",
};

export class UserService {
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
      const user = this.getUserById(userId);
      this.#users.set(userId, user);
    }
  }

  getCurrentUser() {
    return this.#currentUser;
  }

  async getUserById(id) {
    const response = await Promise.resolve(MOC_USER);
    return response;
  }
}
