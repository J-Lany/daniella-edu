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

  async setUser(user) {
    const users = await this.#storeServise.getData(this.#filePath);
    if (users[user.login]) {
      return;
    }
    users[user.login] = user;

    await this.#storeServise.setData(this.#filePath, users);
  }

  async getUserById(userId) {
    const users = await this.#storeServise.getData(this.#filePath);
    for (const user in users) {
      if (user.userId === userId) {
        return user;
      }
    }
    return null;
  }
  async updateUser(userId, updates) {
    let users = await this.#storeServise.getData(this.#filePath);
    let userLogin = -1;

    for (const key in users) {
      if (users[key].userId === userId) {
        userLogin = key;
        break;
      }
    }

    if (userLogin === -1) {
      throw new Error(401);
    }

    users[userLogin] = { ...users[userLogin], ...updates };

    await this.#storeServise.setData(this.#filePath, users);

    return users[userLogin];
  }
}
