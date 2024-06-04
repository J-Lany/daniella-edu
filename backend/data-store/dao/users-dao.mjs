import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { convertToDTO } from "../../utils/UserDTO.mjs";
import { FILE_PATHS } from "../data/data-file-paths.mjs";
convertToDTO;

export class UsersDao {
  #filePath = FILE_PATHS.users;
  #usersFriends = FILE_PATHS.userFriends;
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

  async getUserByEmail(email) {
    const users = await this.#storeServise.getData(this.#filePath);
    return Object.values(users).find((user) => user.email === email);
  }

  async setUser(user) {
    const users = await this.#storeServise.getData(this.#filePath);

    if (users[user.userId]) {
      return;
    }

    users[user.userId] = user;

    await this.#storeServise.setData(this.#filePath, users);
  }

  async searchUser(search, userId) {
    const users = await this.#storeServise.getData(this.#filePath);
    const check = new RegExp(search, "gi");
    const usersFriends = await this.#storeServise.getData(this.#usersFriends);

    const matchedUsers = Object.values(users).filter(
      (user) =>
        check.test(user.firstName) ||
        check.test(user.lastName) ||
        check.test(user.login)
    );

    if (!matchedUsers) {
      return null;
    }

    const filtresResult = matchedUsers.filter((user) => user.userId !== userId);

    if (!filtresResult.length) {
      return null;
    }

    const isUserFriendsListEmpty = !Object.keys(usersFriends).length;

    if (isUserFriendsListEmpty) {
      return filtresResult.reduce(
        (acc, user) => {
          acc.usersWithoutConversations.push(convertToDTO(user));
          return acc;
        },
        { usersWithoutConversations: [], usersWithConversations: [] }
      );
    }

    return filtresResult.reduce(
      (acc, user) => {
        usersFriends[userId].includes(user.userId)
          ? acc.usersWithConversations.push(convertToDTO(user))
          : acc.usersWithoutConversations.push(convertToDTO(user));

        return acc;
      },
      { usersWithConversations: [], usersWithoutConversations: [] }
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

  async setFriend(authorId, friendId) {
    const usersFriends = await this.#storeServise.getData(this.#usersFriends);

    if (usersFriends[authorId]) {
      usersFriends[authorId].push(friendId);
    } else {
      usersFriends[authorId] = [friendId];
    }

    await this.#storeServise.setData(this.#usersFriends, usersFriends);
  }

  async deleteFriends(authorId, friendId) {
    const usersFriends = await this.#storeServise.getData(this.#usersFriends);

    if (!usersFriends[authorId]) {
      return;
    }

    usersFriends[authorId] = usersFriends[authorId].filter(
      (userFriendId) => userFriendId !== friendId
    );

    await this.#storeServise.setData(this.#usersFriends, usersFriends);
  }
}
