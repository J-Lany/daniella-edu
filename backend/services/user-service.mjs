import bcrypt from "bcrypt";
import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";

export class UserService {
  #userDao = diContainer.resolve(SERVICES.usersDao);

  #hashPassword(password) {
    const saltRounds = 7;
    return bcrypt
      .hash(password, saltRounds)
      .then((hash) => hash)
      .catch((err) => err);
  }
  async getUsers() {
    return await this.#userDao.getUsers();
  }
  async setUser({ login, email, password }) {
    const hashedPassword = await this.#hashPassword(password);
    this.#userDao.setUser({ login, email, hashedPassword });
  }

  isUserAlreadyExist(login) {
    if (this.#userDao.getUserByLogin(login)) {
      throw new Error(401);
    }
    return true;
  }

  async getUser(login) {
    return await this.#userDao.getUserByLogin(login);
  }
}
