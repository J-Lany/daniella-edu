import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../../utils/data-file-paths.mjs";

export class ChatsDao {
  #filePath = FILE_PATHS.chats;
  #storeServise = diContainer.resolve(SERVICES.store);

  async getChatsByAuthor(authorId) {
    const chats = await this.#storeServise.getData(this.#filePath);

    return chats[authorId];
  }

  async setChat(chat, authorId) {
    const chats = await this.#storeServise.getData(this.#filePath);

    if (!chats[authorId]) {
      chats[authorId] = [chat];
    } else {
      chats[authorId].push(chat);
    }

    this.#storeServise.setData(this.#filePath, chats);
  }
}
