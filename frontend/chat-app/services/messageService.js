import { diContainer } from "../di/di.js";
import { SERVICES } from "../di/api.js";
import { authGuard } from "../guards/auth-guard";

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

const MESSAGES_PER_PAGE = 10;
const PAGE_NUMBER = 1;

export class MessageService {
  #httpService = authGuard(diContainer.resolve(SERVICES.http));
  #messagesSubscribers = new Set();
  #messages = new Map();
  #currentChatId;

  subscribeMessagesByCurrentChat(subscribtion) {
    this.#messagesSubscribers.add(subscribtion);
    return () => this.unSubscribe;
  }

  async notifySubscribers() {
    let messages;

    if (this.#currentChatId) {
      messages = this.#messages.has(this.#currentChatId)
        ? this.#messages.get(this.#currentChatId)
        : await this.getMessagesByChatId(this.#currentChatId);
    }

    this.#messagesSubscribers.forEach((subscription) => {
      subscription(messages);
    });
  }

  unSubscribe(subs) {
    this.#messagesSubscribers.delete(subs);
  }

  setCurrentChatId(id) {
    this.#currentChatId = id;
    this.notifySubscribers();
  }

  async getMessagesByChatId(chatId) {
    const params = {
      chatId,
      messagesPerPage: MESSAGES_PER_PAGE,
      pageNumber: PAGE_NUMBER,
    };

    const getParams = new URLSearchParams(params).toString();
    const result = await this.#httpService.get(`messages?${getParams}`);

    if (result.status === 200) {
      this.#messages.set(this.#currentChatId, result.content);
      return result.content;
    }
    if (result.status === 401) {
      return generateMockMessages(chatId);
    }
  }
}
