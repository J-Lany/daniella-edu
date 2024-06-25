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
      adminsIds: [authorId],
      moderatorsIds: [],
      bannedIds: [],
      chatType,
    };
    const isChatCreate = await this.#chatsDao.createChat(authorId, newChat);

    if (!isChatCreate) {
      throw new Error(401);
    }

    return chatId;
  }

  async getChatsByUser(authorId, chatsPerPage, pageNumber) {
    const chatsList = await this.#chatsDao.getChatsByUser(authorId);

    if (!chatsList) {
      throw new Error(403);
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
      throw new Error(500);
    }
  }

  async deleteChat(authorId, deleteChatId) {
    const result = await this.#chatsDao.deleteChat(authorId, deleteChatId);

    if (!result) {
      throw new Error(500);
    }
  }

  async setParticipants(chatId, participantsId) {
    const result = await this.#chatsDao.setParticipants(chatId, participantsId);

    if (!result) {
      throw new Error(500);
    }
  }

  async getParticipants(chatId) {
    const result = await this.#chatsDao.getParticipants(chatId);

    if (!result) {
      throw new Error(500);
    }

    return result;
  }

  async setSpesialRole(participantId, chatId, role) {
    const result = await this.#chatsDao.setSpesialRole(
      participantId,
      chatId,
      role
    );

    if (!result) {
      throw new Error(500);
    }
  }

  async setBan(participantId, chatId) {
    const result = await this.#chatsDao.setBan(participantId, chatId);

    if (!result) {
      throw new Error(500);
    }
  }
}
