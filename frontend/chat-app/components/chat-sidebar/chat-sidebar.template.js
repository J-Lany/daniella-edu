import { getChatSidebarStyle } from "./chat-sidebar.styles";

export function createChatSidebarTemplate(chats) {
  return `
    ${getChatSidebarStyle()}
    <div>
    ${chats.map((chat) => {
      //тут будет логика по вытаскиванию самого последнего сообщения в чате и из него вытащим данные для переменных ниже
      return `
      <message-component user-id="${authorId}" time="${time}" message="${message} display-mode="sidebar"></message-component>
      `;
    })}
    </div>
`;
}
