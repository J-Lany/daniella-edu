import { getSidebarStyle } from "./sidebar.styles";

export function createSidebarTemplate() {
  return `
    ${getSidebarStyle()}
    <div class="chat-sidebar">
    <search-input></search-input>
    <sidebar-block></sidebar-block>
    </div>
`;
}
