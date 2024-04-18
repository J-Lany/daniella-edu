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
    return await this.#sessionDao.isTokenValid(token);
  }
}
