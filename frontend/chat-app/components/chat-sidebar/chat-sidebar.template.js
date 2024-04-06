import { getChatSidebarStyle } from "./chat-sidebar.styles";

export function createChatSidebarTemplate(chats) {
  return `
    ${getChatSidebarStyle()}
    <div class="chat-sidebar">
    ${chats.map((chat) => {
      return `
      <message-component user-id="${authorId}" time="${time}" message="${message} display-mode="sidebar"></message-component>
      `;
    })}
    </div>
`;
}
