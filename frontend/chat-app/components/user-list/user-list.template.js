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

const createChatTemplate = (list) => {
  return `
${
  list.usersWithoutConversations
    ? `<div class="group">Create chat</div>
  ${layoutList(list.usersWithoutConversations, className.create)}`
    : ""
}
`;
};

const selectChatTemplate = (list) => {
  return `
${
  list.usersWithConversations
    ? ` <div class="group">Select chat</div>
    ${layoutList(list.usersWithConversations, className.select)}`
    : ""
}
`;
};

export function createUserListTemplate(result) {
  return `
    ${getUserListStyle()}
    <div class="user-list">
      ${createChatTemplate(result)}
      ${selectChatTemplate(result)}
      ${
        result?.message
          ? `<div class='user-list-empty'>${result.message}</div>`
          : ""
      }
    </div>
`;
}
