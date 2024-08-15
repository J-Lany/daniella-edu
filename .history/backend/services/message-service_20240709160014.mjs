import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { v4 as uuidv4 } from "uuid";

export class MessageService {
  #messagesDao = diContainer.resolve(SERVICES.messagesDao);
  #chatsDao = diContainer.resolve(SERVICES.chatsDao);

  async getMocMessagesByChat(chatId) {
    const partisipants = await this.#chatsDao.getParticipantsForMoc(chatId);
    return generateMockMessages(chatId, partisipants);
  }

  async getMessagesByChat(chatId, startIndex, limit) {
    const messagesList = await this.#messagesDao.getMessagesByChat(chatId);
    const startIndexNum = Number(startIndex);
    const limitNum = Number(limit);

    if (!messagesList) {
      throw new Error(404);
    }

    const totalMessages = messagesList.length;
    const endIndex = startIndexNum || totalMessages;
    const startSliceIndex = Math.max(endIndex - limit, 0);
    const result = messagesList.slice(startSliceIndex, endIndex);

    const newMessageIndex = startSliceIndex;

    return { result, newMessageIndex };
  }

  async addMessage(authorId, chatId, messageBody) {
    const isPatrtisipant = await this.isPatrtisipant(authorId);

    if (!isPatrtisipant) {
      throw new Error(403);
    }

    const messageId = uuidv4();
    const createDate = new Date();
    const result = await this.#messagesDao.addMessage(authorId, chatId, {
      authorId,
      messageId,
      createDate,
      messageBody
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
    const chats = await this.#chatsDao.getChatsByUser(authorId);

    if (!chats) {
      return false;
    }

    return chats.some((chat) => chat.participantsIds.includes(authorId));
  }
}

function generateMockMessages(chatId, partisipants) {
  const messages = [];
  let messageBlock = [];
  const partisipantOne = partisipants[0];
  const participantTwo = partisipants[1];
  const messageCount = 10;
  let prevAuthorId;

  for (let i = 1; i <= messageCount; i++) {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const message = {
      authorId: i % 4 !== 0 ? partisipantOne : participantTwo,
      message: `Сообщение из чата ${chatId}, сообщение номер ${i}`,
      time: `${hours}:${minutes}`
    };

    const isNewBlock = prevAuthorId !== message.authorId;

    if (isNewBlock && messageBlock.length > 0) {
      messages.push(messageBlock);
      messageBlock = [];
    }

    messageBlock.push(message);
    prevAuthorId = message.authorId;
  }

  return messages;
}
