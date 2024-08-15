import { getSidebarStyle } from "./sidebar.styles";

export function createSidebarTemplate() {
  return `
    ${getSidebarStyle()}
    <div class="chat-sidebar">
      <search-input></search-input>
      <chat-list class="chat-sidebar__content"></chat-list>
      <user-list class="modal__user-list chat-sidebar__content"></user-list>
    </div>
`;
}
