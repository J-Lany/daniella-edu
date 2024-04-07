export class ChatService {
  #chats = new Map();

  createChat({ participants }) {
    const chatId = new Date();
    this.#chats.set(chatId, participants);
  }

  getChat(id) {
    return this.#chats.get(id);
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
