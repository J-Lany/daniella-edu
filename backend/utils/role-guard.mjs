import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { SPECIAL_ROLES } from "../data-store/dao/chats-dao.mjs";

export function roleGuard(role) {
  const roleService = diContainer.resolve(SERVICES.role);

  return async function (req, res, next) {
    const chatId = req.query.chatId || req.params.chatId;
    const authorId = req.query.authorId || req.body.authorId;

    if (role === SPECIAL_ROLES.admin) {
      try {
        await roleService.isAdmin(chatId, authorId);
        next();
      } catch (err) {
        return res.sendStatus(err);
      }
    }
    if (role === SPECIAL_ROLES.moderator) {
      try {
        await roleService.isModerator(chatId, authorId);
        next();
      } catch (err) {
        return res.sendStatus(err);
      }
    }
    if (role === SPECIAL_ROLES.participant) {
      try {
        await roleService.isParticipant(chatId, authorId);
        next();
      } catch (err) {
        return res.sendStatus(err);
      }
    }
  };
}
