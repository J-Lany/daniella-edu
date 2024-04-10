import bcrypt from "bcrypt";
import { UsersDao } from "../data-store/dao/users-dao.mjs";

export class UserService {
  #userDao = new UsersDao();
  #users = new Map();

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
    //Пока что на старых рельсах - не смотри
    if (this.#users.has(login)) {
      throw new Error(401);
    }
    return true;
  }
  async getUser(login) {
    const users = await this.#userDao.getUsers();
    return users.filter((user) => user.login === login);
  }
}
