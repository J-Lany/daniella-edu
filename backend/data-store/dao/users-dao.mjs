import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../data/data-file-paths.mjs";

export class UsersDao {
  #filePathForFront = FILE_PATHS.usersForFront;
  #filePathForBack = FILE_PATHS.usersForBack;
  #storeServise = diContainer.resolve(SERVICES.store);

  async getUsers() {
    return await this.#storeServise.getData(this.#filePathForFront);
  }

  async getUserById(userId) {
    const users = await this.#storeServise.getData(this.#filePathForFront);
    if (!users[userId]) {
      return null;
    }
    return users[userId];
  }

  async getUserByEmailForBack(email) {
    const users = await this.#storeServise.getData(this.#filePathForBack);
    return Object.values(users).find((user) => user.email === email);
  }

  async getUserByEmailForFront(email) {
    const users = await this.#storeServise.getData(this.#filePathForFront);
    return Object.values(users).find((user) => user.email === email);
  }

  async setUser(user) {
    const usersByFront = await this.#storeServise.getData(
      this.#filePathForFront
    );

    if (usersByFront[user.userId]) {
      return;
    }

    const usersByBack = await this.#storeServise.getData(this.#filePathForBack);

    usersByFront[user.userId] = {
      userId: user.userId,
      login: user.login,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    usersByBack[user.userId] = user;

    await this.#storeServise.setData(this.#filePathForFront, usersByFront);
    await this.#storeServise.setData(this.#filePathForBack, usersByBack);
  }

  async searchUser(search) {
    const users = await this.#storeServise.getData(this.#filePathForFront);
    const check = new RegExp(search, "gi");

    return Object.values(users).filter(
      (user) =>
        check.test(user.firstName) ||
        check.test(user.lastName) ||
        check.test(user.login)
    );
  }

  async updateUser(userId, updates) {
    const usersByFront = await this.#storeServise.getData(
      this.#filePathForFront
    );
    const usersByBack = await this.#storeServise.getData(this.#filePathForBack);

    usersByFront[userId] = { ...usersByFront[userId], ...updates };
    usersByBack[userId] = { ...usersByBack[userId], ...updates };

    await this.#storeServise.setData(this.#filePathForFront, usersByFront);
    await this.#storeServise.setData(this.#filePathForBack, usersByBack);

    return usersByFront[userId];
  }

  async deleteUser(userId) {
    const usersByFront = await this.#storeServise.getData(
      this.#filePathForFront
    );
    const usersByBack = await this.#storeServise.getData(this.#filePathForBack);

    delete usersByFront[userId];
    delete usersByBack[userId];

    await this.#storeServise.setData(this.#filePathForFront, usersByFront);
    await this.#storeServise.setData(this.#filePathForBack, usersByBack);
  }
}
