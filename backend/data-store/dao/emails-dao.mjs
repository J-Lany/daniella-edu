import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../data/data-file-paths.mjs";

export class EmailsDao {
  #filePath = FILE_PATHS.emails;
  #storeServise = diContainer.resolve(SERVICES.store);

  async isEmailExist(email) {
    return await this.#storeServise.getData(this.#filePath)[
      email.toLowerCase()
    ];
  }

  async setEmail(email) {
    const emails = await this.#storeServise.getData(this.#filePath);
    emails[email.toLowerCase()] = true;
    this.#storeServise.setData(this.#filePath, emails);
  }
}
