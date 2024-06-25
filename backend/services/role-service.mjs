import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { CHAT_TYPES } from "../data-store/dao/chats-dao.mjs";

export class RoleService {
  #chatsDao = diContainer.resolve(SERVICES.chatsDao);

  async isAdmin(chatId, authorId) {
    const chats = await this.#chatsDao.getChats();

    if (!chats[chatId]) {
      throw new Error(404);
    }

    const isAdmin = chats[chatId].adminsIds.includes(authorId);
    const isP2pChat = chats[chatId].chatType === CHAT_TYPES.p2p;

    if (!isAdmin && !isP2pChat) {
      throw new Error(403);
    }

    return true;
  }

  async isModerator(chatId, authorId) {
    const chats = await this.#chatsDao.getChats();

    if (!chats[chatId]) {
      throw new Error(404);
    }

    const isModerator = chats[chatId].moderatorsIds.includes(authorId);
    const isP2pChat = chats[chatId].chatType === CHAT_TYPES.p2p;

    if (!isModerator && !isP2pChat) {
      throw new Error(403);
    }

    return true;
  }

  async isParticipant(chatId, authorId) {
    const chats = await this.#chatsDao.getChats();

    if (!chats[chatId]) {
      throw new Error(404);
    }

    return chats[chatId].participantsIds.includes(authorId);
  }
}
