export class UserService {
  #currentUser;

  setCurrentUser(user) {
    this.#currentUser = user;
  }

  getCurrentUser() {
    return this.#currentUser;
  }
}
