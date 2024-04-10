import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../../utils/data-file-paths.mjs";

export class UsersDao {
  #filePath = FILE_PATHS.users;
  #storeServise = diContainer.resolve(SERVICES.store);

  async getUsers() {
    return await this.#storeServise.getData(this.#filePath);
  }

  async getUserByLogin(login) {
    const users = await this.#storeServise.getData(this.#filePath);
    return users.filter((user) => user.login === login);
  }

  async setUser(user) {
    await this.#storeServise.setData(this.#filePath, [user]);
  }
}
