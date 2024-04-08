import { v4 as uuidv4 } from "uuid";

export class ChatService {
  #chats = new Map();

  createChat(authorId, participantsIds) {
    if (authorId === null) {
      throw new Error(401);
    }
    const chatId = uuidv4();
    const date = new Date();
    const newChat = { chatId, participantsIds, date };

    if (this.#chats.has(authorId)) {
      this.#chats.get(authorId).add(newChat);
    } else {
      this.#chats.set(authorId, new Set(newChat));
    }

    return chatId;
  }

  getChatsByAythor(authorId) {
    return this.#chats.get(authorId);
  }

  deleteParticipants(chatId, toDeleteParticipateId) {
    const currentParticipants = this.#chats.get(chatId);
    const newParticipants = currentParticipants.filter(
      (participate) => participate !== toDeleteParticipateId
    );
    this.#chats.set(chatId, newParticipants);
  }

  deleteChat(chatId) {
    this.#chats.delete(chatId);
  }
}
