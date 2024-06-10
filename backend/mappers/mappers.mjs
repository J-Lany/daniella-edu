export function convertChatIdsToChatsList(chatIds, chats) {
  if (!chats || !chatIds) {
    return null;
  }

  return chatIds.map((chatId) => chats[chatId]);
}
