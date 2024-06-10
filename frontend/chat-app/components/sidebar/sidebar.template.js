import { getSidebarStyle } from "./sidebar.styles";

export function createSidebarTemplate(value) {
  return `
    ${getSidebarStyle()}
    <div class="chat-sidebar">
      <search-input></search-input>
      <chat-list></chat-list>
      <user-list class="modal__user-list"></user-list>
    </div>
`;
}
