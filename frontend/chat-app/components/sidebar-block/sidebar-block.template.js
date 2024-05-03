import { getSidebarBlockStyle } from "./sidebar-block.styles";
import { viewTypes } from "./sidebar-block";

export function createSidebarBlockTemplate(viewType) {
  return `
    ${getSidebarBlockStyle()}
    <div class="chat-sidebar">
    ${
      viewType === viewTypes.CHATS
        ? `<chats-sidebar></chats-sidebar>`
        : `<users-sidebar></users-sidebar>`
    }
    </div>
`;
}
