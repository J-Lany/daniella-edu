import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import bcrypt from "bcrypt";
import { FILE_PATHS } from "../data/data-file-paths.mjs";

const ONE_WEEK = 7;
const ONE_DAY = 1;

export class SessionDao {
  #filePath = FILE_PATHS.chats;
  #storeServise = diContainer.resolve(SERVICES.store);
  #configService = diContainer.resolve(SERVICES.config);
  #usersDao = diContainer.resolve(SERVICES.usersDao);

  async createToken(login, email, limitation) {
    const hashData = `${login}${email}${this.#configService.secret}`;
    const saltRounds = 7;
    const expired = new Date();
    expired.setDate(expired.getDate() + limitation);

    try {
      const hash = bcrypt.hash(hashData, saltRounds);
      await this.setToken(hash, expired);

      return hash;
    } catch (err) {
      throw new Error("Ошибка в создании токена");
    }
  }

  async setToken(token, expired) {
    const tokens = await this.#storeServise.getData(this.#filePath);
    tokens[token] = expired;
  }

  async getExpired(token) {
    const tokens = await this.#storeServise.getData(this.#filePath);
    return tokens[token];
  }

  async deleteToken(token) {
    const tokens = await this.#storeServise.getData(this.#filePath);
    delete tokens[token];
  }

  async refreshToken(oldRefreshToken, userId) {
    const users = await this.#usersDao.getUserById(userId);
    const currentUser = users[userId];

    if (!currentUser) {
      return false;
    }

    delete tokens[oldRefreshToken];

    const accessToken = await this.createToken(
      currentUser.email,
      currentUser.login,
      ONE_DAY
    );
    const refreshToken = await this.createToken(
      currentUser.email,
      currentUser.login,
      ONE_WEEK
    );

    return { accessToken, refreshToken };
  }
}
