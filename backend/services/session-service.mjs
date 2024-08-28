import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

export class SessionService {
  #sessionDao = diContainer.resolve(SERVICES.sessionDao);

  async setToken(token, expired) {
    await this.#sessionDao.setToken(token, expired);
  }

  async getExpired(token) {
    return await this.#sessionDao.getExpired(token);
  }

  async deleteToken(token) {
    await this.#sessionDao.deleteToken(token);
  }

  async isTokenValid(token) {
    const tokenData = await this.#sessionDao.getExpired(token);

    if (!tokenData) {
      throw new Error(401);
    }

    const expiredDate = new Date(tokenData.expired);

    return expiredDate > new Date();
  }

  async createToken(userId, login, email, limitation) {
    return await this.#sessionDao.createToken(userId, login, email, limitation);
  }

  async updateTokenPair(refreshToken, userId) {
    const isTokenExist = await this.getExpired(refreshToken);

    if (!isTokenExist) {
      throw new Error(401);
    }

    return await this.#sessionDao.updateTokenPair(refreshToken, userId);
  }
}
