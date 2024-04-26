import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../../utils/data-file-paths.mjs";

const CHAT_TYPES = {
  p2p: "p2p",
  group: "group",
};
const SPECIAL_ROLES = {
  admin: "admin",
  moderator: "moderator",
};

export class ChatsDao {
  #chatsFilePath = FILE_PATHS.chats;
  #chatsByUserFilePath = FILE_PATHS.chatsByUser;
  #storeServise = diContainer.resolve(SERVICES.store);

  async getChatsByUser(authorId) {
    const chatsByUser = await this.#storeServise.getData(
      this.#chatsByUserFilePath
    );

    return chatsByUser[authorId];
  }

  async setChat(chat) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);
    const chatsByUser = await this.#storeServise.getData(
      this.#chatsByUserFilePath
    );

    chats[chat.chatId] = chat;

    chat.participantsIds.forEach((participantId) => {
      if (!chatsByUser[participantId]) {
        chatsByUser[participantId] = [chat.chatId];
      } else {
        chatsByUser[participantId].push(chat.chatId);
      }
    });

    await this.#storeServise.setData(this.#chatsFilePath, chats);
    await this.#storeServise.setData(this.#chatsByUserFilePath, chatsByUser);
  }

  async deleteChat(authorId, deleteChatId) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);
    const chatsByUser = await this.#storeServise.getData(
      this.#chatsByUserFilePath
    );

    if (!chats[deleteChatId]) return null;

    if (
      chats[deleteChatId].chatType === CHAT_TYPES.p2p ||
      chats[deleteChatId].adminsId.includes(authorId)
    ) {
      chats[deleteChatId].participantsIds.forEach((participantsId) => {
        chatsByUser[participantsId] = chatsByUser[participantsId].filter(
          (chatId) => chatId !== deleteChatId
        );
      });
      delete chats[deleteChatId];

      await this.#storeServise.setData(this.#chatsFilePath, chats);
      await this.#storeServise.setData(this.#chatsByUserFilePath, chatsByUser);

      return true;
    }
  }

  async deleteChatParticipants(authorId, chatId, toDeleteParticipantId) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);
    const chatsByUser = await this.#storeServise.getData(
      this.#chatsByUserFilePath
    );

    if (
      !chats[chatId] ||
      !chats[chatId].adminsId.includes(authorId) ||
      !chatsByUser[toDeleteParticipantId].includes(chatId)
    ) {
      return null;
    }

    chats[chatId].participantsIds = chats[chatId].participantsIds.filter(
      (participantsId) => participantsId !== toDeleteParticipantId
    );
    chatsByUser[toDeleteParticipantId] = chatsByUser[
      toDeleteParticipantId
    ].filter((chat) => chat !== chatId);

    await this.#storeServise.setData(this.#chatsFilePath, chats);
    await this.#storeServise.setData(this.#chatsByUserFilePath, chatsByUser);

    return true;
  }

  async setParticipants(authorId, chatId, participantsId) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);
    const chatsByUser = await this.#storeServise.getData(
      this.#chatsByUserFilePath
    );

    if (
      !chats[chatId] ||
      chats[chatId].chatType === CHAT_TYPES.p2p ||
      !chats[chatId].adminsId.includes(authorId)
    ) {
      return null;
    }

    chats[chatId].participantsIds.push(...participantsId);
    participantsId.forEach((participantId) => {
      if (!chatsByUser[participantId]) {
        chatsByUser[participantId] = [chatId];
      } else {
        chatsByUser[participantId].push(chatId);
      }
    });

    await this.#storeServise.setData(this.#chatsFilePath, chats);
    await this.#storeServise.setData(this.#chatsByUserFilePath, chatsByUser);

    return true;
  }

  async getParticipants(chatId, authorId) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);
    if (!chats[chatId] || !chats[chatId].participantsIds.includes(authorId))
      return null;

    return chats[chatId].participantsIds;
  }

  async setSpesialRole(authorId, participantId, chatId, role) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);

    if (
      !chats[chatId] ||
      chats[chatId].chatType === CHAT_TYPES.p2p ||
      !chats[chatId].adminsId.includes(authorId)
    ) {
      return null;
    }

    if (role === SPECIAL_ROLES.admin) {
      chats[chatId].adminsId.push(participantId);
    } else if (role === SPECIAL_ROLES.moderator) {
      chats[chatId].moderatorsId.push(participantId);
    }

    await this.#storeServise.setData(this.#chatsFilePath, chats);
    return true;
  }
}
