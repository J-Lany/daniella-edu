import bcrypt from "bcrypt";

export class UserService {
  #users = new Map();

  #hashPassword(password) {
    const saltRounds = 7;
    return bcrypt
      .hash(password, saltRounds)
      .then((hash) => hash)
      .catch((err) => {
        console.log("Ошибка хеширования пароля:", err);
      });
  }
  getUsers() {
    return this.#users;
  }
  async setUser({ login, email, password }) {
    let hashedPassword = await this.#hashPassword(password);
    this.#users.set(login, { login, email, hashedPassword });
    console.log(this.#users);
  }

  isUserAlreadyExist(login) {
    return this.#users.has(login);
  }
}
