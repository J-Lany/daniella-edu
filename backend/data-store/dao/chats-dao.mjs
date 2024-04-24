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

  async deleteChat(authorId, deleteChatId) {
    const chats = await this.#storeServise.getData(this.#filePath);

    if (!chats[authorId]) return null;

    chats[authorId] = chats[authorId].filter(
      ({ chatId }) => chatId !== deleteChatId
    );

    this.#storeServise.setData(this.#filePath, chats);
  }

  async deleteChatParticipants(authorId, chatId, toDeleteParticipantId) {
    const chats = await this.#storeServise.getData(this.#filePath);

    if (!chats[authorId]) return;

    chats[authorId].forEach((chat) => {
      if (chat.chatId === chatId) {
        chat.participantsIds = chat.participantsIds.filter(
          (participantsId) => participantsId !== toDeleteParticipantId
        );
      }
    });

    await this.#storeServise.setData(this.#filePath, chats);
  }

  async setParticipants(authorId, chatId, participantsId) {
    const chats = await this.#storeServise.getData(this.#filePath);

    if (!chats[authorId]) return null;

    chats[authorId].forEach((chat) => {
      if (chat.chatId === chatId) {
        chat.participantsIds = [...chat.participantsIds, ...participantsId];
      }
    });

    await this.#storeServise.setData(this.#filePath, chats);
    return true;
  }

  async getParticipants(chatId, authorId) {
    const chats = await this.#storeServise.getData(this.#filePath);
    if (!chats[authorId]) return null;

    const currentChat = chats[authorId].find((chat) => chat.chatId === chatId);

    return currentChat.participantsIds;
  }
}
