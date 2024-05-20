import bcrypt from "bcrypt";
import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { v4 as uuidv4 } from "uuid";
import { paginator } from "../utils/paginator.mjs";
import { convertToDTO } from "../utils/UserDTO.mjs";

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
    const userDTOList = userList.map(convertToDTO);

    return paginator(userPerPage, pageNumber, userDTOList);
  }

  async setUser({ login, email, password }) {
    const hashedPassword = await this.#hashPassword(password);
    const userId = uuidv4();

    const isUserAlreadyExist = await this.isUserAlreadyExist(email);
    if (isUserAlreadyExist) {
      throw new Error(401);
    }

    const isEmailInstalled = await this.#emailService.setEmail(email);

    if (!isEmailInstalled) {
      throw new Error(403);
    }

    this.#userDao.setUser({ login, email, hashedPassword, userId });
  }

  async isUserAlreadyExist(email) {
    return await this.#emailService.isEmailExist(email);
  }

  async getUser(userId) {
    const user = await this.#userDao.getUserById(userId);
    if (!user) {
      throw new Error(401);
    }
    return convertToDTO(user);
  }

  async getUserByEmail(email) {
    return await this.#userDao.getUserByEmail(email);
  }

  async searchUser(search, userPerPage, pageNumber, userId) {
    const result = await this.#userDao.searchUser(search);
    const filtresResult = result
      ?.filter((user) => user.userId !== userId)
      .map(convertToDTO);

    if (!filtresResult) {
      throw new Error(403);
    }

    return paginator(userPerPage, pageNumber, filtresResult);
  }

  async updateUser(userId, updates) {
    const user = await this.#userDao.getUserById(userId);
    if (!user) {
      throw new Error(401);
    }

    const updatedUser = await this.#userDao.updateUser(userId, updates);
    return convertToDTO(updatedUser);
  }

  async deleteUser(userId) {
    const user = await this.#userDao.getUserById(userId);
    if (!user) {
      throw new Error(401);
    }
    await this.#userDao.deleteUser(userId);
  }
}
