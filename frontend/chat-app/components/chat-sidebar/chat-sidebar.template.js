import { getChatSidebarStyle } from "./chat-sidebar.styles";

export function createChatSidebarTemplate(chats) {
  return `
    ${getChatSidebarStyle()}
    <div class="chat-sidebar">
    <search-input></search-input>
    ${
      chats
        ? chats.map((chat) => {
            return `
      <message-component user-id="${chat.authorId}" time="${chat.time}" message="${chat.message} display-mode="sidebar"></message-component>
      `;
          })
        : ""
    }
    </div>
`;
}
