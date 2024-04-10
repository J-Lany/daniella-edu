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
    if (!users[login]) {
      return null;
    }
    return users[login];
  }

  async setUser({ login, email, hashedPassword }) {
    const users = await this.#storeServise.getData(this.#filePath);
    if (users[login]) {
      return;
    }
    users[login] = { login, email, hashedPassword };

    await this.#storeServise.setData(this.#filePath, users);
  }
}
