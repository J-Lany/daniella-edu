import { getUserListStyle } from "./user-list.styles";

const className = {
  create: "create",
  select: "select",
};

const layoutList = (list, className) => {
  return list
    ? list.result
        .map(({ userId }) => {
          return `<message-component class="user-list__item ${className}" user-id="${userId}" display-mode="sidebar"></message-component> `;
        })
        .join("")
    : "";
};

export function createUserListTemplate(result) {
  if (result?.message) {
    return `<div class='user-list-empty'>${result.message}</div>`;
  }
  return `
    ${getUserListStyle()}
    <div class="user-list">
          ${`<div class="group">Create chat</div>
          ${layoutList(result?.usersWithoutConversations, className.create)}
            <div class="group">Select chat</div>
            ${layoutList(result?.usersWithConversations, className.select)}`}
    </div>
`;
}
