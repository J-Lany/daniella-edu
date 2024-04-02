import { diContainer } from "../di/di.js";
import { SERVICES } from "../di/api.js";

const DEFAULT_CHAT_ID = 1;
const MOC_MESSAGES = [
  {
    id: 1,
    message: "Hello, Como estas",
    time: "11:11",
  },
  {
    id: 2,
    message: "Hello, Como estas",
    time: "11:12",
  },
  {
    id: 3,
    message: "Hello, Como estas",
    time: "11:13",
  },
];

export class MessageService {
  #httpService = diContainer.resolve(SERVICES.http);
  #messagesSubscribers = new Set();
  #messages = new Map();
  #messagesByCurrentChat;
  #currentChatId;

  subscribeMessagesByCurrentChat(subscribtion) {
    this.#messagesSubscribers.add(subscribtion);
    this.notifySubscribers();
    return () => this.unSubscribe;
  }

  async notifySubscribers() {
    this.#currentChatId = this.#currentChatId || DEFAULT_CHAT_ID;
    const messages = this.#messages.has(this.#currentChatId)
      ? this.#messagesByCurrentChat.get(this.#currentChatId)
      : await this.#initMessages();
    this.#messagesByCurrentChat = messages;
    this.#messagesSubscribers.forEach((subscription) => {
      subscription(this.#messagesByCurrentChat);
    });
  }

  async #initMessages() {
    const response = await Promise.resolve(MOC_MESSAGES);
    this.#messages.set(this.#currentChatId, response);
    this.#messagesByCurrentChat = this.#messages.get(this.#currentChatId);

    return this.#messagesByCurrentChat;
  }

  unSubscribe(subs) {
    this.#messagesSubscribers.delete(subs);
  }

  setCurrentChatId(id) {
    this.#currentChatId = id;
    this.notifySubscribers();
  }

  async getMessagesByChatId(id) {
    this.#messagesByCurrentChat = await this.#httpService.get(`messages/${id}`);
    this.notifySubscribers();
  }
}
