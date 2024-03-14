export class UserService {
  #users = [];
  getUsers() {
    return this.#users;
  }
  setUser(user) {
    this.#users = [...this.#users, user];
  }
}
