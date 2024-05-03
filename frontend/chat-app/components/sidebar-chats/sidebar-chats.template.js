import { getChatsSidebarStyle } from "./sidebar-chats.styles";

export function createChatSidebarTemplate(chats) {
  return `
    ${getChatsSidebarStyle()}
    <div class="chat-sidebar">
    ${
      chats
        ? chats.map((chat) => {
            return `
              <message-component user-id="${chat.authorId}" time="${chat.time}" message="${chat.message} display-mode="sidebar"></message-component>`;
          })
        : ""
    }
    </div>
`;
}
