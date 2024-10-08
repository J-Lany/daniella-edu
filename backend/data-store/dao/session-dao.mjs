import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import bcrypt from "bcrypt";
import { FILE_PATHS } from "../data/data-file-paths.mjs";

const ONE_WEEK = 7;
const ONE_DAY = 1;

export class SessionDao {
  #filePath = FILE_PATHS.sessions;
  #storeServise = diContainer.resolve(SERVICES.store);
  #configService = diContainer.resolve(SERVICES.config);
  #usersDao = diContainer.resolve(SERVICES.usersDao);

  async createToken(userId, login, email, limitation) {
    try {
      const accessToken = await this.generateHashAndSalt(
        email,
        login,
        limitation
      );
      const refreshToken = await this.generateHashAndSalt(
        accessToken,
        login,
        limitation
      );

      await this.setToken(
        accessToken.hash,
        accessToken.expired,
        refreshToken.expired,
        userId
      );

      return { accessToken: accessToken.hash, refreshToken: refreshToken.hash };
    } catch (err) {
      throw new Error("Ошибка в создании токена");
    }
  }

  async generateHashAndSalt(unuqueInfo, login, limitation) {
    const hashData = `${login}${email}${this.#configService.secret}`;
    const saltRounds = 7;
    const expired = new Date();
    expired.setDate(expired.getDate() + limitation);

    const hash = await bcrypt.hash(hashData, saltRounds);

    return { hash, expired };
  }

  async setToken(accessToken, expired, refreshToken, userId) {
    const tokens = await this.#storeServise.getData(this.#filePath);
    tokens[accessToken] = { expired, userId, refreshToken };

    await this.#storeServise.setData(this.#filePath, tokens);
  }

  async getExpired(token) {
    const tokens = await this.#storeServise.getData(this.#filePath);
    return tokens[token];
  }

  async deleteToken(token) {
    const tokens = await this.#storeServise.getData(this.#filePath);
    delete tokens[token];

    await this.#storeServise.setData(this.#filePath, tokens);
  }

  async updateTokenPair(oldRefreshToken, userId) {
    const tokens = await this.#storeServise.getData(this.#filePath);
    const currentUser = await this.#usersDao.getUserById(userId);

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

    await this.#storeServise.setData(this.#filePath, tokens);

    return { accessToken, refreshToken };
  }
}
