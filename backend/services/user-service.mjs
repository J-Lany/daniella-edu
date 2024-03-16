import bcrypt from "bcrypt";

export class UserService {
  #users = new Map();

  #hashPassword(password) {
    const saltRounds = 7;
    return bcrypt
      .hash(password, saltRounds)
      .then((hash) => hash)
      .catch((err) => err);
  }
  getUsers() {
    return Array.from(this.#users.values);
  }
  async setUser({ login, email, password }) {
    const hashedPassword = await this.#hashPassword(password);
    this.#users.set(login, { login, email, hashedPassword });
    console.info(this.#users);
  }

  isUserAlreadyExist(login) {
    return this.#users.has(login);
  }
}
