import { v4 as uuidv4 } from "uuid";
import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { paginator } from "../utils/paginator.mjs";

export class ChatService {
  #chatsDao = diContainer.resolve(SERVICES.chatsDao);

  async createChat(authorId, participantsIds, chatType) {
    if (authorId === null) {
      throw new Error(401);
    }

    const chatId = uuidv4();
    const date = new Date();
    const newChat = {
      chatId,
      participantsIds,
      date,
      adminsId: [authorId],
      moderatorsId: [],
      bannedId: [],
      chatType,
    };
    const isChatCreate = await this.#chatsDao.setChat(authorId, newChat);

    if (!isChatCreate) {
      throw new Error(401);
    }

    return chatId;
  }

  async getChatsByUser(authorId, chatsPerPage, pageNumber) {
    const chatsList = await this.#chatsDao.getChatsByUser(authorId);

    if (!chatsList) {
      throw new Error(401);
    }

    return paginator(chatsPerPage, pageNumber, chatsList);
  }

  async deleteParticipants(authorId, chatId, toDeleteParticipateId) {
    const result = await this.#chatsDao.deleteChatParticipants(
      authorId,
      chatId,
      toDeleteParticipateId
    );

    if (!result) {
      throw new Error(401);
    }
  }

  async deleteChat(authorId, deleteChatId) {
    await this.#chatsDao.deleteChat(authorId, deleteChatId);
  }

  async setParticipants(authorId, chatId, participantsId) {
    const result = await this.#chatsDao.setParticipants(
      authorId,
      chatId,
      participantsId
    );

    if (!result) {
      throw new Error(500);
    }
  }

  async getParticipants(chatId, authorId) {
    const result = await this.#chatsDao.getParticipants(chatId, authorId);

    if (!result) {
      throw new Error(401);
    }

    return result;
  }

  async setSpesialRole(authorId, participantId, chatId, role) {
    const result = await this.#chatsDao.setSpesialRole(
      authorId,
      participantId,
      chatId,
      role
    );

    if (!result) {
      throw new Error(401);
    }
  }

  async setBan(authorId, participantId, chatId) {
    const result = await this.#chatsDao.setBan(authorId, participantId, chatId);

    if (!result) {
      throw new Error(401);
    }
  }
}
