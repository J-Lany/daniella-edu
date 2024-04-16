import bcrypt from "bcrypt";
import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { v4 as uuidv4 } from "uuid";
import { paginator } from "../utils/paginator.mjs";

export class UserService {
  #userDao = diContainer.resolve(SERVICES.usersDao);
  #emailService = diContainer.resolve(SERVICES.email);

  #hashPassword(password) {
    const saltRounds = 7;
    return bcrypt
      .hash(password, saltRounds)
      .then((hash) => hash)
      .catch((err) => err);
  }

  async getUsers(userPerPage, pageNumber) {
    const userList = Object.values(await this.#userDao.getUsers());

    return paginator(userPerPage, pageNumber, userList);
  }

  async setUser({ login, email, password }) {
    const hashedPassword = await this.#hashPassword(password);
    const userId = uuidv4();
    if (!this.#emailService.isEmailCorrect(email)) {
      throw new Error(403);
    }
    this.isUserAlreadyExist(email);

    this.#emailService.setEmail(email);
    this.#userDao.setUser({ login, email, hashedPassword, userId });
  }

  async isUserAlreadyExist(email) {
    const isEmailExist = await this.#emailService.isEmailExist(email);
    if (isEmailExist) {
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
  async searchUser(search, userPerPage, pageNumber) {
    const result = await this.#userDao.searchUser(search);
    if (!result) {
      throw new Error(401);
    }
    return paginator(userPerPage, pageNumber, result);
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
