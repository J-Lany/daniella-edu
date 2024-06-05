import { getUserListStyle } from "./user-list.styles";

const className = {
  create: "create",
  select: "select",
};

const layoutList = (list, className) => {
  return list
    ? list
        .map(({ userId }) => {
          return `<message-component class="user-list__item ${className}" user-id="${userId}" display-mode="sidebar"></message-component> `;
        })
        .join("")
    : "";
};

const createTemplate = (list, type) => {
  const typeList = type === className.create ? "Create" : "Select";

  return `
  ${
    list.result && list.result.length > 0
      ? `<div class="group">${typeList} chat</div>
    ${layoutList(list.result, type)}`
      : ""
  }
  `;
};

export function createUserListTemplate(list) {
  const newContact = list.usersWithoutConversations;
  const friendsContact = list.usersWithConversations;

  return `
    ${getUserListStyle()}
    <div class="user-list">
      ${
        list?.message
          ? `<div class='user-list-empty'>${list.message}</div>`
          : `${createTemplate(newContact, className.create)}
          ${createTemplate(friendsContact, className.select)}`
      }
    </div>
`;
}
