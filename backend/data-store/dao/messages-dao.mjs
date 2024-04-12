import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../../utils/data-file-paths.mjs";

export class MessagessDao {
  #filePath = FILE_PATHS.messages;
  #storeServise = diContainer.resolve(SERVICES.store);

  async getMessagesByChat(chatId) {
    const messages = await this.#storeServise.getData(this.#filePath);
    return messages[chatId];
  }

  async setMessage(message, chatId) {
    const messages = await this.#storeServise.getData(this.#filePath);
    if (!messages[chatId]) {
      messages[chatId] = [message];
    } else {
      messages[chatId].push(message);
    }
    this.#storeServise.setData(this.#filePath, messages);
  }
}