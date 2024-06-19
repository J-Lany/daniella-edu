import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { v4 as uuidv4 } from "uuid";
import { paginator } from "../utils/paginator.mjs";

export class MessageService {
  #messagesDao = diContainer.resolve(SERVICES.messagesDao);
  #chatsDao = diContainer.resolve(SERVICES.chatsDao);

  async getMocMessagesByChat(chatId) {
    return generateMockMessages(chatId);
  }

  async getMessagesByChat(chatId, messagesPerPage, pageNumber) {
    const messagesList = await this.#messagesDao.getMessagesByChat(chatId);

    if (!messagesList) {
      throw new Error(404);
    }

    return paginator(messagesPerPage, pageNumber, messagesList);
  }

  async addMessage(authorId, chatId, messageBody) {
    const isPatrtisipant = await this.isPatrtisipant(authorId);

    if (!isPatrtisipant) {
      throw new Error(403);
    }

    const messageId = uuidv4();
    const createDate = new Date();
    const result = await this.#messagesDao.addMessage(chatId, {
      authorId,
      messageId,
      createDate,
      messageBody,
    });

    if (!result) {
      throw new Error(500);
    }

    return result;
  }

  async updateMessage(chatId, messageId, messageBody) {
    const isPatrtisipant = await this.isPatrtisipant(authorId);

    if (!isPatrtisipant) {
      throw new Error(403);
    }

    const result = await this.#messagesDao.updateMessage(
      chatId,
      messageId,
      messageBody
    );

    if (!result) {
      throw new Error(500);
    }

    return;
  }

  async deleteMessage(chatId, messageId) {
    try {
      const isPatrtisipant = await this.isPatrtisipant(authorId);

      if (!isPatrtisipant) {
        throw new Error(403);
      }

      await this.#messagesDao.deleteMessage(chatId, messageId);
    } catch {
      throw new Error(500);
    }
  }

  async isPatrtisipant(authorId) {
    const chats = await this.#chatsDao.getChatsByAuthor(authorId);

    if (!chats) {
      return false;
    }

    return chats.some((chat) => chat.participantsIds.includes(authorId));
  }
}

function generateMockMessages(chatId) {
  const messages = [];
  const userId = "7c6ae783-464b-4351-a083-1f72a5282e45";
  const interlocutorId = "fe7f2604-d508-454b-968f-da7b444bce55";
  const messageCount = 5;

  for (let i = 1; i <= messageCount; i++) {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const message = {
      authorId: i % 2 === 0 ? interlocutorId : userId,
      message: `Сообщение из чата ${chatId}, сообщение номер ${i}`,
      time: `${hours}:${minutes}`,
    };

    messages.push(message);
  }

  return messages;
}
