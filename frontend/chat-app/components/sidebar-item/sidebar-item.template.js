import { getSidebarItemStyle } from "./sidebar-item.styles";

export function createSidebarItemTemplate(message, time, authorId) {
  return `
   ${getSidebarItemStyle()}
    <div class="sidebar-item">
      <avatar-component display-mode="sidebar" user-id="${authorId}"></avatar-component>
      <div class="sidebar-item__body">
        <message-info user-id="${authorId}" time="${time}"></message-info>
        ${message ? ` <div class="sidebar-item__text">${message}</div>` : ""}
  </div>
    </div>
`;
}
