import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../data/data-file-paths.mjs";

export class EmailsDao {
  #filePath = FILE_PATHS.emails;
  #storeServise = diContainer.resolve(SERVICES.store);

  async isEmailExist(email) {
    const emailLowerdCase = email.toLowerCase();
    const result = await this.#storeServise.getData(this.#filePath)[
      emailLowerdCase
    ];

    return !!result;
  }

  async setEmail(email) {
    const emails = await this.#storeServise.getData(this.#filePath);
    const emailLowerdCase = email.toLowerCase();

    emails[emailLowerdCase] = true;
    this.#storeServise.setData(this.#filePath, emails);
  }
}
