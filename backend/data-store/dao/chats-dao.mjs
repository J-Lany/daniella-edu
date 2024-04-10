import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../../utils/data-file-paths.mjs";

export class ChatsDao {
  #filePath = FILE_PATHS.chats;
  #storeServise = diContainer.resolve(SERVICES.store);

  async getChatsByAuthor(authorId) {
    const chats = await this.#storeServise.getData(this.#filePath);
    return chats.filter((chat) => chat.authorId !== authorId);
  }

  async setChat(chat) {
    await this.#storeServise.setData(this.#filePath, [chat]);
  }
}
