export class UserService {
  #users = new Map();
  getUsers() {
    return this.#users;
  }
  setUser({ login, email, password }) {
    this.#users.set(login, { login, email, password });
  }
  isUserAlreadyExist(login) {
    return this.#users.has(login);
  }
}
