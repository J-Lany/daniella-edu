import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../../utils/data-file-paths.mjs";

export class SessionDao {
  #filePath = FILE_PATHS.chats;
  #storeServise = diContainer.resolve(SERVICES.store);

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
}
