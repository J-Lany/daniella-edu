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

  async searchUser(search) {
    const users = await this.#storeServise.getData(this.#filePath);
    const check = new RegExp(search, "gi");

    return Object.values(users).filter(
      (user) =>
        check.test(user.firstName) ||
        check.test(user.lastName) ||
        check.test(user.login)
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
