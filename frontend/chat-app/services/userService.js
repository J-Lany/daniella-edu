const MOC_USER = {
  id: 1,
  lastName: "Dzheylani",
  firstName: "Daniella",
  status: "Online",
};
const DEFAULT_USER_ID = 1;

export class UserService {
  #userSubscribers = new Set();
  #users = new Map();
  #currentUser;
  #userById;
  #userId;

  subscribeUserById(subscription) {
    this.#userSubscribers.add(subscription);
    this.notifySubscribers();
    return () => this.unSubscribe(subscription);
  }
  unSubscribe(subs) {
    this.#userSubscribers.delete(subs);
  }
  setCurrentUser(user) {
    this.#currentUser = user;
  }

  async notifySubscribers() {
    this.#userId = this.#userId || DEFAULT_USER_ID;
    const user = this.#users.has(this.#userId)
      ? this.#users.get(this.#userId)
      : await this.#initUsers();
    this.#userById = user;
    this.#userSubscribers.forEach((subs) => subs(this.#userById));
  }

  async #initUsers() {
    const response = await Promise.resolve(MOC_USER);
    this.#users.set(this.#userId, response);
    this.#userById = this.#users.get(this.#userId);

    return this.#userById;
  }

  getCurrentUser() {
    return this.#currentUser;
  }

  getUserById(id) {
    this.#userId = id;
    this.notifySubscribers();
  }
}
