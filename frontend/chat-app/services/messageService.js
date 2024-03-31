import { diContainer } from "../di/di.js";
import { SERVICES } from "../di/api.js";

export class MessageService {
  #httpService = diContainer.resolve(SERVICES.http);
  #messagesByCurrentChat;

  async subscribeMessagesByCurrentChat(id) {
    this.#messagesByCurrentChat = await this.getMessagesByChatId(id);
    return this.#messagesByCurrentChat;
  }

  async getMessagesByChatId(id) {
    return await this.#httpService.get(`messages/${id}`);
  }
}
