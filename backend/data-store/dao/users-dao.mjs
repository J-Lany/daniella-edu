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
    for (const user of Object.values(users)) {
      if (user.userId === userId) {
        return user;
      }
    }
    return null;
  }

  async getUserByName(firstName) {
    const users = await this.#storeServise.getData(this.#filePath);
    for (const user of Object.values(users)) {
      if (user.firstName === firstName) {
        return user;
      }
    }
    return null;
  }
  
  async updateUser(userId, updates) {
    const users = await this.#storeServise.getData(this.#filePath);
    const user = await this.getUserById(userId);

    users[user.login] = { ...users[user.login], ...updates };

    await this.#storeServise.setData(this.#filePath, users);

    return users[user.login];
  }

  async deleteUser(userId) {
    const users = await this.#storeServise.getData(this.#filePath);
    const user = await this.getUserById(userId);
    delete users[user.login];

    await this.#storeServise.setData(this.#filePath, users);
  }
}
