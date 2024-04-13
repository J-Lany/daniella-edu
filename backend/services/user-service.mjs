import bcrypt from "bcrypt";
import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { v4 as uuidv4 } from "uuid";

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
    const userId = uuidv4();
    this.#userDao.setUser({ login, email, hashedPassword, userId });
  }

  isUserAlreadyExist(login) {
    if (!this.#userDao.getUserByLogin(login)) {
      throw new Error(401);
    }
    return true;
  }

  async getUser(userId) {
    const user = await this.#userDao.getUserById(userId);
    if (!user) {
      throw new Error(401);
    }
    return user;
  }
  async searchUser(search) {
    return await this.#userDao.searchUser(search);
  }
  
  async updateUser(userId, updates) {
    const user = await this.#userDao.getUserById(userId);
    if (!user) {
      throw new Error(401);
    }
    return await this.#userDao.updateUser(userId, updates);
  }

  async deleteUser(userId) {
    const user = await this.#userDao.getUserById(userId);
    if (!user) {
      throw new Error(401);
    }
    await this.#userDao.deleteUser(userId);
  }
}
