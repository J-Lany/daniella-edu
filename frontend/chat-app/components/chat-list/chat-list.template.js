import { getChatListStyle } from "./chat-list.styles";

const getCompanionId = (participantsIds, currentUserId) => {
  return participantsIds
    .filter((partisipantId) => partisipantId !== currentUserId)
    .join(",");
};

const layoutList = (chatList, currentUserId) => {
  return chatList
    .map(({ participantsIds, chatId }) => {
      const companionId = getCompanionId(participantsIds, currentUserId);
      return `<sidebar-item class="chat-list__item" user-id="${companionId}" chat-id="${chatId}"></sidebar-item> `;
    })
    .join("");
};

export function createChatListTemplate(chatList, currentUserId) {
  return `
    ${getChatListStyle()}
    <div class="chat-list">
      ${
        chatList && chatList.length > 0
          ? layoutList(chatList, currentUserId)
          : "<div class='chat-list-empty'>Упс, тут ничего нет</div>"
      }
    </div>
`;
}
