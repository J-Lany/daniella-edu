import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";

export class EmailService {
  #emailsDao = diContainer.resolve(SERVICES.emailsDao);
  async isEmailExist(email) {
    return await this.#emailsDao.isEmailExist(email);
  }

  async setEmail(email) {
    await this.#emailsDao.setEmail(email);
  }
  
}
