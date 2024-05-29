import { getSidebarStyle } from "./sidebar.styles";

export function createSidebarTemplate(value) {
  return `
    ${getSidebarStyle()}
    <div class="chat-sidebar">
    <search-input value=${value}></search-input>
    <chat-list></chat-list>
    </div>
`;
}
