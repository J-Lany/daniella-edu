export function convertChatIdsToChatsList(chatIds, chats) {
  return chatIds.map((chatId) => chats[chatId]);
}
