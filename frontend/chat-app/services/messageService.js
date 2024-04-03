import { diContainer } from "../di/di.js";
import { SERVICES } from "../di/api.js";

const DEFAULT_CHAT_ID = 1;
const MOC_MESSAGES = [
  {
    id: 1,
    message: "Hello, Como estas",
    time: "11:11",
    authorId: 1,
    content: {
      type: "text",
      data: "Hello, Como estas",
    },
  },
  {
    id: 2,
    message: "Hello, Como estas",
    time: "11:12",
    authorId: 1,
    content: {
      type: "text",
      data: "Hello, Estoy bien",
    },
  },
  {
    id: 3,
    message: "Hello, Como estas",
    time: "11:13",
    authorId: 1,
    content: {
      type: "text",
      data: "What's uuuuuup",
    },
  },
];

export class MessageService {
  #httpService = diContainer.resolve(SERVICES.http);
  #messagesSubscribers = new Set();
  #messages = new Map();
  #currentChatId;

  subscribeMessagesByCurrentChat(subscribtion) {
    this.#messagesSubscribers.add(subscribtion);
    this.notifySubscribers();
    return () => this.unSubscribe;
  }

  async notifySubscribers() {
    const messages = null;

    if (this.#currentChatId) {
      messages = this.#messages.has(this.#currentChatId)
        ? this.#messages.get(this.#currentChatId)
        : await this.#initMessages();
    }

    this.#messagesSubscribers.forEach((subscription) => {
      subscription(messages);
    });
  }

  async #initMessages() {
    const response = await Promise.resolve(MOC_MESSAGES);
    this.#currentChatId = response[0].id;
    this.#messages.set(this.#currentChatId, response);

    return this.#messages.get(this.#currentChatId);
  }

  unSubscribe(subs) {
    this.#messagesSubscribers.delete(subs);
  }

  setCurrentChatId(id) {
    this.#currentChatId = id;
    this.notifySubscribers();
  }

  async getMessagesByChatId(id) {
    return await this.#httpService.get(`messages/${id}`);
  }
}
