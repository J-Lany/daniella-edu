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

const createTypeTemplate = (list, type) => {
  const typeList = type === className.create ? "Create" : "Select";
  const isListNotEmpty = list?.result && list?.result.length > 0;

  return `
  ${
    isListNotEmpty
      ? `<div class="group">${typeList} chat</div>
    ${layoutList(list.result, type)}`
      : ""
  }
  `;
};

export const createTemplate = (list) => {
  const newContact = list?.usersWithoutConversations;
  const friendsContact = list?.usersWithConversations;

  return list?.message
    ? `<div class='user-list-empty'>${list.message}</div>`
    : `${createTypeTemplate(newContact, className.create)}
  ${createTypeTemplate(friendsContact, className.select)}`;
};

export function createUserListTemplate(list) {
  return `
    ${getUserListStyle()}
    <div class="user-list">
      ${createTemplate(list)}
    </div>
`;
}
