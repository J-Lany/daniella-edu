import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../../utils/data-file-paths.mjs";

export class UsersDao {
  #filePath = FILE_PATHS.users;
  #storeServise = diContainer.resolve(SERVICES.store);

  async getUsers() {
    return await this.#storeServise.getData(this.#filePath);
  }

  async getUserById(userId) {
    const users = await this.#storeServise.getData(this.#filePath);
    if (!users[userId]) {
      return null;
    }
    return users[userId];
  }

  async setUser(user) {
    const users = await this.#storeServise.getData(this.#filePath);
    if (users[user.userId]) {
      return;
    }
    users[user.userId] = user;

    await this.#storeServise.setData(this.#filePath, users);
  }

  async getUserByLogin(login) {
    const users = await this.#storeServise.getData(this.#filePath);
    for (const user of Object.values(users)) {
      if (user.login === login) {
        return user;
      }
    }
    return null;
  }

  async searchUser(search) {
    const users = await this.#storeServise.getData(this.#filePath);

    return Object.values(users).filter(
      (user) =>
        user.firstName.includes(search) ||
        user.lastName.includes(search) ||
        user.login.includes(search)
    );
  }

  async updateUser(userId, updates) {
    const users = await this.#storeServise.getData(this.#filePath);

    users[userId] = { ...users[userId], ...updates };

    await this.#storeServise.setData(this.#filePath, users);

    return users[userId];
  }

  async deleteUser(userId) {
    const users = await this.#storeServise.getData(this.#filePath);
    delete users[userId];

    await this.#storeServise.setData(this.#filePath, users);
  }
}
