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
    const expired = await this.#sessionDao.getExpired(token);
    const expiredDate = new Date(expired);

    return !expired || expiredDate > new Date();
  }

  async createToken(login, email, limitation) {
    return await this.#sessionDao.createToken(login, email, limitation);
  }

  async refreshToken(refreshToken, userId) {
    const isTokenValid = await this.isTokenValid(refreshToken);

    if (!isTokenValid) {
      throw new Error(401);
    }

    return await this.#sessionDao.refreshToken(refreshToken, userId);
  }
}
