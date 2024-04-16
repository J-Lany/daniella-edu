import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../../utils/data-file-paths.mjs";

export class EmailsDao {
  #filePath = FILE_PATHS.emails;
  #storeServise = diContainer.resolve(SERVICES.store);

  async isEmailExist(email) {
    return await this.#storeServise.getData(this.#filePath)[email];
  }

  async setEmail(email) {
    const emails = await this.#storeServise.getData(this.#filePath);
    emails[email] = true;
    this.#storeServise.setData(this.#filePath, emails);
  }
}
