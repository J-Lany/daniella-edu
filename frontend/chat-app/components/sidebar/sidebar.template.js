import { getSidebarStyle } from "./sidebar.styles";

export function createSidebarTemplate(value) {
  return `
    ${getSidebarStyle()}
    <div class="chat-sidebar">
      <search-input value=${value}></search-input>
      <chat-list></chat-list>
      <div class="modal">
        <user-list class="modal__user-list"></user-list>
     </div>
    </div>
`;
}
