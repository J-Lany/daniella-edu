import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../data/data-file-paths.mjs";
import { convertChatIdsToChatsList } from "../../mappers/mappers.mjs";

export const CHAT_TYPES = {
  p2p: "p2p",
  group: "group",
};
export const SPECIAL_ROLES = {
  admin: "admin",
  moderator: "moderator",
};

export class ChatsDao {
  #chatsFilePath = FILE_PATHS.chats;
  #chatsByUserFilePath = FILE_PATHS.chatsByUser;
  #usersFriends = FILE_PATHS.userFriends;
  #usersDAO = diContainer.resolve(SERVICES.usersDao);
  #storeServise = diContainer.resolve(SERVICES.store);

  async getParticipantsForMoc(chatId) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);

    return chats[chatId].participantsIds;
  }

  async getChatsByUser(authorId) {
    const chatsIdsByUser = await this.getIdsChatsWhereUserParticipant(authorId);
    const chats = await this.getChats();

    const chatsByUser = convertChatIdsToChatsList(chatsIdsByUser, chats);

    return chatsByUser;
  }

  async isP2pChatAlreadyExist(authorId, participantsId) {
    const usersFriends = await this.#storeServise.getData(this.#usersFriends);
    const chatsByUser = await this.getChatsByUser(authorId);
    const authorFriends = usersFriends[authorId];

    if (!chatsByUser || !authorFriends) {
      return false;
    }

    const companionIdsFromChat = this.getCompanionIdFromPartisipants(
      authorId,
      participantsId
    );

    return authorFriends.some((companionId) =>
      companionIdsFromChat.includes(companionId)
    );
  }

  async getIdsChatsWhereUserParticipant(authorId) {
    const chatsIds = await this.#storeServise.getData(
      this.#chatsByUserFilePath
    );

    return chatsIds[authorId];
  }

  getCompanionIdFromPartisipants(authorId, participantsIds) {
    return participantsIds.filter(
      (participantId) => participantId !== authorId
    );
  }

  async getChats() {
    return await this.#storeServise.getData(this.#chatsFilePath);
  }

  async createChat(authorId, chat) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);
    const chatsByUser = await this.#storeServise.getData(
      this.#chatsByUserFilePath
    );

    const isP2pChat = chat.chatType === CHAT_TYPES.p2p;
    const isP2pChatAlreadyExist = await this.isP2pChatAlreadyExist(
      authorId,
      chat.participantsIds
    );

    if (isP2pChat && isP2pChatAlreadyExist) {
      return false;
    }

    const companionId = this.getCompanionIdFromPartisipants(
      authorId,
      chat.participantsIds
    );

    if (chats[chat.chatId]) {
      return false;
    }

    chats[chat.chatId] = chat;

    if (isP2pChat) {
      await this.#usersDAO.setFriend(authorId, ...companionId);
    }

    const updateChatsByUser = chat.participantsIds.reduce(
      (acc, participantId) => ({
        ...acc,
        [participantId]: acc[participantId]
          ? [...acc[participantId], chat.chatId]
          : [chat.chatId],
      }),
      chatsByUser
    );

    await this.#storeServise.setData(this.#chatsFilePath, chats);
    await this.#storeServise.setData(
      this.#chatsByUserFilePath,
      updateChatsByUser
    );

    return true;
  }

  async deleteChat(authorId, deleteChatId) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);
    const chatsByUser = await this.#storeServise.getData(
      this.#chatsByUserFilePath
    );
    const isP2pChat = chats[deleteChatId].chatType === CHAT_TYPES.p2p;
    const isChatExist = !!chats[deleteChatId];

    if (!isChatExist) {
      return null;
    }

    if (isP2pChat) {
      const companionId = this.getCompanionIdFromPartisipants(
        chats[deleteChatId].participantsIds
      );
      this.#usersDAO.deleteFriends(authorId, ...companionId);
    }

    chats[deleteChatId].participantsIds.forEach((participantId) => {
      chatsByUser[participantId] = chatsByUser[participantId].filter(
        (chatId) => chatId !== deleteChatId
      );
    });

    delete chats[deleteChatId];

    await this.#storeServise.setData(this.#chatsFilePath, chats);
    await this.#storeServise.setData(this.#chatsByUserFilePath, chatsByUser);

    return true;
  }

  async deleteChatParticipants(chatId, toDeleteParticipantId) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);
    const chatsByUser = await this.#storeServise.getData(
      this.#chatsByUserFilePath
    );
    const isUserExist = chatsByUser[toDeleteParticipantId].includes(chatId);

    if (!isUserExist) {
      return null;
    }

    chats[chatId].participantsIds = chats[chatId].participantsIds.filter(
      (participantId) => participantId !== toDeleteParticipantId
    );
    chatsByUser[toDeleteParticipantId] = chatsByUser[
      toDeleteParticipantId
    ].filter((chat) => chat !== chatId);

    await this.#storeServise.setData(this.#chatsFilePath, chats);
    await this.#storeServise.setData(this.#chatsByUserFilePath, chatsByUser);

    return true;
  }

  async setParticipants(chatId, participantsId) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);
    const chatsByUser = await this.#storeServise.getData(
      this.#chatsByUserFilePath
    );

    chats[chatId].participantsIds.push(...participantsId);
    participantsId.forEach((participantId) => {
      if (!chatsByUser[participantId]) {
        chatsByUser[participantId] = [chatId];
      } else {
        chatsByUser[participantId].push(chatId);
      }
    });

    await this.#storeServise.setData(this.#chatsFilePath, chats);
    await this.#storeServise.setData(this.#chatsByUserFilePath, chatsByUser);

    return true;
  }

  async getParticipants(chatId) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);
    return chats[chatId].participantsIds;
  }

  async setSpesialRole(participantId, chatId, role) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);

    if (role === SPECIAL_ROLES.admin) {
      chats[chatId].adminsIds.push(participantId);
    } else if (role === SPECIAL_ROLES.moderator) {
      chats[chatId].moderatorsIds.push(participantId);
    }

    await this.#storeServise.setData(this.#chatsFilePath, chats);

    return true;
  }

  async setBan(participantId, chatId) {
    const chats = await this.#storeServise.getData(this.#chatsFilePath);

    chats[chatId].bannedIds.push(participantId);
    await this.#storeServise.setData(this.#chatsFilePath, chats);
    return true;
  }
}
