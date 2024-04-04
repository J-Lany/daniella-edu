import { getMessagesSidebarStyle } from "./messages-sidebar.styles";

export function createMessagesSidebarTemplate(chats) {
  return `
    ${getMessagesSidebarStyle()}
    <div>
    ${chats.map((chat) => {
      //тут будет логика по вытаскиванию самого последнего сообщения в чате и из него вытащим данные для переменных ниже
      return `
      <message-component user-id="${authorId}" time="${time}" message="${message}"></message-component>
      `;
    })}
    </div>
`;
}
