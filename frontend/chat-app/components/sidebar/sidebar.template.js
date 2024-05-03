import { getSidebarStyle } from "./sidebar.styles";
import { viewTypes } from "./sidebar";

export function createSidebarTemplate(viewType) {
  return `
    ${getSidebarStyle()}
    <div class="chat-sidebar">
    <search-input></search-input>
    ${
      viewType === viewTypes.CHATS
        ? "<chats-sidebar></chats-sidebar>"
        : "<users-sidebar></users-sidebar>"
    }
    </div>
`;
}
