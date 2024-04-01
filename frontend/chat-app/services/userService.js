const MOC_USER = {
  id: 1,
  lastName: "Dzheylani",
  firstName: "Daniella",
  status: "Online",
};

export class UserService {
  #companionUserSubscribers = new Set();
  #currentUser;
  #companionUser;

  subscribeCompanion(subscription) {
    this.#companionUserSubscribers.add(subscription);
    return () => this.unSubscribe(subscription);
  }
  unSubscribe(subs) {
    this.#companionUserSubscribers.delete(subs);
  }
  setCurrentUser(user) {
    this.#currentUser = user;
  }

  notifySubscribers() {
    this.#companionUserSubscribers.forEach((subs) => subs(this.#companionUser));
  }

  getCurrentUser() {
    return this.#currentUser;
  }

  getUserById(id) {
    this.#companionUser = MOC_USER;
    this.notifySubscribers();
  }
}
