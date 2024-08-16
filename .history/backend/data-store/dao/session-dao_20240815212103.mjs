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

  async createToken(login, email, limitation) {
    try {
      const { hash, expired } = await this.generateHashAndSalt(
        login,
        email,
        limitation
      );
      await this.setToken(hash, expired);

      return hash;
    } catch (err) {
      throw new Error("Ошибка в создании токена");
    }
  }

  async createTokenV2(userId, login, email, limitation) {
    try {
      const accessToken = await this.generateHashAndSalt(
        login,
        email,
        limitation
      );
      const refreshToken = await this.generateHashAndSalt(
        login,
        email,
        limitation
      );
      await this.setTokenV2(accessToken.hash, accessToken.expired, refreshToken.expired, userId);

      return hash;
    } catch (err) {
      throw new Error("Ошибка в создании токена");
    }
  }

  async generateHashAndSalt(login, email, limitation) {
    const hashData = `${login}${email}${this.#configService.secret}`;
    const saltRounds = 7;
    const expired = new Date();
    expired.setDate(expired.getDate() + limitation);

    const hash = await bcrypt.hash(hashData, saltRounds);

    return { hash, expired };
  }

  async setToken(token, expired) {
    const tokens = await this.#storeServise.getData(this.#filePath);
    tokens[token] = expired;

    await this.#storeServise.setData(this.#filePath, tokens);
  }

  async setTokenV2(accessToken, expired,refreshToken, userId) {
    const tokens = await this.#storeServise.getData(this.#filePath);
    tokens[token] = { expired, userId };

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
