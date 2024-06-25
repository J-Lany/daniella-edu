import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { CHAT_TYPES } from "../data-store/dao/chats-dao.mjs";

export class RoleService {
  async isAdmin(req, res, next) {
    const chatsDao = diContainer.resolve(SERVICES.chatsDao);
    const chats = await chatsDao.getChats();
    const chatId = req.query.chatId || req.params.chatId;
    const authorId = req.query.authorId || req.body.authorId;

    if (!chats[chatId]) {
      res.sendStatus(404);
      return;
    }

    const isAdmin = chats[chatId].adminsIds.includes(authorId);
    const isP2pChat = chats[chatId].chatType === CHAT_TYPES.p2p;

    if (!isAdmin && !isP2pChat) {
      res.sendStatus(403);
      return;
    }

    next();
  }

  async isModerator(req, res, next) {
    const chatsDao = diContainer.resolve(SERVICES.chatsDao);
    const chats = await chatsDao.getChats();
    const chatId = req.params.chatId;
    const authorId = req.body.authorId;

    if (!chats[chatId]) {
      res.sendStatus(404);
      return;
    }

    const isModerator = chats[chatId].moderatorsIds.includes(authorId);
    const isP2pChat = chats[chatId].chatType === CHAT_TYPES.p2p;

    if (!isModerator && !isP2pChat) {
      res.sendStatus(403);
      return;
    }

    next();
  }

  async isParticipant(req, res, next) {
    const chatsDao = diContainer.resolve(SERVICES.chatsDao);
    const chats = await chatsDao.getChats();
    const authorId = req.query.authorId;
    const chatId = req.params.chatId;

    if (!chats[chatId]) {
      res.sendStatus(404);
      return;
    }
    const isParticipant = chats[chatId].participantsIds.includes(authorId);

    if (!isParticipant) {
      res.sendStatus(403);
      return;
    }
    next();
  }
}
