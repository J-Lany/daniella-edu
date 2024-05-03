import { getSidebarStyle } from "./sidebar.styles";
import { viewTypes } from "./sidebar";

export function createSidebarTemplate(viewType, payload) {
  return `
    ${getSidebarStyle()}
    <div class="chat-sidebar">
    <search-input></search-input>
    ${
      viewType === viewTypes.CHATS
        ? `<chats-sidebar chats="${payload}"></chats-sidebar>`
        : `<users-sidebar users="${payload}"></users-sidebar>`
    }
    </div>
`;
}
